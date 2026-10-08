import { DictationError, MAX_RECORDING_SECONDS, MIN_RECORDING_SECONDS } from './errors';
import { readWavInfo } from './audio/wav';
import { EMPTY_SENTINEL } from './prompt';
import { GEMINI, geminiTranscribe } from './providers/gemini';
import { OPENAI, openaiTranscribe } from './providers/openai';
import type { ProviderId, ProviderInfo, ProviderRequest } from './providers/types';
import { cleanModelText, normalizeUzbekApostrophes, type ApostropheStyle } from './text';
import { anySignal, ensureLanguage, providerRewrite } from './translate';
import { outputLanguage, type OutputLanguage, type SpokenLanguage } from './languages';

export const PROVIDERS: Readonly<Record<ProviderId, ProviderInfo>> = {
  gemini: GEMINI,
  openai: OPENAI,
};

export interface TranscribeOptions extends ProviderRequest {
  provider: ProviderId;
  apostrophes?: ApostropheStyle;
  /** Aborts after this many milliseconds (default grows with the recording length). */
  timeoutMs?: number;
}

export interface TranscribeResult {
  text: string;
  provider: ProviderId;
  model: string;
  durationSec: number;
}

/**
 * Sends a recording to the chosen provider and returns clean text in the
 * requested output language. Throws DictationError for every expected failure.
 */
export async function transcribe(options: TranscribeOptions): Promise<TranscribeResult> {
  const { provider, apostrophes = 'ascii' } = options;
  if (!options.apiKey?.trim()) throw new DictationError('no-api-key');

  let durationSec: number;
  try {
    durationSec = readWavInfo(options.audio).durationSec;
  } catch {
    throw new DictationError('provider', 'Audio is not a WAV file');
  }
  if (durationSec < MIN_RECORDING_SECONDS) throw new DictationError('too-short');
  if (durationSec > MAX_RECORDING_SECONDS + 1) throw new DictationError('too-long');

  // The audio request (with its retries and, for a translation, the second
  // text request) shares one deadline that grows with the recording length.
  // The optional language fix-up afterwards is best effort: if it fails or
  // runs out of time, the text already received is returned.
  const timeoutMs = options.timeoutMs ?? 60_000 + durationSec * 500;
  const timeout = new AbortController();
  const timer = setTimeout(() => timeout.abort(new DictationError('timeout')), timeoutMs);
  const signal = options.signal ? anySignal([options.signal, timeout.signal]) : timeout.signal;
  const request: ProviderRequest = { ...options, apiKey: options.apiKey.trim(), signal };

  const rewriteModels: string[] = [];
  const rewrite = async (source: string, strict: boolean, model: string | undefined) => {
    const rewritten = await providerRewrite(provider, {
      text: source,
      output: options.output,
      apiKey: request.apiKey,
      model,
      strict,
      signal,
      fetch: options.fetch,
    });
    if (!rewriteModels.includes(rewritten.model)) rewriteModels.push(rewritten.model);
    return rewritten.text;
  };
  const textModel = (audioModel: string) => (provider === 'openai' ? options.textModel : audioModel);

  let text: string;
  let model: string;
  let source: string;
  let translated: boolean;
  try {
    if (provider === 'gemini' && needsTranslation(options.spoken, options.output)) {
      // Known translation (e.g. Uzbek speech → Russian): write down exactly
      // what was said first, then translate it in a text-only request. Asking
      // for both in one audio request is what failed ("RU" chosen, Uzbek back).
      const heard = await geminiTranscribe({ ...request, output: transcriptLanguage(options.spoken) });
      model = heard.model;
      source = cleanModelText(heard.text);
      if (!source || source.includes(EMPTY_SENTINEL)) throw new DictationError('empty-result');
      text = cleanModelText(await rewrite(source, false, heard.model));
      if (!text || text.includes(EMPTY_SENTINEL)) throw new DictationError('translate-failed');
      translated = true;
    } else {
      const result = provider === 'openai' ? await openaiTranscribe(request) : await geminiTranscribe(request);
      model = result.model;
      text = cleanModelText(result.text);
      if (!text || text.includes(EMPTY_SENTINEL)) throw new DictationError('empty-result');
      source = result.source ?? text;
      translated = !!result.translated;
    }
  } catch (error) {
    clearTimeout(timer);
    if (timeout.signal.aborted && !options.signal?.aborted) throw new DictationError('timeout');
    if (options.signal?.aborted) throw new DictationError('cancelled');
    throw error;
  }

  // Models sometimes still answer in the wrong language: check and fix it.
  const audioModel = model;
  try {
    text = await ensureLanguage(text, options.output, (src, strict) => rewrite(src, strict, textModel(audioModel)), {
      source,
      // A translation that already ran gets one stricter retry; a plain
      // transcription gets a normal translation, then a strict one.
      passes: translated ? [true] : [false, true],
      keep: translated ? 'last' : 'candidate',
    });
  } catch (error) {
    if (options.signal?.aborted) throw new DictationError('cancelled');
    // Quota, network or the deadline during the fix-up: keep what we have.
  } finally {
    clearTimeout(timer);
  }
  for (const m of rewriteModels) if (m !== model && !model.includes(` + ${m}`)) model = `${model} + ${m}`;

  if (options.output === 'uz-latn') text = normalizeUzbekApostrophes(text, apostrophes);
  return { text, provider, model, durationSec };
}

/** Whether the spoken language differs from the requested output (a translation). */
export function needsTranslation(spoken: SpokenLanguage, output: OutputLanguage): boolean {
  return spoken !== 'auto' && outputLanguage(output).sameAs !== spoken;
}

/** Output used for the faithful first-step transcript of a translation. */
function transcriptLanguage(spoken: Exclude<SpokenLanguage, 'auto'> | SpokenLanguage): OutputLanguage {
  return spoken === 'ru' ? 'ru' : spoken === 'en' ? 'en' : 'uz-latn';
}
