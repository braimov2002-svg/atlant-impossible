"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import globeData from "./data/globe-data.json";
import { bitAt, decodeBitmask } from "@/lib/geo";
import { REGIONS } from "@/lib/regions";
import type { DeviceTier } from "@/hooks/useDeviceTier";

/*
 * 3D contact portal: Uzbekistan as an extruded dot-bar field (same dataset as
 * the hero globe), a gold map pin that drops onto the Tashkent office with a
 * bounce, and radar ripples underneath.
 */

const CENTER = { lon: 64.6, lat: 41.4 };
const K = 0.25; // world units per degree
const COS = Math.cos(THREE.MathUtils.degToRad(CENTER.lat));
export const project = (lat: number, lon: number) =>
  new THREE.Vector3((lon - CENTER.lon) * K * COS, 0, -(lat - CENTER.lat) * K);

const hash = (i: number) => {
  const s = Math.sin(i * 91.345) * 47453.5453;
  return s - Math.floor(s);
};
const easeOutBounce = (x: number) => {
  const n = 7.5625;
  const d = 2.75;
  if (x < 1 / d) return n * x * x;
  if (x < 2 / d) return n * (x -= 1.5 / d) * x + 0.75;
  if (x < 2.5 / d) return n * (x -= 2.25 / d) * x + 0.9375;
  return n * (x -= 2.625 / d) * x + 0.984375;
};

export function ContactPortal({
  tier,
  office,
  reducedMotion = false,
}: {
  tier: Exclude<DeviceTier, "none">;
  office: { lat: number; lon: number };
  reducedMotion?: boolean;
}) {
  const bars = useRef<THREE.InstancedMesh>(null);
  const pin = useRef<THREE.Group>(null);
  const rig = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Mesh[]>([]);
  const start = useRef<number | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const officePos = useMemo(() => project(office.lat, office.lon), [office.lat, office.lon]);
  const camera = useThree((st) => st.camera);
  useEffect(() => camera.lookAt(0.3, 0, 0.5), [camera]);

  // Dot-bars: height rises toward the Tashkent office + gentle noise
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
        const d = p.distanceTo(officePos);
        out.push({ p, h: 0.025 + hash(idx) * 0.05 + Math.max(0, 0.32 - d * 0.4) });
      }
    }
    return out;
  }, [tier, officePos]);

  useEffect(() => {
    const mesh = bars.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    const c = new THREE.Color();
    const lime = new THREE.Color("#00ff66");
    const deep = new THREE.Color("#0f3d25");
    cells.forEach(({ p, h }, i) => {
      m.makeScale(1, h, 1).setPosition(p.x, h / 2, p.z);
      mesh.setMatrixAt(i, m);
      mesh.setColorAt(i, c.copy(deep).lerp(lime, Math.min(1, h * 2.4)));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [cells]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const outline = useMemo(
    () => globeData.uzOutline.map((ring) => ring.map(([lon, lat]) => project(lat, lon).setY(0.005))),
    [],
  );

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    start.current ??= t;
    const since = t - start.current;

    // Pin drop → bounce → idle hover
    if (pin.current) {
      const k = reducedMotion ? 1 : Math.min(1, Math.max(0, (since - 0.4) / 1.3));
      const dropY = THREE.MathUtils.lerp(3, 0, easeOutBounce(k));
      const hover = reducedMotion ? 0 : Math.sin(t * 2) * 0.04 * k;
      pin.current.position.set(officePos.x, dropY + hover, officePos.z);
      pin.current.rotation.y += delta * (reducedMotion ? 0 : 0.8);
    }
    rings.current.forEach((ring, i) => {
      if (!ring) return;
      const k = reducedMotion ? 0.5 : ((t * 0.5 + i / 3) % 1);
      ring.scale.setScalar(0.1 + k * 2.2);
      (ring.material as THREE.MeshBasicMaterial).opacity = (1 - k) * 0.8 * Math.min(1, since);
    });
    if (rig.current && !reducedMotion) {
      rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, Math.sin(t * 0.15) * 0.18 + pointer.current.x * 0.12, 2, delta);
      rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, pointer.current.y * 0.05, 2, delta);
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 6, 4]} intensity={1.6} />
      <pointLight position={[officePos.x, 1.2, officePos.z]} color="#d4af37" intensity={6} distance={4} />

      <group ref={rig}>
        <group>
          <instancedMesh ref={bars} args={[undefined, undefined, cells.length]}>
            <boxGeometry args={[0.022, 1, 0.022]} />
            <meshStandardMaterial roughness={0.5} metalness={0.3} emissive="#00ff66" emissiveIntensity={0.08} />
          </instancedMesh>

          {outline.map((ring, i) => (
            <Line key={i} points={ring} color="#d4af37" lineWidth={1.2} transparent opacity={0.8} />
          ))}

          {/* Regional centres */}
          {REGIONS.filter((r) => !r.hq).map((r) => {
            const p = project(r.lat, r.lon);
            return (
              <mesh key={r.id} position={[p.x, 0.02, p.z]} rotation-x={-Math.PI / 2}>
                <ringGeometry args={[0.028, 0.04, 24]} />
                <meshBasicMaterial color="#d4af37" transparent opacity={0.7} toneMapped={false} />
              </mesh>
            );
          })}

          {/* Radar ripples at the office */}
          {[0, 1, 2].map((i) => (
            <mesh
              key={i}
              position={[officePos.x, 0.012, officePos.z]}
              rotation-x={-Math.PI / 2}
              ref={(m) => {
                if (m) rings.current[i] = m;
              }}
            >
              <ringGeometry args={[0.16, 0.185, 48]} />
              <meshBasicMaterial color="#00ff66" transparent depthWrite={false} toneMapped={false} blending={THREE.AdditiveBlending} />
            </mesh>
          ))}

          {/* Map pin */}
          <group ref={pin}>
            <group position-y={0.34} scale={0.8}>
              <mesh>
                <sphereGeometry args={[0.16, 32, 32]} />
                <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} emissive="#6b5310" emissiveIntensity={0.4} />
              </mesh>
              <mesh position-y={-0.2} rotation-x={Math.PI}>
                <coneGeometry args={[0.135, 0.34, 32]} />
                <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} emissive="#6b5310" emissiveIntensity={0.4} />
              </mesh>
              <mesh position-z={0.001}>
                <sphereGeometry args={[0.065, 24, 24]} />
                <meshBasicMaterial color="#0a1a12" />
              </mesh>
            </group>
            {/* light beam */}
            <mesh position-y={1.1}>
              <cylinderGeometry args={[0.006, 0.02, 1.2, 8, 1, true]} />
              <meshBasicMaterial color="#d4af37" transparent opacity={0.18} depthWrite={false} blending={THREE.AdditiveBlending} />
            </mesh>
          </group>
        </group>
      </group>
    </>
  );
}
