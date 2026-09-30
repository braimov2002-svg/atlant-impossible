/**
 * Generates the compact geo dataset used by <AgroGlobe />.
 *
 *   npm run globe:data
 *
 * Output: src/components/three/data/globe-data.json
 *  - landMask   bitmask over a Fibonacci sphere of FIB_N points (1 = land, not UZ)
 *  - uz.mask    bitmask over a lat/lon grid covering Uzbekistan (1 = inside UZ)
 *  - uzOutline  simplified border rings of Uzbekistan ([lon, lat] pairs)
 *
 * Storing bitmasks instead of coordinates keeps the payload ~10 KB: the client
 * re-derives every position from its index, so no geometry ships in JSON.
 * Point-in-polygon tests against land-50m take a few minutes — the output is committed.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { feature } from "topojson-client";
import { geoContains } from "d3-geo";

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../src/components/three/data/globe-data.json");

const FIB_N = 42000;
const UZ_ID = "860"; // ISO 3166-1 numeric — Uzbekistan
const UZ_GRID = { lonMin: 55.9, lonMax: 73.2, latMin: 37.1, latMax: 45.65, step: 0.16 };

const land = feature(
  JSON.parse(readFileSync(require.resolve("world-atlas/land-50m.json"), "utf8")),
  "land",
);
const countries50 = JSON.parse(readFileSync(require.resolve("world-atlas/countries-50m.json"), "utf8"));
const uz = feature(countries50, countries50.objects.countries).features.find((f) => f.id === UZ_ID);
if (!uz) throw new Error("Uzbekistan not found in world-atlas");

/** Same convention as src/lib/geo.ts → latLonToVec3 */
function fibonacciLatLon(i, n) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - ((i + 0.5) * 2) / n;
  const r = Math.sqrt(1 - y * y);
  const t = i * golden;
  const x = Math.cos(t) * r;
  const z = Math.sin(t) * r;
  const lat = 90 - (Math.acos(y) * 180) / Math.PI;
  let lon = (Math.atan2(z, -x) * 180) / Math.PI - 180;
  if (lon < -180) lon += 360;
  return [lon, lat];
}

function toBase64(bits) {
  const bytes = new Uint8Array(Math.ceil(bits.length / 8));
  bits.forEach((b, i) => {
    if (b) bytes[i >> 3] |= 1 << (i & 7);
  });
  return Buffer.from(bytes).toString("base64");
}

// 1) Land mask on Fibonacci sphere (Uzbekistan excluded — it gets its own dense grid)
const landBits = new Array(FIB_N).fill(0);
let landCount = 0;
for (let i = 0; i < FIB_N; i++) {
  const p = fibonacciLatLon(i, FIB_N);
  if (geoContains(land, p) && !geoContains(uz, p)) {
    landBits[i] = 1;
    landCount++;
  }
}

// 2) Dense Uzbekistan grid (staggered rows read as a hex-like dot matrix)
const cols = Math.round((UZ_GRID.lonMax - UZ_GRID.lonMin) / UZ_GRID.step);
const rows = Math.round((UZ_GRID.latMax - UZ_GRID.latMin) / UZ_GRID.step);
const uzBits = new Array(cols * rows).fill(0);
let uzCount = 0;
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const lon = UZ_GRID.lonMin + (c + (r % 2 ? 0.5 : 0)) * UZ_GRID.step;
    const lat = UZ_GRID.latMin + r * UZ_GRID.step;
    if (geoContains(uz, [lon, lat])) {
      uzBits[r * cols + c] = 1;
      uzCount++;
    }
  }
}

// 3) Border outline — keep rings with enough vertices, decimate + round
const polys = uz.geometry.type === "MultiPolygon" ? uz.geometry.coordinates : [uz.geometry.coordinates];
const uzOutline = polys
  .map((poly) => poly[0])
  .filter((ring) => ring.length > 12)
  .map((ring) => ring.filter((_, i) => i % 2 === 0).map(([lon, lat]) => [+lon.toFixed(2), +lat.toFixed(2)]));

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(
  OUT,
  JSON.stringify({
    fibN: FIB_N,
    landMask: toBase64(landBits),
    uz: { ...UZ_GRID, cols, rows, mask: toBase64(uzBits) },
    uzOutline,
  }),
);

console.log(
  `globe-data.json → land dots: ${landCount}, UZ dots: ${uzCount}, outline rings: ${uzOutline.length} (${uzOutline
    .map((r) => r.length)
    .join("/")} pts)`,
);
