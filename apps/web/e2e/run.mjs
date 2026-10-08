// End-to-end test of the static web build in Chromium with a fake microphone
// and a mocked Gemini API. Run after `npm run build:web`:
//   node apps/web/e2e/run.mjs [path/to/speech.wav]
// CHROMIUM_PATH can point at a preinstalled Chromium binary.
import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../..');
const outDir = path.join(root, 'apps/web/out');
const shots = process.env.E2E_SCREENSHOTS;
// Serve under a sub-path to mimic GitHub Pages (build with the same NEXT_PUBLIC_BASE_PATH).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

let audio = process.argv[2];
if (!audio) {
  audio = path.join(os.tmpdir(), 'ovozyoz-e2e-speech.wav');
  execFileSync(process.execPath, [path.join(root, 'scripts/make-test-audio.mjs'), audio]);
}

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (basePath && !pathname.startsWith(`${basePath}/`)) {
    res.writeHead(404).end();
    return;
  }
  let file = path.join(outDir, pathname.slice(basePath.length));
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!file.startsWith(outDir) || !fs.existsSync(file)) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] ?? 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((resolve) => server.listen(0, resolve));
const url = `http://localhost:${server.address().port}${basePath}/`;

const results = [];
const check = (name, ok, extra = '') => results.push(`${ok ? 'PASS' : 'FAIL'} ${name} ${extra}`.trim());

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', `--use-file-for-fake-audio-capture=${audio}`],
});
try {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    permissions: ['microphone', 'clipboard-read', 'clipboard-write'],
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));

  const requests = [];
  let mode = 'ok';
  await page.route('https://generativelanguage.googleapis.com/**', async (route) => {
    const body = JSON.parse(route.request().postData());
    requests.push({ url: route.request().url(), headers: route.request().headers(), body });
    if (mode === 'offline') return route.abort('internetdisconnected');
    if (mode === 'badkey') {
      return route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ error: { code: 400, message: 'API key not valid. Please pass a valid API key.' } }) });
    }
    const system = body.systemInstruction.parts[0].text;
    const textOnly = !body.contents[0].parts.some((part) => part.inlineData);
    let text;
    if (textOnly) {
      // translation step / translate box
      text = system.includes('Target language: Russian')
        ? 'Привет, как дела? Сегодня очень хорошая погода.'
        : system.includes('Target language: English')
          ? 'Hello, how are you? The weather is very nice today.'
          : 'Salom, qalaysan? Bugun havo juda yaxshi.';
    } else if (mode === 'stubborn') {
      // the model ignores the requested language and just transcribes Uzbek
      text = 'Salom, qalaysan? Bugun havo juda yaxshi.';
    } else {
      text = system.includes('written in Russian') ? 'Привет, как дела?' : 'Salom, qalaysan? Bugun havo juda yaxshi.';
    }
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ candidates: [{ content: { parts: [{ text }] }, finishReason: 'STOP' }] }) });
  });

  const record = async (ms) => {
    await page.getByRole('button', { name: 'Yozishni boshlash' }).click();
    await page.getByRole('button', { name: "Yozishni to'xtatish" }).waitFor({ timeout: 10_000 });
    await page.waitForTimeout(ms);
    await page.getByRole('button', { name: "Yozishni to'xtatish" }).click();
  };

  await page.goto(url);
  await page.getByText('Boshlash uchun bitta API kalit kerak.').waitFor();
  check('first run asks for a key', true);

  await page.getByRole('button', { name: 'Yozishni boshlash' }).click();
  await page.getByRole('dialog', { name: 'Sozlamalar' }).waitFor();
  check('mic without key opens settings', true);
  await page.fill('#api-key', 'AIzaE2E-TEST-KEY');
  await page.getByRole('button', { name: 'Saqlash' }).click();
  await page.getByRole('dialog').waitFor({ state: 'detached' });

  await record(2500);
  await page.waitForFunction(() => document.querySelector('#result')?.value.length > 0, null, { timeout: 15_000 });
  const uz = await page.inputValue('#result');
  check('uzbek text shown', uz === 'Salom, qalaysan? Bugun havo juda yaxshi.', JSON.stringify(uz));
  const req = requests[0];
  check('gemini endpoint', /\/v1beta\/models\/[\w.-]+:generateContent$/.test(req.url), req.url);
  check('key header', req.headers['x-goog-api-key'] === 'AIzaE2E-TEST-KEY');
  const inline = req.body.contents[0].parts[0].inlineData;
  const wav = Buffer.from(inline.data, 'base64');
  const rate = wav.readUInt32LE(24);
  const seconds = wav.readUInt32LE(40) / (rate * 2);
  check('16 kHz mono wav', inline.mimeType === 'audio/wav' && wav.toString('ascii', 0, 4) === 'RIFF' && rate === 16_000 && wav.readUInt16LE(22) === 1, `${rate}Hz`);
  check('recording length', seconds > 1.8 && seconds < 5, `${seconds.toFixed(2)}s`);
  const clip = await page.evaluate(() => navigator.clipboard.readText().catch((e) => `ERR ${e.message}`));
  check('auto-copied', clip === uz, JSON.stringify(clip));
  if (shots) await page.screenshot({ path: path.join(shots, 'web-result.png') });

  await page.getByRole('radio', { name: /RU/ }).click();
  await record(1500);
  await page.waitForFunction(() => document.querySelector('#result')?.value.startsWith('Привет'), null, { timeout: 15_000 });
  check('russian output', requests[1].body.systemInstruction.parts[0].text.includes('written in Russian'));
  check('history kept', (await page.locator('main ul li').count()) === 2);

  await page.reload();
  await page.getByText('Oldingi yozuvlar').waitFor();
  check('settings persisted', (await page.getByRole('radio', { name: /RU/ }).getAttribute('aria-checked')) === 'true');

  mode = 'offline';
  await record(1500);
  await page.getByText("Internetga ulanib bo'lmadi. Aloqani tekshiring.").waitFor({ timeout: 10_000 });
  const retryButton = page.getByRole('button', { name: /Qayta urinish/ });
  await retryButton.waitFor({ timeout: 5_000 });
  check('offline keeps the recording for a retry', true);
  mode = 'ok';
  const before = requests.length;
  await retryButton.click();
  await page.waitForFunction(() => document.querySelector('#result')?.value.startsWith('Привет'), null, { timeout: 15_000 });
  check('retry re-sends the same audio', requests.length === before + 1 && requests.at(-1).body.contents[0].parts[0].inlineData.data === requests.at(-2).body.contents[0].parts[0].inlineData.data);
  check('retry button gone after success', (await retryButton.count()) === 0);

  // The model ignores "write Russian": the app must translate in a second step.
  mode = 'stubborn';
  const beforeStubborn = requests.length;
  await record(1200);
  await page.waitForFunction(() => document.querySelector('#result')?.value.startsWith('Привет, как дела? Сегодня'), null, { timeout: 15_000 });
  const stubborn = requests.slice(beforeStubborn);
  check(
    'wrong-language answer is translated',
    stubborn.length === 2 && !!stubborn[0].body.contents[0].parts[0].inlineData && !stubborn[1].body.contents[0].parts[0].inlineData,
    `${stubborn.length} requests`,
  );
  mode = 'ok';

  // Typed text translation: Russian in, Uzbek out.
  await page.getByRole('radio', { name: /^UZ/ }).click();
  await page.fill('#translate-input', 'Привет, как дела?');
  const beforeTranslate = requests.length;
  await page.getByRole('button', { name: /Tarjima qilish/ }).click();
  await page.waitForFunction(() => document.querySelector('#result')?.value === 'Salom, qalaysan? Bugun havo juda yaxshi.', null, { timeout: 15_000 });
  const tr = requests[beforeTranslate];
  check(
    'text translation',
    requests.length === beforeTranslate + 1 && tr.body.contents[0].parts[0].text === 'Привет, как дела?' && tr.body.systemInstruction.parts[0].text.includes('Latin alphabet'),
  );
  const trClip = await page.evaluate(() => navigator.clipboard.readText().catch(() => ''));
  check('translation auto-copied', trClip === 'Salom, qalaysan? Bugun havo juda yaxshi.', JSON.stringify(trClip));
  await page.getByRole('radio', { name: /^RU/ }).click();

  mode = 'badkey';
  await record(1200);
  await page.getByText("API kalit noto'g'ri yoki bloklangan. Sozlamalarni tekshiring.").waitFor({ timeout: 10_000 });
  check('bad key explained in Uzbek', true);
  check('no page errors', errors.length === 0, errors.join(' | '));
} catch (error) {
  results.push(`FAIL exception ${error.stack}`);
} finally {
  await browser.close();
  server.close();
}

console.log(results.join('\n'));
process.exit(results.some((r) => r.startsWith('FAIL')) ? 1 : 0);
