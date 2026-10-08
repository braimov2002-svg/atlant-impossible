import { describe, expect, it, vi } from 'vitest';
import { encodeWavPcm16 } from '../src/audio/wav';
import { DictationError, httpError, userMessage } from '../src/errors';
import { EMPTY_SENTINEL, audioSystemPrompt, transcriptionStylePrompt } from '../src/prompt';
import { geminiRequestBody, parseGeminiResponse, thinkingConfig, thinkingLadder } from '../src/providers/gemini';
import { isPromptEcho, reasoningEffort, rewriteNeeded } from '../src/providers/openai';
import { transcribe } from '../src/transcribe';

const audio = encodeWavPcm16(new Float32Array(16_000).fill(0.2), 16_000); // 1 s

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

function geminiAnswer(text: string) {
  return { candidates: [{ content: { parts: [{ text }] }, finishReason: 'STOP' }] };
}

describe('gemini', () => {
  it('sends inline WAV audio with the key in a header', async () => {
    const fetchMock = vi.fn(async (_url: string | URL | Request, _init?: RequestInit) =>
      jsonResponse(geminiAnswer('Salom, dunyo.')),
    );
    const result = await transcribe({
      provider: 'gemini',
      audio,
      spoken: 'uz',
      output: 'uz-latn',
      apiKey: '  AIzaTEST ',
      fetch: fetchMock as unknown as typeof fetch,
    });

    expect(result.text).toBe('Salom, dunyo.');
    expect(result.model).toBe('gemini-3.5-flash');
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toBe(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent',
    );
    expect((init!.headers as Record<string, string>)['x-goog-api-key']).toBe('AIzaTEST');
    const body = JSON.parse(init!.body as string);
    const inline = body.contents[0].parts[0].inlineData;
    expect(inline.mimeType).toBe('audio/wav');
    expect(atob(inline.data).slice(0, 4)).toBe('RIFF');
    expect(body.generationConfig.thinkingConfig).toEqual({ thinkingLevel: 'minimal' });
    expect(body.generationConfig.temperature).toBeUndefined();
  });

  it('describes the requested output language in the prompt', () => {
    const body = geminiRequestBody(
      { audio, spoken: 'uz', output: 'ru', apiKey: 'k' },
      'gemini-3.5-flash',
      thinkingConfig('gemini-3.5-flash'),
    ) as { systemInstruction: { parts: Array<{ text: string }> } };
    const prompt = body.systemInstruction.parts[0].text;
    expect(prompt).toContain('speaks Uzbek');
    expect(prompt).toContain('written in Russian');
    expect(audioSystemPrompt('auto', 'uz-latn')).toContain('Latin alphabet');
    expect(audioSystemPrompt('uz', 'uz-cyrl')).toContain('Cyrillic alphabet');
  });

  it('picks a thinking config per model family', () => {
    expect(thinkingConfig('gemini-2.5-flash-lite')).toEqual({ thinkingBudget: 0 });
    expect(thinkingConfig('gemini-2.5-pro')).toEqual({ thinkingBudget: 128 });
    expect(thinkingConfig('gemini-3.5-flash-lite')).toEqual({ thinkingLevel: 'minimal' });
    expect(thinkingConfig('gemini-flash-latest')).toEqual({ thinkingLevel: 'low' });
    expect(thinkingConfig('gemini-3.8-flash')).toEqual({ thinkingLevel: 'low' });
    expect(thinkingConfig('gemini-3.5-flash')).toEqual({ thinkingLevel: 'minimal' });
    expect(thinkingConfig('gemini-3.5-pro')).toEqual({ thinkingLevel: 'low' });
    expect(thinkingConfig('gemini-3.6-flash')).toEqual({ thinkingLevel: 'minimal' });
    expect(thinkingLadder('gemini-3.5-flash')).toEqual([{ thinkingLevel: 'minimal' }, { thinkingLevel: 'low' }, undefined]);
    expect(thinkingConfig('gemini-2.0-flash')).toBeUndefined();
    const old = geminiRequestBody({ audio, spoken: 'uz', output: 'en', apiKey: 'k' }, 'gemini-2.5-flash', undefined) as {
      generationConfig: Record<string, unknown>;
    };
    expect(old.generationConfig.temperature).toBe(0);
  });

  it('falls back to the latest alias when a model was retired', async () => {
    const urls: string[] = [];
    const fetchMock = vi.fn(async (url: string | URL | Request) => {
      urls.push(String(url));
      if (String(url).includes('gemini-2.5-flash')) {
        return jsonResponse({ error: { code: 404, message: 'models/gemini-2.5-flash is not found', status: 'NOT_FOUND' } }, 404);
      }
      return jsonResponse(geminiAnswer('Salom'));
    });
    const result = await transcribe({
      provider: 'gemini', audio, spoken: 'uz', output: 'uz-latn', apiKey: 'k', model: 'gemini-2.5-flash',
      fetch: fetchMock as never,
    });
    expect(result.text).toBe('Salom');
    expect(result.model).toBe('gemini-flash-latest');
    expect(urls[1]).toContain('/models/gemini-flash-latest:generateContent');
  });

  it('walks the thinking ladder when a model rejects a level', async () => {
    const bodies: Array<Record<string, any>> = [];
    const fetchMock = vi.fn(async (_url: string | URL | Request, init?: RequestInit) => {
      const body = JSON.parse(init!.body as string);
      bodies.push(body);
      if (body.generationConfig.thinkingConfig) {
        return jsonResponse({ error: { code: 400, message: 'thinking_level is not supported for this model.' } }, 400);
      }
      return jsonResponse(geminiAnswer('Salom'));
    });
    const result = await transcribe({
      provider: 'gemini', audio, spoken: 'uz', output: 'uz-latn', apiKey: 'k', fetch: fetchMock as never,
    });
    expect(result.text).toBe('Salom');
    expect(bodies.map((b) => b.generationConfig.thinkingConfig)).toEqual([
      { thinkingLevel: 'minimal' },
      { thinkingLevel: 'low' },
      undefined,
    ]);
  });

  it('moves to Flash-Lite when the free quota is used up', async () => {
    const urls: string[] = [];
    const fetchMock = vi.fn(async (url: string | URL | Request) => {
      urls.push(String(url));
      if (!String(url).includes('lite')) return jsonResponse({ error: { code: 429, message: 'Resource exhausted' } }, 429);
      return jsonResponse(geminiAnswer('Salom'));
    });
    const result = await transcribe({
      provider: 'gemini', audio, spoken: 'uz', output: 'uz-latn', apiKey: 'k', fetch: fetchMock as never,
    });
    expect(result.model).toBe('gemini-3.5-flash-lite');
    expect(urls).toHaveLength(2);
  });

  it('explains unsupported languages and truncated answers', () => {
    expect(() => parseGeminiResponse({ candidates: [{ finishReason: 'LANGUAGE' }] })).toThrow('unsupported-language');
    expect(() => parseGeminiResponse({ candidates: [{ finishReason: 'MAX_TOKENS' }] })).toThrow('too-long');
    const body = geminiRequestBody({ audio, spoken: 'uz', output: 'en', apiKey: 'k' }, 'gemini-3.5-flash', undefined) as {
      generationConfig: { maxOutputTokens: number };
    };
    expect(body.generationConfig.maxOutputTokens).toBeGreaterThanOrEqual(32768);
  });

  it('explains region blocks', async () => {
    const fetchMock = vi.fn(async () =>
      jsonResponse({ error: { code: 400, message: 'User location is not supported for the API use.', status: 'FAILED_PRECONDITION' } }, 400),
    );
    const error = await transcribe({
      provider: 'gemini', audio, spoken: 'uz', output: 'uz-latn', apiKey: 'k', fetch: fetchMock as never,
    }).catch((e) => e);
    expect(error.code).toBe('region');
    expect(userMessage(error)).toContain('hududingizda');
  });

  it('ignores thought parts and reports blocks', () => {
    expect(
      parseGeminiResponse({
        candidates: [{ content: { parts: [{ text: 'thinking...', thought: true }, { text: 'Matn' }] } }],
      }),
    ).toBe('Matn');
    expect(() => parseGeminiResponse({ promptFeedback: { blockReason: 'SAFETY' } })).toThrow(DictationError);
    expect(() => parseGeminiResponse({ candidates: [{ finishReason: 'PROHIBITED_CONTENT' }] })).toThrow(
      'blocked',
    );
  });

  it('maps an invalid key (HTTP 400) to invalid-api-key', async () => {
    const fetchMock = vi.fn(async () =>
      jsonResponse({ error: { code: 400, message: 'API key not valid. Please pass a valid API key.' } }, 400),
    );
    const error = await transcribe({
      provider: 'gemini', audio, spoken: 'uz', output: 'uz-latn', apiKey: 'bad',
      fetch: fetchMock as unknown as typeof fetch,
    }).catch((e) => e);
    expect(error).toBeInstanceOf(DictationError);
    expect(error.code).toBe('invalid-api-key');
    expect(userMessage(error)).toContain('API kalit');
  });

  it('tells region blocks and model access apart from bad keys', () => {
    expect(httpError(403, 'Country, region, or territory not supported').code).toBe('region');
    expect(httpError(403, 'Project proj_1 does not have access to model gpt-transcribe').code).toBe('provider');
    expect(httpError(403, 'Incorrect API key provided').code).toBe('invalid-api-key');
    expect(httpError(401, undefined).code).toBe('invalid-api-key');
  });

  it('maps 429 to quota and network failures to network', async () => {
    const quota = vi.fn(async () => jsonResponse({ error: { message: 'Resource exhausted' } }, 429));
    await expect(
      transcribe({ provider: 'gemini', audio, spoken: 'uz', output: 'en', apiKey: 'k', fetch: quota as never }),
    ).rejects.toMatchObject({ code: 'quota' });

    const offline = vi.fn(async () => {
      throw new TypeError('Failed to fetch');
    });
    await expect(
      transcribe({ provider: 'gemini', audio, spoken: 'uz', output: 'en', apiKey: 'k', fetch: offline as never }),
    ).rejects.toMatchObject({ code: 'network' });
  });

  it('turns the empty sentinel into empty-result', async () => {
    const fetchMock = vi.fn(async () => jsonResponse(geminiAnswer(EMPTY_SENTINEL)));
    await expect(
      transcribe({ provider: 'gemini', audio, spoken: 'uz', output: 'uz-latn', apiKey: 'k', fetch: fetchMock as never }),
    ).rejects.toMatchObject({ code: 'empty-result' });
  });

  it('normalises Uzbek apostrophes only for Uzbek Latin output', async () => {
    const answer = 'O‘zbek tili go’zal';
    const fetchMock = vi.fn(async () => jsonResponse(geminiAnswer(answer)));
    const uz = await transcribe({
      provider: 'gemini', audio, spoken: 'uz', output: 'uz-latn', apiKey: 'k', fetch: fetchMock as never,
    });
    expect(uz.text).toBe("O'zbek tili go'zal");
    const official = await transcribe({
      provider: 'gemini', audio, spoken: 'uz', output: 'uz-latn', apiKey: 'k', apostrophes: 'official',
      fetch: fetchMock as never,
    });
    expect(official.text).toBe('Oʻzbek tili goʻzal');
    const en = await transcribe({
      provider: 'gemini', audio, spoken: 'uz', output: 'en', apiKey: 'k', fetch: fetchMock as never,
    });
    expect(en.text).toBe(answer);
  });
});

