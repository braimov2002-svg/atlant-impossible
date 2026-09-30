import { frameUrl, type SequenceSource } from "@/lib/sequence";

/**
 * Canvas image-sequence player.
 *
 * - Loads coarse-to-fine (every 16th frame, then 8th, 4th …) so any scroll
 *   position has a nearby frame almost immediately.
 * - Draws "cover" into a DPR-aware canvas and cross-fades between the two
 *   frames around the exact progress, so 100 frames scrub as smoothly as 400.
 * - Draws at most once per animation frame.
 */
export interface SequencePlayer {
  setProgress(p: number): void;
  resize(): void;
  destroy(): void;
}

export function createSequencePlayer(
  canvas: HTMLCanvasElement,
  src: SequenceSource,
  { onFirstDraw, saveData = false }: { onFirstDraw?: () => void; saveData?: boolean } = {},
): SequencePlayer {
  const ctx = canvas.getContext("2d")!;
  const n = src.frames;
  const frames: (HTMLImageElement | null)[] = Array(n).fill(null);
  let progress = 0;
  let raf = 0;
  let drawn = false;
  let destroyed = false;

  // Load order: first + last, then progressively finer strides.
  const order: number[] = [];
  const seen = new Set<number>();
  const push = (i: number) => {
    if (i >= 0 && i < n && !seen.has(i)) {
      seen.add(i);
      order.push(i);
    }
  };
  push(0);
  push(n - 1);
  for (const step of saveData ? [16, 8, 4] : [16, 8, 4, 2, 1]) for (let i = 0; i < n; i += step) push(i);

  let next = 0;
  let inflight = 0;
  const pump = () => {
    while (!destroyed && inflight < 6 && next < order.length) load(order[next++]);
  };
  const load = (i: number) => {
    inflight++;
    const img = new Image();
    img.decoding = "async";
    img.src = frameUrl(src, i);
    img
      .decode()
      .then(() => {
        if (destroyed) return;
        frames[i] = img;
        const f = progress * (n - 1);
        if (!drawn || Math.abs(i - f) < 17) schedule();
      })
      .catch(() => {})
      .finally(() => {
        inflight--;
        pump();
      });
  };

  const nearest = (i: number) => {
    for (let d = 0; d < n; d++) {
      if (frames[i - d]) return i - d;
      if (frames[i + d]) return i + d;
    }
    return -1;
  };

  const cover = (img: HTMLImageElement) => {
    const cw = canvas.width;
    const ch = canvas.height;
    const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * s;
    const h = img.naturalHeight * s;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  };

  const draw = () => {
    raf = 0;
    const f = progress * (n - 1);
    const a = Math.floor(f);
    const ia = frames[a] ? a : nearest(a);
    if (ia < 0) return;
    ctx.globalAlpha = 1;
    cover(frames[ia]!);
    const frac = f - a;
    const b = a + 1;
    if (ia === a && b < n && frames[b] && frac > 0.02) {
      ctx.globalAlpha = frac;
      cover(frames[b]!);
      ctx.globalAlpha = 1;
    }
    if (!drawn) {
      drawn = true;
      onFirstDraw?.();
    }
  };
  const schedule = () => {
    if (!raf && !destroyed) raf = requestAnimationFrame(draw);
  };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    }
    schedule();
  };

  resize();
  pump();

  return {
    setProgress(p) {
      const v = Math.min(1, Math.max(0, p));
      if (v === progress && drawn) return;
      progress = v;
      schedule();
    },
    resize,
    destroy() {
      destroyed = true;
      if (raf) cancelAnimationFrame(raf);
    },
  };
}
