"use client";

import { useLayoutEffect, useMemo } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { TEX, hoardingTexture, metricBox, metricPlane } from "./textures";

/*
 * ConstructionScene — daylight arch-viz of an R+4 residential block that
 * builds itself as `progress` goes 0 → 1, then the camera flies onto a
 * terrace and into an apartment. It is rendered OFFLINE into an image
 * sequence (see /render + scripts/render-sequence.mjs); the website plays the
 * frames with <ScrollSequence/>. Everything is a pure function of `progress`,
 * so any frame can be re-rendered deterministically.
 *
 *   progress  0.00–0.78  exterior timelapse (t = progress / 0.78)
 *             t 0.00–0.10  empty plot (hoarding, excavator)
 *             t 0.10–0.20  foundation raft + starter bars, crane rises
 *             t 0.20–0.60  concrete frame, level by level (red formwork, scaffold)
 *             t 0.46–0.76  envelope: limestone bands, glazing, balustrades
 *             t 0.80–1.00  site cleared: planters, trees, landscaping
 *   progress  0.78–1.00  camera → terrace → through the glass → interior
 */

export type SequenceAspect = "landscape" | "portrait";

const FLOOR = 3.2;
const LEVELS = 5; // R+4
const X0 = -7.5;
const X1 = 7.5;
const ZB = -10; // back
const ZG = -1.2; // glazing line
const ZT = 0.8; // terrace edge
const COLS_X = [-7.1, -2.4, 2.4, 7.1];
const COLS_Z = [-9.6, -5.4, -1.4];
const APARTMENT_LEVEL = 2;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const band = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const ease = (t: number) => t * t * (3 - 2 * t);
const lerp = THREE.MathUtils.lerp;

function rng(seed: number) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/* ───────────────────────────── materials ───────────────────────────── */

let MATS: ReturnType<typeof createMats> | null = null;
function createMats() {
  const std = (p: THREE.MeshStandardMaterialParameters) => new THREE.MeshStandardMaterial(p);
  return {
    stone: std({ map: TEX.stone(), roughness: 0.78 }),
    concrete: std({ map: TEX.concrete(), roughness: 0.92 }),
    formwork: std({ map: TEX.formwork(), roughness: 0.7 }),
    dirt: std({ map: TEX.dirt(), roughness: 1 }),
    asphalt: std({ map: TEX.asphalt(), roughness: 0.95 }),
    pavers: std({ map: TEX.pavers(), roughness: 0.85 }),
    grass: std({ map: TEX.grass(), roughness: 1 }),
    rubble: std({ map: TEX.rubble(), roughness: 0.95 }),
    quoin: std({ color: "#cfc6b4", roughness: 0.85 }),
    slate: std({ map: TEX.slate(), roughness: 0.7 }),
    tiles: std({ map: TEX.tiles(), roughness: 0.85 }),
    render: std({ map: TEX.render(), roughness: 0.95 }),
    oak: std({ map: TEX.oak(), roughness: 0.55 }),
    walnut: std({ map: TEX.walnut(), roughness: 0.5 }),
    wall: std({ color: "#f1ede6", roughness: 0.92 }),
    ceiling: std({ color: "#f6f4ef", roughness: 0.95 }),
    fabric: std({ color: "#cfc3b0", roughness: 1 }),
    countertop: std({ color: "#e7e3dc", roughness: 0.25 }),
    frame: std({ color: "#2b2f35", roughness: 0.45, metalness: 0.6 }),
    whiteFrame: std({ color: "#eeeeea", roughness: 0.6 }),
    canopy: std({ color: "#2a2e33", roughness: 0.5, metalness: 0.5 }),
    black: std({ color: "#15171a", roughness: 0.4, metalness: 0.5 }),
    steel: std({ color: "#9aa0a6", roughness: 0.45, metalness: 0.8 }),
    rebar: std({ color: "#5d4a3c", roughness: 0.7, metalness: 0.5 }),
    crane: std({ color: "#e3b51f", roughness: 0.55, metalness: 0.2 }),
    machine: std({ color: "#e0a81c", roughness: 0.5, metalness: 0.2 }),
    planter: std({ color: "#b8b2a6", roughness: 0.9 }),
    soil: std({ color: "#3b2f25", roughness: 1 }),
    trunk: std({ color: "#5b4f45", roughness: 1 }),
    leaves: std({ map: TEX.leaves(), vertexColors: true, alphaTest: 0.42, side: THREE.DoubleSide, roughness: 0.82 }),
    grassBlade: std({ color: "#9aa56a", roughness: 0.9, side: THREE.DoubleSide }),
    cabin: std({ color: "#eef0f1", roughness: 0.6, metalness: 0.2 }),
    cabinStripe: std({ color: "#2f5d8a", roughness: 0.6 }),
    ceilingGlow: std({ color: "#fff4e0", emissive: new THREE.Color("#ffe2b8"), emissiveIntensity: 1.4 }),
    hoarding: std({ map: hoardingTexture(), roughness: 0.7 }),
    pallet: std({ color: "#b08a5a", roughness: 0.9 }),
    sand: std({ color: "#c9b28a", roughness: 1 }),
    lamp: std({ color: "#fff1d6", emissive: new THREE.Color("#ffd9a0"), emissiveIntensity: 0.6, roughness: 0.3 }),
    pendant: std({ color: "#1d1f22", roughness: 0.4, metalness: 0.6 }),
    art: std({ color: "#c9b28f", roughness: 0.9 }),
    room: std({ color: "#8e877c", roughness: 0.95, side: THREE.BackSide }),
    curtain: std({ color: "#f3efe7", roughness: 1, side: THREE.DoubleSide }),
    glass: new THREE.MeshPhysicalMaterial({
      color: "#d3e0e6",
      metalness: 0,
      roughness: 0.02,
      transmission: 0.74,
      thickness: 0.02,
      ior: 1.52,
      envMapIntensity: 2.2,
      specularIntensity: 1,
    }),
    glassDark: new THREE.MeshPhysicalMaterial({ color: "#4d5b66", metalness: 0.2, roughness: 0.05, envMapIntensity: 1.8, clearcoat: 1 }),
    railGlass: new THREE.MeshPhysicalMaterial({
      color: "#e7f2ef",
      roughness: 0.05,
      transmission: 0.92,
      thickness: 0.01,
      envMapIntensity: 1.2,
    }),
  };
}
export const getMats = () => (MATS ??= createMats());
type Mats = ReturnType<typeof createMats>;

/* ───────────────────────────── helpers ───────────────────────────── */

type V3 = [number, number, number];

