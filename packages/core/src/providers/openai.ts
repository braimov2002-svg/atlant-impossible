import { outputLanguage, spokenLanguage } from '../languages';
import { rewriteSystemPrompt, transcriptionStylePrompt } from '../prompt';
import { looksLikeUzbekCyrillic } from '../detect';
import { cyrillicRatio, uzCyrillicToLatin } from '../transliterate';
import { DictationError } from '../errors';
import { request } from './http';
import type { ProviderInfo, ProviderRequest, ProviderResult, TextRequest } from './types';

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
export function rewriteNeeded(
  req: Pick<ProviderRequest, 'spoken' | 'output'>,
  transcript: string,
  languageHintDropped = false,
): Rewrite {
  const out = outputLanguage(req.output);
  // Without a language hint the model may have written another language.
  if (req.spoken === 'auto' || languageHintDropped || out.sameAs !== req.spoken) return 'model';
  // Uzbek Cyrillic is transliterated locally; Russian (or anything unsure) is
  // translated, never turned into Russian written in Latin letters.
  if (req.output === 'uz-latn') {
    if (cyrillicRatio(transcript) === 0) return 'none';
    return looksLikeUzbekCyrillic(transcript) || onlyCyrillicNames(transcript) ? 'local-latin' : 'model';
  }
  if (req.output === 'uz-cyrl') return cyrillicRatio(transcript) < 0.8 ? 'model' : 'none';
  return 'none';
}

/** Latin text whose only Cyrillic words are capitalised names ("Men Петров bilan gaplashdim"). */
function onlyCyrillicNames(text: string): boolean {
  const words = text.split(/[^\p{L}'ʻʼ‘’]+/u).filter(Boolean);
  const cyrillic = words.filter((w) => /[Ѐ-ӿ]/u.test(w));
  return cyrillic.length * 2 < words.length && cyrillic.every((w) => /^\p{Lu}\p{Ll}/u.test(w));
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

function comparable(text: string): string {
  return text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

/**
 * True when the "transcript" is just (most of) the style prompt repeated,
 * which is what Whisper-family models produce for silence. Short real
 * phrases that happen to appear in the prompt ("Salom", "Rahmat") are kept.
 */
export function isPromptEcho(transcript: string, prompt: string | undefined): boolean {
  if (!prompt) return false;
  const said = ` ${comparable(transcript)} `;
  const example = ` ${comparable(prompt)} `;
  return said.trim().length >= 0.6 * example.trim().length && example.includes(said);
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
  let languageHintDropped = false;
  try {
    transcription = await transcribeOnce(true);
  } catch (error) {
    // Newer models reject language codes they do not list; Uzbek may be one.
    const rejectedLanguage =
      iso && error instanceof DictationError && error.status === 400 && /language/i.test(error.detail ?? '');
    if (!rejectedLanguage) throw error;
    languageHintDropped = true;
    transcription = await transcribeOnce(false);
  }
  const transcript = (transcription.text ?? '').trim();
  // Whisper-family models answer silence by echoing the style prompt.
  if (!transcript || isPromptEcho(transcript, transcriptionStylePrompt(req.spoken, req.output))) {
    return { text: '', model };
  }

  const rewrite = rewriteNeeded(req, transcript, languageHintDropped);
  if (rewrite === 'none') return { text: transcript, model };
  if (rewrite === 'local-latin') return { text: uzCyrillicToLatin(transcript), model };

  try {
    const rewritten = await openaiRewrite({
      text: transcript,
      output: req.output,
      apiKey: req.apiKey,
      model: req.textModel,
      signal: req.signal,
      fetch: req.fetch,
    });
    if (rewritten.text.trim()) {
      return { text: rewritten.text, model: `${model} + ${rewritten.model}`, translated: true, source: transcript };
    }
  } catch (error) {
    if (req.signal?.aborted) throw error;
    // The transcription succeeded: keep it, transcribe() tries the fix-up once more.
    return { text: transcript, model, translated: false, source: transcript, rewriteFailed: errorCode(error) };
  }
  return { text: transcript, model, translated: false, source: transcript };
}

function errorCode(error: unknown): string | undefined {
  return error instanceof DictationError ? error.code : undefined;
}

type ChatCompletion = { choices?: Array<{ message?: { content?: string | null } }> };

/** Text-only call: translate or re-script `req.text` with a chat model. */
export async function openaiRewrite(req: TextRequest): Promise<ProviderResult> {
  const fetchImpl = req.fetch ?? fetch;
  const textModel = req.model?.trim() || OPENAI.defaultTextModel!;
  const rewriteOnce = (effort: string | undefined) =>
    request(fetchImpl, `${API}/chat/completions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${req.apiKey}`, 'Content-Type': 'application/json' },
      // No temperature: reasoning models reject it; the prompt keeps output literal.
      body: JSON.stringify({
        model: textModel,
        ...(effort ? { reasoning_effort: effort } : {}),
        messages: [
          { role: 'system', content: rewriteSystemPrompt(req.output, req.strict) },
          { role: 'user', content: req.text },
        ],
      }),
      signal: req.signal,
    }) as Promise<ChatCompletion>;

  let completion: ChatCompletion;
  const effort = reasoningEffort(textModel);
  try {
    completion = await rewriteOnce(effort);
  } catch (error) {
    const effortRejected =
      effort && error instanceof DictationError && error.status === 400 && /reasoning/i.test(error.detail ?? '');
    if (!effortRejected) throw error;
    completion = await rewriteOnce(undefined);
  }
  return { text: completion.choices?.[0]?.message?.content ?? '', model: textModel };
}
