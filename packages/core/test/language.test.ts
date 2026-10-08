import { describe, expect, it, vi } from 'vitest';
import { encodeWavPcm16 } from '../src/audio/wav';
import { languageMatches, looksLikeUzbekCyrillic } from '../src/detect';
import { DictationError } from '../src/errors';
import { transcribe } from '../src/transcribe';
import { translateText } from '../src/translate';

const audio = encodeWavPcm16(new Float32Array(16_000).fill(0.2), 16_000); // 1 s

const UZ = "Assalomu alaykum! Ertaga soat o'nda uchrashamiz. Iltimos, hujjatlarni olib keling.";
const UZ_CYRL = 'Ассалому алайкум! Эртага соат ўнда учрашамиз. Илтимос, ҳужжатларни олиб келинг.';
const RU = 'Здравствуйте! Встретимся завтра в десять. Пожалуйста, возьмите документы.';
const EN = "Hello! Let's meet tomorrow at ten. Please bring the documents.";

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}
const gemini = (text: string) => json({ candidates: [{ content: { parts: [{ text }] }, finishReason: 'STOP' }] });
const chat = (text: string) => json({ choices: [{ message: { content: text } }] });

type Call = { url: string; body: any };
function mockFetch(answers: Response[]) {
  const calls: Call[] = [];
  const fn = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), body: typeof init?.body === 'string' ? JSON.parse(init.body) : init?.body });
    const next = answers.shift();
    if (!next) throw new Error('unexpected request');
    return next;
  });
  return { fetch: fn as unknown as typeof fetch, calls };
}

describe('languageMatches', () => {
  it('recognises each output language', () => {
    expect(languageMatches(UZ, 'uz-latn')).toBe(true);
    expect(languageMatches(UZ_CYRL, 'uz-cyrl')).toBe(true);
    expect(languageMatches(RU, 'ru')).toBe(true);
    expect(languageMatches(EN, 'en')).toBe(true);
  });

  it('rejects the classic failure: Uzbek back when another language was asked', () => {
    expect(languageMatches(UZ, 'ru')).toBe(false);
    expect(languageMatches(UZ, 'en')).toBe(false);
    expect(languageMatches(UZ, 'uz-cyrl')).toBe(false);
    expect(languageMatches(UZ_CYRL, 'ru')).toBe(false);
    expect(languageMatches(RU, 'uz-latn')).toBe(false);
    expect(languageMatches(RU, 'uz-cyrl')).toBe(false);
    expect(languageMatches(EN, 'uz-latn')).toBe(false);
  });

  it('does not second-guess short or neutral text', () => {
    expect(languageMatches('OK', 'ru')).toBe(true);
    expect(languageMatches('12:30', 'en')).toBe(true);
    expect(languageMatches('Telegram', 'ru')).toBe(true);
    expect(languageMatches('Привет', 'ru')).toBe(true);
    expect(languageMatches('Salom', 'uz-latn')).toBe(true);
  });

  it('tells Uzbek Cyrillic from Russian', () => {
    expect(looksLikeUzbekCyrillic(UZ_CYRL)).toBe(true);
    expect(looksLikeUzbekCyrillic(RU)).toBe(false);
  });
});

