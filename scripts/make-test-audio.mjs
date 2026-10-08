// Writes a speech-like 48 kHz mono WAV (voiced harmonics with syllable-shaped
// loudness) for the fake-microphone tests. Usage: node scripts/make-test-audio.mjs out.wav [seconds]
import fs from 'node:fs';

const [out, secondsArg] = process.argv.slice(2);
if (!out) throw new Error('usage: make-test-audio.mjs <out.wav> [seconds]');
const rate = 48_000;
const seconds = Number(secondsArg ?? 12);
const n = Math.round(rate * seconds);
const data = Buffer.alloc(44 + n * 2);

data.write('RIFF', 0);
data.writeUInt32LE(36 + n * 2, 4);
data.write('WAVE', 8);
data.write('fmt ', 12);
data.writeUInt32LE(16, 16);
data.writeUInt16LE(1, 20);
data.writeUInt16LE(1, 22);
data.writeUInt32LE(rate, 24);
data.writeUInt32LE(rate * 2, 28);
data.writeUInt16LE(2, 32);
data.writeUInt16LE(16, 34);
data.write('data', 36);
data.writeUInt32LE(n * 2, 40);

let phase = 0;
for (let i = 0; i < n; i++) {
  const t = i / rate;
  const pitch = 140 + 25 * Math.sin(2 * Math.PI * 0.7 * t); // gliding voice pitch
  phase += (2 * Math.PI * pitch) / rate;
  let voice = 0;
  for (let h = 1; h <= 8; h++) voice += Math.sin(h * phase) / h;
  const syllable = Math.max(0, Math.sin(2 * Math.PI * 3.2 * t)) ** 0.6; // ~3 syllables/s
  const sample = 0.35 * voice * syllable;
  data.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(sample * 32767))), 44 + i * 2);
}
fs.writeFileSync(out, data);
console.log(`wrote ${out} (${seconds}s)`);
