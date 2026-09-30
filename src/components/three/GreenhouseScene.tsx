"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { CameraControls, CameraControlsImpl, ContactShadows, Environment, Grid, Lightformer } from "@react-three/drei";
import type { DeviceTier } from "@/hooks/useDeviceTier";

/*
 * Procedural Venlo-type glass greenhouse (3 spans × 10 m) with four
 * interactive systems. Everything is built from primitives + instancing,
 * so the scene ships zero model files.
 *   climate  → end-wall fans + air-flow particles
 *   drip     → hydroponic gutters, drip lines, falling droplets
 *   sensors  → AI sensor masts with pulsing scan rings
 *   solar    → semi-transparent PV modules on the roof
 */

export type HotspotId = "climate" | "drip" | "sensors" | "solar";

export const HOTSPOTS: Record<HotspotId, { anchor: [number, number, number]; camera: [number, number, number]; target: [number, number, number] }> = {
  climate: { anchor: [0, 2.05, -5.1], camera: [6.5, 3.4, -13], target: [0, 1.8, -5] },
  drip: { anchor: [-3.24, 0.6, 2.6], camera: [-2.6, 1.35, 5.4], target: [-3.35, 0.5, 1.2] },
  sensors: { anchor: [1.6, 1.45, -1.2], camera: [5.2, 3.1, 3.6], target: [1.4, 0.9, -1.2] },
  solar: { anchor: [4, 3.3, 0], camera: [13, 10, 7], target: [2.6, 2.8, 0] },
};
const HOME = { camera: [13.5, 8.5, 14] as const, target: [0, 1.4, 0] as const };

const SPAN = 3.2;
const SPANS = 3;
const HALF_W = (SPAN * SPANS) / 2; // 4.8
const HALF_L = 5;
const WALL_H = 2.6;
const RIDGE_H = 3.55;
const ROW_XS = [-4.0, -2.4, -0.8, 0.8, 2.4, 4.0].map((x) => x * 0.9);
const LIME = new THREE.Color("#00ff66");

interface Props {
  tier: Exclude<DeviceTier, "none">;
  active: HotspotId | null;
  /** DOM layer holding `[data-hotspot=id]` buttons, positioned every frame */
  markersRef: React.RefObject<HTMLDivElement | null>;
  reducedMotion?: boolean;
}