/** Box by min/max corners (metres) with metric UVs. */
function B({ a, b, m, cast = true, receive = true }: { a: V3; b: V3; m: THREE.Material; cast?: boolean; receive?: boolean }) {
  const size: V3 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const geo = useMemo(() => metricBox(size[0], size[1], size[2]), [size[0], size[1], size[2]]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <mesh
      geometry={geo}
      material={m}
      position={[(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]}
      castShadow={cast}
      receiveShadow={receive}
    />
  );
}

/** Merge many transformed copies into one geometry (optionally vertex-coloured). */
function merged(parts: { g: THREE.BufferGeometry; m: THREE.Matrix4; c?: THREE.Color }[]) {
  const list = parts.map(({ g, m, c }) => {
    const x = g.clone().applyMatrix4(m);
    if (c) {
      const n = x.attributes.position.count;
      const col = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) col.set([c.r, c.g, c.b], i * 3);
      x.setAttribute("color", new THREE.BufferAttribute(col, 3));
    }
    return x.index ? x.toNonIndexed() : x;
  });
  return mergeGeometries(list, false)!;
}

const M = (pos: V3, rot: V3 = [0, 0, 0], scale: V3 = [1, 1, 1]) =>
  new THREE.Matrix4().compose(new THREE.Vector3(...pos), new THREE.Quaternion().setFromEuler(new THREE.Euler(...rot)), new THREE.Vector3(...scale));

/** Member between two points (for lattices / scaffolding / rebar). */
function member(a: THREE.Vector3, b: THREE.Vector3, t: number) {
  const dir = b.clone().sub(a);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
  return new THREE.Matrix4().compose(a.clone().add(b).multiplyScalar(0.5), q, new THREE.Vector3(t, dir.length(), t));
}

/* ───────────────────────────── vegetation ───────────────────────────── */

const LEAF = ["#5d7a3c", "#6a8744", "#7a964d", "#56733a", "#86a257", "#4f6a35"].map((c) => new THREE.Color(c));

/**
 * Leaf-card canopy: alpha-tested cluster cards scattered in a few lumpy
 * sub-clumps. Normals point out of the canopy (soft, volumetric shading) and
 * vertex colours darken the inside/underside as cheap ambient occlusion.
 */
