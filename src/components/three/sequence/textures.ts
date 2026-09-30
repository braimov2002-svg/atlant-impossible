import * as THREE from "three";

/*
 * Procedural arch-viz textures for the construction sequence, painted once on
 * <canvas> and cached. Every texture declares how many metres it spans, and
 * geometry UVs are written in metres (see `metricBox`), so materials tile at
 * true real-world scale on any mass.
 */

type Paint = (ctx: CanvasRenderingContext2D, s: number, rnd: () => number, noise: (x: number, y: number) => number) => void;

const cache = new Map<string, THREE.CanvasTexture>();

function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function valueNoise(seed: number) {
  const r = rng(seed);
  const N = 256;
  const table = Array.from({ length: N * N }, r);
  const at = (x: number, y: number) => table[((y & (N - 1)) * N + (x & (N - 1))) | 0];
  const smooth = (t: number) => t * t * (3 - 2 * t);
  const n = (x: number, y: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const u = smooth(x - xi);
    const v = smooth(y - yi);
    const a = at(xi, yi) + (at(xi + 1, yi) - at(xi, yi)) * u;
    const b = at(xi, yi + 1) + (at(xi + 1, yi + 1) - at(xi, yi + 1)) * u;
    return a + (b - a) * v;
  };
  return (x: number, y: number) => n(x, y) * 0.55 + n(x * 2.1, y * 2.1) * 0.28 + n(x * 4.3, y * 4.3) * 0.17;
}

/** Per-pixel tint: base RGB modulated by fbm noise (amount 0..1). */
function grain(ctx: CanvasRenderingContext2D, s: number, noise: (x: number, y: number) => number, scale: number, amount: number) {
  const img = ctx.getImageData(0, 0, s, s);
  const d = img.data;
  for (let y = 0; y < s; y++) {
    for (let x = 0; x < s; x++) {
      const k = 1 + (noise((x / s) * scale, (y / s) * scale) - 0.5) * amount * 2;
      const i = (y * s + x) * 4;
      d[i] = Math.min(255, d[i] * k);
      d[i + 1] = Math.min(255, d[i + 1] * k);
      d[i + 2] = Math.min(255, d[i + 2] * k);
    }
  }
  ctx.putImageData(img, 0, 0);
}

function make(key: string, meters: number, paint: Paint, size = 512, seed = 7) {
  const hit = cache.get(key);
  if (hit) return hit;
  const cv = document.createElement("canvas");
  cv.width = cv.height = size;
  const ctx = cv.getContext("2d", { willReadFrequently: true })!;
  paint(ctx, size, rng(seed), valueNoise(seed));
  const t = new THREE.CanvasTexture(cv);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(1 / meters, 1 / meters);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  cache.set(key, t);
  return t;
}