describe('openai', () => {
  it('transcribes with a language hint and skips translation when not needed', async () => {
    const fetchMock = vi.fn(async (url: string | URL | Request, _init?: RequestInit) => {
      expect(String(url)).toBe('https://api.openai.com/v1/audio/transcriptions');
      return jsonResponse({ text: "Bugun havo yaxshi." });
    });
    const result = await transcribe({
      provider: 'openai', audio, spoken: 'uz', output: 'uz-latn', apiKey: 'sk-test', fetch: fetchMock as never,
    });
    expect(result.text).toBe('Bugun havo yaxshi.');
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const init = fetchMock.mock.calls[0][1]!;
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer sk-test');
    const form = init.body as FormData;
    expect(form.get('model')).toBe('gpt-transcribe');
    expect(form.get('languages[]')).toBe('uz');
    expect(form.has('language')).toBe(false);
    expect(String(form.get('prompt'))).toContain("O'zbekiston");
    expect((form.get('file') as File).type).toBe('audio/wav');
  });

  it('translates with a chat model when the output language differs', async () => {
    const fetchMock = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
      if (String(url).endsWith('/audio/transcriptions')) return jsonResponse({ text: 'Salom, qalaysan?' });
      const body = JSON.parse(init!.body as string);
      expect(body.model).toBe('gpt-5-mini');
      expect(body.reasoning_effort).toBe('minimal');
      expect(body.temperature).toBeUndefined();
      expect(body.messages[0].content).toContain('English');
      expect(body.messages[1].content).toBe('Salom, qalaysan?');
      return jsonResponse({ choices: [{ message: { content: 'Hi, how are you?' } }] });
    });
    const result = await transcribe({
      provider: 'openai', audio, spoken: 'uz', output: 'en', apiKey: 'sk', fetch: fetchMock as never,
    });
    expect(result.text).toBe('Hi, how are you?');
    expect(result.model).toBe('gpt-transcribe + gpt-5-mini');
  });

  it('transliterates a Cyrillic Uzbek transcript locally', async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ text: 'Ўзбекистон гўзал' }));
    const result = await transcribe({
      provider: 'openai', audio, spoken: 'uz', output: 'uz-latn', apiKey: 'sk', fetch: fetchMock as never,
    });
    expect(result.text).toBe("O'zbekiston go'zal");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('sends languages[] for gpt-transcribe and retries without a rejected language', async () => {
    const forms: FormData[] = [];
    let rewrites = 0;
    const fetchMock = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
      if (String(url).endsWith('/chat/completions')) {
        rewrites++;
        return jsonResponse({ choices: [{ message: { content: 'Salom' } }] });
      }
      const form = init!.body as FormData;
      forms.push(form);
      if (form.has('languages[]')) {
        return jsonResponse({ error: { message: "Unsupported language 'uz' in languages", param: 'languages' } }, 400);
      }
      return jsonResponse({ text: 'Привет' });
    });
    const result = await transcribe({
      provider: 'openai', audio, spoken: 'uz', output: 'uz-latn', apiKey: 'sk', model: 'gpt-transcribe',
      fetch: fetchMock as never,
    });
    // Without the hint the model answered in Russian, so the text model fixes it.
    expect(result.text).toBe('Salom');
    expect(rewrites).toBe(1);
    expect(forms).toHaveLength(2);
    expect(forms[0].get('languages[]')).toBe('uz');
    expect(forms[0].has('language')).toBe(false);
    expect(forms[1].has('languages[]')).toBe(false);
  });

  it('sends the single language field for older models', async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ text: 'Salom' }));
    await transcribe({
      provider: 'openai', audio, spoken: 'uz', output: 'uz-latn', apiKey: 'sk', model: 'gpt-4o-transcribe',
      fetch: fetchMock as never,
    });
    const form = (fetchMock.mock.calls[0] as unknown as [string, RequestInit])[1].body as FormData;
    expect(form.get('language')).toBe('uz');
    expect(form.has('languages[]')).toBe(false);
  });

  it('does not retry other 400 errors', async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ error: { message: 'Invalid file format.' } }, 400));
    await expect(
      transcribe({ provider: 'openai', audio, spoken: 'uz', output: 'uz-latn', apiKey: 'sk', fetch: fetchMock as never }),
    ).rejects.toMatchObject({ code: 'provider' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('sends the lowest reasoning effort each text model accepts', async () => {
    expect(reasoningEffort('gpt-5-mini')).toBe('minimal');
    expect(reasoningEffort('gpt-6-luna')).toBe('none');
    expect(reasoningEffort('gpt-4.1-mini')).toBeUndefined();
    const bodies: Array<Record<string, any>> = [];
    const fetchMock = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
      if (String(url).endsWith('/audio/transcriptions')) return jsonResponse({ text: 'Salom' });
      const body = JSON.parse(init!.body as string);
      bodies.push(body);
      if (body.reasoning_effort) return jsonResponse({ error: { message: "Unsupported value: 'reasoning_effort'" } }, 400);
      return jsonResponse({ choices: [{ message: { content: 'Hello' } }] });
    });
    const result = await transcribe({
      provider: 'openai', audio, spoken: 'uz', output: 'en', apiKey: 'sk', fetch: fetchMock as never,
    });
    expect(result.text).toBe('Hello');
    expect(bodies.map((b) => b.reasoning_effort)).toEqual(['minimal', undefined]);
  });

  it('drops a transcript that only echoes the style prompt', async () => {
    const echo = "Assalomu alaykum. Bugun havo juda yaxshi, ko'chaga chiqamiz. O'zbekiston, g'alaba, ma'no.";
    expect(isPromptEcho(echo, transcriptionStylePrompt('uz', 'uz-latn'))).toBe(true);
    expect(isPromptEcho('Salom', transcriptionStylePrompt('uz', 'uz-latn'))).toBe(false);
    expect(isPromptEcho('Bugun havo juda yaxshi', transcriptionStylePrompt('uz', 'uz-latn'))).toBe(false);
    const fetchMock = vi.fn(async () => jsonResponse({ text: echo }));
    await expect(
      transcribe({ provider: 'openai', audio, spoken: 'uz', output: 'uz-latn', apiKey: 'sk', fetch: fetchMock as never }),
    ).rejects.toMatchObject({ code: 'empty-result' });
  });

  it('only uses the Uzbek style example when Uzbek text is expected', () => {
    expect(transcriptionStylePrompt('auto', 'ru')).toBeUndefined();
    expect(transcriptionStylePrompt('auto', 'uz-latn')).toContain("O'zbekiston");
    expect(transcriptionStylePrompt('ru', 'uz-latn')).toBeUndefined();
  });

  it('decides when a rewrite is needed', () => {
    expect(rewriteNeeded({ spoken: 'auto', output: 'uz-latn' }, 'Salom')).toBe('model');
    expect(rewriteNeeded({ spoken: 'uz', output: 'ru' }, 'Salom')).toBe('model');
    expect(rewriteNeeded({ spoken: 'ru', output: 'ru' }, 'Привет')).toBe('none');
    expect(rewriteNeeded({ spoken: 'uz', output: 'uz-cyrl' }, 'Salom')).toBe('model');
    expect(rewriteNeeded({ spoken: 'uz', output: 'uz-cyrl' }, 'Салом')).toBe('none');
    expect(rewriteNeeded({ spoken: 'uz', output: 'uz-latn' }, 'Men Петров bilan gaplashdim')).toBe('local-latin');
    expect(rewriteNeeded({ spoken: 'uz', output: 'uz-latn' }, 'Salom', true)).toBe('model');
  });
});

