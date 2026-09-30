"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import globeData from "./data/globe-data.json";
import { bitAt, decodeBitmask } from "@/lib/geo";
import { CITIES, TASHKENT } from "@/data/projects";
import type { DeviceTier } from "@/hooks/useDeviceTier";

/*
 * Uzbekistan footprint map.
 *  country mode → extruded dot-bar country (same dataset as the old globe),
 *                 gold border, regional centres, every site pin
 *  city mode    → camera dives into Tashkent where a procedural city grid
 *                 (avenues, ring road, canal) rises and Tashkent pins spread out
 * Pins are DOM buttons (`[data-pin=id]` in `pinsRef`) projected every frame.
 */

export interface MapSite {
  id: string;
  lat: number;
  lon: number;
  status: "completed" | "ongoing";
  inTashkent: boolean;
}

const CENTER = { lon: 64.6, lat: 41.4 };
const K = 0.25;
const COS = Math.cos(THREE.MathUtils.degToRad(CENTER.lat));
const CITY_SCALE = 24;
const project = (lat: number, lon: number) => new THREE.Vector3((lon - CENTER.lon) * K * COS, 0, -(lat - CENTER.lat) * K);
const T_POS = project(TASHKENT.lat, TASHKENT.lon);
/** Position inside the magnified Tashkent layer (world space) */
const projectCity = (lat: number, lon: number) =>
  new THREE.Vector3((lon - TASHKENT.lon) * K * COS * CITY_SCALE, 0, -(lat - TASHKENT.lat) * K * CITY_SCALE).add(T_POS);

const hash = (i: number) => {
  const s = Math.sin(i * 91.345) * 47453.5453;
  return s - Math.floor(s);
};

