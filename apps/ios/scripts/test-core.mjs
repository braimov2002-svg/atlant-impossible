// Runs ovozyoz-core.js the way the iPhone runs it: in a bare JavaScript
// context with no web APIs at all (no fetch, timers, AbortController, atob,
// console), only the __oy natives that Swift provides — here implemented in
// Node with a mocked Gemini. Usage: node apps/ios/scripts/test-core.mjs [bundle]
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ios = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const bundlePath = process.argv[2] ?? path.join(ios, 'OvozYoz/Shared/Resources/ovozyoz-core.js');
const code = fs.readFileSync(bundlePath, 'utf8');

const UZ = "Salom, qalaysan? Bugun havo juda yaxshi.";
const RU = 'Привет, как дела? Сегодня очень хорошая погода.';

function wav(seconds = 1, rate = 16_000) {
  const samples = Math.round(seconds * rate);
  const buf = Buffer.alloc(44 + samples * 2);
  buf.write('RIFF', 0, 'ascii');
  buf.writeUInt32LE(36 + samples * 2, 4);
  buf.write('WAVEfmt ', 8, 'ascii');
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(rate, 24);
  buf.writeUInt32LE(rate * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write('data', 36, 'ascii');
  buf.writeUInt32LE(samples * 2, 40);
  for (let i = 0; i < samples; i++) buf.writeInt16LE(Math.round(Math.sin(i / 8) * 8000), 44 + i * 2);
  return buf;
}

/** A fresh bare context, like a new JSContext. `respond` plays Gemini. */
function makeContext(respond) {
  const requests = [];
  const results = new Map();
  const timers = new Map();
  const fetches = new Map();
  const logs = [];
  let context;
  const runtime = () => context.OvozYozRuntime;
  const oy = {
    setTimeout(id, ms) {
      timers.set(id, setTimeout(() => { timers.delete(id); runtime().fireTimer(id); }, ms));
    },
    clearTimeout(id) {
      clearTimeout(timers.get(id));
      timers.delete(id);
    },
    fetch(id, url, method, headersJson, body) {
      const req = { id, url, method, headers: JSON.parse(headersJson), body: body ? JSON.parse(body) : undefined };
      requests.push(req);
      const answer = respond(req, requests.length);
      if (answer === 'hang') { fetches.set(id, 'hang'); return; }
      const t = setTimeout(() => {
        fetches.delete(id);
        if (answer.error) runtime().fetchDone(id, 0, '', '', answer.error);
        else runtime().fetchDone(id, answer.status ?? 200, 'OK', JSON.stringify(answer.json), null);
      }, 5);
      fetches.set(id, t);
    },
    abortFetch(id) {
      const t = fetches.get(id);
      if (t && t !== 'hang') clearTimeout(t);
      fetches.delete(id);
    },
    done(callId, json) {
      results.get(callId)?.(JSON.parse(json));
    },
    log(message) {
      logs.push(message);
    },
  };
  context = vm.createContext({ __oy: oy });
  // V8 puts its own console into every context; JavaScriptCore may not.
  vm.runInContext('delete globalThis.console', context);
  // Prove the context really is bare, like JavaScriptCore.
  for (const name of ['fetch', 'setTimeout', 'AbortController', 'atob', 'btoa', 'console', 'TextEncoder', 'DOMException']) {
    if (vm.runInContext(`typeof ${name}`, context) !== 'undefined') throw new Error(`context is not bare: ${name}`);
  }
  vm.runInContext(code, context, { filename: 'ovozyoz-core.js' });
  let nextCall = 1;
  const call = (method, ...args) => {
    const id = nextCall++;
    const promise = new Promise((resolve) => results.set(id, resolve));
    context.OvozYoz[method](id, ...args);
    return { id, promise };
  };
  return { context, requests, call, logs, pendingTimers: () => timers.size, pendingFetches: () => fetches.size };
}

const gemini = (text) => ({ json: { candidates: [{ content: { parts: [{ text }] }, finishReason: 'STOP' }] } });
const isAudio = (req) => !!req.body?.contents?.[0]?.parts?.[0]?.inlineData;
const target = (req) => req.body?.systemInstruction?.parts?.[0]?.text ?? '';

let failed = 0;
async function test(name, fn) {
  try {
    await fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    failed++;
    console.log(`FAIL ${name}: ${error?.stack ?? error}`);
  }
}
function assert(cond, message) {
  if (!cond) throw new Error(message);
}
const opts = (o) => JSON.stringify({ apiKey: 'AIza-TEST', ...o });

await test('info lists the output languages', async () => {
  const { context } = makeContext(() => gemini(UZ));
  const info = JSON.parse(context.OvozYoz.info());
  assert(info.outputs.map((o) => o.id).join() === 'uz-latn,uz-cyrl,ru,en', JSON.stringify(info.outputs));
  assert(info.outputs.find((o) => o.id === 'ru').into === 'ruschaga', 'dative name');
  assert(info.maxTranslateChars === 10_000, 'limit');
});

await test('Uzbek speech → Russian in two steps', async () => {
  const audio = wav(1.2);
  const { call, requests } = makeContext((req) => gemini(isAudio(req) ? UZ : target(req).includes('Target language: Russian') ? RU : UZ));
  const result = await call('transcribe', audio.toString('base64'), opts({ spoken: 'uz', output: 'ru' })).promise;
  assert(result.ok && result.text === RU && result.languageOk === true, JSON.stringify(result));
  assert(requests.length === 2, `${requests.length} requests`);
  assert(requests[0].headers['x-goog-api-key'] === 'AIza-TEST', 'key header');
  assert(requests[0].method === 'POST' && /models\/[\w.-]+:generateContent$/.test(requests[0].url), requests[0].url);
  const inline = requests[0].body.contents[0].parts[0].inlineData;
  assert(inline.mimeType === 'audio/wav' && inline.data === audio.toString('base64'), 'audio survives base64 → bytes → base64 unchanged');
});

await test('typed Russian → Uzbek Latin', async () => {
  const { call, requests } = makeContext(() => gemini(UZ));
  const result = await call('translate', RU, opts({ output: 'uz-latn' })).promise;
  assert(result.ok && result.text === UZ && result.languageOk, JSON.stringify(result));
  assert(requests.length === 1 && requests[0].body.contents[0].parts[0].text === RU, 'one text request');
});

await test('wrong language is flagged with a warning', async () => {
  const { call } = makeContext(() => gemini(UZ));
  const result = await call('transcribe', wav().toString('base64'), opts({ spoken: 'uz', output: 'ru' })).promise;
  assert(result.ok && result.text === UZ && result.languageOk === false, JSON.stringify(result));
  assert(result.warning === "Ruschaga o'girib bo'lmadi.", result.warning);
});

await test('bad key → Uzbek message', async () => {
  const { call } = makeContext(() => ({ status: 400, json: { error: { code: 400, message: 'API key not valid. Please pass a valid API key.' } } }));
  const result = await call('translate', RU, opts({ output: 'uz-latn' })).promise;
  assert(!result.ok && result.code === 'invalid-api-key' && /kalit/.test(result.message), JSON.stringify(result));
});

await test('network failure → network', async () => {
  const { call } = makeContext(() => ({ error: 'The Internet connection appears to be offline.' }));
  const result = await call('translate', RU, opts({ output: 'uz-latn' })).promise;
  assert(!result.ok && result.code === 'network', JSON.stringify(result));
});

await test('cancel stops a hanging request', async () => {
  const ctx = makeContext(() => 'hang');
  const { id, promise } = ctx.call('transcribe', wav().toString('base64'), opts({ spoken: 'uz', output: 'ru' }));
  setTimeout(() => ctx.context.OvozYoz.cancel(id), 30);
  const result = await promise;
  assert(!result.ok && result.code === 'cancelled', JSON.stringify(result));
  assert(ctx.pendingFetches() === 0, 'native request aborted');
});

await test('deadline → timeout, no timers left behind', async () => {
  const ctx = makeContext(() => 'hang');
  const result = await ctx.call('transcribe', wav().toString('base64'), opts({ spoken: 'uz', output: 'ru', timeoutMs: 150 })).promise;
  assert(!result.ok && result.code === 'timeout', JSON.stringify(result));
  await new Promise((r) => setTimeout(r, 20));
  assert(ctx.pendingTimers() === 0, `${ctx.pendingTimers()} timers left`);
});

await test('a too-short recording is explained without a request', async () => {
  const { call, requests } = makeContext(() => gemini(UZ));
  const result = await call('transcribe', wav(0.1).toString('base64'), opts({ spoken: 'uz', output: 'uz-latn' })).promise;
  assert(!result.ok && result.code === 'too-short' && requests.length === 0, JSON.stringify(result));
});

await test('bad options never leave Swift waiting', async () => {
  const { call } = makeContext(() => gemini(UZ));
  const result = await call('translate', RU, '{not json').promise;
  assert(!result.ok && typeof result.message === 'string', JSON.stringify(result));
  const unknown = await call('translate', RU, opts({ output: 'de' })).promise;
  assert(!unknown.ok, JSON.stringify(unknown));
});

await test('message() maps codes to Uzbek', async () => {
  const { context } = makeContext(() => gemini(UZ));
  assert(context.OvozYoz.message('no-api-key').includes('kalit'), 'no-api-key');
  assert(typeof context.OvozYoz.message('something-else') === 'string', 'unknown code');
});

if (failed) {
  console.log(`${failed} failed`);
  process.exit(1);
}
console.log('all passed');
