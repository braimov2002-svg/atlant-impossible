import * as THREE from "three";
import type { BuildingKind, BuildingSpec } from "@/data/projects";

/*
 * Procedural building generators. Every building is a list of `Part`s
 * (geometry + material role + transform) plus one merged blueprint line set.
 * Units: 1 storey = FLOOR_H; facade UVs are in "cells" (bay × storey) so the
 * 8×8 canvas textures tile at true architectural scale on any mass.
 */

export const FLOOR_H = 0.1;
const BAY = 0.14; // facade bay width

export type MaterialRole =
  | "curtain"
  | "residential"
  | "office"
  | "industrial"
  | "stone"
  | "concrete"
  | "titanium"
  | "gold"
  | "roof"
  | "green"
  | "dome"
  | "asphalt";

export interface Part {
  geometry: THREE.BufferGeometry;
  /** One role, or one per geometry group (boxes: +x −x +y −y +z −z) */
  role: MaterialRole | MaterialRole[];
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export interface BuildingModel {
  parts: Part[];
  lines: THREE.BufferGeometry;
  height: number;
  /** Half-extents of the footprint, for camera framing and the scan ring */
  halfX: number;
  halfZ: number;
}

/* ───────────────────────────── helpers ───────────────────────────── */

function rng(seed: number) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/** Box whose side UVs are in facade cells; top/bottom collapse to a corner. */
export function facadeBox(w: number, h: number, d: number) {
  const g = new THREE.BoxGeometry(w, h, d);
  const pos = g.attributes.position;
  const nrm = g.attributes.normal;
  const uv = g.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    if (Math.abs(nrm.getY(i)) > 0.5) uv.setXY(i, 0.01, 0.01);
    else if (Math.abs(nrm.getX(i)) > 0.5) uv.setXY(i, (z + d / 2) / BAY, (y + h / 2) / FLOOR_H);
    else uv.setXY(i, (x + w / 2) / BAY, (y + h / 2) / FLOOR_H);
  }
  return g;
}

const SIDES = (facade: MaterialRole, roof: MaterialRole = "roof"): MaterialRole[] => [facade, facade, roof, roof, facade, facade];

/** Super-ellipse (|x|ⁿ + |z|ⁿ = 1) — a softened square, the tower's floor plate. */
export function superellipse(segments: number, n = 4): [number, number][] {
  return Array.from({ length: segments }, (_, i) => {
    const t = (i / segments) * Math.PI * 2;
    const c = Math.cos(t);
    const s = Math.sin(t);
    return [Math.sign(c) * Math.abs(c) ** (2 / n), Math.sign(s) * Math.abs(s) ** (2 / n)];
  });
}

export interface TowerOptions {
  floors: number;
  baseY: number;
  r0: number;
  taper: number;
  twist: number;
  segments?: number;
}

/** Plate transform for storey k of a twisted, tapering tower. */
export function towerLevel(o: TowerOptions, k: number) {
  const t = k / o.floors;
  return { y: o.baseY + k * FLOOR_H, scale: 1 - o.taper * t, angle: o.twist * t };
}

