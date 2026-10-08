import { DictationError, MAX_RECORDING_SECONDS, MIN_RECORDING_SECONDS } from './errors';
import { readWavInfo } from './audio/wav';
import { EMPTY_SENTINEL } from './prompt';
import { GEMINI, geminiTranscribe } from './providers/gemini';
import { OPENAI, openaiTranscribe } from './providers/openai';
import type { ProviderId, ProviderInfo, ProviderRequest } from './providers/types';
import { cleanModelText, normalizeUzbekApostrophes, type ApostropheStyle } from './text';
import { anySignal, ensureLanguage, providerRewrite } from './translate';

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

  // Upload, retries and (for OpenAI) a second translation request all share
  // one deadline, so give long recordings proportionally more time.
  const timeoutMs = options.timeoutMs ?? 60_000 + durationSec * 500;
  const timeout = new AbortController();
  const timer = setTimeout(() => timeout.abort(new DictationError('timeout')), timeoutMs);
  const signal = options.signal ? anySignal([options.signal, timeout.signal]) : timeout.signal;
  const request: ProviderRequest = { ...options, apiKey: options.apiKey.trim(), signal };

  const run = provider === 'openai' ? openaiTranscribe : geminiTranscribe;
  let text: string;
  let model: string;
  try {
    const result = await run(request);
    model = result.model;
    text = cleanModelText(result.text);
    if (!text || text.includes(EMPTY_SENTINEL)) throw new DictationError('empty-result');
    // Models sometimes write down what was said instead of translating it
    // ("RU" chosen, Uzbek text back): check and translate in a text-only step.
    let rewriteModel = '';
    text = await ensureLanguage(text, options.output, async (source, strict) => {
      const rewritten = await providerRewrite(provider, {
        text: source,
        output: options.output,
        apiKey: request.apiKey,
        model: provider === 'openai' ? options.textModel : result.model,
        strict,
        signal,
        fetch: options.fetch,
      });
      rewriteModel = rewritten.model;
      return rewritten.text;
    });
    if (rewriteModel && rewriteModel !== model) model = `${model} + ${rewriteModel}`;
  } catch (error) {
    if (timeout.signal.aborted && !options.signal?.aborted) throw new DictationError('timeout');
    if (options.signal?.aborted) throw new DictationError('cancelled');
    throw error;
  } finally {
    clearTimeout(timer);
  }

  if (options.output === 'uz-latn') text = normalizeUzbekApostrophes(text, apostrophes);
  return { text, provider, model, durationSec };
}