function leafCanopy(seed: number, cards: number, radii: V3, size: [number, number], palette = LEAF, clumps = 9) {
  const r = rng(seed);
  const centers = Array.from({ length: clumps }, () => {
    const a = r() * Math.PI * 2;
    const e = (r() - 0.35) * Math.PI * 0.7;
    const d = 0.35 + r() * 0.4;
    return {
      c: new THREE.Vector3(Math.cos(a) * Math.cos(e) * d * radii[0], Math.sin(e) * d * radii[1], Math.sin(a) * Math.cos(e) * d * radii[2]),
      k: 0.45 + r() * 0.3,
    };
  });
  const pos: number[] = [];
  const nrm: number[] = [];
  const uv: number[] = [];
  const col: number[] = [];
  const idx: number[] = [];
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const corners = [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]];
  const uvs = [[0, 0], [1, 0], [1, 1], [0, 1]];
  const v = new THREE.Vector3();
  const n = new THREE.Vector3();
  for (let i = 0; i < cards; i++) {
    const cl = centers[Math.floor(r() * clumps)];
    const a = r() * Math.PI * 2;
    const el = Math.acos(2 * r() - 1) - Math.PI / 2;
    const d = 1 - 0.55 * r() * r();
    const p = new THREE.Vector3(
      cl.c.x + Math.cos(a) * Math.cos(el) * d * radii[0] * cl.k,
      cl.c.y + Math.sin(el) * d * radii[1] * cl.k,
      cl.c.z + Math.sin(a) * Math.cos(el) * d * radii[2] * cl.k,
    );
    const s = size[0] + r() * (size[1] - size[0]);
    q.setFromEuler(e.set(r() * Math.PI, r() * Math.PI * 2, r() * Math.PI));
    // outward normal of the whole canopy (not the card)
    n.set(p.x / radii[0], p.y / radii[1] + 0.25, p.z / radii[2]).normalize();
    const depth = Math.min(1, Math.hypot(p.x / radii[0], p.y / radii[1], p.z / radii[2]));
    const shade = 0.55 + 0.45 * Math.min(1, depth * 0.75 + (p.y / radii[1] + 1) * 0.2);
    const base = palette[Math.floor(r() * palette.length)].clone().multiplyScalar(shade * (0.9 + r() * 0.2));
    const rot = Math.floor(r() * 4);
    const o = pos.length / 3;
    for (let k = 0; k < 4; k++) {
      v.set(corners[k][0] * s, corners[k][1] * s, 0).applyQuaternion(q).add(p);
      pos.push(v.x, v.y, v.z);
      nrm.push(n.x, n.y, n.z);
      const [u0, v0] = uvs[(k + rot) % 4];
      uv.push(u0, v0);
      col.push(base.r, base.g, base.b);
    }
    idx.push(o, o + 1, o + 2, o, o + 2, o + 3);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("normal", new THREE.Float32BufferAttribute(nrm, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(idx);
  return g;
}

/** Trunk + a few limbs reaching into the canopy, merged. */
function trunkGeometry(seed: number, height: number, spread: number) {
  const r = rng(seed + 100);
  const rod = new THREE.CylinderGeometry(0.5, 1, 1, 7);
  const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
  const trunkTop = height * 0.5;
  const base = Math.max(0.14, height * 0.028);
  const parts = [{ g: rod, m: member(V(0, 0, 0), V(0, trunkTop, 0), base * 2) }];
  for (let i = 0; i < 6; i++) {
    const a = r() * Math.PI * 2;
    const from = V(0, trunkTop * (0.75 + r() * 0.3), 0);
    const to = V(Math.cos(a) * spread * (0.4 + r() * 0.35), height * (0.62 + r() * 0.2), Math.sin(a) * spread * (0.4 + r() * 0.35));
    parts.push({ g: rod, m: member(from, to, base * (0.7 + r() * 0.4)) });
  }
  return merged(parts);
}

function Tree({ position, height = 9, spread = 3.4, seed = 1, cards = 900 }: { position: V3; height?: number; spread?: number; seed?: number; cards?: number }) {
  const mats = getMats();
  const canopy = useMemo(() => leafCanopy(seed, cards, [spread, height * 0.3, spread], [0.9, 1.5]), [seed, spread, height, cards]);
  const trunk = useMemo(() => trunkGeometry(seed, height, spread), [seed, height, spread]);
  return (
    <group position={position}>
      <mesh geometry={trunk} material={mats.trunk} castShadow receiveShadow />
      <mesh geometry={canopy} material={mats.leaves} position-y={height * 0.66} castShadow receiveShadow />
    </group>
  );
}

/** Low planting mass (shrubs + ornamental grass) filling an axis-aligned box. */
function shrubMass(seed: number, len: number, depth: number, height: number) {
  const parts: THREE.BufferGeometry[] = [];
  const r = rng(seed);
  const n = Math.max(1, Math.round(len / 0.9));
  for (let i = 0; i < n; i++) {
    const x = ((i + 0.5) / n) * len + (r() - 0.5) * 0.3;
    const h = height * (0.7 + r() * 0.5);
    const g = leafCanopy(seed * 31 + i, 70, [0.55, h * 0.5, depth * 0.5], [0.28, 0.46], LEAF, 3);
    g.translate(x, h * 0.45, 0);
    parts.push(g);
  }
  return mergeGeometries(parts, false)!;
}

function grassTufts(seed: number, len: number, depth: number) {
  const r = rng(seed);
  const blade = new THREE.PlaneGeometry(0.03, 1);
  blade.translate(0, 0.5, 0);
  const parts: { g: THREE.BufferGeometry; m: THREE.Matrix4 }[] = [];
  for (let x = 0.3; x < len - 0.2; x += 0.7 + r() * 0.8) {
    for (let k = 0; k < 14; k++) {
      parts.push({
        g: blade,
        m: M([x + (r() - 0.5) * 0.2, 0, (r() - 0.5) * depth * 0.6], [(r() - 0.5) * 0.7, r() * 3, (r() - 0.5) * 0.7], [1, 0.5 + r() * 0.5, 1]),
      });
    }
  }
  return merged(parts);
}

function PlanterRow({ a, b, seed }: { a: V3; b: V3; seed: number }) {
  const mats = getMats();
  const len = b[0] - a[0];
  const depth = b[2] - a[2];
  const plants = useMemo(() => shrubMass(seed, len, depth, 0.75), [len, depth, seed]);
  const grass = useMemo(() => grassTufts(seed + 7, len, depth), [len, depth, seed]);
  return (
    <group>
      <B a={[a[0], a[1], a[2]]} b={[b[0], a[1] + 0.45, b[2]]} m={mats.planter} />
      <group position={[a[0], a[1] + 0.4, (a[2] + b[2]) / 2]}>
        <mesh geometry={plants} material={mats.leaves} castShadow receiveShadow />
        <mesh geometry={grass} material={mats.grassBlade} castShadow />
      </group>
    </group>
  );
}

/* ───────────────────────────── building ───────────────────────────── */

/** Concrete frame for one storey (columns grow, then the slab drops in). */
function StructureLevel({ k, s, formwork }: { k: number; s: number; formwork: boolean }) {
  const mats = getMats();
  if (s <= 0) return null;
  const y0 = k * FLOOR;
  const colH = FLOOR - 0.3;
  const grow = Math.min(1, s / 0.6);
  const pent = k === LEVELS - 1;
  const xs = pent ? [-5.8, -0.5, 4.8] : COLS_X;
  const zs = pent ? [-8.8, -5.4, -2.4] : COLS_Z;
  const slabA: V3 = pent ? [-6.6, y0 + colH, -9.6] : [X0, y0 + colH, ZB];
  const slabB: V3 = pent ? [5.8, y0 + FLOOR, -1.2] : [X1, y0 + FLOOR, ZT];
  return (
    <group>
      {xs.flatMap((x) =>
        zs.map((z) => <B key={`${x}${z}`} a={[x - 0.2, y0, z - 0.2]} b={[x + 0.2, y0 + colH * grow, z + 0.2]} m={mats.concrete} />),
      )}
      {/* stair/lift core */}
      <B a={[-1.6, y0, -9.6]} b={[1.6, y0 + colH * grow, -6.6]} m={mats.concrete} />
      {s >= 0.6 && <B a={slabA} b={slabB} m={mats.concrete} />}
      {formwork && s >= 0.6 && (
        <group>
          <B a={[slabA[0] - 0.06, slabB[1] - 0.05, slabB[2]]} b={[slabB[0] + 0.06, slabB[1] + 0.85, slabB[2] + 0.06]} m={mats.formwork} />
          <B a={[slabB[0], slabB[1] - 0.05, slabA[2]]} b={[slabB[0] + 0.06, slabB[1] + 0.85, slabB[2]]} m={mats.formwork} />
          <Rebars y={slabB[1]} xs={xs} zs={zs} />
        </group>
      )}
    </group>
  );
}

function Rebars({ y, xs, zs }: { y: number; xs: number[]; zs: number[] }) {
  const mats = getMats();
  const geo = useMemo(() => {
    const rod = new THREE.CylinderGeometry(0.012, 0.012, 1, 5);
    const parts = xs.flatMap((x) =>
      zs.flatMap((z) =>
        [-0.12, 0.12].flatMap((dx) => [-0.12, 0.12].map((dz) => ({ g: rod, m: M([x + dx, 0.6, z + dz], [0, 0, 0], [1, 1.2, 1]) }))),
      ),
    );
    return merged(parts);
  }, [xs, zs]);
  return <mesh geometry={geo} material={mats.rebar} position-y={y} castShadow />;
}

/** Finished envelope for storey k (0 = ground floor, 4 = penthouse). */
function EnvelopeLevel({ k, e, planted }: { k: number; e: number; planted: boolean }) {
  const interior = k === APARTMENT_LEVEL;
  const mats = getMats();
  if (e <= 0) return null;
  const y0 = k * FLOOR;
  const floorTop = y0 + 0.3;
  const ceil = y0 + FLOOR - 0.25;
  const glazed = e > 0.45;
  const railed = e > 0.9;

  if (k === 0) {
    return (
      <group>
        <B a={[X0, 0, ZB]} b={[X1, 0.3, ZT]} m={mats.stone} />
        <B a={[X0, 0.3, ZB]} b={[X0 + 0.45, ceil, -0.6]} m={mats.stone} />
        <B a={[X1 - 0.45, 0.3, ZB]} b={[X1, ceil, -0.6]} m={mats.stone} />
        <B a={[1.2, 0.3, -1.8]} b={[1.8, ceil, -0.6]} m={mats.stone} />
        {glazed && (
          <>
            <Glazing x0={X0 + 0.45} x1={1.2} y0={floorTop} y1={ceil} z={-1.8} />
            <Glazing x0={1.8} x1={X1 - 0.45} y0={floorTop} y1={ceil} z={-1.8} />
            {/* entrance canopy */}
            <B a={[1.8, ceil - 0.3, -1.8]} b={[4.6, ceil - 0.18, 0.4]} m={mats.canopy} />
          </>
        )}
      </group>
    );
  }

  if (k === LEVELS - 1) {
    return (
      <group>
        <B a={[X0, y0 - 0.25, ZB]} b={[X1, floorTop, ZT]} m={mats.stone} />
        {glazed && (
          <>
            <Glazing x0={-6} x1={5} y0={floorTop} y1={y0 + FLOOR - 0.3} z={-2.2} />
            <B a={[-6, floorTop, -9]} b={[-5.8, y0 + FLOOR - 0.3, -2.2]} m={mats.frame} />
            <B a={[4.8, floorTop, -9]} b={[5, y0 + FLOOR - 0.3, -2.2]} m={mats.frame} />
            <B a={[-6.8, y0 + FLOOR - 0.3, -9.8]} b={[6, y0 + FLOOR + 0.05, -1.3]} m={mats.canopy} />
          </>
        )}
        {railed && <Railing x0={X0 + 0.1} x1={X1 - 0.1} y={floorTop} z={ZT - 0.08} />}
        {planted && (
          <>
            <PlanterRow a={[-7.2, floorTop, 0.05]} b={[-2.2, floorTop, 0.6]} seed={51 + k} />
            <PlanterRow a={[2.6, floorTop, 0.05]} b={[7.2, floorTop, 0.6]} seed={61 + k} />
          </>
        )}
      </group>
    );
  }

  // Typical residential floor: limestone slab band, cheeks, split terrace, glazing
  return (
    <group>
      <B a={[X0, y0 - 0.25, ZB]} b={[X1, floorTop, ZT]} m={mats.stone} />
      <B a={[X0, floorTop, ZB]} b={[X0 + 0.4, ceil, ZT]} m={mats.stone} />
      <B a={[X1 - 0.4, floorTop, ZB]} b={[X1, ceil, ZT]} m={mats.stone} />
      <B a={[-0.25, floorTop, ZG]} b={[0.25, ceil, ZT]} m={mats.stone} />
      {glazed && (
        <>
          <Glazing x0={X0 + 0.4} x1={-0.25} y0={floorTop} y1={ceil} z={ZG} />
          <Glazing x0={0.25} x1={X1 - 0.4} y0={floorTop} y1={ceil} z={ZG} room={!interior} />
          <SideWindows y0={floorTop} y1={ceil} />
        </>
      )}
      {railed && (
        <>
          <Railing x0={X0 + 0.4} x1={-0.25} y={floorTop} z={ZT - 0.06} />
          <Railing x0={0.25} x1={X1 - 0.4} y={floorTop} z={ZT - 0.06} />
        </>
      )}
      {planted && (
        <>
          <PlanterRow a={[X0 + 0.5, floorTop, 0.1]} b={[-3.6 + k * 0.4, floorTop, 0.62]} seed={11 + k} />
          <PlanterRow a={[3.2 - k * 0.3, floorTop, 0.1]} b={[X1 - 0.5, floorTop, 0.62]} seed={21 + k} />
        </>
      )}
    </group>
  );
}

/** Floor-to-ceiling glazing with slim anthracite mullions + a lit room behind. */
function Glazing({ x0, x1, y0, y1, z, room = true }: { x0: number; x1: number; y0: number; y1: number; z: number; room?: boolean }) {
  const mats = getMats();
  const w = x1 - x0;
  const n = Math.max(2, Math.round(w / 1.7));
  return (
    <group>
      {/* shallow room shell so the glass reads as depth, not a mirror */}
      {room && (
        <>
          <B a={[x0 + 0.05, y0, z - 4.2]} b={[x1 - 0.05, y1, z - 0.02]} m={mats.room} cast={false} />
          <B a={[x0 + 0.6, y1 - 0.04, z - 2.6]} b={[x1 - 0.6, y1 - 0.02, z - 2.3]} m={mats.ceilingGlow} cast={false} receive={false} />
          <Curtain x0={x0} x1={x1} y0={y0} y1={y1} z={z - 0.3} seed={Math.round((x0 + 20) * 7 + y0 * 13)} />
        </>
      )}
      <mesh material={mats.glass} position={[(x0 + x1) / 2, (y0 + y1) / 2, z]}>
        <planeGeometry args={[w, y1 - y0]} />
      </mesh>
      {Array.from({ length: n + 1 }, (_, i) => (
        <B key={i} a={[x0 + (i * w) / n - 0.03, y0, z - 0.04]} b={[x0 + (i * w) / n + 0.03, y1, z + 0.04]} m={mats.frame} />
      ))}
      <B a={[x0, y0, z - 0.04]} b={[x1, y0 + 0.06, z + 0.04]} m={mats.frame} />
      <B a={[x0, y1 - 0.06, z - 0.04]} b={[x1, y1, z + 0.04]} m={mats.frame} />
    </group>
  );
}

/** Opaque sheer drawn across part of a window, with soft folds. */
function Curtain({ x0, x1, y0, y1, z, seed }: { x0: number; x1: number; y0: number; y1: number; z: number; seed: number }) {
  const mats = getMats();
  const geo = useMemo(() => {
    const r = rng(seed);
    const w = (x1 - x0) * (0.22 + r() * 0.3);
    const g = new THREE.PlaneGeometry(w, y1 - y0 - 0.1, Math.ceil(w * 14), 1);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) p.setZ(i, Math.sin(p.getX(i) * 11 + seed) * 0.05);
    g.computeVertexNormals();
    const left = r() < 0.5;
    g.translate(left ? x0 + 0.1 + w / 2 : x1 - 0.1 - w / 2, (y0 + y1) / 2 - 0.02, z);
    return g;
  }, [x0, x1, y0, y1, z, seed]);
  return <mesh geometry={geo} material={mats.curtain} receiveShadow />;
}

function SideWindows({ y0, y1 }: { y0: number; y1: number }) {
  const mats = getMats();
  return (
    <group>
      {[-8.4, -5.6, -3.2].map((z) => (
        <B key={z} a={[X1 + 0.005, y0 + 0.4, z - 0.6]} b={[X1 + 0.02, y1 - 0.2, z + 0.6]} m={mats.glassDark} cast={false} />
      ))}
    </group>
  );
}

function Railing({ x0, x1, y, z }: { x0: number; x1: number; y: number; z: number }) {
  const mats = getMats();
  return (
    <group>
      <mesh material={mats.railGlass} position={[(x0 + x1) / 2, y + 0.55, z]}>
        <boxGeometry args={[x1 - x0, 1.05, 0.02]} />
      </mesh>
      <B a={[x0, y + 1.06, z - 0.03]} b={[x1, y + 1.1, z + 0.03]} m={mats.frame} cast={false} />
    </group>
  );
}

/* ───────────────────────────── construction kit ───────────────────────────── */

function TowerCrane({ height, jib }: { height: number; jib: number }) {
  const mats = getMats();
  const geo = useMemo(() => {
    const unit = new THREE.BoxGeometry(1, 1, 1);
    const parts: { g: THREE.BufferGeometry; m: THREE.Matrix4 }[] = [];
    const s = 0.8;
    const seg = 1.6;
    const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
    for (let y = 0; y < height; y += seg) {
      [[-s, -s], [s, -s], [s, s], [-s, s]].forEach(([x, z]) => parts.push({ g: unit, m: member(V(x, y, z), V(x, y + seg, z), 0.12) }));
      parts.push({ g: unit, m: member(V(-s, y, -s), V(s, y + seg, -s), 0.06) });
      parts.push({ g: unit, m: member(V(s, y, -s), V(s, y + seg, s), 0.06) });
      parts.push({ g: unit, m: member(V(s, y, s), V(-s, y + seg, s), 0.06) });
      parts.push({ g: unit, m: member(V(-s, y, s), V(-s, y + seg, -s), 0.06) });
    }
    return merged(parts);
  }, [height]);
  const jibGeo = useMemo(() => {
    const unit = new THREE.BoxGeometry(1, 1, 1);
    const parts: { g: THREE.BufferGeometry; m: THREE.Matrix4 }[] = [];
    const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
    const L = 30;
    parts.push({ g: unit, m: member(V(-10, 0, -0.5), V(L, 0, -0.5), 0.1) });
    parts.push({ g: unit, m: member(V(-10, 0, 0.5), V(L, 0, 0.5), 0.1) });
    parts.push({ g: unit, m: member(V(-10, 1.3, 0), V(L, 1.3, 0), 0.1) });
    for (let x = -10; x < L; x += 1.5) {
      parts.push({ g: unit, m: member(V(x, 0, -0.5), V(x + 0.75, 1.3, 0), 0.05) });
      parts.push({ g: unit, m: member(V(x + 0.75, 1.3, 0), V(x + 1.5, 0, 0.5), 0.05) });
    }
    parts.push({ g: unit, m: member(V(0, 0, 0), V(0, 5, 0), 0.4) });
    parts.push({ g: unit, m: member(V(0, 5, 0), V(L * 0.7, 1.3, 0), 0.04) });
    parts.push({ g: unit, m: member(V(0, 5, 0), V(-9, 1.3, 0), 0.04) });
    return merged(parts);
  }, []);
  return (
    <group position={[5.5, 0, -14]}>
      <mesh geometry={geo} material={mats.crane} castShadow />
      <group position-y={height} rotation-y={jib}>
        <mesh geometry={jibGeo} material={mats.crane} castShadow />
        <B a={[-10, -1.6, -1]} b={[-7.5, 0, 1]} m={mats.concrete} />
        <B a={[0.9, -1.8, -0.9]} b={[2.4, -0.2, 0.9]} m={mats.crane} />
        <mesh material={mats.black} position={[16, -8, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 16, 4]} />
        </mesh>
        <B a={[15.7, -16.4, -0.3]} b={[16.3, -15.8, 0.3]} m={mats.formwork} />
      </group>
    </group>
  );
}

function Scaffolding({ top }: { top: number }) {
  const mats = getMats();
  const h = Math.ceil(top / 2) * 2;
  const geo = useMemo(() => {
    const tube = new THREE.CylinderGeometry(0.03, 0.03, 1, 6);
    const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
    const parts: { g: THREE.BufferGeometry; m: THREE.Matrix4 }[] = [];
    const xs = [X1 + 0.35, X1 + 1.35];
    for (let z = ZB; z <= ZT + 0.8; z += 2.2) xs.forEach((x) => parts.push({ g: tube, m: member(V(x, 0, z), V(x, h, z), 1) }));
    for (let y = 2; y <= h; y += 2) {
      xs.forEach((x) => parts.push({ g: tube, m: member(V(x, y, ZB), V(x, y, ZT + 0.8), 1) }));
      for (let z = ZB; z <= ZT + 0.8; z += 2.2) parts.push({ g: tube, m: member(V(xs[0], y, z), V(xs[1], y, z), 1) });
    }
    // front return
    for (let x = 2.6; x <= X1 + 1.35; x += 2.2) parts.push({ g: tube, m: member(V(x, 0, ZT + 1.6), V(x, h, ZT + 1.6), 1) });
    for (let y = 2; y <= h; y += 2) parts.push({ g: tube, m: member(V(2.6, y, ZT + 1.6), V(X1 + 1.35, y, ZT + 1.6), 1) });
    return merged(parts);
  }, [h]);
  return (
    <group>
      <mesh geometry={geo} material={mats.steel} castShadow />
      {Array.from({ length: h / 2 }, (_, i) => (
        <group key={i}>
          <B a={[X1 + 0.35, (i + 1) * 2, ZB]} b={[X1 + 1.35, (i + 1) * 2 + 0.05, ZT + 0.8]} m={mats.pallet} />
          <B a={[X1 + 1.33, (i + 1) * 2 + 0.05, ZB]} b={[X1 + 1.37, (i + 1) * 2 + 0.2, ZT + 0.8]} m={mats.formwork} cast={false} />
        </group>
      ))}
    </group>
  );
}

function Excavator() {
  const mats = getMats();
  return (
    <group position={[-2.5, 0, -3]} rotation-y={0.6}>
      <B a={[-1.6, 0, -1.1]} b={[1.6, 0.7, 1.1]} m={mats.black} />
      <B a={[-1.3, 0.7, -1]} b={[1.3, 1.6, 1]} m={mats.machine} />
      <B a={[0.1, 1.6, -0.9]} b={[1.2, 2.8, 0.2]} m={mats.machine} />
      <mesh material={mats.machine} position={[-2.2, 2.3, 0.4]} rotation-z={0.8} castShadow>
        <boxGeometry args={[3.4, 0.35, 0.35]} />
      </mesh>
      <mesh material={mats.machine} position={[-3.4, 1.4, 0.4]} rotation-z={-0.6} castShadow>
        <boxGeometry args={[2.2, 0.3, 0.3]} />
      </mesh>
      <B a={[-4.3, 0.1, 0.1]} b={[-3.5, 0.8, 0.8]} m={mats.black} />
    </group>
  );
}

function SiteClutter({ t }: { t: number }) {
  const mats = getMats();
  return (
    <group>
      {t < 0.55 &&
        [0, 1, 2].map((i) => <B key={i} a={[-8 + i * 1.3, 0, 1.2]} b={[-6.9 + i * 1.3, 0.15 + (i % 2) * 0.15, 2.4]} m={mats.pallet} />)}
      {t < 0.7 && (
        <mesh material={mats.sand} position={[-6.5, 0.55, -11.2]} castShadow receiveShadow>
          <coneGeometry args={[1.6, 1.1, 18]} />
        </mesh>
      )}
      {t > 0.15 && t < 0.62 && (
        <group position={[-8.6, 0.12, -3]}>
          {Array.from({ length: 9 }, (_, i) => (
            <mesh key={i} material={mats.rebar} position={[0, (i % 3) * 0.06, Math.floor(i / 3) * 0.06]} rotation-x={Math.PI / 2} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 6, 5]} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}

/** Stacked site-office containers in the back-left corner of the plot. */
function SiteCabins() {
  const mats = getMats();
  return (
    <group position={[-9.2, 0, -9.5]}>
      {[0, 2.7].map((y) => (
        <group key={y} position-y={y}>
          <B a={[-1.2, 0.1, -3]} b={[1.2, 2.7, 3]} m={mats.cabin} />
          <B a={[1.2, 2.2, -3]} b={[1.22, 2.4, 3]} m={mats.cabinStripe} cast={false} />
          {[-1.8, 0, 1.8].map((z) => (
            <B key={z} a={[1.2, 1.0, z - 0.55]} b={[1.23, 1.9, z + 0.55]} m={mats.glassDark} cast={false} />
          ))}
        </group>
      ))}
      <B a={[1.25, 2.7, -3]} b={[2.2, 2.78, 3]} m={mats.steel} />
    </group>
  );
}

/* ───────────────────────────── context ───────────────────────────── */

function StoneVilla() {
  const mats = getMats();
  const roof = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-6.8, 0);
    s.lineTo(6.8, 0);
    s.lineTo(0, 5.2);
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth: 11.4, bevelEnabled: false });
    g.translate(0, 0, -5.7);
    return g;
  }, []);
  const windows: V3[] = [];
  [1.2, 4.4, 7.4].forEach((y) => [-21, -17.5, -14].forEach((x) => windows.push([x, y, -0.99])));
  return (
    <group>
      <B a={[-24, 0, -12]} b={[-11, 9.6, -1]} m={mats.rubble} />
      {[-11.35, -23.65].map((x) => <B key={x} a={[x - 0.35, 0, -1.35]} b={[x + 0.35, 9.6, -0.95]} m={mats.quoin} />)}
      <mesh geometry={roof} material={mats.slate} position={[-17.5, 9.6, -6.5]} castShadow receiveShadow />
      <B a={[-15, 12, -8]} b={[-14, 15.6, -7]} m={mats.rubble} />
      {windows.map((w, i) => (
        <group key={i} position={w}>
          <B a={[-0.7, 0, 0]} b={[0.7, 2, 0.08]} m={mats.whiteFrame} cast={false} />
          <B a={[-0.6, 0.1, 0.08]} b={[0.6, 1.9, 0.1]} m={mats.glassDark} cast={false} />
          <B a={[-0.8, -0.12, 0]} b={[0.8, 0, 0.22]} m={mats.quoin} cast={false} />
        </group>
      ))}
      {/* windows on the flank facing the plot */}
      {[1.4, 4.6, 7.6].map((y) =>
        [-9.5, -5.5].map((z) => (
          <group key={`${y}${z}`} position={[-10.99, y, z]} rotation-y={Math.PI / 2}>
            <B a={[-0.6, 0, 0]} b={[0.6, 1.8, 0.08]} m={mats.whiteFrame} cast={false} />
            <B a={[-0.5, 0.1, 0.08]} b={[0.5, 1.7, 0.1]} m={mats.glassDark} cast={false} />
          </group>
        )),
      )}
    </group>
  );
}

