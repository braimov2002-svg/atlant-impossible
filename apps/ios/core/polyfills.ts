// The iPhone app runs the shared TypeScript core inside JavaScriptCore, which
// has the language but none of the web APIs. These stand-ins cover exactly
// what the core uses (timers, AbortController, base64, console); network
// requests go through `nativeFetch` (see entry.ts). Each one is installed only
// when it is missing, so the same bundle also runs under Node for testing.

/** Functions the Swift side installs on the global object before the bundle runs. */
export interface Native {
  setTimeout(id: number, ms: number): void;
  clearTimeout(id: number): void;
  fetch(id: number, url: string, method: string, headersJson: string, body: string): void;
  abortFetch(id: number): void;
  done(callId: number, resultJson: string): void;
  log(message: string): void;
}

/** Entry points Swift calls back into (installed as globalThis.OvozYozRuntime). */
export interface Runtime {
  fireTimer(id: number): void;
  fetchDone(id: number, status: number, statusText: string, body: string, error: string | null): void;
}

type Global = Record<string, unknown> & { __oy?: Native };
const g = globalThis as unknown as Global;

export function native(): Native {
  if (!g.__oy) throw new Error('OvozYoz native bridge (__oy) is missing');
  return g.__oy;
}

// ------------------------------------------------------------------ timers

const timers = new Map<number, () => void>();
let nextTimer = 1;

if (typeof g.setTimeout !== 'function') {
  g.setTimeout = (fn: (...args: unknown[]) => void, ms?: number, ...args: unknown[]) => {
    const id = nextTimer++;
    timers.set(id, () => fn(...args));
    native().setTimeout(id, Math.max(0, Number(ms) || 0));
    return id;
  };
  g.clearTimeout = (id: number) => {
    if (timers.delete(id)) native().clearTimeout(id);
  };
}

// ------------------------------------------------------------ DOMException

class DOMExceptionShim extends Error {
  constructor(message = '', name = 'Error') {
    super(message);
    this.name = name;
  }
}
if (typeof g.DOMException !== 'function') g.DOMException = DOMExceptionShim;

// ------------------------------------------------------- AbortController

type Listener = (event: { type: string }) => void;

class AbortSignalShim {
  aborted = false;
  reason: unknown = undefined;
  onabort: Listener | null = null;
  private listeners: { fn: Listener; once: boolean }[] = [];

  addEventListener(type: string, fn: Listener, options?: { once?: boolean } | boolean) {
    if (type !== 'abort' || typeof fn !== 'function') return;
    const once = typeof options === 'object' && !!options?.once;
    this.listeners.push({ fn, once });
  }

  removeEventListener(type: string, fn: Listener) {
    if (type === 'abort') this.listeners = this.listeners.filter((l) => l.fn !== fn);
  }

  throwIfAborted() {
    if (this.aborted) throw this.reason;
  }

  /** Called by the controller. */
  _abort(reason: unknown) {
    if (this.aborted) return;
    this.aborted = true;
    this.reason = reason === undefined ? new (g.DOMException as typeof DOMExceptionShim)('This operation was aborted', 'AbortError') : reason;
    const event = { type: 'abort' };
    const listeners = this.listeners;
    this.listeners = listeners.filter((l) => !l.once);
    this.onabort?.(event);
    for (const l of listeners) l.fn(event);
  }
}

class AbortControllerShim {
  readonly signal = new AbortSignalShim();
  abort(reason?: unknown) {
    this.signal._abort(reason);
  }
}

if (typeof g.AbortController !== 'function') {
  g.AbortController = AbortControllerShim;
  g.AbortSignal = AbortSignalShim; // no AbortSignal.any: the core has a fallback
}

// ------------------------------------------------------------------ base64

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const LOOKUP = new Uint8Array(128).fill(255);
for (let i = 0; i < ALPHABET.length; i++) LOOKUP[ALPHABET.charCodeAt(i)] = i;

/** Base64 straight to bytes (the recording arrives from Swift this way). */
export function base64ToBytes(b64: string): Uint8Array {
  const clean = b64.replace(/[^A-Za-z0-9+/]/g, '');
  const out = new Uint8Array(Math.floor((clean.length * 3) / 4));
  let o = 0;
  for (let i = 0; i < clean.length; i += 4) {
    const a = LOOKUP[clean.charCodeAt(i)];
    const b = LOOKUP[clean.charCodeAt(i + 1)];
    const c = i + 2 < clean.length ? LOOKUP[clean.charCodeAt(i + 2)] : 0;
    const d = i + 3 < clean.length ? LOOKUP[clean.charCodeAt(i + 3)] : 0;
    const n = (a << 18) | (b << 12) | (c << 6) | d;
    if (o < out.length) out[o++] = (n >> 16) & 255;
    if (o < out.length) out[o++] = (n >> 8) & 255;
    if (o < out.length) out[o++] = n & 255;
  }
  return out;
}

