import { DictationError } from '../errors';
import { audioSystemPrompt, audioUserPrompt } from '../prompt';
import { bytesToBase64, request } from './http';
import type { ProviderInfo, ProviderRequest, ProviderResult } from './types';

export const GEMINI: ProviderInfo = {
  id: 'gemini',
  label: 'Google Gemini',
  defaultModel: 'gemini-3.5-flash',
  models: ['gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-3.6-flash', 'gemini-3.8-flash', 'gemini-flash-latest'],
  modelLabels: {
    'gemini-3.5-flash': 'gemini-3.5-flash — tavsiya',
    'gemini-3.5-flash-lite': "gemini-3.5-flash-lite — eng tez, bepul limiti katta",
    'gemini-3.6-flash': 'gemini-3.6-flash — aniqroq',
    'gemini-3.8-flash': "gemini-3.8-flash — eng aniq, bepul limiti juda kichik",
    'gemini-flash-latest': "gemini-flash-latest — har doim eng yangisi",
  },
  keyUrl: 'https://aistudio.google.com/apikey',
  keyHint: "Google AI Studio'da bepul olinadi (AIza... bilan boshlanadi)",
};

const ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models';

const BLOCKING_FINISH_REASONS = new Set([
  'SAFETY',
  'RECITATION',
  'BLOCKLIST',
  'PROHIBITED_CONTENT',
  'SPII',
  'IMAGE_SAFETY',
]);

/** Used when the chosen model no longer exists (Google retires models often). */
export const GEMINI_FALLBACK_MODEL = 'gemini-flash-latest';
/** Used when the free-tier quota of the chosen model is used up. */
export const GEMINI_QUOTA_FALLBACK_MODEL = 'gemini-3.5-flash-lite';

const isGemini2 = (model: string) => /^gemini-2\./.test(model);

type ThinkingConfig = Record<string, unknown> | undefined;

/**
 * Thinking settings to try in order: thinking only adds latency to a
 * transcription, but each model family accepts different minimums
 * ("minimal" is rejected by 3.7+ Flash, Pro cannot turn thinking off),
 * so a 400 about thinking moves to the next, finally sending none at all.
 */
export function thinkingLadder(model: string): ThinkingConfig[] {
  if (/^gemini-2\.5-(flash|flash-lite)/.test(model)) return [{ thinkingBudget: 0 }, undefined];
  if (/^gemini-2\.5-pro/.test(model)) return [{ thinkingBudget: 128 }, undefined];
  if (/^gemini-(3-flash|3\.[1-6]-flash|flash-lite-latest)/.test(model)) {
    return [{ thinkingLevel: 'minimal' }, { thinkingLevel: 'low' }, undefined];
  }
  if (/^gemini-(3|flash-latest)/.test(model)) return [{ thinkingLevel: 'low' }, undefined];
  return [undefined];
}

/** The first (preferred) thinking setting for a model. */
export function thinkingConfig(model: string): ThinkingConfig {
  return thinkingLadder(model)[0];
}

export function geminiRequestBody(
  req: ProviderRequest,
  model: string,
  // Explicit (no default) so that "send no thinking config" stays expressible.
  thinking: ThinkingConfig,
): Record<string, unknown> {
  return {
    systemInstruction: { parts: [{ text: audioSystemPrompt(req.spoken, req.output) }] },
    contents: [
      {
        role: 'user',
        parts: [
          { inlineData: { mimeType: 'audio/wav', data: bytesToBase64(req.audio) } },
          { text: audioUserPrompt(req.output) },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 8192,
      // Gemini 3 degrades below its default temperature; older models are steadier at 0.
      ...(isGemini2(model) ? { temperature: 0 } : {}),
      ...(thinking ? { thinkingConfig: thinking } : {}),
    },
    // No safetySettings: the default for current models is already OFF.
  };
}

interface GeminiResponse {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string; thought?: boolean }> };
    finishReason?: string;
  }>;
  promptFeedback?: { blockReason?: string };
}

export function parseGeminiResponse(json: unknown): string {
  const data = json as GeminiResponse;
  if (data.promptFeedback?.blockReason) {
    throw new DictationError('blocked', data.promptFeedback.blockReason);
  }
  const candidate = data.candidates?.[0];
  const text = (candidate?.content?.parts ?? [])
    .filter((p) => typeof p.text === 'string' && !p.thought)
    .map((p) => p.text)
    .join('');
  if (!text.trim() && candidate?.finishReason) {
    if (candidate.finishReason === 'LANGUAGE') throw new DictationError('unsupported-language', 'LANGUAGE');
    if (BLOCKING_FINISH_REASONS.has(candidate.finishReason)) throw new DictationError('blocked', candidate.finishReason);
    if (candidate.finishReason === 'MAX_TOKENS') throw new DictationError('too-long', 'MAX_TOKENS');
  }
  return text;
}

function post(req: ProviderRequest, model: string, thinking: ThinkingConfig): Promise<unknown> {
  return request(req.fetch ?? fetch, `${ENDPOINT}/${encodeURIComponent(model)}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': req.apiKey },
    body: JSON.stringify(geminiRequestBody(req, model, thinking)),
    signal: req.signal,
  });
}

async function callModel(req: ProviderRequest, model: string): Promise<unknown> {
  const ladder = thinkingLadder(model);
  for (let i = 0; ; i++) {
    try {
      return await post(req, model, ladder[i]);
    } catch (error) {
      const thinkingRejected =
        error instanceof DictationError && error.status === 400 && /thinking/i.test(error.detail ?? '');
      if (!thinkingRejected || i >= ladder.length - 1) throw error;
    }
  }
}

export async function geminiTranscribe(req: ProviderRequest): Promise<ProviderResult> {
  let model = req.model?.trim() || GEMINI.defaultModel;
  const tried = new Set<string>();
  for (;;) {
    tried.add(model);
    try {
      return { text: parseGeminiResponse(await callModel(req, model)), model };
    } catch (error) {
      if (!(error instanceof DictationError)) throw error;
      // A retired model (404) moves to the live alias; a used-up free quota
      // (429) moves to Flash-Lite, which has the largest free allowance.
      const next =
        error.status === 404
          ? GEMINI_FALLBACK_MODEL
          : error.code === 'quota' && !model.includes('lite')
            ? GEMINI_QUOTA_FALLBACK_MODEL
            : undefined;
      if (!next || tried.has(next)) throw error;
      model = next;
    }
  }
}