/** Lofted glass skin of a twisted tower (UVs in facade cells) + roof cap. */
export function twistedTower(o: TowerOptions) {
  const seg = o.segments ?? 64;
  const prof = superellipse(seg);
  const cum = [0];
  for (let j = 1; j <= seg; j++) {
    const a = prof[j - 1];
    const b = prof[j % seg];
    cum.push(cum[j - 1] + Math.hypot(b[0] - a[0], b[1] - a[1]));
  }

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  for (let k = 0; k <= o.floors; k++) {
    const { y, scale, angle } = towerLevel(o, k);
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const r = o.r0 * scale;
    for (let j = 0; j <= seg; j++) {
      const [px, pz] = prof[j % seg];
      const x = px * r;
      const z = pz * r;
      positions.push(x * c - z * s, y, x * s + z * c);
      uvs.push((cum[j] * r) / BAY, k);
    }
  }
  for (let k = 0; k < o.floors; k++) {
    for (let j = 0; j < seg; j++) {
      const a = k * (seg + 1) + j;
      const b = a + seg + 1;
      indices.push(a, a + 1, b, b, a + 1, b + 1);
    }
  }
  const skin = new THREE.BufferGeometry();
  skin.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  skin.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  skin.setIndex(indices);
  skin.computeVertexNormals();
  // Make sure normals face outward (winding depends on profile direction)
  const n0 = new THREE.Vector3().fromBufferAttribute(skin.attributes.normal as THREE.BufferAttribute, 0);
  const p0 = new THREE.Vector3().fromBufferAttribute(skin.attributes.position as THREE.BufferAttribute, 0).setY(0);
  if (n0.dot(p0) < 0) {
    const idx = skin.index!;
    for (let i = 0; i < idx.count; i += 3) {
      const t = idx.getX(i + 1);
      idx.setX(i + 1, idx.getX(i + 2));
      idx.setX(i + 2, t);
    }
    skin.computeVertexNormals();
  }

  // Roof cap: triangle fan at the top plate
  const top = towerLevel(o, o.floors);
  const capPos: number[] = [0, top.y, 0];
  const c = Math.cos(top.angle);
  const s = Math.sin(top.angle);
  prof.forEach(([px, pz]) => {
    const x = px * o.r0 * top.scale;
    const z = pz * o.r0 * top.scale;
    capPos.push(x * c - z * s, top.y, x * s + z * c);
  });
  const capIdx: number[] = [];
  for (let j = 1; j <= seg; j++) capIdx.push(0, (j % seg) + 1, j);
  const cap = new THREE.BufferGeometry();
  cap.setAttribute("position", new THREE.Float32BufferAttribute(capPos, 3));
  cap.setIndex(capIdx);
  cap.computeVertexNormals();

  return { skin, cap, profile: prof };
}

/* ───────────────────────── blueprint line builder ───────────────────────── */

class LineSet {
  private pts: number[] = [];
  seg(a: THREE.Vector3Like, b: THREE.Vector3Like) {
    this.pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
  }
  /** Edges of a (transformed) geometry — creases above `angle` degrees */
  edges(g: THREE.BufferGeometry, position: [number, number, number] = [0, 0, 0], rotation: [number, number, number] = [0, 0, 0], angle = 25) {
    const e = new THREE.EdgesGeometry(g, angle);
    const m = new THREE.Matrix4().compose(
      new THREE.Vector3(...position),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(...rotation)),
      new THREE.Vector3(1, 1, 1),
    );
    e.applyMatrix4(m);
    const a = e.attributes.position.array as Float32Array;
    for (let i = 0; i < a.length; i++) this.pts.push(a[i]);
    e.dispose();
  }
  build() {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.pts, 3));
    return g;
  }
}

/** Blueprint for a twisted tower: every floor plate outline + twisting column lines. */
export function towerLines(set: LineSet, o: TowerOptions, profile: [number, number][], columnEvery = 8) {
  const seg = profile.length;
  const at = (k: number, j: number, grow = 1.004) => {
    const { y, scale, angle } = towerLevel(o, k);
    const [px, pz] = profile[j % seg];
    const x = px * o.r0 * scale * grow;
    const z = pz * o.r0 * scale * grow;
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return new THREE.Vector3(x * c - z * s, y, x * s + z * c);
  };
  for (let k = 0; k <= o.floors; k++) {
    for (let j = 0; j < seg; j += 2) set.seg(at(k, j), at(k, j + 2));
  }
  for (let k = 0; k < o.floors; k++) {
    for (let j = 0; j < seg; j += columnEvery) set.seg(at(k, j, 0.93), at(k + 1, j, 0.93));
  }
}

/* ───────────────────────────── generators ───────────────────────────── */

