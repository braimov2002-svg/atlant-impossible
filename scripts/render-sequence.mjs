#!/usr/bin/env node
/*
 * Renders the hero construction sequence to WebP frames.
 *
 *   npm run dev                      # the /render harness only exists in dev (or ATLANT_RENDER=1)
 *   npm run render:sequence          # both aspects, default frame counts
 *   node scripts/render-sequence.mjs --aspect portrait --frames 90
 *   node scripts/render-sequence.mjs --only 0,0.3,0.9 --out /tmp/preview   # quick look-dev
 *
 * Env: RENDER_BASE (default http://localhost:3000), CHROME_PATH (optional Chromium binary).
 * Output: public/sequence/<aspect>/0001.webp … + manifest.json, consumed by <ScrollSequence/>.
 */
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => {
    if (a.startsWith("--")) acc.push([a.slice(2), all[i + 1]?.startsWith("--") || all[i + 1] === undefined ? "1" : all[i + 1]]);
    return acc;
  }, []),
);

const BASE = process.env.RENDER_BASE ?? "http://localhost:3000";
const PRESETS = {
  landscape: { w: 1440, h: 810, frames: 100 },
  portrait: { w: 720, h: 1280, frames: 90 },
};
const aspects = args.aspect ? [args.aspect] : Object.keys(PRESETS);
const only = args.only?.split(",").map(Number);
const quality = Number(args.quality ?? 0.8);
const ss = Number(args.ss ?? 1.5);

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});

for (const aspect of aspects) {
  const preset = PRESETS[aspect];
  if (!preset) throw new Error(`Unknown aspect "${aspect}"`);
  const w = Number(args.w ?? preset.w);
  const h = Number(args.h ?? preset.h);
  const frames = Number(args.frames ?? preset.frames);
  const out = path.resolve(args.out ?? `public/sequence/${aspect}`);
  if (!only) await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });

  const page = await browser.newPage({ viewport: { width: w, height: h } });
  page.on("pageerror", (e) => console.error(`[pageerror] ${e.message}`));
  page.on("console", (m) => m.type() === "error" && console.error(`[console] ${m.text()}`));
  await page.goto(`${BASE}/render?aspect=${aspect}&w=${w}&h=${h}&ss=${ss}`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.__renderReady === true, null, { timeout: 120_000 });

  const list = only ?? Array.from({ length: frames }, (_, i) => i / (frames - 1));
  const t0 = Date.now();
  for (let i = 0; i < list.length; i++) {
    const p = list[i];
    const url = await page.evaluate(([p, q]) => window.__render(p, "image/webp", q), [p, quality]);
    const name = only ? `${aspect}-${p.toFixed(3)}.webp` : `${String(i + 1).padStart(4, "0")}.webp`;
    await writeFile(path.join(out, name), Buffer.from(url.split(",")[1], "base64"));
    const eta = ((Date.now() - t0) / (i + 1)) * (list.length - i - 1);
    process.stdout.write(`\r${aspect} ${i + 1}/${list.length}  p=${p.toFixed(3)}  eta ${Math.round(eta / 1000)}s   `);
  }
  process.stdout.write("\n");
  if (!only) {
    await writeFile(path.join(out, "manifest.json"), JSON.stringify({ aspect, width: w, height: h, frames, ext: "webp" }, null, 2) + "\n");
  }
  await page.close();
}
await browser.close();