export function GreenhouseScene({ tier, active, markersRef, reducedMotion = false }: Props) {
  const controls = useRef<CameraControlsImpl>(null);
  const lastInteraction = useRef(0);
  const { camera, size } = useThree();
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const fine = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

  // Fly to the selected system (or home). Narrow/portrait viewports pull the
  // overview camera back so the whole greenhouse fits.
  const pullBack = size.width / size.height < 1 ? 1.45 : size.width < 900 ? 1.15 : 1;
  useEffect(() => {
    const c = controls.current;
    if (!c) return;
    const { camera: cam, target: [tx, ty, tz] } = active ? HOTSPOTS[active] : HOME;
    const k = active ? 1 : pullBack;
    void c.setLookAt(cam[0] * k, cam[1] * k, cam[2] * k, tx, ty, tz, !reducedMotion);
  }, [active, reducedMotion, pullBack]);

  useFrame((_, delta) => {
    const c = controls.current;
    // Idle auto-orbit (only on the overview)
    if (c && !active && !reducedMotion && performance.now() - lastInteraction.current > 2500) {
      void c.rotate(delta * 0.06, 0, false);
    }
    // Project hotspot anchors onto the DOM marker layer
    const layer = markersRef.current;
    if (!layer) return;
    for (const id of Object.keys(HOTSPOTS) as HotspotId[]) {
      const el = layer.querySelector<HTMLElement>(`[data-hotspot="${id}"]`);
      if (!el) continue;
      tmp.set(...HOTSPOTS[id].anchor).project(camera);
      const behind = tmp.z > 1;
      el.style.transform = `translate3d(${((tmp.x * 0.5 + 0.5) * size.width).toFixed(1)}px, ${((-tmp.y * 0.5 + 0.5) * size.height).toFixed(1)}px, 0) translate(-50%, -50%)`;
      el.style.opacity = behind ? "0" : "1";
    }
  });

  return (
    <>
      <color attach="background" args={["#07140d"]} />
      <fog attach="fog" args={["#07140d", 22, 46]} />
      <hemisphereLight args={["#bfffe0", "#0a1a12", 0.55]} />
      <directionalLight position={[9, 14, 7]} intensity={2.2} color="#fff3d6" />
      <directionalLight position={[-8, 6, -10]} intensity={0.6} color="#6fffb5" />

      {tier !== "low" && (
        <Environment resolution={128} frames={1}>
          <Lightformer form="rect" intensity={2.5} position={[0, 8, 0]} rotation-x={Math.PI / 2} scale={[20, 20, 1]} color="#dfffee" />
          <Lightformer form="rect" intensity={1.5} position={[10, 3, 0]} rotation-y={-Math.PI / 2} scale={[20, 4, 1]} color="#d4af37" />
          <Lightformer form="ring" intensity={2} position={[-10, 4, -6]} scale={6} color="#00ff66" />
        </Environment>
      )}

      <CameraControls
        ref={controls}
        makeDefault
        minDistance={4}
        maxDistance={26}
        minPolarAngle={0.35}
        maxPolarAngle={Math.PI / 2.1}
        smoothTime={0.6}
        dollySpeed={0}
        mouseButtons={{
          left: CameraControlsImpl.ACTION.ROTATE,
          middle: CameraControlsImpl.ACTION.NONE,
          right: CameraControlsImpl.ACTION.NONE,
          wheel: CameraControlsImpl.ACTION.NONE,
        }}
        // Touch: leave one-finger gestures to page scrolling; two fingers rotate.
        touches={{
          one: fine ? CameraControlsImpl.ACTION.TOUCH_ROTATE : CameraControlsImpl.ACTION.NONE,
          two: CameraControlsImpl.ACTION.TOUCH_ROTATE,
          three: CameraControlsImpl.ACTION.NONE,
        }}
        onStart={() => (lastInteraction.current = performance.now())}
        onEnd={() => (lastInteraction.current = performance.now())}
      />

      <group position={[0, 0, 0]}>
        <Ground tier={tier} />
        <Frame />
        <Glass />
        <SolarModules highlight={active === "solar"} reducedMotion={reducedMotion} />
        <HydroponicRows tier={tier} highlight={active === "drip"} reducedMotion={reducedMotion} />
        <ClimateFans highlight={active === "climate"} reducedMotion={reducedMotion} />
        <SensorMasts highlight={active === "sensors"} reducedMotion={reducedMotion} />
      </group>
    </>
  );
}

/* ───────────────────────────── ground ───────────────────────────── */

function Ground({ tier }: { tier: Props["tier"] }) {
  return (
    <>
      <mesh rotation-x={-Math.PI / 2} position-y={-0.01}>
        <planeGeometry args={[HALF_W * 2 + 0.6, HALF_L * 2 + 0.6]} />
        <meshStandardMaterial color="#10261a" roughness={0.9} />
      </mesh>
      <Grid
        position-y={-0.02}
        infiniteGrid
        cellSize={0.5}
        sectionSize={2.5}
        cellThickness={0.5}
        sectionThickness={1}
        cellColor="#16372a"
        sectionColor="#1f6b45"
        fadeDistance={34}
        fadeStrength={1.5}
      />
      {tier !== "low" && (
        <ContactShadows position-y={0} scale={22} blur={2.4} far={6} opacity={0.55} frames={1} resolution={512} />
      )}
    </>
  );
}

/* ───────────────────────────── frame ───────────────────────────── */