if (typeof g.btoa !== 'function') {
  g.btoa = (binary: string) => {
    let out = '';
    for (let i = 0; i < binary.length; i += 3) {
      const a = binary.charCodeAt(i);
      const b = i + 1 < binary.length ? binary.charCodeAt(i + 1) : 0;
      const c = i + 2 < binary.length ? binary.charCodeAt(i + 2) : 0;
      if (a > 255 || b > 255 || c > 255) throw new (g.DOMException as typeof DOMExceptionShim)('Invalid character', 'InvalidCharacterError');
      const n = (a << 16) | (b << 8) | c;
      out += ALPHABET[(n >> 18) & 63] + ALPHABET[(n >> 12) & 63];
      out += i + 1 < binary.length ? ALPHABET[(n >> 6) & 63] : '=';
      out += i + 2 < binary.length ? ALPHABET[n & 63] : '=';
    }
    return out;
  };
}

if (typeof g.atob !== 'function') {
  g.atob = (b64: string) => {
    const bytes = base64ToBytes(b64);
    let out = '';
    for (let i = 0; i < bytes.length; i += 0x8000) out += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    return out;
  };
}

// ----------------------------------------------------------------- console

if (typeof g.console !== 'object' || g.console === null) {
  const log = (...args: unknown[]) => native().log(args.map((a) => (typeof a === 'string' ? a : safeJson(a))).join(' '));
  g.console = { log, info: log, warn: log, error: log, debug: log };
}

function safeJson(value: unknown): string {
  try {
    return value instanceof Error ? `${value.name}: ${value.message}` : JSON.stringify(value);
  } catch {
    return String(value);
  }
}

// ------------------------------------------------------------------- fetch

interface Pending {
  resolve: (response: MinimalResponse) => void;
  reject: (error: unknown) => void;
  cleanup: () => void;
}

/** The part of Response that the core's request() helper reads. */
export interface MinimalResponse {
  ok: boolean;
  status: number;
  statusText: string;
  text(): Promise<string>;
}

const pending = new Map<number, Pending>();
let nextFetch = 1;

/** fetch() over URLSession: text bodies only, which is all the core sends. */
export function nativeFetch(input: string | URL | Request, init: RequestInit = {}): Promise<MinimalResponse> {
  const url = String(input);
  const signal = init.signal ?? undefined;
  const abortError = () =>
    signal?.reason ?? new (g.DOMException as typeof DOMExceptionShim)('This operation was aborted', 'AbortError');
  if (signal?.aborted) return Promise.reject(abortError());

  const id = nextFetch++;
  const headers: Record<string, string> = {};
  if (init.headers) {
    const h = init.headers as Record<string, string> | [string, string][];
    for (const [k, v] of Array.isArray(h) ? h : Object.entries(h)) headers[k] = String(v);
  }
  if (init.body != null && typeof init.body !== 'string') {
    return Promise.reject(new TypeError('Only text request bodies are supported on iPhone'));
  }
  return new Promise<MinimalResponse>((resolve, reject) => {
    const onAbort = () => {
      if (!pending.delete(id)) return;
      native().abortFetch(id);
      reject(abortError());
    };
    signal?.addEventListener('abort', onAbort, { once: true });
    pending.set(id, { resolve, reject, cleanup: () => signal?.removeEventListener('abort', onAbort) });
    native().fetch(id, url, (init.method ?? 'GET').toUpperCase(), JSON.stringify(headers), (init.body as string | undefined) ?? '');
  });
}

export const runtime: Runtime = {
  fireTimer(id) {
    const fn = timers.get(id);
    if (!fn) return;
    timers.delete(id);
    fn();
  },
  fetchDone(id, status, statusText, body, error) {
    const p = pending.get(id);
    if (!p) return; // aborted meanwhile
    pending.delete(id);
    p.cleanup();
    if (error !== null && error !== undefined) {
      p.reject(new TypeError(error || 'Network request failed'));
      return;
    }
    p.resolve({ ok: status >= 200 && status < 300, status, statusText, text: () => Promise.resolve(body) });
  },
};