export const TEX = {
  /** Honed limestone cladding, 1.2 × 0.6 m panels */
  stone: () =>
    make("stone", 2.4, (c, s, r, n) => {
      c.fillStyle = "#e4ddcf";
      c.fillRect(0, 0, s, s);
      grain(c, s, n, 18, 0.05);
      const pw = s / 2;
      const ph = s / 4;
      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 2; x++) {
          c.fillStyle = `rgba(${200 + r() * 20}, ${190 + r() * 18}, ${170 + r() * 16}, 0.12)`;
          c.fillRect(x * pw + (y % 2) * pw * 0.5, y * ph, pw, ph);
        }
      }
      c.strokeStyle = "rgba(120, 110, 95, 0.35)";
      c.lineWidth = 1.5;
      for (let y = 0; y <= 4; y++) {
        c.beginPath();
        c.moveTo(0, y * ph);
        c.lineTo(s, y * ph);
        c.stroke();
        for (let x = 0; x <= 2; x++) {
          const xx = x * pw + (y % 2) * pw * 0.5;
          c.beginPath();
          c.moveTo(xx % s, y * ph);
          c.lineTo(xx % s, (y + 1) * ph);
          c.stroke();
        }
      }
    }),
  /** Fair-faced cast concrete with form joints and tie holes */
  concrete: () =>
    make("concrete", 2.4, (c, s, r, n) => {
      c.fillStyle = "#a3a29c";
      c.fillRect(0, 0, s, s);
      grain(c, s, n, 10, 0.12);
      c.strokeStyle = "rgba(60, 60, 58, 0.35)";
      c.lineWidth = 1.2;
      [0, s / 2].forEach((v) => {
        c.beginPath();
        c.moveTo(0, v);
        c.lineTo(s, v);
        c.moveTo(v, 0);
        c.lineTo(v, s);
        c.stroke();
      });
      c.fillStyle = "rgba(50, 50, 48, 0.55)";
      for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) c.fillRect(x * (s / 4) + s / 8 - 2, y * (s / 4) + s / 8 - 2, 4, 4);
      for (let i = 0; i < 400; i++) {
        c.fillStyle = `rgba(70,70,66,${r() * 0.25})`;
        c.fillRect(r() * s, r() * s, 1.5, 1.5);
      }
    }),
  /** Painted plywood formwork (the red panels on the reference site) */
  formwork: () =>
    make("formwork", 2.4, (c, s, r, n) => {
      c.fillStyle = "#c2503c";
      c.fillRect(0, 0, s, s);
      grain(c, s, n, 6, 0.14);
      c.strokeStyle = "rgba(60, 20, 15, 0.5)";
      c.lineWidth = 2;
      for (let x = 0; x <= 2; x++) {
        c.beginPath();
        c.moveTo((x * s) / 2, 0);
        c.lineTo((x * s) / 2, s);
        c.stroke();
      }
    }),
  dirt: () =>
    make("dirt", 6, (c, s, r, n) => {
      c.fillStyle = "#7d6a52";
      c.fillRect(0, 0, s, s);
      grain(c, s, n, 14, 0.35);
      for (let i = 0; i < 1400; i++) {
        c.fillStyle = r() < 0.5 ? `rgba(60,48,36,${r() * 0.5})` : `rgba(150,135,110,${r() * 0.35})`;
        c.fillRect(r() * s, r() * s, 1 + r() * 2, 1 + r() * 2);
      }
    }, 512, 11),
  asphalt: () =>
    make("asphalt", 6, (c, s, r, n) => {
      c.fillStyle = "#3c3e41";
      c.fillRect(0, 0, s, s);
      grain(c, s, n, 30, 0.18);
      for (let i = 0; i < 3000; i++) {
        c.fillStyle = `rgba(${120 + r() * 60},${120 + r() * 60},${120 + r() * 60},${r() * 0.18})`;
        c.fillRect(r() * s, r() * s, 1, 1);
      }
    }, 512, 5),
  /** 0.6 m granite pavers */
  pavers: () =>
    make("pavers", 2.4, (c, s, r, n) => {
      const q = s / 4;
      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
          const g = 150 + r() * 25;
          c.fillStyle = `rgb(${g},${g - 2},${g - 6})`;
          c.fillRect(x * q, y * q, q, q);
        }
      }
      grain(c, s, n, 20, 0.08);
      c.strokeStyle = "rgba(70,70,68,0.6)";
      c.lineWidth = 2;
      for (let i = 0; i <= 4; i++) {
        c.beginPath();
        c.moveTo(i * q, 0);
        c.lineTo(i * q, s);
        c.moveTo(0, i * q);
        c.lineTo(s, i * q);
        c.stroke();
      }
    }, 512, 3),
  grass: () =>
    make("grass", 4, (c, s, r, n) => {
      c.fillStyle = "#5b7a3c";
      c.fillRect(0, 0, s, s);
      grain(c, s, n, 16, 0.3);
      for (let i = 0; i < 5000; i++) {
        c.fillStyle = r() < 0.5 ? `rgba(40,70,25,${r() * 0.5})` : `rgba(130,160,80,${r() * 0.4})`;
        c.fillRect(r() * s, r() * s, 1, 2 + r() * 2);
      }
    }, 512, 9),
  /** Irregular coursed rubble — the old stone villa next door */
  rubble: () =>
    make("rubble", 3, (c, s, r, n) => {
      c.fillStyle = "#8f8676";
      c.fillRect(0, 0, s, s);
      let y = 0;
      while (y < s) {
        const h = 18 + r() * 22;
        let x = -r() * 30;
        while (x < s) {
          const w = 30 + r() * 50;
          const g = 150 + r() * 45;
          c.fillStyle = `rgb(${g},${g - 6 - r() * 8},${g - 20 - r() * 10})`;
          c.fillRect(x + 1.5, y + 1.5, w - 3, h - 3);
          x += w;
        }
        y += h;
      }
      grain(c, s, n, 24, 0.12);
    }, 512, 21),
  slate: () =>
    make("slate", 2.4, (c, s, r, n) => {
      c.fillStyle = "#3d434b";
      c.fillRect(0, 0, s, s);
      const rows = 16;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < 10; x++) {
          const g = 55 + r() * 25;
          c.fillStyle = `rgb(${g},${g + 5},${g + 12})`;
          c.fillRect(x * (s / 10) + (y % 2) * (s / 20), y * (s / rows), s / 10 - 2, s / rows - 2);
        }
      }
      grain(c, s, n, 20, 0.1);
    }, 512, 13),
  tiles: () =>
    make("tiles", 2, (c, s, r, n) => {
      c.fillStyle = "#9c4a33";
      c.fillRect(0, 0, s, s);
      for (let y = 0; y < 12; y++) {
        c.fillStyle = "rgba(60,20,10,0.35)";
        c.fillRect(0, y * (s / 12), s, 3);
        for (let x = 0; x < 8; x++) {
          c.fillStyle = `rgba(${170 + r() * 40},${80 + r() * 20},${50 + r() * 15},0.5)`;
          c.fillRect(x * (s / 8) + 2, y * (s / 12) + 4, s / 8 - 4, s / 12 - 6);
        }
      }
      grain(c, s, n, 18, 0.12);
    }, 512, 17),
  /** Lime render on the neighbouring building */
  render: () =>
    make("render", 4, (c, s, r, n) => {
      c.fillStyle = "#d9cdb8";
      c.fillRect(0, 0, s, s);
      grain(c, s, n, 8, 0.1);
      for (let i = 0; i < 40; i++) {
        c.fillStyle = `rgba(120,110,95,${r() * 0.05})`;
        c.fillRect(r() * s, r() * s, 20 + r() * 80, 2 + r() * 50);
      }
    }, 512, 31),
  /** Wide-plank oak flooring */
  oak: () =>
    make("oak", 2.4, (c, s, r, n) => {
      const planks = 12;
      const pw = s / planks;
      for (let i = 0; i < planks; i++) {
        const b = 175 + r() * 25;
        c.fillStyle = `rgb(${b},${b - 38},${b - 85})`;
        c.fillRect(i * pw, 0, pw, s);
        for (let k = 0; k < 40; k++) {
          c.fillStyle = `rgba(90,60,30,${r() * 0.12})`;
          c.fillRect(i * pw + r() * pw, 0, 1, s);
        }
        c.fillStyle = "rgba(70,45,20,0.35)";
        c.fillRect(i * pw, 0, 1.5, s);
        c.fillRect(i * pw, r() * s, pw, 1.5);
      }
      grain(c, s, n, 6, 0.06);
    }, 512, 41),
  walnut: () =>
    make("walnut", 1.2, (c, s, r, n) => {
      c.fillStyle = "#6e4b33";
      c.fillRect(0, 0, s, s);
      for (let k = 0; k < 220; k++) {
        c.fillStyle = `rgba(40,25,12,${r() * 0.18})`;
        c.fillRect(0, r() * s, s, 1 + r() * 2);
      }
      grain(c, s, n, 5, 0.1);
    }, 512, 43),
  /**
   * Leaf-cluster card (alpha-tested). Leaves are painted in light neutral
   * greens; per-card vertex colours supply the species hue and fake AO.
   */
  leaves: () => {
    const t = make(
      "leaves",
      1,
      (c, s, r) => {
        c.clearRect(0, 0, s, s);
        // twigs
        c.strokeStyle = "rgba(90, 80, 60, 0.9)";
        c.lineWidth = 2;
        for (let i = 0; i < 5; i++) {
          c.beginPath();
          c.moveTo(s / 2, s * 0.95);
          c.quadraticCurveTo(s * (0.3 + r() * 0.4), s * 0.6, s * (0.15 + r() * 0.7), s * (0.1 + r() * 0.4));
          c.stroke();
        }
        for (let i = 0; i < 260; i++) {
          const a = r() * Math.PI * 2;
          const d = Math.sqrt(r()) * s * 0.42;
          const x = s / 2 + Math.cos(a) * d;
          const y = s / 2 + Math.sin(a) * d * 0.9;
          const len = s * (0.035 + r() * 0.03);
          const v = 170 + r() * 70;
          c.save();
          c.translate(x, y);
          c.rotate(r() * Math.PI * 2);
          c.fillStyle = `rgb(${v * (0.86 + r() * 0.1)}, ${v}, ${v * (0.62 + r() * 0.12)})`;
          c.beginPath();
          c.ellipse(0, 0, len, len * 0.42, 0, 0, Math.PI * 2);
          c.fill();
          c.strokeStyle = "rgba(255,255,240,0.25)";
          c.lineWidth = 1;
          c.beginPath();
          c.moveTo(-len * 0.9, 0);
          c.lineTo(len * 0.9, 0);
          c.stroke();
          c.restore();
        }
      },
      512,
      57,
    );
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    return t;
  },
};