/** All structural members in one InstancedMesh (unit box stretched between two points). */
function Frame() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const segments = useMemo(() => {
    const s: [THREE.Vector3, THREE.Vector3, number][] = [];
    const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
    const zs = [-5, -2.5, 0, 2.5, 5];
    for (let i = 0; i <= SPANS; i++) {
      const x = -HALF_W + i * SPAN;
      for (const z of zs) s.push([v(x, 0, z), v(x, WALL_H, z), 0.07]); // posts
      s.push([v(x, WALL_H, -HALF_L), v(x, WALL_H, HALF_L), 0.1]); // gutters
    }
    for (let i = 0; i < SPANS; i++) {
      const x0 = -HALF_W + i * SPAN;
      const xm = x0 + SPAN / 2;
      s.push([v(xm, RIDGE_H, -HALF_L), v(xm, RIDGE_H, HALF_L), 0.06]); // ridge
      for (const z of zs) {
        s.push([v(x0, WALL_H, z), v(xm, RIDGE_H, z), 0.045]); // rafters
        s.push([v(x0 + SPAN, WALL_H, z), v(xm, RIDGE_H, z), 0.045]);
      }
    }
    // Wall girts
    for (const x of [-HALF_W, HALF_W]) s.push([v(x, 1.2, -HALF_L), v(x, 1.2, HALF_L), 0.04]);
    for (const z of [-HALF_L, HALF_L]) s.push([v(-HALF_W, 1.2, z), v(HALF_W, 1.2, z), 0.04]);
    return s;
  }, []);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    segments.forEach(([a, b, t], i) => {
      const dir = b.clone().sub(a);
      const len = dir.length();
      q.setFromUnitVectors(up, dir.normalize());
      m.compose(a.clone().add(b).multiplyScalar(0.5), q, new THREE.Vector3(t, len, t));
      mesh.setMatrixAt(i, m);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [segments]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, segments.length]}>
      <boxGeometry />
      <meshStandardMaterial color="#cfdcd5" metalness={0.85} roughness={0.28} />
    </instancedMesh>
  );
}

/* ───────────────────────────── glass ───────────────────────────── */

