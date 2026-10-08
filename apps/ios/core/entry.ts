// Entry point of ovozyoz-core.js, the bundle the iPhone app and keyboard run in
// JavaScriptCore. It exposes the shared language pipeline (the same code the
// web and desktop apps use) as globalThis.OvozYoz; results go back to Swift
// through __oy.done(callId, json).
import { base64ToBytes, native, nativeFetch, runtime } from './polyfills';
import {
  DictationError,
  MAX_TRANSLATE_CHARS,
  OUTPUT_LANGUAGES,
  SPOKEN_LANGUAGES,
  isOutputLanguage,
  isSpokenLanguage,
  transcribe,
  translateText,
  userMessage,
  wrongLanguageMessage,
  type ApostropheStyle,
  type OutputLanguage,
  type SpokenLanguage,
} from '@ovozyoz/core';

/** Options Swift sends as JSON with every call. */
interface CallOptions {
  apiKey: string;
  spoken?: SpokenLanguage;
  output: OutputLanguage;
  apostrophes?: ApostropheStyle;
  model?: string;
  timeoutMs?: number;
}

/** What Swift gets back (JSON). */
export type CallResult =
  | { ok: true; text: string; languageOk: boolean; model: string; warning?: string }
  | { ok: false; code: string; message: string };

const running = new Map<number, AbortController>();

function parseOptions(json: string): CallOptions {
  const raw = JSON.parse(json) as Record<string, unknown>;
  if (!isOutputLanguage(raw.output)) throw new DictationError('provider', `Unknown output language: ${String(raw.output)}`);
  return {
    apiKey: typeof raw.apiKey === 'string' ? raw.apiKey : '',
    spoken: isSpokenLanguage(raw.spoken) ? raw.spoken : 'auto',
    output: raw.output,
    apostrophes: raw.apostrophes === 'official' || raw.apostrophes === 'keep' ? raw.apostrophes : 'ascii',
    model: typeof raw.model === 'string' && raw.model ? raw.model : undefined,
    timeoutMs: typeof raw.timeoutMs === 'number' && raw.timeoutMs > 0 ? raw.timeoutMs : undefined,
  };
}

function finish(callId: number, result: CallResult) {
  running.delete(callId);
  native().done(callId, JSON.stringify(result));
}

function failure(error: unknown): CallResult {
  const code = error instanceof DictationError ? error.code : 'provider';
  return { ok: false, code, message: userMessage(error) };
}

/** Runs one call; every outcome, including bugs, ends in exactly one done(). */
function run(callId: number, work: (signal: AbortSignal) => Promise<CallResult>) {
  const controller = new AbortController();
  running.set(callId, controller);
  let promise: Promise<CallResult>;
  try {
    promise = work(controller.signal);
  } catch (error) {
    finish(callId, failure(error));
    return;
  }
  promise.then(
    (result) => finish(callId, result),
    (error) => finish(callId, failure(error)),
  );
}

const api = {
  version: 1,

  /** Speech (16-bit PCM WAV, base64) → text in the chosen output language. */
  transcribe(callId: number, wavBase64: string, optionsJson: string) {
    run(callId, async (signal) => {
      const o = parseOptions(optionsJson);
      const result = await transcribe({
        provider: 'gemini',
        apiKey: o.apiKey,
        audio: base64ToBytes(wavBase64),
        spoken: o.spoken ?? 'auto',
        output: o.output,
        apostrophes: o.apostrophes,
        model: o.model,
        timeoutMs: o.timeoutMs,
        signal,
        fetch: nativeFetch as unknown as typeof fetch,
      });
      return {
        ok: true,
        text: result.text,
        languageOk: result.languageOk,
        model: result.model,
        warning: result.languageOk ? undefined : wrongLanguageMessage(o.output),
      };
    });
  },

  /** Typed text (e.g. Russian) → the chosen output language (e.g. Uzbek). */
  translate(callId: number, text: string, optionsJson: string) {
    run(callId, async (signal) => {
      const o = parseOptions(optionsJson);
      const result = await translateText({
        text,
        provider: 'gemini',
        apiKey: o.apiKey,
        output: o.output,
        apostrophes: o.apostrophes,
        model: o.model,
        timeoutMs: o.timeoutMs,
        signal,
        fetch: nativeFetch as unknown as typeof fetch,
      });
      return {
        ok: true,
        text: result.text,
        languageOk: result.languageOk,
        model: result.model,
        warning: result.languageOk ? undefined : wrongLanguageMessage(o.output),
      };
    });
  },

  /** Cancels a running call; it still ends with done() (code "cancelled"). */
  cancel(callId: number) {
    running.get(callId)?.abort(new DictationError('cancelled'));
  },

  /** Labels for the Swift UI, so the language names live in one place. */
  info(): string {
    return JSON.stringify({
      outputs: OUTPUT_LANGUAGES.map(({ id, label, short, into }) => ({ id, label, short, into })),
      spoken: SPOKEN_LANGUAGES.map(({ id, label }) => ({ id, label })),
      maxTranslateChars: MAX_TRANSLATE_CHARS,
    });
  },

  /** The Uzbek message for an error code, e.g. for errors raised in Swift. */
  message(code: string): string {
    return userMessage(new DictationError(code as never)) ?? userMessage(new DictationError('provider'));
  },
};

const g = globalThis as Record<string, unknown>;
g.OvozYoz = api;
g.OvozYozRuntime = runtime;