export function UzMap3D({
  tier,
  mode,
  sites,
  active,
  pinsRef,
  reducedMotion = false,
}: {
  tier: Exclude<DeviceTier, "none">;
  mode: "country" | "city";
  sites: MapSite[];
  active: string | null;
  pinsRef: React.RefObject<HTMLDivElement | null>;
  reducedMotion?: boolean;
}) {
  const { camera, size } = useThree();
  const bars = useRef<THREE.InstancedMesh>(null);
  const blocks = useRef<THREE.InstancedMesh>(null);
  const cityGroup = useRef<THREE.Group>(null);
  const countryGroup = useRef<THREE.Group>(null);
  const cityK = useRef(0);
  const lookAt = useRef(new THREE.Vector3(0, 0, 0.3));
  const pointer = useRef({ x: 0, y: 0 });
  const tmp = useMemo(() => new THREE.Vector3(), []);

  /* ── country dot-bars */
  const cells = useMemo(() => {
    const { cols, rows, lonMin, latMin, step } = globeData.uz;
    const mask = decodeBitmask(globeData.uz.mask);
    const stride = tier === "low" ? 2 : 1;
    const out: { p: THREE.Vector3; h: number }[] = [];
    for (let r = 0; r < rows; r += stride) {
      for (let c = 0; c < cols; c += stride) {
        const idx = r * cols + c;
        if (!bitAt(mask, idx)) continue;
        const p = project(latMin + r * step, lonMin + (c + (r % 2 ? 0.5 : 0)) * step);
        const d = p.distanceTo(T_POS);
        out.push({ p, h: 0.018 + hash(idx) * 0.03 + Math.max(0, 0.16 - d * 0.22) });
      }
    }
    return out;
  }, [tier]);

  useEffect(() => {
    const mesh = bars.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    const c = new THREE.Color();
    const base = new THREE.Color("#1e293b");
    const hi = new THREE.Color("#00f0ff");
    cells.forEach(({ p, h }, i) => {
      mesh.setMatrixAt(i, m.makeScale(1, h, 1).setPosition(p.x, h / 2, p.z));
      mesh.setColorAt(i, c.copy(base).lerp(hi, Math.min(1, h * 3.2)));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [cells]);

  /* ── Tashkent city blocks (procedural): avenues every 4th cell, ring road, canal */
  const cityBlocks = useMemo(() => {
    const out: { x: number; z: number; h: number; w: number }[] = [];
    const N = tier === "low" ? 12 : 18;
    const cell = 0.055;
    for (let i = -N; i <= N; i++) {
      for (let j = -N; j <= N; j++) {
        if (i % 4 === 0 || j % 4 === 0) continue;
        const x = i * cell;
        const z = j * cell;
        const d = Math.hypot(x, z);
        if (d > N * cell * 0.98) continue;
        if (Math.abs(d - 0.62) < 0.03) continue; // ring road
        if (Math.abs(x * 0.6 + z - 0.1) < 0.035) continue; // canal
        const r = hash(i * 131 + j * 7);
        if (r < 0.12) continue; // parks
        const core = Math.max(0, 1 - d / 0.5);
        out.push({ x, z, w: cell * (0.62 + r * 0.2), h: 0.015 + r * 0.05 + core * core * (0.1 + r * 0.25) });
      }
    }
    return out;
  }, [tier]);

  useEffect(() => {
    const mesh = blocks.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    const c = new THREE.Color();
    cityBlocks.forEach((b, i) => {
      mesh.setMatrixAt(i, m.makeScale(b.w, b.h, b.w).setPosition(b.x, b.h / 2, b.z));
      mesh.setColorAt(i, c.set("#1e293b").lerp(new THREE.Color("#5fd9e6"), Math.min(0.85, b.h * 1.3)));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [cityBlocks]);

  const outline = useMemo(() => globeData.uzOutline.map((ring) => ring.map(([lon, lat]) => project(lat, lon).setY(0.004))), []);
  const ringRoad = useMemo(
    () => Array.from({ length: 97 }, (_, i) => new THREE.Vector3(Math.cos((i / 96) * Math.PI * 2) * 0.62, 0.003, Math.sin((i / 96) * Math.PI * 2) * 0.62)),
    [],
  );

  /* ── pins: 3D markers + positions for both modes */
  const pins = useMemo(
    () =>
      sites.map((s) => ({
        ...s,
        country: project(s.lat, s.lon),
        city: s.inTashkent ? projectCity(s.lat, s.lon) : null,
      })),
    [sites],
  );
  const pinMeshes = useRef<(THREE.Group | null)[]>([]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 0.1);
    const t = clock.elapsedTime;
    const city = mode === "city";
    cityK.current = THREE.MathUtils.damp(cityK.current, city ? 1 : 0, 3, dt);
    const k = cityK.current;

    if (cityGroup.current) {
      cityGroup.current.scale.set(1, Math.max(0.001, k), 1);
      cityGroup.current.visible = k > 0.01;
    }
    if (countryGroup.current) {
      // Flatten the country bars while diving into the city so they don't clutter the close-up
      countryGroup.current.scale.y = 1 - k * 0.92;
      countryGroup.current.position.y = -k * 0.01;
    }

    // Camera: country overview ⇄ Tashkent dive
    const portrait = size.width / size.height < 0.9 ? 1.5 : 1;
    const countryCam = new THREE.Vector3(0.1, 2.75 * portrait, 2.55 * portrait);
    const countryLook = new THREE.Vector3(0.1, 0, 0.18);
    const cityCam = new THREE.Vector3(T_POS.x + 0.2, 1.45 * portrait, T_POS.z + 1.45 * portrait);
    const cityLook = new THREE.Vector3(T_POS.x, 0, T_POS.z + 0.05);
    const par = reducedMotion ? 0 : 1;
    const want = countryCam.lerp(cityCam, k).add(new THREE.Vector3(pointer.current.x * 0.12 * par, -pointer.current.y * 0.06 * par, 0));
    camera.position.lerp(want, 1 - Math.exp(-4 * dt));
    lookAt.current.lerp(countryLook.lerp(cityLook, k), 1 - Math.exp(-4 * dt));
    camera.lookAt(lookAt.current);

    // Pins + DOM labels
    const layer = pinsRef.current;
    pins.forEach((p, i) => {
      const g = pinMeshes.current[i];
      const show = city ? !!p.city : true;
      const pos = city && p.city ? p.city : p.country;
      if (g) {
        g.position.lerp(pos, 1 - Math.exp(-6 * dt));
        const target = show ? (active === p.id ? 1.5 : 1) : 0.001;
        g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, target, 6, dt));
        const pulse = g.children[2] as THREE.Mesh | undefined;
        if (pulse) {
          const q = reducedMotion ? 0.5 : (t * 0.8 + i * 0.3) % 1;
          pulse.scale.setScalar(0.4 + q * 2.2);
          (pulse.material as THREE.MeshBasicMaterial).opacity = (1 - q) * 0.8;
        }
      }
      const el = layer?.querySelector<HTMLElement>(`[data-pin="${p.id}"]`);
      if (el && g) {
        tmp.copy(g.position).setY(g.position.y + 0.26 * g.scale.y).project(camera);
        el.style.transform = `translate3d(${((tmp.x * 0.5 + 0.5) * size.width).toFixed(1)}px, ${((-tmp.y * 0.5 + 0.5) * size.height).toFixed(1)}px, 0) translate(-50%, -100%)`;
        el.style.opacity = show ? "1" : "0";
        el.style.pointerEvents = show ? "auto" : "none";
      }
    });
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 6, 4]} intensity={1.6} color="#ffe2b0" />
      <directionalLight position={[-4, 3, -2]} intensity={0.5} color="#6fe9ff" />

      <group ref={countryGroup}>
        <instancedMesh ref={bars} args={[undefined, undefined, cells.length]}>
          <boxGeometry args={[0.022, 1, 0.022]} />
          <meshStandardMaterial roughness={0.45} metalness={0.4} emissive="#00f0ff" emissiveIntensity={0.06} />
        </instancedMesh>
        {outline.map((ring, i) => (
          <Line key={i} points={ring} color="#e2b859" lineWidth={1.2} transparent opacity={0.8} />
        ))}
        {CITIES.filter((c) => c.id !== "tashkent").map((c) => {
          const p = project(c.lat, c.lon);
          return (
            <mesh key={c.id} position={[p.x, 0.01, p.z]} rotation-x={-Math.PI / 2}>
              <ringGeometry args={[0.02, 0.03, 24]} />
              <meshBasicMaterial color="#94a3b8" transparent opacity={0.6} />
            </mesh>
          );
        })}
      </group>

      <group ref={cityGroup} position={[T_POS.x, 0.005, T_POS.z]}>
        <instancedMesh ref={blocks} args={[undefined, undefined, cityBlocks.length]}>
          <boxGeometry />
          <meshStandardMaterial roughness={0.5} metalness={0.5} emissive="#00f0ff" emissiveIntensity={0.05} />
        </instancedMesh>
        <Line points={ringRoad} color="#e2b859" lineWidth={1.5} transparent opacity={0.9} />
        <mesh rotation-x={-Math.PI / 2} position-y={-0.002}>
          <circleGeometry args={[1.05, 64]} />
          <meshBasicMaterial color="#0b0f17" transparent opacity={0.85} />
        </mesh>
      </group>

      {pins.map((p, i) => {
        const color = p.status === "completed" ? "#e2b859" : "#00f0ff";
        return (
          <group
            key={p.id}
            ref={(g) => {
              pinMeshes.current[i] = g;
            }}
            position={p.country}
          >
            <mesh position-y={0.11}>
              <cylinderGeometry args={[0.004, 0.004, 0.22, 6]} />
              <meshBasicMaterial color={color} toneMapped={false} />
            </mesh>
            <mesh position-y={0.23}>
              <sphereGeometry args={[0.022, 16, 16]} />
              <meshBasicMaterial color={color} toneMapped={false} />
            </mesh>
            <mesh rotation-x={-Math.PI / 2} position-y={0.004}>
              <ringGeometry args={[0.03, 0.038, 32]} />
              <meshBasicMaterial color={color} transparent depthWrite={false} toneMapped={false} blending={THREE.AdditiveBlending} />
            </mesh>
          </group>
        );
      })}
    </>
  );
}