function RightNeighbour() {
  const mats = getMats();
  const roof = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-6, 0);
    s.lineTo(6, 0);
    s.lineTo(0, 3.6);
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth: 12, bevelEnabled: false });
    g.rotateY(Math.PI / 2);
    return g;
  }, []);
  return (
    <group>
      <B a={[10.8, 0, -15]} b={[24, 11.6, -3]} m={mats.render} />
      <mesh geometry={roof} material={mats.tiles} position={[11.4, 11.6, -9]} castShadow receiveShadow />
      {[2, 5.4, 8.8].map((y) => [13, 16.5, 20].map((x) => <B key={`${x}${y}`} a={[x, y, -2.98]} b={[x + 1.3, y + 1.8, -2.9]} m={mats.glassDark} cast={false} />))}
      <B a={[10.78, 7, -6]} b={[10.8, 8.4, -5]} m={mats.glassDark} cast={false} />
    </group>
  );
}

function Backdrop() {
  const mats = getMats();
  const blocks: [number, number, number, number, number][] = [
    [-60, -30, 14, 10, 12],
    [-38, -28, 12, 13, 10],
    [30, -30, 16, 12, 12],
    [48, -26, 12, 9, 10],
    [-20, -36, 18, 15, 12],
    [12, -40, 20, 17, 14],
  ];
  return (
    <group>
      {blocks.map(([x, z, w, h, d], i) => (
        <B key={i} a={[x, 0, z - d]} b={[x + w, h, z]} m={i % 2 ? mats.render : mats.rubble} cast={false} />
      ))}
      {[
        [-30, -18, 11, 4.2, 3],
        [26, -20, 12, 4.6, 4],
        [-4, -26, 13, 5, 5],
        [40, -12, 10, 4, 6],
        [-44, -10, 12, 4.6, 7],
        [6, -22, 10, 4, 8],
      ].map(([x, z, h, s, seed]) => (
        <Tree key={seed} position={[x, 0, z]} height={h} spread={s} seed={seed} />
      ))}
    </group>
  );
}

