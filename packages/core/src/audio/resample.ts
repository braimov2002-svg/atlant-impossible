/** Averages any number of channels into one. */
export function downmixToMono(channels: readonly Float32Array[]): Float32Array {
  if (channels.length === 0) return new Float32Array(0);
  if (channels.length === 1) return channels[0].slice();
  const length = Math.min(...channels.map((c) => c.length));
  const out = new Float32Array(length);
  for (const channel of channels) {
    for (let i = 0; i < length; i++) out[i] += channel[i];
  }
  for (let i = 0; i < length; i++) out[i] /= channels.length;
  return out;
}

/**
 * Converts between sample rates. Downsampling averages each output window
 * (a box low-pass filter, plenty for speech recognition); upsampling
 * interpolates linearly.
 */
export function resample(input: Float32Array, fromRate: number, toRate: number): Float32Array {
  if (!(fromRate > 0) || !(toRate > 0)) throw new Error('Sample rates must be positive');
  if (fromRate === toRate || input.length === 0) return input.slice();

  const ratio = fromRate / toRate;
  const outLength = Math.max(1, Math.floor(input.length / ratio));
  const out = new Float32Array(outLength);

  if (ratio > 1) {
    for (let i = 0; i < outLength; i++) {
      const start = Math.floor(i * ratio);
      const end = Math.min(input.length, Math.max(start + 1, Math.floor((i + 1) * ratio)));
      let sum = 0;
      for (let j = start; j < end; j++) sum += input[j];
      out[i] = sum / (end - start);
    }
  } else {
    for (let i = 0; i < outLength; i++) {
      const pos = i * ratio;
      const left = Math.floor(pos);
      const right = Math.min(input.length - 1, left + 1);
      const frac = pos - left;
      out[i] = input[left] * (1 - frac) + input[right] * frac;
    }
  }
  return out;
}

/** Largest absolute sample value (0..1); used to detect silent recordings. */
export function peakLevel(samples: Float32Array): number {
  let peak = 0;
  for (let i = 0; i < samples.length; i++) {
    const v = Math.abs(samples[i]);
    if (v > peak) peak = v;
  }
  return peak;
}
