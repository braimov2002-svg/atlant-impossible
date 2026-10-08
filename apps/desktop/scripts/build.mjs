// Bundles main, preload and renderer code with esbuild into dist/.
// Everything (including @ovozyoz/core) is bundled, so the packaged app has
// no runtime node_modules at all.
import * as esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');
const watch = process.argv.includes('--watch');

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

const common = {
  bundle: true,
  sourcemap: 'linked',
  logLevel: 'info',
  legalComments: 'none',
  define: { 'process.env.NODE_ENV': '"production"' },
};

const builds = [
  // Main process (Electron 44 = Node 24).
  {
    ...common,
    entryPoints: { main: 'src/main/entry.ts' },
    platform: 'node',
    format: 'cjs',
    target: 'node24',
    external: ['electron'],
  },
  // Sandboxed preloads can only require('electron'); building them for the
  // browser makes any accidental Node import fail at build time.
  {
    ...common,
    entryPoints: { 'preload-hud': 'src/preload/hud.ts', 'preload-settings': 'src/preload/settings.ts' },
    platform: 'browser',
    format: 'cjs',
    target: 'chrome152',
    external: ['electron'],
  },
  // Renderers are plain browser pages.
  {
    ...common,
    entryPoints: { hud: 'src/renderer/hud.ts', settings: 'src/renderer/settings.ts' },
    platform: 'browser',
    format: 'iife',
    target: 'chrome152',
  },
];

for (const options of builds) {
  const opts = { ...options, absWorkingDir: root, outdir: dist };
  if (watch) await (await esbuild.context(opts)).watch();
  else await esbuild.build(opts);
}

for (const file of ['hud.html', 'hud.css', 'settings.html', 'settings.css']) {
  fs.copyFileSync(path.join(root, 'src/renderer', file), path.join(dist, file));
}
fs.copyFileSync(path.join(root, 'assets/icon.png'), path.join(dist, 'icon.png'));
console.log('desktop build ok');
