import { outputLanguage, spokenLanguage } from '../languages';
import { rewriteSystemPrompt, transcriptionStylePrompt } from '../prompt';
import { cyrillicRatio, uzCyrillicToLatin } from '../transliterate';
import { DictationError } from '../errors';
import { request } from './http';
import type { ProviderInfo, ProviderRequest, ProviderResult } from './types';

export const OPENAI: ProviderInfo = {
  id: 'openai',
  label: 'OpenAI',
  // whisper-1 is left out on purpose: its Uzbek error rate is around 90%.
  defaultModel: 'gpt-transcribe',
  models: ['gpt-transcribe', 'gpt-4o-transcribe', 'gpt-4o-mini-transcribe'],
  defaultTextModel: 'gpt-5-mini',
  textModels: ['gpt-5-mini', 'gpt-4.1-mini', 'gpt-6-luna'],
  keyUrl: 'https://platform.openai.com/api-keys',
  keyHint: 'OpenAI platformasidan olinadi (sk-... bilan boshlanadi), pullik',
};

const API = 'https://api.openai.com/v1';

type Rewrite = 'none' | 'local-latin' | 'model';

/** Decides whether the raw transcript still needs translating or re-scripting. */
export function rewriteNeeded(req: Pick<ProviderRequest, 'spoken' | 'output'>, transcript: string): Rewrite {
  const out = outputLanguage(req.output);
  if (req.spoken === 'auto' || out.sameAs !== req.spoken) return 'model';
  if (req.output === 'uz-latn') return cyrillicRatio(transcript) > 0.2 ? 'local-latin' : 'none';
  if (req.output === 'uz-cyrl') return cyrillicRatio(transcript) < 0.8 ? 'model' : 'none';
  return 'none';
}

/**
 * Lowest reasoning effort each text-model family accepts; translation needs
 * none and every bit of reasoning adds seconds. Unknown models get none sent.
 */
export function reasoningEffort(model: string): string | undefined {
  if (/^gpt-5(-mini|-nano)?$|^gpt-5-(mini|nano)-\d/.test(model)) return 'minimal';
  if (/^gpt-(5\.[4-9]|6-(luna|sol))/.test(model)) return 'none';
  return undefined;
}

export function transcriptionForm(req: ProviderRequest, model: string, iso: string | undefined): FormData {
  const form = new FormData();
  form.append('model', model);
  form.append('response_format', 'json');
  form.append('temperature', '0');
  if (iso) {
    // gpt-transcribe takes a list of candidate languages instead of one.
    form.append(model.startsWith('gpt-transcribe') ? 'languages[]' : 'language', iso);
  }
  const style = transcriptionStylePrompt(req.spoken, req.output);
  if (style) form.append('prompt', style);
  form.append('file', new Blob([req.audio.slice()], { type: 'audio/wav' }), 'audio.wav');
  return form;
}

export async function openaiTranscribe(req: ProviderRequest): Promise<ProviderResult> {
  const fetchImpl = req.fetch ?? fetch;
  const model = req.model?.trim() || OPENAI.defaultModel;
  const auth = { Authorization: `Bearer ${req.apiKey}` };

  const iso = spokenLanguage(req.spoken).iso;
  const transcribeOnce = (withLanguage: boolean) =>
    request(fetchImpl, `${API}/audio/transcriptions`, {
      method: 'POST',
      headers: auth,
      body: transcriptionForm(req, model, withLanguage ? iso : undefined),
      signal: req.signal,
    }) as Promise<{ text?: string }>;

  let transcription: { text?: string };
  try {
    transcription = await transcribeOnce(true);
  } catch (error) {
    // Newer models reject language codes they do not list; Uzbek may be one.
    const rejectedLanguage =
      iso && error instanceof DictationError && error.status === 400 && /language/i.test(error.detail ?? '');
    if (!rejectedLanguage) throw error;
    transcription = await transcribeOnce(false);
  }
  const transcript = (transcription.text ?? '').trim();
  if (!transcript) return { text: '', model };

  const rewrite = rewriteNeeded(req, transcript);
  if (rewrite === 'none') return { text: transcript, model };
  if (rewrite === 'local-latin') return { text: uzCyrillicToLatin(transcript), model };

  const textModel = req.textModel?.trim() || OPENAI.defaultTextModel!;
  const rewriteOnce = (effort: string | undefined) =>
    request(fetchImpl, `${API}/chat/completions`, {
      method: 'POST',
      headers: { ...auth, 'Content-Type': 'application/json' },
      // No temperature: reasoning models reject it; the prompt keeps output literal.
      body: JSON.stringify({
        model: textModel,
        ...(effort ? { reasoning_effort: effort } : {}),
        messages: [
          { role: 'system', content: rewriteSystemPrompt(req.output) },
          { role: 'user', content: transcript },
        ],
      }),
      signal: req.signal,
    }) as Promise<{ choices?: Array<{ message?: { content?: string | null } }> }>;

  let completion: { choices?: Array<{ message?: { content?: string | null } }> };
  const effort = reasoningEffort(textModel);
  try {
    completion = await rewriteOnce(effort);
  } catch (error) {
    const effortRejected =
      effort && error instanceof DictationError && error.status === 400 && /reasoning/i.test(error.detail ?? '');
    if (!effortRejected) throw error;
    completion = await rewriteOnce(undefined);
  }

  return { text: completion.choices?.[0]?.message?.content ?? '', model: `${model} + ${textModel}` };
}