function Glass() {
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#a8f0cf",
        transparent: true,
        opacity: 0.12,
        roughness: 0.05,
        metalness: 0.2,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    [],
  );
  const gable = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-SPAN / 2, 0);
    shape.lineTo(SPAN / 2, 0);
    shape.lineTo(0, RIDGE_H - WALL_H);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, []);
  useEffect(() => () => (mat.dispose(), gable.dispose()), [mat, gable]);

  const roofW = Math.hypot(SPAN / 2, RIDGE_H - WALL_H);
  const roofAngle = Math.atan2(RIDGE_H - WALL_H, SPAN / 2);

  return (
    <group>
      {[-HALF_W, HALF_W].map((x) => (
        <mesh key={x} material={mat} position={[x, WALL_H / 2, 0]} rotation-y={Math.PI / 2}>
          <planeGeometry args={[HALF_L * 2, WALL_H]} />
        </mesh>
      ))}
      {[-HALF_L, HALF_L].map((z) => (
        <group key={z}>
          <mesh material={mat} position={[0, WALL_H / 2, z]}>
            <planeGeometry args={[HALF_W * 2, WALL_H]} />
          </mesh>
          {Array.from({ length: SPANS }, (_, i) => (
            <mesh key={i} material={mat} geometry={gable} position={[-HALF_W + SPAN * (i + 0.5), WALL_H, z]} />
          ))}
        </group>
      ))}
      {Array.from({ length: SPANS }, (_, i) => {
        const xm = -HALF_W + SPAN * (i + 0.5);
        const cy = (WALL_H + RIDGE_H) / 2;
        return (
          <group key={i}>
            <mesh material={mat} position={[xm - SPAN / 4, cy, 0]} rotation={[-Math.PI / 2, -roofAngle, 0, "XYZ"]}>
              <planeGeometry args={[roofW, HALF_L * 2]} />
            </mesh>
            <mesh material={mat} position={[xm + SPAN / 4, cy, 0]} rotation={[-Math.PI / 2, roofAngle, 0, "XYZ"]}>
              <planeGeometry args={[roofW, HALF_L * 2]} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* ───────────────────────────── solar ───────────────────────────── */

function SolarModules({ highlight, reducedMotion }: { highlight: boolean; reducedMotion: boolean }) {
  const roofAngle = Math.atan2(RIDGE_H - WALL_H, SPAN / 2);
  const roofW = Math.hypot(SPAN / 2, RIDGE_H - WALL_H);
  // One material shared by every module → a single lerp animates them all
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0c2344",
        emissive: "#d4af37",
        emissiveIntensity: 0.08,
        metalness: 0.6,
        roughness: 0.25,
        transparent: true,
        opacity: 0.72,
      }),
    [],
  );
  useEffect(() => () => mat.dispose(), [mat]);

  useFrame(({ clock }) => {
    const pulse = reducedMotion ? 0.5 : 0.5 + 0.5 * Math.sin(clock.elapsedTime * 3);
    mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, highlight ? 0.5 + pulse * 0.6 : 0.08, 0.1);
  });

  // East-facing slope of the two eastern spans, 3 modules each
  return (
    <group>
      {[1, 2].map((i) =>
        Array.from({ length: 3 }, (_, k) => (
          <mesh
            key={`${i}-${k}`}
            material={mat}
            position={[-HALF_W + SPAN * (i + 0.5) + SPAN / 4 + 0.02, (WALL_H + RIDGE_H) / 2 + 0.03, -3.2 + k * 3.2]}
            rotation={[-Math.PI / 2, roofAngle, 0, "XYZ"]}
          >
            <boxGeometry args={[roofW * 0.84, 2.6, 0.03]} />
          </mesh>
        )),
      )}
    </group>
  );
}

/* ─────────────────────── hydroponic rows + drip ─────────────────────── */

function HydroponicRows({
  tier,
  highlight,
  reducedMotion,
}: {
  tier: Props["tier"];
  highlight: boolean;
  reducedMotion: boolean;
}) {
  const leaves = useRef<THREE.InstancedMesh>(null);
  const fruit = useRef<THREE.InstancedMesh>(null);
  const drops = useRef<THREE.InstancedMesh>(null);
  const gutterMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#e8f2ec", roughness: 0.4, emissive: LIME, emissiveIntensity: 0 }),
    [],
  );
  useEffect(() => () => gutterMat.dispose(), [gutterMat]);
  const spacing = tier === "low" ? 0.7 : 0.45;
  const zs = useMemo(() => {
    const out: number[] = [];
    for (let z = -HALF_L + 0.6; z <= HALF_L - 0.6; z += spacing) out.push(z);
    return out;
  }, [spacing]);

  const leafCount = ROW_XS.length * zs.length * 3;
  const fruitCount = ROW_XS.length * zs.length * 2;
  const dropCount = ROW_XS.length * zs.length;
  const emitters = useMemo(() => ROW_XS.flatMap((x) => zs.map((z) => [x, z] as const)), [zs]);
  const phases = useMemo(() => emitters.map((_, i) => (Math.sin(i * 78.233) * 43758.5453) % 1), [emitters]);

  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const s = new THREE.Vector3();
    const p = new THREE.Vector3();
    const c = new THREE.Color();
    let li = 0;
    let fi = 0;
    emitters.forEach(([x, z], i) => {
      const r = Math.abs(phases[i]);
      for (let k = 0; k < 3; k++) {
        const y = 0.95 + k * 0.42 + r * 0.1;
        q.setFromEuler(new THREE.Euler(r * 2, r * 6 + k, 0));
        s.setScalar(0.15 - k * 0.022 + r * 0.035);
        leaves.current?.setMatrixAt(li, m.compose(p.set(x + (r - 0.5) * 0.1, y, z), q, s));
        leaves.current?.setColorAt(li, c.setHSL(0.33 + r * 0.06, 0.6, 0.075 + k * 0.03));
        li++;
      }
      for (let k = 0; k < 2; k++) {
        const ang = r * 6.28 + k * 2.4;
        fruit.current?.setMatrixAt(
          fi++,
          m.compose(p.set(x + Math.cos(ang) * 0.17, 0.85 + k * 0.45, z + Math.sin(ang) * 0.17), q.identity(), s.setScalar(0.065)),
        );
      }
    });
    [leaves, fruit].forEach((r) => {
      if (!r.current) return;
      r.current.instanceMatrix.needsUpdate = true;
      if (r.current.instanceColor) r.current.instanceColor.needsUpdate = true;
    });
  }, [emitters, phases]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    gutterMat.emissiveIntensity = THREE.MathUtils.lerp(gutterMat.emissiveIntensity, highlight ? 0.9 : 0, 0.08);
    const d = drops.current;
    if (!d) return;
    const m = new THREE.Matrix4();
    const p = new THREE.Vector3();
    const s = new THREE.Vector3().setScalar(highlight ? 1.25 : 1);
    const q = new THREE.Quaternion();
    emitters.forEach(([x, z], i) => {
      const k = reducedMotion ? 0.5 : (t * (highlight ? 1.1 : 0.7) + Math.abs(phases[i])) % 1;
      d.setMatrixAt(i, m.compose(p.set(x, 0.66 - k * 0.12, z), q, s));
    });
    d.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {ROW_XS.map((x) => (
        <group key={x}>
          {/* Gutter (NFT channel) on stands */}
          <mesh position={[x, 0.5, 0]} material={gutterMat}>
            <boxGeometry args={[0.26, 0.1, HALF_L * 2 - 0.8]} />
          </mesh>
          {/* Drip line */}
          <mesh position={[x, 0.68, 0]} rotation-x={Math.PI / 2}>
            <cylinderGeometry args={[0.014, 0.014, HALF_L * 2 - 0.8, 6]} />
            <meshStandardMaterial color="#0e1512" roughness={0.6} />
          </mesh>
          {/* Heating rail pipes */}
          {[-0.45, 0.45].map((dx) => (
            <mesh key={dx} position={[x + dx, 0.1, 0]} rotation-x={Math.PI / 2}>
              <cylinderGeometry args={[0.025, 0.025, HALF_L * 2 - 0.6, 8]} />
              <meshStandardMaterial color="#b9c7c0" metalness={0.9} roughness={0.25} />
            </mesh>
          ))}
        </group>
      ))}
      <instancedMesh ref={leaves} args={[undefined, undefined, leafCount]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial roughness={0.9} flatShading envMapIntensity={0.3} />
      </instancedMesh>
      <instancedMesh ref={fruit} args={[undefined, undefined, fruitCount]}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshStandardMaterial color="#e2412f" roughness={0.35} emissive="#5a0d05" emissiveIntensity={0.4} />
      </instancedMesh>
      <instancedMesh ref={drops} args={[undefined, undefined, dropCount]}>
        <sphereGeometry args={[0.032, 8, 8]} />
        <meshBasicMaterial color="#5fd4ff" toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

/* ───────────────────────────── climate ───────────────────────────── */

function ClimateFans({ highlight, reducedMotion }: { highlight: boolean; reducedMotion: boolean }) {
  const blades = useRef<THREE.Group[]>([]);
  const air = useRef<THREE.Points>(null);
  const speed = useRef(1);

  const airGeo = useMemo(() => {
    const n = 420;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * HALF_W * 1.8;
      pos[i * 3 + 1] = 0.8 + Math.random() * 1.9;
      pos[i * 3 + 2] = -HALF_L + Math.random() * HALF_L * 2;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  useEffect(() => () => airGeo.dispose(), [airGeo]);

  useFrame((_, delta) => {
    speed.current = THREE.MathUtils.damp(speed.current, reducedMotion ? 0 : highlight ? 9 : 2.2, 2, delta);
    blades.current.forEach((b) => b && (b.rotation.z += delta * speed.current));
    const pts = air.current;
    if (!pts) return;
    const mat = pts.material as THREE.PointsMaterial;
    mat.opacity = THREE.MathUtils.damp(mat.opacity, highlight ? 0.75 : 0, 4, delta);
    if (mat.opacity < 0.01) return;
    const arr = (pts.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 2; i < arr.length; i += 3) {
      arr[i] += delta * 2.4;
      if (arr[i] > HALF_L) arr[i] = -HALF_L + 0.2;
    }
    pts.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      {Array.from({ length: SPANS }, (_, i) => {
        const x = -HALF_W + SPAN * (i + 0.5);
        return (
          <group key={i} position={[x, 1.85, -HALF_L - 0.08]}>
            <mesh>
              <torusGeometry args={[0.62, 0.05, 10, 40]} />
              <meshStandardMaterial color="#cfdcd5" metalness={0.8} roughness={0.3} />
            </mesh>
            <mesh>
              <cylinderGeometry args={[0.7, 0.7, 0.12, 32, 1, true]} />
              <meshStandardMaterial color="#1b412d" side={THREE.DoubleSide} metalness={0.4} roughness={0.5} />
            </mesh>
            <group ref={(g) => { if (g) blades.current[i] = g; }}>
              {[0, 1, 2, 3, 4].map((k) => (
                <mesh key={k} rotation-z={(k / 5) * Math.PI * 2} position={[0, 0, 0]}>
                  <boxGeometry args={[0.12, 1.08, 0.02]} />
                  <meshStandardMaterial
                    color={highlight ? "#00ff66" : "#9fb3a8"}
                    emissive={highlight ? "#00ff66" : "#000000"}
                    emissiveIntensity={highlight ? 0.6 : 0}
                    metalness={0.6}
                    roughness={0.35}
                  />
                </mesh>
              ))}
              <mesh rotation-x={Math.PI / 2}>
                <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
                <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
              </mesh>
            </group>
          </group>
        );
      })}
      {/* Climate computer on the end wall */}
      <mesh position={[HALF_W - 0.6, 0.9, -HALF_L - 0.2]}>
        <boxGeometry args={[0.8, 1.4, 0.3]} />
        <meshStandardMaterial color="#143222" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[HALF_W - 0.6, 1.2, -HALF_L - 0.36]}>
        <planeGeometry args={[0.55, 0.35]} />
        <meshBasicMaterial color={highlight ? "#00ff66" : "#1f6b45"} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <points ref={air} geometry={airGeo}>
        <pointsMaterial size={0.05} color="#b9ffd6" transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
}

/* ───────────────────────────── sensors ───────────────────────────── */

const SENSOR_SPOTS: [number, number][] = [
  [1.6, -1.2],
  [-1.6, 2.4],
  [-1.6, -3],
  [1.6, 3],
  [0, 0.4],
];

function SensorMasts({ highlight, reducedMotion }: { highlight: boolean; reducedMotion: boolean }) {
  const rings = useRef<THREE.Mesh[]>([]);
  const leds = useRef<THREE.MeshBasicMaterial[]>([]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    rings.current.forEach((ring, i) => {
      if (!ring) return;
      const k = reducedMotion ? 0.4 : (t * 0.6 + i * 0.23) % 1;
      ring.scale.setScalar(0.2 + k * (highlight ? 2.6 : 1.2));
      (ring.material as THREE.MeshBasicMaterial).opacity = (1 - k) * (highlight ? 0.9 : 0.25);
    });
    leds.current.forEach((m, i) => {
      if (!m) return;
      const blink = reducedMotion ? 1 : 0.6 + 0.4 * Math.sin(t * 5 + i);
      m.color.setRGB(0, highlight ? 1 : 0.55 * blink, highlight ? 0.4 : 0.22 * blink);
    });
  });

  return (
    <group>
      {SENSOR_SPOTS.map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position-y={0.7}>
            <cylinderGeometry args={[0.018, 0.018, 1.4, 8]} />
            <meshStandardMaterial color="#cfdcd5" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position-y={1.45}>
            <boxGeometry args={[0.16, 0.12, 0.1]} />
            <meshStandardMaterial color="#0d2117" metalness={0.4} roughness={0.4} />
          </mesh>
          <mesh position={[0, 1.45, 0.052]}>
            <circleGeometry args={[0.028, 16]} />
            <meshBasicMaterial ref={(m) => { if (m) leds.current[i] = m; }} color="#00ff66" toneMapped={false} />
          </mesh>
          <mesh position-y={0.02} rotation-x={-Math.PI / 2} ref={(m) => { if (m) rings.current[i] = m; }}>
            <ringGeometry args={[0.9, 1, 48]} />
            <meshBasicMaterial color="#00ff66" transparent depthWrite={false} toneMapped={false} blending={THREE.AdditiveBlending} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