function twistTower(spec: BuildingSpec): BuildingModel {
  const set = new LineSet();
  const parts: Part[] = [];
  const podiumH = 0.4;
  const r0 = 0.55;
  const opts: TowerOptions = { floors: spec.floors, baseY: podiumH, r0, taper: 0.22, twist: spec.twist ?? 1.2 };
  const { skin, cap, profile } = twistedTower(opts);
  parts.push({ geometry: skin, role: "curtain" }, { geometry: cap, role: "roof" });
  towerLines(set, opts, profile);

  const podium = facadeBox(r0 * 3.2, podiumH, r0 * 2.6);
  parts.push({ geometry: podium, role: SIDES("office"), position: [0, podiumH / 2, 0] });
  set.edges(podium, [0, podiumH / 2, 0]);
  const canopy = new THREE.BoxGeometry(r0 * 3.4, 0.025, r0 * 2.8);
  parts.push({ geometry: canopy, role: "gold", position: [0, podiumH + 0.012, 0] });

  // Crown: champagne fins + spire
  const top = towerLevel(opts, opts.floors);
  const fin = new THREE.BoxGeometry(0.018, 0.34, 0.07);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 + top.angle;
    const r = r0 * top.scale * 0.88;
    parts.push({ geometry: fin, role: "gold", position: [Math.cos(a) * r, top.y + 0.17, Math.sin(a) * r], rotation: [0, -a, 0] });
  }
  const spire = new THREE.CylinderGeometry(0.008, 0.03, 0.6, 8);
  parts.push({ geometry: spire, role: "gold", position: [0, top.y + 0.3, 0] });
  set.seg({ x: 0, y: top.y, z: 0 }, { x: 0, y: top.y + 0.6, z: 0 });

  return { parts, lines: set.build(), height: top.y + 0.6, halfX: r0 * 1.7, halfZ: r0 * 1.4 };
}

function twinResidential(spec: BuildingSpec): BuildingModel {
  const set = new LineSet();
  const parts: Part[] = [];
  const r = rng(spec.seed);
  const podiumH = 0.3;
  const podium = facadeBox(3, podiumH, 1.5);
  parts.push({ geometry: podium, role: SIDES("office", "green"), position: [0, podiumH / 2, 0] });
  set.edges(podium, [0, podiumH / 2, 0]);

  [-0.78, 0.78].forEach((x, i) => {
    const floors = Math.round(spec.floors * (i ? 0.84 + r() * 0.1 : 1));
    const h = floors * FLOOR_H;
    const tower = facadeBox(0.95, h, 0.8);
    const pos: [number, number, number] = [x, podiumH + h / 2, (i ? 0.12 : -0.1)];
    parts.push({ geometry: tower, role: SIDES("residential"), position: pos });
    set.edges(tower, pos);
    for (let k = 1; k < floors; k++) {
      const y = podiumH + k * FLOOR_H;
      set.seg({ x: x - 0.476, y, z: pos[2] + 0.401 }, { x: x + 0.476, y, z: pos[2] + 0.401 });
    }
    // Balcony slabs every 3rd storey on the south face
    const balcony = new THREE.BoxGeometry(0.99, 0.018, 0.12);
    for (let k = 2; k < floors; k += 3) {
      parts.push({ geometry: balcony, role: "titanium", position: [x, podiumH + k * FLOOR_H, pos[2] + 0.44] });
    }
    // Technical crown
    const crown = new THREE.BoxGeometry(0.6, 0.12, 0.5);
    const cp: [number, number, number] = [x, podiumH + h + 0.06, pos[2]];
    parts.push({ geometry: crown, role: "titanium", position: cp });
    const frame = new THREE.BoxGeometry(0.99, 0.02, 0.84);
    parts.push({ geometry: frame, role: "gold", position: [x, podiumH + h + 0.01, pos[2]] });
    set.edges(crown, cp);
  });
  const height = podiumH + spec.floors * FLOOR_H + 0.12;
  return { parts, lines: set.build(), height, halfX: 1.5, halfZ: 0.8 };
}