describe('transcribe: output language', () => {
  it('translates a known language pair in two steps: exact transcript, then text translation', async () => {
    const { fetch, calls } = mockFetch([gemini(UZ), gemini(RU)]);
    const result = await transcribe({ provider: 'gemini', audio, spoken: 'uz', output: 'ru', apiKey: 'k', fetch });
    expect(result.text).toBe(RU);
    expect(calls).toHaveLength(2);
    expect(calls[0].body.contents[0].parts[0].inlineData).toBeDefined();
    expect(calls[0].body.systemInstruction.parts[0].text).toContain('Latin alphabet');
    expect(calls[1].body.contents[0].parts).toEqual([{ text: UZ }]);
    expect(calls[1].body.systemInstruction.parts[0].text).toContain('Target language: Russian');
    expect(calls[1].url).toContain('gemini-3.5-flash:generateContent');
  });

  it('insists once more when the translation is still in the wrong language', async () => {
    const { fetch, calls } = mockFetch([gemini(UZ), gemini(UZ), gemini(EN)]);
    const result = await transcribe({ provider: 'gemini', audio, spoken: 'uz', output: 'en', apiKey: 'k', fetch });
    expect(result.text).toBe(EN);
    expect(calls).toHaveLength(3);
    expect(calls[2].body.contents[0].parts).toEqual([{ text: UZ }]);
    expect(calls[2].body.systemInstruction.parts[0].text).toContain('a previous answer was not in English');
  });

  it('makes a single request when no translation is needed and the answer is right', async () => {
    const { fetch, calls } = mockFetch([gemini(RU)]);
    const result = await transcribe({ provider: 'gemini', audio, spoken: 'auto', output: 'ru', apiKey: 'k', fetch });
    expect(result.text).toBe(RU);
    expect(calls).toHaveLength(1);
  });

  it('auto mode: translates when the single answer came back in the wrong language', async () => {
    const { fetch, calls } = mockFetch([gemini(UZ), gemini(RU)]);
    const result = await transcribe({ provider: 'gemini', audio, spoken: 'auto', output: 'ru', apiKey: 'k', fetch });
    expect(result.text).toBe(RU);
    expect(calls).toHaveLength(2);
  });

  it('converts Uzbek Cyrillic to Latin locally without another request', async () => {
    const { fetch, calls } = mockFetch([gemini(UZ_CYRL)]);
    const result = await transcribe({ provider: 'gemini', audio, spoken: 'uz', output: 'uz-latn', apiKey: 'k', fetch });
    expect(calls).toHaveLength(1);
    expect(result.text).toBe("Assalomu alaykum! Ertaga soat o'nda uchrashamiz. Iltimos, hujjatlarni olib keling.");
  });

  it('keeps the text when the language fix-up fails (quota), instead of losing the dictation', async () => {
    const quota = () => json({ error: { code: 429, message: 'Resource exhausted', status: 'RESOURCE_EXHAUSTED' } }, 429);
    const { fetch } = mockFetch([gemini(UZ), quota(), quota()]);
    const result = await transcribe({ provider: 'gemini', audio, spoken: 'auto', output: 'ru', apiKey: 'k', fetch });
    expect(result.text).toBe(UZ);
  });

  it('keeps the text when the deadline runs out during the fix-up', async () => {
    let n = 0;
    const fetch = (async (_url: string, init?: RequestInit) => {
      if (n++ === 0) return gemini(UZ);
      return new Promise<Response>((_resolve, reject) => {
        if (init?.signal?.aborted) reject(new DOMException('aborted', 'AbortError'));
        init?.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')));
      });
    }) as unknown as typeof globalThis.fetch;
    const result = await transcribe({ provider: 'gemini', audio, spoken: 'auto', output: 'ru', apiKey: 'k', fetch, timeoutMs: 200 });
    expect(result.text).toBe(UZ);
  });

  it('OpenAI: a translation that came back untranslated gets one strict retry, not a duplicate request', async () => {
    const { fetch, calls } = mockFetch([json({ text: UZ }), chat(UZ), chat(RU)]);
    const result = await transcribe({ provider: 'openai', audio, spoken: 'uz', output: 'ru', apiKey: 'sk', fetch });
    expect(result.text).toBe(RU);
    expect(calls).toHaveLength(3);
    expect(calls[2].body.messages[0].content).toContain('a previous answer was not in Russian');
    expect(calls[2].body.messages[1].content).toBe(UZ);
  });
});

