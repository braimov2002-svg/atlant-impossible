// Compiles the Windows paste helper with the real PowerShell and checks its
// protocol, without sending any keystrokes. Run on Windows (CI does).
import { spawn } from 'node:child_process';
import path from 'node:path';
import { WINDOWS_PASTE_HELPER } from '../src/main/paste-helper.ts';

if (process.platform !== 'win32') {
  console.log('skipped: not Windows');
  process.exit(0);
}

const powershell = path.join(process.env.SystemRoot ?? 'C:\\Windows', 'System32', 'WindowsPowerShell', 'v1.0', 'powershell.exe');
const encoded = Buffer.from(WINDOWS_PASTE_HELPER, 'utf16le').toString('base64');
const child = spawn(powershell, ['-NoProfile', '-NonInteractive', '-EncodedCommand', encoded], { windowsHide: true });

let output = '';
let errors = '';
child.stdout.setEncoding('utf8').on('data', (chunk) => {
  output += chunk;
  if (output.includes('READY') && !output.includes('PROBE')) child.stdin.write('probe\n');
  if (output.includes('PROBE')) child.stdin.end();
});
child.stderr.setEncoding('utf8').on('data', (chunk) => (errors += chunk));

const timer = setTimeout(() => {
  console.error('timed out; output:', output, 'errors:', errors);
  child.kill();
  process.exit(1);
}, 60_000);

child.on('exit', (code) => {
  clearTimeout(timer);
  const ok = /READY/.test(output) && /PROBE (True|False)/.test(output);
  console.log(output.trim());
  if (!ok) {
    console.error('paste helper check failed (exit', code, ')', errors);
    process.exit(1);
  }
  console.log('paste helper compiled and answered');
});
