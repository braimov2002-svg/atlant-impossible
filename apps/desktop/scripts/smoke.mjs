// Bundles test/smoke/smoke-main.ts next to the app build and runs it in Electron.
import * as esbuild from 'esbuild';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const electron = createRequire(import.meta.url)('electron');

spawnSync(process.execPath, [path.join(root, 'scripts/build.mjs')], { stdio: 'inherit' });
await esbuild.build({
  absWorkingDir: root,
  entryPoints: { smoke: 'test/smoke/smoke-main.ts' },
  outdir: path.join(root, 'dist'),
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'node22',
  external: ['electron'],
  logLevel: 'warning',
});
const args = [path.join(root, 'dist/smoke.js')];
if (process.platform === 'linux') args.push('--no-sandbox');
const run = spawnSync(electron, args, { stdio: 'inherit', env: process.env });
process.exit(run.status ?? 1);
