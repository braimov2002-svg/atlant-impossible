// Electron smoke test: runs the real app (tray, HUD, IPC, recording, paste)
// against a fake microphone file and a mocked Gemini API.
// Build + run: node scripts/smoke.mjs   (needs a display, e.g. xvfb-run)
import { app, clipboard } from 'electron';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { startApp } from '../../src/main/index';

const out = process.env.SMOKE_OUT ?? path.join(os.tmpdir(), 'ovozyoz-smoke');
const audioFile = process.env.SMOKE_AUDIO;
fs.mkdirSync(out, { recursive: true });

app.disableHardwareAcceleration();
app.commandLine.appendSwitch('use-fake-ui-for-media-stream');
app.commandLine.appendSwitch('use-fake-device-for-media-stream');
if (audioFile) app.commandLine.appendSwitch('use-file-for-fake-audio-capture', audioFile);

const userData = fs.mkdtempSync(path.join(os.tmpdir(), 'ovozyoz-userdata-'));
app.setPath('userData', userData);
fs.writeFileSync(path.join(userData, 'keys.json'), JSON.stringify({ gemini: { encrypted: false, value: 'AIzaSyD-SMOKE-TEST-KEY-1234567890abcdef' } }));
fs.writeFileSync(
  path.join(userData, 'settings.json'),
  JSON.stringify({ provider: 'gemini', spoken: 'uz', output: 'ru', autoPaste: false }),
);

const requests: Array<{ url: string; body: any; headers: Record<string, string> }> = [];
const mockFetch = (async (url: string, init?: RequestInit) => {
  requests.push({ url: String(url), body: JSON.parse(String(init?.body)), headers: init?.headers as Record<string, string> });
  await new Promise((r) => setTimeout(r, 500));
  return new Response(
    JSON.stringify({ candidates: [{ content: { parts: [{ text: 'Привет, меня зовут Мухаммад.' }] }, finishReason: 'STOP' }] }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  );
}) as typeof fetch;

const results: string[] = [];
const check = (name: string, ok: boolean, extra = '') => results.push(`${ok ? 'PASS' : 'FAIL'} ${name} ${extra}`);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function waitFor(fn: () => boolean, ms: number): Promise<boolean> {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    if (fn()) return true;
    await sleep(50);
  }
  return fn();
}

startApp({
  fetch: mockFetch,
  onReady: async (c) => {
    try {
      const hud = c.hudWindow();
      const shot = async (name: string) => {
        try {
          fs.writeFileSync(path.join(out, `${name}.png`), (await hud.webContents.capturePage()).toPNG());
        } catch (error) {
          results.push(`INFO screenshot ${name} failed: ${(error as Error).message}`);
        }
      };

      await sleep(600);
      check('hud visible on start', hud.isVisible());
      check('hud not focusable', !hud.isFocusable());
      await shot('hud-ready');

      await c.toggle();
      check('recording started', await waitFor(() => c.phase() === 'recording', 5000), c.phase());
      await sleep(2500);
      await shot('hud-recording');

      await c.toggle();
      check('transcribing', c.phase() === 'transcribing', c.phase());
      await sleep(150);
      await shot('hud-transcribing');

      check('back to idle', await waitFor(() => c.phase() === 'idle', 15000), c.phase());
      check('text received', c.lastText() === 'Привет, меня зовут Мухаммад.', JSON.stringify(c.lastText()));
      const copied = await clipboard.readText();
      check('text on clipboard', copied === c.lastText(), JSON.stringify(copied));
      await sleep(100);
      await shot('hud-done');

      const req = requests[0];
      check('one request', requests.length === 1, String(requests.length));
      if (req) {
        check('model url', req.url.endsWith('/models/gemini-3.5-flash:generateContent'), req.url);
        check('key header', req.headers['x-goog-api-key'] === 'AIzaSyD-SMOKE-TEST-KEY-1234567890abcdef');
        const inline = req.body.contents[0].parts[0].inlineData;
        const wav = Buffer.from(inline.data, 'base64');
        const rate = wav.readUInt32LE(24);
        const seconds = wav.readUInt32LE(40) / (rate * 2);
        check('wav 16k mono', wav.toString('ascii', 0, 4) === 'RIFF' && rate === 16000 && wav.readUInt16LE(22) === 1, `${rate}`);
        check('wav duration ~2.5s', seconds > 1.8 && seconds < 4, seconds.toFixed(2));
        check('russian prompt', req.body.systemInstruction.parts[0].text.includes('written in Russian'));
      }

      // Cancel flow
      await c.toggle();
      await waitFor(() => c.phase() === 'recording', 5000);
      c.cancel();
      check('cancel returns to idle', c.phase() === 'idle');
      await sleep(300);
      check('no extra request after cancel', requests.length === 1, String(requests.length));

      c.openSettings();
      const settings = await (async () => {
        await waitFor(() => !!c.settingsWindow()?.isVisible(), 5000);
        return c.settingsWindow();
      })();
      check('settings window opens', !!settings);
      if (settings) {
        await sleep(800);
        const preview = await settings.webContents.executeJavaScript(
          "document.getElementById('key-status').textContent",
        );
        check('settings shows masked key', String(preview).includes('AIzaSy…def'), JSON.stringify(preview));
        try {
          settings.setSize(580, 1700);
          await sleep(400);
          fs.writeFileSync(path.join(out, 'settings-full.png'), (await settings.webContents.capturePage()).toPNG());
        } catch (error) {
          results.push(`INFO settings screenshot failed: ${(error as Error).message}`);
        }
      }
    } catch (error) {
      results.push(`FAIL exception ${(error as Error).stack}`);
    } finally {
      fs.writeFileSync(path.join(out, 'results.txt'), results.join('\n'));
      console.log(results.join('\n'));
      app.exit(results.some((r) => r.startsWith('FAIL')) ? 1 : 0);
    }
  },
});