/** Construction hoarding with the Atlant brand (10 m × 2.4 m, repeats horizontally). */
export function hoardingTexture() {
  const hit = cache.get("hoarding");
  if (hit) return hit;
  const cv = document.createElement("canvas");
  cv.width = 2048;
  cv.height = 512;
  const c = cv.getContext("2d")!;
  const g = c.createLinearGradient(0, 0, 0, 512);
  g.addColorStop(0, "#1c222c");
  g.addColorStop(1, "#11151c");
  c.fillStyle = g;
  c.fillRect(0, 0, 2048, 512);
  c.fillStyle = "rgba(255,255,255,0.05)";
  for (let x = 0; x < 2048; x += 205) c.fillRect(x, 0, 3, 512);
  c.fillStyle = "#e2b859";
  c.fillRect(120, 250, 1800, 3);
  c.font = "600 118px Georgia, serif";
  c.fillStyle = "#e9e3d6";
  c.fillText("ATLANT", 120, 220);
  c.font = "500 44px Arial, sans-serif";
  c.fillStyle = "#e2b859";
  c.fillText("CONSTRUCTION GROUP", 124, 320);
  c.fillStyle = "#9aa3ad";
  c.font = "400 38px Arial, sans-serif";
  c.fillText("Kelajak arxitekturasi · 2027", 124, 400);
  const t = new THREE.CanvasTexture(cv);
  t.wrapS = THREE.RepeatWrapping;
  t.repeat.set(1 / 10, 1 / 2.4);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  cache.set("hoarding", t);
  return t;
}

/**
 * Box whose UVs are written in metres (u along the face, v up the face; top
 * faces use x/z), so metric textures tile at true scale.
 */
export function metricBox(w: number, h: number, d: number) {
  const g = new THREE.BoxGeometry(w, h, d);
  const pos = g.attributes.position;
  const nrm = g.attributes.normal;
  const uv = g.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i) + w / 2;
    const y = pos.getY(i) + h / 2;
    const z = pos.getZ(i) + d / 2;
    if (Math.abs(nrm.getY(i)) > 0.5) uv.setXY(i, x, z);
    else if (Math.abs(nrm.getX(i)) > 0.5) uv.setXY(i, z, y);
    else uv.setXY(i, x, y);
  }
  return g;
}

/** Plane with metric UVs (lies in XY; rotate as needed). */
export function metricPlane(w: number, h: number) {
  const g = new THREE.PlaneGeometry(w, h);
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * w, uv.getY(i) * h);
  return g;
}