describe('translateText', () => {
  it('translates typed Russian into Uzbek Latin with one Gemini text call', async () => {
    const { fetch, calls } = mockFetch([gemini(UZ.replace("o'nda", 'o‘nda'))]);
    const result = await translateText({ text: `  ${RU}  `, output: 'uz-latn', provider: 'gemini', apiKey: ' k ', fetch });
    expect(result.text).toBe(UZ);
    expect(result.model).toBe('gemini-3.5-flash');
    expect(calls).toHaveLength(1);
    expect(calls[0].body.contents[0].parts[0].text).toBe(RU);
    expect(calls[0].body.systemInstruction.parts[0].text).toContain('Latin alphabet');
  });

  it('retries strictly once when the translation came back untranslated', async () => {
    const { fetch, calls } = mockFetch([gemini(RU), gemini(UZ)]);
    const result = await translateText({ text: RU, output: 'uz-latn', provider: 'gemini', apiKey: 'k', fetch });
    expect(result.text).toBe(UZ);
    expect(calls).toHaveLength(2);
    expect(calls[1].body.contents[0].parts[0].text).toBe(RU);
  });

  it('uses the OpenAI chat model', async () => {
    const { fetch, calls } = mockFetch([chat(EN)]);
    const result = await translateText({ text: UZ, output: 'en', provider: 'openai', apiKey: 'sk', fetch });
    expect(result).toEqual({ text: EN, model: 'gpt-5-mini' });
    expect(calls[0].url).toBe('https://api.openai.com/v1/chat/completions');
    expect(calls[0].body.messages[1].content).toBe(UZ);
  });

  it('reports a failed translation with a translation message, not a recording one', async () => {
    const maxTokens = json({ candidates: [{ content: { parts: [] }, finishReason: 'MAX_TOKENS' }] });
    const { fetch } = mockFetch([maxTokens]);
    await expect(translateText({ text: RU, output: 'uz-latn', provider: 'gemini', apiKey: 'k', fetch })).rejects.toMatchObject({ code: 'translate-failed' });
  });

  it('keeps the first translation when the strict retry fails', async () => {
    const busy = () => json({ error: { code: 503, message: 'overloaded', status: 'UNAVAILABLE' } }, 503);
    const { fetch } = mockFetch([gemini(RU), busy(), busy()]);
    const result = await translateText({ text: RU, output: 'uz-latn', provider: 'gemini', apiKey: 'k', fetch });
    expect(result.text).toBe(RU);
  });

  it('explains empty input, missing key and over-long text in Uzbek', async () => {
    await expect(translateText({ text: '   ', output: 'ru', provider: 'gemini', apiKey: 'k' })).rejects.toMatchObject({ code: 'empty-text' });
    await expect(translateText({ text: 'Salom', output: 'ru', provider: 'gemini', apiKey: '' })).rejects.toMatchObject({ code: 'no-api-key' });
    await expect(translateText({ text: 'a'.repeat(10_001), output: 'ru', provider: 'gemini', apiKey: 'k' })).rejects.toBeInstanceOf(DictationError);
  });
});

describe('transcribe: two-step failures keep the transcript', () => {
  it('returns the transcript when the translation step hits the quota', async () => {
    const quota = () => json({ error: { code: 429, message: 'Resource exhausted', status: 'RESOURCE_EXHAUSTED' } }, 429);
    const { fetch } = mockFetch([gemini(UZ), quota(), quota(), quota(), quota()]);
    const result = await transcribe({ provider: 'gemini', audio, spoken: 'uz', output: 'ru', apiKey: 'k', fetch });
    expect(result.text).toBe(UZ);
  });

  it('returns the transcript when the deadline runs out during the translation step', async () => {
    let n = 0;
    const fetch = (async (_url: string, init?: RequestInit) => {
      if (n++ === 0) return gemini(UZ);
      return new Promise<Response>((_resolve, reject) => {
        if (init?.signal?.aborted) reject(new DOMException('aborted', 'AbortError'));
        init?.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')));
      });
    }) as unknown as typeof globalThis.fetch;
    const result = await transcribe({ provider: 'gemini', audio, spoken: 'uz', output: 'ru', apiKey: 'k', fetch, timeoutMs: 200 });
    expect(result.text).toBe(UZ);
  });

  it('still reports cancellation by the user', async () => {
    const controller = new AbortController();
    let n = 0;
    const fetch = (async (_url: string, init?: RequestInit) => {
      if (n++ === 0) {
        setTimeout(() => controller.abort(), 10);
        return gemini(UZ);
      }
      return new Promise<Response>((_resolve, reject) => {
        if (init?.signal?.aborted) reject(new DOMException('aborted', 'AbortError'));
        init?.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')));
      });
    }) as unknown as typeof globalThis.fetch;
    await expect(
      transcribe({ provider: 'gemini', audio, spoken: 'uz', output: 'ru', apiKey: 'k', fetch, signal: controller.signal }),
    ).rejects.toMatchObject({ code: 'cancelled' });
  });
});

