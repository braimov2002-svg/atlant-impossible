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

let audio = process.argv[2];
if (!audio) {
  audio = path.join(os.tmpdir(), 'ovozyoz-e2e-speech.wav');
  execFileSync(process.execPath, [path.join(root, 'scripts/make-test-audio.mjs'), audio]);
}

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  let file = path.join(outDir, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!file.startsWith(outDir) || !fs.existsSync(file)) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] ?? 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((resolve) => server.listen(0, resolve));
const url = `http://localhost:${server.address().port}/`;

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
    if (mode === 'badkey') {
      return route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ error: { code: 400, message: 'API key not valid. Please pass a valid API key.' } }) });
    }
    const russian = body.systemInstruction.parts[0].text.includes('written in Russian');
    const text = russian ? 'Привет, как дела?' : 'Salom, qalaysan? Bugun havo juda yaxshi.';
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
