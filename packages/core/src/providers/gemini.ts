import { DictationError } from '../errors';
import { audioSystemPrompt, audioUserPrompt } from '../prompt';
import { bytesToBase64, request } from './http';
import type { ProviderInfo, ProviderRequest, ProviderResult } from './types';

export const GEMINI: ProviderInfo = {
  id: 'gemini',
  label: 'Google Gemini',
  defaultModel: 'gemini-3.5-flash',
  models: ['gemini-3.5-flash', 'gemini-3.8-flash', 'gemini-3.5-flash-lite', 'gemini-flash-latest'],
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

const isGemini2 = (model: string) => /^gemini-2\./.test(model);

/** Thinking only adds latency to a transcription; keep it as low as allowed. */
export function thinkingConfig(model: string): Record<string, unknown> | undefined {
  if (/^gemini-2\.5-(flash|flash-lite)/.test(model)) return { thinkingBudget: 0 };
  if (/^gemini-2\.5-pro/.test(model)) return { thinkingBudget: 128 }; // Pro cannot disable thinking
  if (/^gemini-(3|flash-latest|flash-lite-latest)/.test(model)) {
    return { thinkingLevel: model.includes('pro') ? 'low' : 'minimal' };
  }
  return undefined;
}

export function geminiRequestBody(
  req: ProviderRequest,
  model: string,
  withThinkingConfig = true,
): Record<string, unknown> {
  const thinking = withThinkingConfig ? thinkingConfig(model) : undefined;
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
    // Dictated text is the user's own words; don't let filters swallow it.
    safetySettings: [
      'HARM_CATEGORY_HARASSMENT',
      'HARM_CATEGORY_HATE_SPEECH',
      'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      'HARM_CATEGORY_DANGEROUS_CONTENT',
    ].map((category) => ({ category, threshold: 'BLOCK_NONE' })),
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
  if (!text.trim() && candidate?.finishReason && BLOCKING_FINISH_REASONS.has(candidate.finishReason)) {
    throw new DictationError('blocked', candidate.finishReason);
  }
  return text;
}

export async function geminiTranscribe(req: ProviderRequest): Promise<ProviderResult> {
  const call = (model: string, withThinkingConfig: boolean) =>
    request(req.fetch ?? fetch, `${ENDPOINT}/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': req.apiKey },
      body: JSON.stringify(geminiRequestBody(req, model, withThinkingConfig)),
      signal: req.signal,
    });

  let model = req.model?.trim() || GEMINI.defaultModel;
  let json: unknown;
  try {
    json = await call(model, true);
  } catch (error) {
    if (!(error instanceof DictationError)) throw error;
    if (error.status === 404 && model !== GEMINI_FALLBACK_MODEL) {
      // The model was retired or renamed; the alias always points to a live one.
      model = GEMINI_FALLBACK_MODEL;
      json = await call(model, true);
    } else if (error.status === 400 && /thinking/i.test(error.detail ?? '')) {
      json = await call(model, false);
    } else {
      throw error;
    }
  }
  return { text: parseGeminiResponse(json), model };
}