describe('transcribe validation', () => {
  it('requires a key and a usable recording', async () => {
    const base = { provider: 'gemini' as const, spoken: 'uz' as const, output: 'uz-latn' as const };
    await expect(transcribe({ ...base, audio, apiKey: ' ' })).rejects.toMatchObject({ code: 'no-api-key' });
    await expect(
      transcribe({ ...base, audio: encodeWavPcm16(new Float32Array(1000), 16_000), apiKey: 'k' }),
    ).rejects.toMatchObject({ code: 'too-short' });
    await expect(transcribe({ ...base, audio: new Uint8Array(10), apiKey: 'k' })).rejects.toBeInstanceOf(
      DictationError,
    );
  });

  it('times out slow providers', async () => {
    const slow = vi.fn(
      (_url: string, init?: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () =>
            reject(Object.assign(new Error('aborted'), { name: 'AbortError' })),
          );
        }),
    );
    await expect(
      transcribe({
        provider: 'gemini', audio, spoken: 'uz', output: 'uz-latn', apiKey: 'k', timeoutMs: 20, fetch: slow as never,
      }),
    ).rejects.toMatchObject({ code: 'timeout' });
  });

  it('reports user cancellation', async () => {
    const controller = new AbortController();
    const hang = vi.fn(
      (_url: string, init?: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () =>
            reject(Object.assign(new Error('aborted'), { name: 'AbortError' })),
          );
        }),
    );
    const pending = transcribe({
      provider: 'gemini', audio, spoken: 'uz', output: 'uz-latn', apiKey: 'k', signal: controller.signal,
      fetch: hang as never,
    });
    controller.abort();
    await expect(pending).rejects.toMatchObject({ code: 'cancelled' });
  });
});