function steppedOffice(spec: BuildingSpec): BuildingModel {
  const set = new LineSet();
  const parts: Part[] = [];
  const tiers = 4;
  const per = Math.max(2, Math.round(spec.floors / tiers));
  let y = 0;
  let w = 2.4;
  let d = 1.6;
  for (let i = 0; i < tiers; i++) {
    const h = per * FLOOR_H;
    const box = facadeBox(w, h, d);
    const pos: [number, number, number] = [-i * 0.12, y + h / 2, i * 0.1];
    parts.push({ geometry: box, role: SIDES("office", i === tiers - 1 ? "roof" : "green"), position: pos });
    set.edges(box, pos);
    const rail = new THREE.BoxGeometry(w + 0.02, 0.02, d + 0.02);
    parts.push({ geometry: rail, role: "gold", position: [pos[0], y + h, pos[2]] });
    y += h;
    w -= 0.46;
    d -= 0.26;
  }
  return { parts, lines: set.build(), height: y, halfX: 1.25, halfZ: 0.85 };
}

function industrial(spec: BuildingSpec): BuildingModel {
  const set = new LineSet();
  const parts: Part[] = [];
  const hallH = 0.32 + spec.floors * 0.08;
  const hall = facadeBox(3.4, hallH, 2);
  parts.push({ geometry: hall, role: SIDES("industrial"), position: [0, hallH / 2, 0] });
  set.edges(hall, [0, hallH / 2, 0]);

  // Saw-tooth north-light roof
  const tooth = new THREE.Shape();
  tooth.moveTo(0, 0);
  tooth.lineTo(0.42, 0);
  tooth.lineTo(0.42, 0.24);
  tooth.closePath();
  const prism = new THREE.ExtrudeGeometry(tooth, { depth: 2, bevelEnabled: false });
  prism.translate(0, 0, -1);
  for (let i = 0; i < 8; i++) {
    const pos: [number, number, number] = [-1.7 + i * 0.425, hallH, 0];
    parts.push({ geometry: prism, role: ["titanium", "curtain"], position: pos });
    set.edges(prism, pos);
  }
  // Silos + admin block
  const silo = new THREE.CylinderGeometry(0.22, 0.22, 1.1, 24);
  for (let i = 0; i < 3; i++) {
    const pos: [number, number, number] = [2.05, 0.55, -0.6 + i * 0.55];
    parts.push({ geometry: silo, role: "titanium", position: pos });
    set.edges(silo, pos, [0, 0, 0], 40);
    set.seg({ x: pos[0] - 0.22, y: 0, z: pos[2] }, { x: pos[0] - 0.22, y: 1.1, z: pos[2] });
    set.seg({ x: pos[0] + 0.22, y: 0, z: pos[2] }, { x: pos[0] + 0.22, y: 1.1, z: pos[2] });
  }
  const admin = facadeBox(0.9, 0.42, 0.7);
  parts.push({ geometry: admin, role: SIDES("office"), position: [-2.2, 0.21, 0.5] });
  set.edges(admin, [-2.2, 0.21, 0.5]);
  return { parts, lines: set.build(), height: hallH + 0.26, halfX: 2.6, halfZ: 1.1 };
}

