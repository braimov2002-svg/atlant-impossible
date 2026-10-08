import { describe, expect, it } from 'vitest';
import { percentileLevel, voicedFraction } from '../src/audio/levels';

describe('voicedFraction', () => {
  it('is ~0 for silence with a single click', () => {
    const samples = new Float32Array(16_000 * 3);
    for (let i = 0; i < samples.length; i++) samples[i] = (Math.random() - 0.5) * 0.002; // room noise
    samples[1000] = 0.9; // key click
    expect(voicedFraction(samples, 16_000)).toBeLessThan(0.03);
  });

  it('is high for continuous speech-level signal', () => {
    const samples = new Float32Array(16_000).map((_, i) => 0.2 * Math.sin(i / 5));
    expect(voicedFraction(samples, 16_000)).toBeGreaterThan(0.9);
  });

  it('handles empty input', () => {
    expect(voicedFraction(new Float32Array(0), 16_000)).toBe(0);
  });
});

describe('percentileLevel', () => {
  it('ignores a single loud sample', () => {
    const samples = new Float32Array(100_000).fill(0.1);
    samples[5] = 1;
    expect(percentileLevel(samples, 0.999)).toBeLessThan(0.12);
    expect(percentileLevel(new Float32Array(0), 0.999)).toBe(0);
  });
});
