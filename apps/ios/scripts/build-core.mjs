// Bundles the shared TypeScript core (packages/core) for JavaScriptCore on
// iPhone: one classic script that sets globalThis.OvozYoz. Run from anywhere:
//   node apps/ios/scripts/build-core.mjs [--out <file>]
import * as esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ios = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outArg = process.argv.indexOf('--out');
const outfile = outArg > 0 ? path.resolve(process.argv[outArg + 1]) : path.join(ios, 'OvozYoz/Shared/Resources/ovozyoz-core.js');

fs.mkdirSync(path.dirname(outfile), { recursive: true });
const result = await esbuild.build({
  entryPoints: [path.join(ios, 'core/entry.ts')],
  outfile,
  bundle: true,
  format: 'iife',
  platform: 'neutral',
  mainFields: ['module', 'main'],
  // iOS 16.0 ships the JavaScriptCore of Safari 16.0 (no regex lookbehind
  // before 16.4): esbuild lowers newer syntax or fails the build.
  target: ['safari16'],
  minifyWhitespace: true,
  minifySyntax: true,
  legalComments: 'none',
  charset: 'utf8',
  logLevel: 'warning',
  metafile: true,
});
if (result.warnings.length) process.exitCode = 1;
const bytes = fs.statSync(outfile).size;
console.log(`ovozyoz-core.js: ${(bytes / 1024).toFixed(1)} KB → ${path.relative(process.cwd(), outfile)}`);
