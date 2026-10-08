import { outputLanguage, spokenLanguage } from '../languages';
import { rewriteSystemPrompt, transcriptionStylePrompt } from '../prompt';
import { cyrillicRatio, uzCyrillicToLatin } from '../transliterate';
import { DictationError } from '../errors';
import { request } from './http';
import type { ProviderInfo, ProviderRequest, ProviderResult } from './types';

export const OPENAI: ProviderInfo = {
  id: 'openai',
  label: 'OpenAI',
  defaultModel: 'gpt-4o-transcribe',
  models: ['gpt-4o-transcribe', 'gpt-transcribe', 'gpt-4o-mini-transcribe', 'whisper-1'],
  defaultTextModel: 'gpt-4.1-mini',
  textModels: ['gpt-4.1-mini', 'gpt-4.1', 'gpt-4o-mini'],
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
  const completion = (await request(fetchImpl, `${API}/chat/completions`, {
    method: 'POST',
    headers: { ...auth, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: textModel,
      temperature: 0,
      messages: [
        { role: 'system', content: rewriteSystemPrompt(req.output) },
        { role: 'user', content: transcript },
      ],
    }),
    signal: req.signal,
  })) as { choices?: Array<{ message?: { content?: string | null } }> };

  return { text: completion.choices?.[0]?.message?.content ?? '', model: `${model} + ${textModel}` };
}