function StreetLamp() {
  const mats = getMats();
  const arm = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 5.2, 0), new THREE.Vector3(0, 5.9, 0), new THREE.Vector3(0.9, 5.7, 0));
    return new THREE.TubeGeometry(curve, 16, 0.045, 6, false);
  }, []);
  return (
    <group position={[-4.3, 0, 4.4]}>
      <mesh material={mats.black} position-y={0.3} castShadow>
        <cylinderGeometry args={[0.16, 0.22, 0.6, 12]} />
      </mesh>
      <mesh material={mats.black} position-y={2.9} castShadow>
        <cylinderGeometry args={[0.06, 0.1, 5.2, 10]} />
      </mesh>
      <mesh geometry={arm} material={mats.black} castShadow />
      <group position={[0.95, 5.35, 0]}>
        <mesh material={mats.black} position-y={0.28}>
          <coneGeometry args={[0.3, 0.3, 8]} />
        </mesh>
        <mesh material={mats.lamp}>
          <cylinderGeometry args={[0.18, 0.12, 0.34, 8]} />
        </mesh>
      </group>
    </group>
  );
}

function Ground({ done }: { done: boolean }) {
  const mats = getMats();
  const plane = (w: number, d: number) => {
    const g = metricPlane(w, d);
    g.rotateX(-Math.PI / 2);
    return g;
  };
  const geos = useMemo(
    () => ({
      far: plane(400, 400),
      road: plane(200, 9),
      walk: plane(200, 2.6),
      walk2: plane(200, 2.4),
      plot: plane(21, 15),
      plaza: plane(200, 60),
      hedgeL: shrubMass(301, 9.4, 1.2, 0.9),
      hedgeR: shrubMass(302, 6.8, 1.2, 0.9),
    }),
    [],
  );
  return (
    <group>
      <mesh geometry={geos.far} material={mats.grass} position={[0, -0.02, 0]} receiveShadow />
      <mesh geometry={geos.road} material={mats.asphalt} position={[0, 0.0, 10]} receiveShadow />
      <mesh geometry={geos.walk} material={mats.pavers} position={[0, 0.12, 4.3]} receiveShadow />
      <mesh geometry={geos.walk2} material={mats.pavers} position={[0, 0.12, 15.7]} receiveShadow />
      {/* paved square on the camera side of the street */}
      <mesh geometry={geos.plaza} material={mats.pavers} position={[0, 0.1, 46.9]} receiveShadow />
      <B a={[-100, 0, 5.55]} b={[100, 0.14, 5.7]} m={mats.quoin} cast={false} />
      <B a={[-100, 0, 14.45]} b={[100, 0.14, 14.6]} m={mats.quoin} cast={false} />
      <mesh geometry={geos.plot} material={done ? mats.pavers : mats.dirt} position={[0, 0.01, -4.5]} receiveShadow />
      {done && (
        <>
          <B a={[-10.4, 0, 1.4]} b={[-0.6, 0.35, 2.9]} m={mats.stone} />
          <B a={[3.2, 0, 1.4]} b={[10.4, 0.35, 2.9]} m={mats.stone} />
          <mesh geometry={geos.hedgeL} material={mats.leaves} position={[-10.2, 0.3, 2.15]} castShadow receiveShadow />
          <mesh geometry={geos.hedgeR} material={mats.leaves} position={[3.4, 0.3, 2.15]} castShadow receiveShadow />
        </>
      )}
    </group>
  );
}

