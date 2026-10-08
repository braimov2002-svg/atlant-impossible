import { evidence, languageMatches, looksLikeUzbekCyrillic } from './detect';
import { DictationError } from './errors';
import type { OutputLanguage } from './languages';
import { EMPTY_SENTINEL } from './prompt';
import { geminiRewrite } from './providers/gemini';
import { openaiRewrite } from './providers/openai';
import type { ProviderId, ProviderResult, TextRequest } from './providers/types';
import { cleanModelText, normalizeUzbekApostrophes, type ApostropheStyle } from './text';
import { uzCyrillicToLatin } from './transliterate';

/** Longest text the translate box accepts (keeps one request well inside model limits). */
export const MAX_TRANSLATE_CHARS = 10_000;

/** One text-only model call: translate `text` into the target, optionally insisting harder. */
export type Rewriter = (text: string, strict: boolean) => Promise<string>;

/** The provider's text-only call (Gemini model or OpenAI chat model). */
export function providerRewrite(provider: ProviderId, req: TextRequest): Promise<ProviderResult> {
  return provider === 'openai' ? openaiRewrite(req) : geminiRewrite(req);
}

export interface EnsureLanguageOptions {
  /** Text to translate again on a mismatch (default: the candidate itself). */
  source?: string;
  /** One model call per entry; true = insist harder. */
  passes?: readonly boolean[];
  /**
   * What to return when no answer passes the check: the original candidate
   * (the check may be wrong about short or unusual text) or the last
   * translation (when the candidate is itself a translation attempt).
   */
  keep?: 'candidate' | 'last';
}

/**
 * Makes sure the answer is really in the requested language: models sometimes
 * transcribe instead of translating. Returns `candidate` when it already
 * matches; Uzbek Cyrillic → Latin is converted locally; otherwise the source
 * is translated again, once per pass.
 */
export async function ensureLanguage(
  candidate: string,
  output: OutputLanguage,
  rewrite: Rewriter,
  { source = candidate, passes = [false, true], keep = 'candidate' }: EnsureLanguageOptions = {},
): Promise<string> {
  if (languageMatches(candidate, output)) return candidate;
  if (output === 'uz-latn' && looksLikeUzbekCyrillic(candidate)) {
    const latin = uzCyrillicToLatin(candidate);
    if (languageMatches(latin, output)) return latin;
  }
  let last: string | undefined;
  for (const strict of passes) {
    const answer = cleanModelText(await rewrite(source, strict));
    if (!answer || answer.includes(EMPTY_SENTINEL)) continue;
    last = answer;
    if (languageMatches(answer, output)) return answer;
  }
  if (last === undefined) return candidate;
  if (keep === 'last') return last;
  // The check may be wrong about unusual text, so the candidate is kept —
  // unless it is not even in the target's script and the translation is.
  return scriptFits(candidate, output) || !scriptFits(last, output) ? candidate : last;
}

/** Whether most words are in the target's script (Cyrillic for ru/uz-cyrl). */
function scriptFits(text: string, output: OutputLanguage): boolean {
  const e = evidence(text);
  const cyrillicTarget = output === 'ru' || output === 'uz-cyrl';
  return cyrillicTarget ? e.cyrlWords >= e.latnWords : e.latnWords >= e.cyrlWords;
}

export interface TranslateOptions {
  text: string;
  output: OutputLanguage;
  provider: ProviderId;
  apiKey: string;
  /** Gemini model (defaults to the provider default). */
  model?: string;
  /** OpenAI chat model used for translation. */
  textModel?: string;
  apostrophes?: ApostropheStyle;
  signal?: AbortSignal;
  timeoutMs?: number;
  fetch?: typeof fetch;
}

export interface TranslateResult {
  text: string;
  model: string;
}

/**
 * Translates typed or pasted text (e.g. Russian → Uzbek) into the requested
 * output language and script. Throws DictationError for every expected failure.
 */
export async function translateText(options: TranslateOptions): Promise<TranslateResult> {
  const input = options.text.replace(/\r\n/g, '\n').trim();
  if (!input) throw new DictationError('empty-text');
  if (input.length > MAX_TRANSLATE_CHARS) throw new DictationError('text-too-long');
  const apiKey = options.apiKey?.trim();
  if (!apiKey) throw new DictationError('no-api-key');

  const timeout = new AbortController();
  const timer = setTimeout(() => timeout.abort(new DictationError('timeout')), options.timeoutMs ?? 45_000 + input.length * 5);
  const signal = options.signal ? anySignal([options.signal, timeout.signal]) : timeout.signal;
  let model = '';
  const rewrite: Rewriter = async (text, strict) => {
    const result = await providerRewrite(options.provider, {
      text,
      output: options.output,
      apiKey,
      model: options.provider === 'openai' ? options.textModel : options.model,
      strict,
      signal,
      fetch: options.fetch,
    });
    model = result.model;
    return result.text;
  };

  let text: string;
  try {
    text = cleanModelText(await rewrite(input, false));
  } catch (error) {
    clearTimeout(timer);
    if (timeout.signal.aborted && !options.signal?.aborted) throw new DictationError('timeout');
    if (options.signal?.aborted) throw new DictationError('cancelled');
    // Messages about recordings ("too long", "no speech") make no sense here.
    if (error instanceof DictationError && (error.code === 'too-long' || error.code === 'empty-result')) {
      throw new DictationError('translate-failed', error.detail, error.status);
    }
    throw error;
  }
  try {
    if (!text || text.includes(EMPTY_SENTINEL)) {
      // An empty answer is usually transient: one stricter retry.
      text = cleanModelText(await rewrite(input, true));
      if (!text || text.includes(EMPTY_SENTINEL)) throw new DictationError('translate-failed');
    } else {
      // One stricter retry if the answer is still not in the target language.
      text = await ensureLanguage(text, options.output, rewrite, { source: input, passes: [true], keep: 'last' });
    }
  } catch (error) {
    if (options.signal?.aborted) throw new DictationError('cancelled');
    if (!text || text.includes(EMPTY_SENTINEL)) {
      if (timeout.signal.aborted) throw new DictationError('timeout');
      throw error instanceof DictationError && error.code === 'translate-failed' ? error : new DictationError('translate-failed');
    }
    // The retry failed (quota, network, deadline): keep the first translation.
  } finally {
    clearTimeout(timer);
  }
  if (options.output === 'uz-latn') text = normalizeUzbekApostrophes(text, options.apostrophes ?? 'ascii');
  return { text, model };
}

/** AbortSignal.any() with a fallback for Safari < 17.4. */
export function anySignal(signals: AbortSignal[]): AbortSignal {
  if (typeof AbortSignal.any === 'function') return AbortSignal.any(signals);
  const controller = new AbortController();
  for (const signal of signals) {
    if (signal.aborted) {
      controller.abort(signal.reason);
      break;
    }
    signal.addEventListener('abort', () => controller.abort(signal.reason), { once: true });
  }
  return controller.signal;
}
