import { describe, expect, it } from 'vitest';
import { downmixToMono, peakLevel, resample } from '../src/audio/resample';
import { encodeWavPcm16, readWavInfo, SPEECH_SAMPLE_RATE } from '../src/audio/wav';

function sine(freq: number, rate: number, seconds: number, amp = 0.5): Float32Array {
  const out = new Float32Array(Math.round(rate * seconds));
  for (let i = 0; i < out.length; i++) out[i] = amp * Math.sin((2 * Math.PI * freq * i) / rate);
  return out;
}

describe('encodeWavPcm16', () => {
  it('writes a valid 16 kHz mono PCM header', () => {
    const wav = encodeWavPcm16(new Float32Array(16_000), SPEECH_SAMPLE_RATE);
    expect(wav.byteLength).toBe(44 + 32_000);
    expect(String.fromCharCode(...wav.slice(0, 4))).toBe('RIFF');
    expect(String.fromCharCode(...wav.slice(8, 12))).toBe('WAVE');
    expect(String.fromCharCode(...wav.slice(36, 40))).toBe('data');
    expect(readWavInfo(wav)).toEqual({
      sampleRate: 16_000,
      channels: 1,
      bitsPerSample: 16,
      durationSec: 1,
    });
  });

  it('clips and scales samples to int16', () => {
    const wav = encodeWavPcm16(Float32Array.from([1, -1, 2, -2, 0, 0.5]), 8000);
    const view = new DataView(wav.buffer);
    const read = (i: number) => view.getInt16(44 + i * 2, true);
    expect([read(0), read(1), read(2), read(3), read(4)]).toEqual([32767, -32768, 32767, -32768, 0]);
    expect(read(5)).toBe(Math.trunc(0.5 * 0x7fff));
  });

  it('treats NaN samples as silence', () => {
    const wav = encodeWavPcm16(Float32Array.from([NaN]), 8000);
    expect(new DataView(wav.buffer).getInt16(44, true)).toBe(0);
  });

  it('rejects non-WAV data', () => {
    expect(() => readWavInfo(new Uint8Array(60))).toThrow('Not a WAV file');
  });
});

describe('resample', () => {
  it('keeps duration when downsampling 48 kHz to 16 kHz', () => {
    const input = sine(440, 48_000, 2);
    const out = resample(input, 48_000, 16_000);
    expect(out.length).toBe(32_000);
    expect(peakLevel(out)).toBeGreaterThan(0.45);
    expect(peakLevel(out)).toBeLessThanOrEqual(0.5);
  });

  it('handles non-integer ratios (44.1 kHz)', () => {
    const out = resample(sine(300, 44_100, 1), 44_100, 16_000);
    expect(out.length).toBe(16_000);
    expect(peakLevel(out)).toBeGreaterThan(0.45);
  });

  it('attenuates content above the new Nyquist frequency', () => {
    // 15 kHz cannot be represented at 16 kHz; box filtering must damp it.
    const out = resample(sine(15_000, 48_000, 1), 48_000, 16_000);
    expect(peakLevel(out)).toBeLessThan(0.2);
  });

  it('upsamples by interpolation', () => {
    const out = resample(Float32Array.from([0, 1]), 8000, 16000);
    expect(Array.from(out)).toEqual([0, 0.5, 1, 1]);
  });

  it('returns a copy for equal rates and rejects bad rates', () => {
    const input = Float32Array.from([0.1, 0.2]);
    const out = resample(input, 16_000, 16_000);
    expect(out).not.toBe(input);
    expect(Array.from(out)).toEqual(Array.from(input));
    expect(() => resample(input, 0, 16_000)).toThrow();
  });
});

describe('downmixToMono', () => {
  it('averages channels and truncates to the shortest', () => {
    const out = downmixToMono([Float32Array.from([1, 0, 1]), Float32Array.from([0, 0])]);
    expect(Array.from(out)).toEqual([0.5, 0]);
  });

  it('copies a single channel and handles none', () => {
    const ch = Float32Array.from([0.3]);
    expect(downmixToMono([ch])).not.toBe(ch);
    expect(downmixToMono([]).length).toBe(0);
  });
});