/* ───────────────────────────── interior ───────────────────────────── */

/** Level-2 apartment the camera flies into (x 0.25…7.1, z −9.6…−1.2). */
function Apartment() {
  const mats = getMats();
  const y = 2 * FLOOR + 0.3;
  const top = 3 * FLOOR - 0.25;
  const pendants = [3.2, 4.4, 5.6];
  const plant = useMemo(() => leafCanopy(401, 140, [0.5, 0.6, 0.5], [0.26, 0.4], LEAF, 4), []);
  return (
    <group>
      <B a={[0.3, y - 0.02, -9.6]} b={[7.05, y, ZG]} m={mats.oak} cast={false} />
      <B a={[0.3, top, -9.6]} b={[7.05, top + 0.02, ZG]} m={mats.ceiling} cast={false} />
      <B a={[0.3, y, -9.62]} b={[7.05, top, -9.58]} m={mats.wall} cast={false} />
      <B a={[0.25, y, -9.6]} b={[0.3, top, ZG]} m={mats.wall} cast={false} />
      <B a={[7.05, y, -9.6]} b={[7.1, top, ZG]} m={mats.wall} cast={false} />
      {/* kitchen run + island */}
      <B a={[2.2, y, -9.58]} b={[6.9, y + 2.35, -8.95]} m={mats.walnut} />
      <B a={[2.2, y + 0.9, -9.0]} b={[6.9, y + 0.94, -8.9]} m={mats.countertop} />
      <B a={[3, y, -7.4]} b={[6, y + 0.9, -6.5]} m={mats.walnut} />
      <B a={[2.9, y + 0.9, -7.5]} b={[6.1, y + 0.95, -6.4]} m={mats.countertop} />
      {pendants.map((x) => (
        <group key={x} position={[x, top - 0.9, -6.95]}>
          <mesh material={mats.black} position-y={0.45}>
            <cylinderGeometry args={[0.005, 0.005, 0.9, 4]} />
          </mesh>
          <mesh material={mats.pendant}>
            <cylinderGeometry args={[0.06, 0.16, 0.22, 16, 1, true]} />
          </mesh>
          <pointLight position-y={-0.15} color="#ffd29a" intensity={6} distance={5} decay={2} />
        </group>
      ))}
      {/* built-in shelving on the right wall */}
      <B a={[6.7, y, -8.2]} b={[7.05, top - 0.3, -2]} m={mats.walnut} />
      {Array.from({ length: 5 }, (_, i) => (
        <B key={i} a={[6.4, y + 0.5 + i * 0.45, -8]} b={[6.72, y + 0.53 + i * 0.45, -2.2]} m={mats.countertop} cast={false} />
      ))}
      {/* living: sofa, table, rug, plant, artwork */}
      <B a={[0.6, y, -6.2]} b={[1.6, y + 0.42, -2.6]} m={mats.fabric} />
      <B a={[0.35, y, -6.2]} b={[0.65, y + 0.85, -2.6]} m={mats.fabric} />
      <B a={[2.1, y, -5.1]} b={[3.4, y + 0.36, -3.6]} m={mats.walnut} />
      <B a={[1.5, y, -6]} b={[4.4, y + 0.01, -2.7]} m={mats.fabric} cast={false} />
      <B a={[0.31, y + 1.05, -7.9]} b={[0.34, y + 2.15, -6.1]} m={mats.art} cast={false} />
      <B a={[0.3, y + 1.0, -7.95]} b={[0.32, y + 2.2, -6.05]} m={mats.black} cast={false} />
      {/* dining */}
      <group position={[2.2, y, -5.2]}>
        <B a={[-0.5, 0.72, -1]} b={[0.5, 0.76, 1]} m={mats.oak} />
        <B a={[-0.06, 0, -0.7]} b={[0.06, 0.72, -0.58]} m={mats.black} />
        <B a={[-0.06, 0, 0.58]} b={[0.06, 0.72, 0.7]} m={mats.black} />
        {[-0.62, 0.62].flatMap((x) =>
          [-0.55, 0.55].map((z) => (
            <group key={`${x}${z}`} position={[x, 0, z]}>
              <B a={[-0.2, 0.44, -0.2]} b={[0.2, 0.48, 0.2]} m={mats.fabric} />
              <B a={[x > 0 ? 0.17 : -0.2, 0.48, -0.2]} b={[x > 0 ? 0.2 : -0.17, 0.9, 0.2]} m={mats.fabric} />
              <B a={[-0.02, 0, -0.02]} b={[0.02, 0.44, 0.02]} m={mats.black} />
            </group>
          )),
        )}
      </group>
      <group position={[6.2, y, -2.6]}>
        <B a={[-0.02, 0, -0.02]} b={[0.02, 1.6, 0.02]} m={mats.black} />
        <mesh material={mats.lamp} position-y={1.62}>
          <sphereGeometry args={[0.16, 16, 12]} />
        </mesh>
      </group>
      <group position={[5.9, y, -2.2]}>
        <B a={[-0.25, 0, -0.25]} b={[0.25, 0.5, 0.25]} m={mats.planter} />
        <mesh geometry={plant} material={mats.leaves} position-y={1.15} castShadow />
      </group>
      <pointLight position={[3.6, top - 0.3, -4.5]} color="#ffe6c4" intensity={14} distance={12} decay={2} />
    </group>
  );
}

