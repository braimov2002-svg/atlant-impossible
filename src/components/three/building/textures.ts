import * as THREE from "three";

/**
 * Procedural facade textures, drawn once on a <canvas> and cached.
 * Each texture is an 8×8 grid of facade "cells" (1 window bay × 1 storey);
 * geometry UVs are expressed in cells, and `repeat = 1/8` maps them back.
 * The emissive map carries randomly lit windows for dusk/night lighting.
 */
export type FacadeStyle = "curtain" | "residential" | "office" | "industrial" | "stone";

export const CELLS = 8;
const PX = 64; // pixels per cell
const cache = new Map<FacadeStyle, { map: THREE.CanvasTexture; emissive: THREE.CanvasTexture }>();

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

type Painter = (c: CanvasRenderingContext2D, e: CanvasRenderingContext2D, x: number, y: number, lit: boolean, r: number) => void;

const warm = (e: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, k: number) => {
  const g = e.createLinearGradient(x, y, x, y + h);
  g.addColorStop(0, `rgba(255, 214, 150, ${0.95 * k})`);
  g.addColorStop(1, `rgba(255, 170, 90, ${0.7 * k})`);
  e.fillStyle = g;
  e.fillRect(x, y, w, h);
};

const PAINTERS: Record<FacadeStyle, Painter> = {
  // Unitised curtain wall: tinted glass, champagne mullions, dark spandrel band
  curtain: (c, e, x, y, lit, r) => {
    const g = c.createLinearGradient(x, y, x + PX, y + PX);
    g.addColorStop(0, `hsl(${208 + r * 8}, 34%, ${34 + r * 10}%)`);
    g.addColorStop(1, `hsl(${202 + r * 6}, 28%, ${22 + r * 6}%)`);
    c.fillStyle = g;
    c.fillRect(x, y, PX, PX);
    c.fillStyle = "#0a0e16";
    c.fillRect(x, y + PX * 0.86, PX, PX * 0.14);
    c.fillStyle = "#8a7440";
    c.fillRect(x, y, 3, PX);
    c.fillRect(x + PX * 0.5, y, 1.5, PX * 0.86);
    if (lit) warm(e, x + 3, y + 2, PX - 5, PX * 0.8, 0.55 + r * 0.45);
  },
  // Rendered wall, punched windows, balcony slab line
  residential: (c, e, x, y, lit, r) => {
    c.fillStyle = `hsl(215, 8%, ${70 + r * 6}%)`;
    c.fillRect(x, y, PX, PX);
    c.fillStyle = `hsl(212, 30%, ${14 + r * 6}%)`;
    c.fillRect(x + PX * 0.18, y + PX * 0.16, PX * 0.64, PX * 0.58);
    c.fillStyle = "#c9a458";
    c.fillRect(x, y + PX * 0.86, PX, PX * 0.06);
    c.fillStyle = "#394252";
    c.fillRect(x + PX * 0.48, y + PX * 0.16, 2, PX * 0.58);
    if (lit) warm(e, x + PX * 0.18, y + PX * 0.16, PX * 0.64, PX * 0.58, 0.6 + r * 0.4);
  },
  // Ribbon windows with titanium spandrels and slim fins
  office: (c, e, x, y, lit, r) => {
    c.fillStyle = "#3c4759";
    c.fillRect(x, y, PX, PX);
    c.fillStyle = `hsl(208, 35%, ${16 + r * 8}%)`;
    c.fillRect(x, y + PX * 0.12, PX, PX * 0.62);
    c.fillStyle = "#cfd6df";
    c.fillRect(x + PX - 3, y, 3, PX);
    if (lit) warm(e, x, y + PX * 0.12, PX - 3, PX * 0.62, 0.5 + r * 0.5);
  },
  // Profiled metal cladding with a clerestory strip
  industrial: (c, e, x, y, lit, r) => {
    c.fillStyle = `hsl(214, 10%, ${58 + r * 5}%)`;
    c.fillRect(x, y, PX, PX);
    c.fillStyle = "rgba(20, 26, 36, 0.35)";
    for (let i = 0; i < PX; i += 8) c.fillRect(x + i, y, 3, PX);
    if (r > 0.55) {
      c.fillStyle = "#1a2a3c";
      c.fillRect(x + 4, y + 6, PX - 8, PX * 0.18);
      if (lit) warm(e, x + 4, y + 6, PX - 8, PX * 0.18, 0.7);
    }
  },
  // Sandstone with pointed-arch openings (Bukhara heritage context)
  stone: (c, e, x, y, lit, r) => {
    c.fillStyle = `hsl(38, 32%, ${62 + r * 6}%)`;
    c.fillRect(x, y, PX, PX);
    const arch = (ctx: CanvasRenderingContext2D) => {
      ctx.beginPath();
      ctx.moveTo(x + PX * 0.28, y + PX * 0.84);
      ctx.lineTo(x + PX * 0.28, y + PX * 0.42);
      ctx.quadraticCurveTo(x + PX * 0.28, y + PX * 0.18, x + PX * 0.5, y + PX * 0.12);
      ctx.quadraticCurveTo(x + PX * 0.72, y + PX * 0.18, x + PX * 0.72, y + PX * 0.42);
      ctx.lineTo(x + PX * 0.72, y + PX * 0.84);
      ctx.closePath();
    };
    c.fillStyle = "#1d2531";
    arch(c);
    c.fill();
    if (lit) {
      e.fillStyle = `rgba(255, 196, 120, ${0.6 + r * 0.4})`;
      arch(e);
      e.fill();
    }
  },
};

const LIT_RATIO: Record<FacadeStyle, number> = { curtain: 0.26, residential: 0.36, office: 0.4, industrial: 0.25, stone: 0.4 };

export function getFacadeTextures(style: FacadeStyle) {
  const hit = cache.get(style);
  if (hit) return hit;

  const size = PX * CELLS;
  const mk = () => {
    const cv = document.createElement("canvas");
    cv.width = cv.height = size;
    return cv;
  };
  const base = mk();
  const glow = mk();
  const c = base.getContext("2d")!;
  const e = glow.getContext("2d")!;
  e.fillStyle = "#000";
  e.fillRect(0, 0, size, size);

  const rand = rng(style.length * 7919 + 17);
  for (let row = 0; row < CELLS; row++) {
    for (let col = 0; col < CELLS; col++) {
      const r = rand();
      PAINTERS[style](c, e, col * PX, row * PX, rand() < LIT_RATIO[style], r);
    }
  }

  const wrap = (cv: HTMLCanvasElement, srgb: boolean) => {
    const t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(1 / CELLS, 1 / CELLS);
    t.anisotropy = 4;
    if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    return t;
  };
  const out = { map: wrap(base, true), emissive: wrap(glow, true) };
  cache.set(style, out);
  return out;
}
