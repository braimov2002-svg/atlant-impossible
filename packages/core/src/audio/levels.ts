// Loudness measurements used to reject silent recordings and to normalise
// quiet ones. Pure functions over mono samples so they are unit-tested.

const FRAME_SECONDS = 0.02;

/** Share (0..1) of 20 ms frames whose RMS is above `threshold`. */
export function voicedFraction(samples: Float32Array, sampleRate: number, threshold = 0.01): number {
  const frame = Math.max(1, Math.round(sampleRate * FRAME_SECONDS));
  let frames = 0;
  let voiced = 0;
  for (let start = 0; start + frame <= samples.length; start += frame) {
    let sum = 0;
    for (let i = start; i < start + frame; i++) sum += samples[i] * samples[i];
    frames++;
    if (Math.sqrt(sum / frame) > threshold) voiced++;
  }
  return frames === 0 ? 0 : voiced / frames;
}

/**
 * Level that `fraction` of absolute sample values stay below (e.g. 0.999).
 * Unlike the peak it ignores a single click, so it is safe to derive gain from.
 */
export function percentileLevel(samples: Float32Array, fraction: number): number {
  if (samples.length === 0) return 0;
  const bins = new Uint32Array(1024);
  for (let i = 0; i < samples.length; i++) {
    const v = Math.min(1, Math.abs(samples[i]) || 0);
    bins[Math.min(bins.length - 1, Math.floor(v * bins.length))]++;
  }
  const target = Math.ceil(samples.length * fraction);
  let seen = 0;
  for (let b = 0; b < bins.length; b++) {
    seen += bins[b];
    if (seen >= target) return (b + 1) / bins.length;
  }
  return 1;
}