describe('pipeline details (third review)', () => {
  const quota = () => json({ error: { code: 429, message: 'Resource exhausted', status: 'RESOURCE_EXHAUSTED' } }, 429);

  it('asks the first step of a translation not to translate', async () => {
    const { fetch, calls } = mockFetch([gemini(UZ), gemini(RU)]);
    await transcribe({ provider: 'gemini', audio, spoken: 'uz', output: 'ru', apiKey: 'k', fetch });
    const prompt = calls[0].body.systemInstruction.parts[0].text;
    expect(prompt).toContain('Do NOT translate anything');
    expect(prompt).not.toContain('translate it faithfully');
  });

  it('stops after a quota error in the translation step instead of repeating it', async () => {
    const { fetch, calls } = mockFetch([gemini(UZ), quota(), quota()]);
    const result = await transcribe({ provider: 'gemini', audio, spoken: 'uz', output: 'ru', apiKey: 'k', fetch });
    expect(result.text).toBe(UZ);
    expect(calls).toHaveLength(3); // audio + translation on flash + its lite fallback, nothing more
  });

  it('OpenAI keeps the transcript when its translation step fails', async () => {
    const busy = () => json({ error: { message: 'overloaded', type: 'server_error' } }, 503);
    const { fetch } = mockFetch([json({ text: UZ }), busy(), busy(), busy()]);
    const result = await transcribe({ provider: 'openai', audio, spoken: 'uz', output: 'ru', apiKey: 'sk', fetch });
    expect(result.text).toBe(UZ);
  });

  it('OpenAI translates a Russian transcript for Uzbek Latin instead of transliterating it', async () => {
    const { fetch, calls } = mockFetch([json({ text: RU }), chat(UZ)]);
    const result = await transcribe({ provider: 'openai', audio, spoken: 'uz', output: 'uz-latn', apiKey: 'sk', fetch });
    expect(result.text).toBe(UZ);
    expect(calls[1].url).toContain('/chat/completions');
  });

  it('prefers a translation in the right script over a candidate in the wrong one', async () => {
    // auto → ru: Uzbek Latin comes back, and both fix-up answers are Uzbek Cyrillic
    // (still not Russian, but at least Cyrillic): the Cyrillic answer wins.
    const { fetch } = mockFetch([gemini(UZ), gemini(UZ_CYRL), gemini(UZ_CYRL)]);
    const result = await transcribe({ provider: 'gemini', audio, spoken: 'auto', output: 'ru', apiKey: 'k', fetch });
    expect(result.text).toBe(UZ_CYRL);
  });

  it('keeps a candidate in the right script when the fix-up does not help', async () => {
    const { fetch } = mockFetch([gemini(UZ_CYRL), gemini(UZ), gemini(UZ)]);
    const result = await transcribe({ provider: 'gemini', audio, spoken: 'auto', output: 'ru', apiKey: 'k', fetch });
    expect(result.text).toBe(UZ_CYRL);
  });

  it('translateText retries an empty answer once', async () => {
    const empty = json({ candidates: [{ content: { parts: [{ text: '' }] }, finishReason: 'STOP' }] });
    const { fetch, calls } = mockFetch([empty, gemini(UZ)]);
    const result = await translateText({ text: RU, output: 'uz-latn', provider: 'gemini', apiKey: 'k', fetch });
    expect(result.text).toBe(UZ);
    expect(calls).toHaveLength(2);
  });
});