function courtyard(spec: BuildingSpec): BuildingModel {
  const set = new LineSet();
  const parts: Part[] = [];
  const h = spec.floors * FLOOR_H;
  const S = 2.2;
  const T = 0.5;
  const wings: [number, number, number, number][] = [
    [0, -S / 2 + T / 2, S, T],
    [0, S / 2 - T / 2, S, T],
    [-S / 2 + T / 2, 0, T, S - 2 * T],
    [S / 2 - T / 2, 0, T, S - 2 * T],
  ];
  wings.forEach(([x, z, w, d]) => {
    const b = facadeBox(w, h, d);
    const pos: [number, number, number] = [x, h / 2, z];
    parts.push({ geometry: b, role: SIDES("stone"), position: pos });
    set.edges(b, pos);
  });
  // Corner pavilions with turquoise domes (Bukhara vernacular)
  const tower = facadeBox(0.62, h + 0.16, 0.62);
  const dome = new THREE.SphereGeometry(0.24, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2);
  [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ].forEach(([sx, sz]) => {
    const p: [number, number, number] = [sx * (S / 2 - 0.25), (h + 0.16) / 2, sz * (S / 2 - 0.25)];
    parts.push({ geometry: tower, role: SIDES("stone"), position: p });
    parts.push({ geometry: dome, role: "dome", position: [p[0], h + 0.16, p[2]] });
    set.edges(tower, p);
    set.edges(dome, [p[0], h + 0.16, p[2]], [0, 0, 0], 30);
  });
  const court = new THREE.PlaneGeometry(S - 2 * T, S - 2 * T);
  parts.push({ geometry: court, role: "green", position: [0, 0.01, 0], rotation: [-Math.PI / 2, 0, 0] });
  return { parts, lines: set.build(), height: h + 0.4, halfX: S / 2, halfZ: S / 2 };
}

function bridge(spec: BuildingSpec): BuildingModel {
  const set = new LineSet();
  const parts: Part[] = [];
  const r = rng(spec.seed);
  const spans = 6;
  const L = 6.2;
  const deckY = 0.62;
  const deck = new THREE.BoxGeometry(L, 0.1, 0.7);
  parts.push({ geometry: deck, role: "concrete", position: [0, deckY, 0] });
  set.edges(deck, [0, deckY, 0]);
  const barrier = new THREE.BoxGeometry(L, 0.06, 0.04);
  [-0.33, 0.33].forEach((z) => parts.push({ geometry: barrier, role: "gold", position: [0, deckY + 0.08, z] }));
  const road = new THREE.PlaneGeometry(L * 0.98, 0.5);
  parts.push({ geometry: road, role: "asphalt", position: [0, deckY + 0.051, 0], rotation: [-Math.PI / 2, 0, 0] });
  for (let i = 1; i < spans; i++) {
    const x = -L / 2 + (i * L) / spans;
    const ph = deckY - 0.05;
    const pier = new THREE.BoxGeometry(0.16, ph, 0.34);
    const cap = new THREE.BoxGeometry(0.22, 0.08, 0.78);
    parts.push({ geometry: pier, role: "concrete", position: [x, ph / 2, 0] });
    parts.push({ geometry: cap, role: "titanium", position: [x, ph - 0.02, 0] });
    set.edges(pier, [x, ph / 2, 0]);
    set.edges(cap, [x, ph - 0.02, 0]);
  }
  // Road passing underneath + ramps
  const under = new THREE.PlaneGeometry(0.9, 3.4);
  parts.push({ geometry: under, role: "asphalt", position: [0.2 + r() * 0.2, 0.005, 0], rotation: [-Math.PI / 2, 0, 0.3] });
  // Light masts
  const mast = new THREE.CylinderGeometry(0.008, 0.012, 0.42, 6);
  for (let i = 0; i < 7; i++) {
    parts.push({ geometry: mast, role: "titanium", position: [-L / 2 + 0.3 + i * ((L - 0.6) / 6), deckY + 0.26, 0.31] });
  }
  return { parts, lines: set.build(), height: deckY + 0.5, halfX: L / 2, halfZ: 0.6 };
}

const GENERATORS: Record<BuildingKind, (s: BuildingSpec) => BuildingModel> = {
  "twist-tower": twistTower,
  "twin-residential": twinResidential,
  "stepped-office": steppedOffice,
  industrial,
  courtyard,
  bridge,
};

export function buildModel(spec: BuildingSpec): BuildingModel {
  return GENERATORS[spec.kind](spec);
}

export { LineSet };