/* ───────────────────────────── sky ───────────────────────────── */

function SkyDome() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
        uniforms: {},
        vertexShader: /* glsl */ `
          varying vec3 vDir;
          void main() {
            vDir = normalize(position);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: /* glsl */ `
          varying vec3 vDir;
          float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
          float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
            return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), f.x), f.y); }
          float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++){ v += a*n(p); p *= 2.1; a *= 0.5; } return v; }
          void main() {
            vec3 d = normalize(vDir);
            float y = clamp(d.y, 0.0, 1.0);
            vec3 horizon = vec3(0.80, 0.85, 0.89);
            vec3 zenith = vec3(0.36, 0.53, 0.76);
            vec3 col = mix(horizon, zenith, pow(y, 0.6));
            vec3 sun = normalize(vec3(-0.45, 0.62, 0.64));
            float sd = max(dot(d, sun), 0.0);
            col += vec3(1.0, 0.93, 0.8) * (pow(sd, 8.0) * 0.18 + pow(sd, 400.0) * 1.5);
            vec2 uv = d.xz / max(0.1, d.y) * 0.55;
            float c = fbm(uv * 1.1 + vec2(3.1, 7.4));
            c = smoothstep(0.48, 0.8, c) * smoothstep(0.02, 0.2, y);
            vec3 cloud = mix(vec3(0.74, 0.77, 0.82), vec3(1.0), smoothstep(0.35, 0.85, fbm(uv * 2.3 + 1.7)));
            col = mix(col, cloud, c * 0.85);
            col = mix(col, horizon, smoothstep(0.12, 0.0, y) * 0.6);
            gl_FragColor = vec4(col, 1.0);
          }`,
      }),
    [],
  );
  return (
    <mesh material={mat} scale={450}>
      <sphereGeometry args={[1, 48, 24]} />
    </mesh>
  );
}

/* ───────────────────────────── camera path ───────────────────────────── */

interface Shot {
  pos: V3;
  look: V3;
  fov: number;
}
const SHOTS: Record<SequenceAspect, { street: Shot; streetEnd: Shot; terrace: Shot; inside: Shot }> = {
  landscape: {
    street: { pos: [2.6, 5.2, 34], look: [-0.4, 6.4, -4], fov: 36 },
    streetEnd: { pos: [1.4, 6.2, 27], look: [-0.2, 8.2, -4], fov: 36 },
    terrace: { pos: [4.5, 8.3, 4.4], look: [4.3, 8.0, -4], fov: 46 },
    inside: { pos: [4.5, 8.2, -3.3], look: [3.6, 7.7, -9.6], fov: 62 },
  },
  portrait: {
    street: { pos: [1.6, 4.2, 36], look: [0.2, 5.4, -4], fov: 54 },
    streetEnd: { pos: [1.0, 5.4, 30], look: [0.2, 6.8, -4], fov: 54 },
    terrace: { pos: [4.5, 8.3, 5.4], look: [4.4, 8.0, -4], fov: 66 },
    inside: { pos: [4.6, 8.2, -3.1], look: [3.8, 7.7, -9.6], fov: 80 },
  },
};

function mixShot(a: Shot, b: Shot, k: number): Shot {
  const e = ease(k);
  return {
    pos: a.pos.map((v, i) => lerp(v, b.pos[i], e)) as V3,
    look: a.look.map((v, i) => lerp(v, b.look[i], e)) as V3,
    fov: lerp(a.fov, b.fov, e),
  };
}

export function shotAt(p: number, aspect: SequenceAspect): Shot {
  const s = SHOTS[aspect];
  if (p <= 0.78) return mixShot(s.street, s.streetEnd, p / 0.78);
  if (p <= 0.9) return mixShot(s.streetEnd, s.terrace, (p - 0.78) / 0.12);
  return mixShot(s.terrace, s.inside, (p - 0.9) / 0.1);
}

function CameraRig({ progress, aspect }: { progress: number; aspect: SequenceAspect }) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  useLayoutEffect(() => {
    const shot = shotAt(progress, aspect);
    camera.position.set(...shot.pos);
    camera.fov = shot.fov;
    camera.near = 0.05;
    camera.far = 1200;
    camera.lookAt(...shot.look);
    camera.updateProjectionMatrix();
  }, [camera, progress, aspect]);
  return null;
}

/* ───────────────────────────── scene ───────────────────────────── */

export function ConstructionScene({ progress, aspect }: { progress: number; aspect: SequenceAspect }) {
  const t = clamp01(progress / 0.78);
  const done = t >= 0.8;
  const structure = Array.from({ length: LEVELS }, (_, k) => band(t, 0.2 + k * 0.08, 0.28 + k * 0.08));
  const envelope = Array.from({ length: LEVELS }, (_, k) => band(t, 0.46 + k * 0.06, 0.52 + k * 0.06));
  const topBuilt = structure.reduce((h, s, k) => (s > 0 ? (k + Math.min(1, s)) * FLOOR : h), 0);
  const craneOn = t >= 0.12 && t < 0.8;
  const craneH = 12 + ease(band(t, 0.12, 0.2)) * 9;
  const mats = getMats();

  return (
    <>
      <CameraRig progress={progress} aspect={aspect} />
      <SkyDome />
      <fog attach="fog" args={["#cfd9e2", 80, 320]} />
      <hemisphereLight args={["#dde8f4", "#7a6f5e", 0.6]} />
      <directionalLight
        position={[-26, 36, 37]}
        intensity={3.1}
        color="#fff0da"
        castShadow
        shadow-mapSize={[4096, 4096]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.04}
        shadow-radius={3}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        shadow-camera-far={150}
      />
      <Environment resolution={256} frames={1} environmentIntensity={0.85}>
        <SkyDome />
        <mesh rotation-x={-Math.PI / 2} position-y={-0.5}>
          <planeGeometry args={[800, 800]} />
          <meshBasicMaterial color="#8a877e" />
        </mesh>
      </Environment>

      <Ground done={done} />
      <StoneVilla />
      <RightNeighbour />
      <Backdrop />
      <StreetLamp />
      <Tree position={[-12.2, 0, 3.6]} height={11} spread={4.2} seed={17} />
      <Tree position={[13.5, 0, 3.8]} height={8} spread={3} seed={29} />

      {/* hoarding until handover */}
      {!done && (
        <>
          <B a={[-10.5, 0, 2.9]} b={[-1.2, 2.4, 3.0]} m={mats.hoarding} />
          <B a={[3.2, 0, 2.9]} b={[10.5, 2.4, 3.0]} m={mats.hoarding} />
        </>
      )}
      {t < 0.24 && <Excavator />}
      {!done && <SiteCabins />}
      <SiteClutter t={t} />

      {/* foundation raft */}
      {t >= 0.1 && <B a={[X0 - 0.3, -0.2, ZB - 0.3]} b={[X1 + 0.3, 0.05, ZT + 0.3]} m={mats.concrete} />}
      {t >= 0.1 && t < 0.24 && <Rebars y={0.05} xs={COLS_X} zs={COLS_Z} />}

      {/* concrete frame — hidden storey by storey once cladding closes it in */}
      {structure.map((s, k) => (
        <group key={k} visible={envelope[k] < 1}>
          <StructureLevel k={k} s={s} formwork={s > 0 && s < 1 && k === Math.floor(topBuilt / FLOOR - 0.01)} />
        </group>
      ))}
      {/* envelope */}
      {envelope.map((e, k) => (
        <EnvelopeLevel key={k} k={k} e={e} planted={done} />
      ))}

      {t >= 0.26 && t < 0.8 && <Scaffolding top={topBuilt + 1} />}
      {craneOn && <TowerCrane height={craneH} jib={-0.9 + t * 1.6} />}

      {done && (
        <>
          <Tree position={[-8.6, 0, 1.9]} height={6.5} spread={2} seed={71} />
          <Tree position={[9.2, 0, 1.9]} height={6} spread={1.8} seed={73} />
        </>
      )}
      {envelope[APARTMENT_LEVEL] > 0.45 && <Apartment />}
    </>
  );
}
