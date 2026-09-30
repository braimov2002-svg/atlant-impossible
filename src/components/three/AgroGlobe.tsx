"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import globeData from "./data/globe-data.json";
import {
  atmosphereFragment,
  beamFragment,
  beamVertex,
  landFragment,
  landVertex,
  occluderFragment,
  occluderVertex,
  uzFragment,
  uzVertex,
} from "./shaders";
import { bitAt, decodeBitmask, fibonacciPoint, latLonToVec3, rotationToFace } from "@/lib/geo";
import { HQ, REGIONS, TECH_HUBS, UZ_FOCUS, type AgroRegion, type RegionId } from "@/lib/regions";
import { TIER_CONFIG, type DeviceTier } from "@/hooks/useDeviceTier";

/*
 * AgroGlobe — the hero's "Global Agronomy" sphere.
 *
 *  ┌ root (layout: responsive position + scale, scroll-out)
 *  │  └ spin (rotation: intro spin → idle sway → pointer parallax → drag → region focus)
 *  │      ├ occluder sphere (writes depth, hides the far side, fresnel rim)
 *  │      ├ land dots        12k Fibonacci points masked to land (shader)
 *  │      ├ Uzbekistan dots  dense dot-matrix with ripples from Tashkent (shader)
 *  │      ├ UZ border        gold polyline
 *  │      ├ region nodes     core + pulse ring + data beam + hit-area + label
 *  │      └ tech-hub arcs    dashed flowing arcs → Tashkent, with comets
 *  └ atmosphere (fresnel glow shell) + orbit halo
 */

export interface AgroGlobeProps {
  tier: Exclude<DeviceTier, "none">;
  activeRegion: RegionId | null;
  hoveredRegion: RegionId | null;
  onRegionHover?: (id: RegionId | null) => void;
  onRegionSelect?: (id: RegionId) => void;
  /** 0 → 1 while the hero scrolls out (written by a GSAP ScrollTrigger) */
  scrollProgress: React.RefObject<number>;
  reducedMotion?: boolean;
  /**
   * DOM layer (same box as the canvas) holding one `[data-region-label=id]`
   * element per region. Nodes project themselves onto it every frame — plain
   * DOM, no extra React roots inside the WebGL reconciler.
   */
  labelsRef?: React.RefObject<HTMLDivElement | null>;
}

const LIME = new THREE.Color("#00ff66");
const GOLD = new THREE.Color("#d4af37");
const EMERALD = new THREE.Color("#2fbf7f");
const FIB_STEP = Math.sqrt((4 * Math.PI) / globeData.fibN); // angular spacing of land dots
const UZ_STEP = THREE.MathUtils.degToRad(globeData.uz.step);
/** Telephoto camera (far + narrow FOV) keeps perspective flat when zooming in. */
export const GLOBE_CAMERA = { position: [0, 0, 10] as [number, number, number], fov: 15 };
const CAM_DIST = GLOBE_CAMERA.position[2];

const damp = THREE.MathUtils.damp;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
/** Deterministic 0..1 hash so LOD subsampling is stable between renders. */
const hash = (i: number) => {
  const s = Math.sin(i * 12.9898) * 43758.5453;
  return s - Math.floor(s);
};

/* ───────────────────────── geometry builders ───────────────────────── */

function buildLandGeometry(ratio: number) {
  const mask = decodeBitmask(globeData.landMask);
  const positions: number[] = [];
  const rand: number[] = [];
  const v = new THREE.Vector3();
  for (let i = 0; i < globeData.fibN; i++) {
    if (!bitAt(mask, i) || hash(i) > ratio) continue;
    fibonacciPoint(i, globeData.fibN, v);
    positions.push(v.x, v.y, v.z);
    rand.push(hash(i + 7.31));
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute("aRand", new THREE.Float32BufferAttribute(rand, 1));
  return g;
}

function buildUzGeometry(stride: number) {
  const { cols, rows, lonMin, latMin, step } = globeData.uz;
  const mask = decodeBitmask(globeData.uz.mask);
  const hq = latLonToVec3(HQ.lat, HQ.lon);
  const positions: number[] = [];
  const dist: number[] = [];
  const rand: number[] = [];
  const v = new THREE.Vector3();
  for (let r = 0; r < rows; r += stride) {
    for (let c = 0; c < cols; c += stride) {
      const idx = r * cols + c;
      if (!bitAt(mask, idx)) continue;
      const lon = lonMin + (c + (r % 2 ? 0.5 : 0)) * step;
      const lat = latMin + r * step;
      latLonToVec3(lat, lon, 1.0015, v);
      positions.push(v.x, v.y, v.z);
      dist.push(v.clone().normalize().angleTo(hq));
      rand.push(hash(idx));
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute("aDist", new THREE.Float32BufferAttribute(dist, 1));
  g.setAttribute("aRand", new THREE.Float32BufferAttribute(rand, 1));
  return g;
}

function arcPoints(from: THREE.Vector3, to: THREE.Vector3, segments = 72) {
  const angle = from.angleTo(to);
  const lift = 1 + 0.08 + angle * 0.22;
  const slerp = (t: number) => {
    // spherical interpolation of unit vectors
    const s = Math.sin(angle);
    const a = Math.sin((1 - t) * angle) / s;
    const b = Math.sin(t * angle) / s;
    return from.clone().multiplyScalar(a).add(to.clone().multiplyScalar(b));
  };
  const curve = new THREE.CubicBezierCurve3(
    from.clone().multiplyScalar(1.004),
    slerp(0.25).multiplyScalar(lift),
    slerp(0.75).multiplyScalar(lift),
    to.clone().multiplyScalar(1.004),
  );
  return { curve, points: curve.getPoints(segments) };
}

/* ───────────────────────────── scene ───────────────────────────── */

export function AgroGlobe({
  tier,
  activeRegion,
  hoveredRegion,
  onRegionHover,
  onRegionSelect,
  scrollProgress,
  reducedMotion = false,
  labelsRef,
}: AgroGlobeProps) {
  const gl = useThree((s) => s.gl);
  const rootRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Points>(null);
  const intro = useRef(reducedMotion ? 1 : 0);
  const zoom = useRef(1);
  const pointer = useRef({ x: 0, y: 0 });
  const drag = useRef({ active: false, x: 0, y: 0, yaw: 0, pitch: 0, releasedAt: 0 });

  const { particleRatio } = TIER_CONFIG[tier];
  const focusDir = useMemo(() => latLonToVec3(UZ_FOCUS.lat, UZ_FOCUS.lon).normalize(), []);
  const focusRot = useMemo(() => rotationToFace(UZ_FOCUS.lat, UZ_FOCUS.lon), []);
  const regionRot = useMemo(
    () => Object.fromEntries(REGIONS.map((r) => [r.id, rotationToFace(r.lat, r.lon)])) as Record<RegionId, { x: number; y: number }>,
    [],
  );

  const landGeo = useMemo(() => buildLandGeometry(particleRatio), [particleRatio]);
  const uzGeo = useMemo(() => buildUzGeometry(tier === "low" ? 2 : 1), [tier]);

  const landMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: landVertex,
        fragmentShader: landFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uSize: { value: 10 },
          uPixelRatio: { value: 1 },
          uReveal: { value: 0 },
          uFocus: { value: focusDir },
          uColorFar: { value: EMERALD.clone().multiplyScalar(0.55) },
          uColorNear: { value: new THREE.Color("#7dffb0") },
        },
      }),
    [focusDir],
  );

  const uzMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: uzVertex,
        fragmentShader: uzFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uSize: { value: 6 },
          uPixelRatio: { value: 1 },
          uReveal: { value: 0 },
          uActiveDir: { value: new THREE.Vector3(0, 1, 0) },
          uActive: { value: 0 },
          uLime: { value: LIME.clone() },
          uGold: { value: GOLD.clone() },
        },
      }),
    [],
  );

  const occluderMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: occluderVertex,
        fragmentShader: occluderFragment,
        uniforms: {
          uDeep: { value: new THREE.Color("#04100a") },
          uRim: { value: new THREE.Color("#0f4d31") },
        },
      }),
    [],
  );

  const atmosphereMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: occluderVertex,
        fragmentShader: atmosphereFragment,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uColor: { value: new THREE.Color("#16c47a") },
          uIntensity: { value: 1.25 },
        },
      }),
    [],
  );

  // Orbit halo — a tilted ring of data particles (skipped on low tier)
  const haloGeo = useMemo(() => {
    const count = tier === "high" ? 900 : 500;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const r = 1.32 + (hash(i) - 0.5) * 0.06;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = (hash(i + 3) - 0.5) * 0.02;
      pos[i * 3 + 2] = Math.sin(a) * r;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [tier]);

  const uzOutline = useMemo(
    () => globeData.uzOutline.map((ring) => ring.map(([lon, lat]) => latLonToVec3(lat, lon, 1.003))),
    [],
  );

  const arcs = useMemo(() => {
    const hq = latLonToVec3(HQ.lat, HQ.lon);
    return TECH_HUBS.map((hub, i) => ({
      hub,
      start: latLonToVec3(hub.lat, hub.lon),
      phase: i / TECH_HUBS.length,
      ...arcPoints(latLonToVec3(hub.lat, hub.lon), hq),
    }));
  }, []);

  useEffect(
    () => () => {
      [landGeo, uzGeo, haloGeo].forEach((g) => g.dispose());
    },
    [landGeo, uzGeo, haloGeo],
  );
  useEffect(
    () => () => {
      [landMat, uzMat, occluderMat, atmosphereMat].forEach((m) => m.dispose());
    },
    [landMat, uzMat, occluderMat, atmosphereMat],
  );

  // Pointer parallax (window-level so it works under the DOM overlay) + drag on fine pointers.
  useEffect(() => {
    const el = gl.domElement;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      const d = drag.current;
      if (!d.active) return;
      d.yaw += (e.clientX - d.x) * 0.006;
      d.pitch = THREE.MathUtils.clamp(d.pitch + (e.clientY - d.y) * 0.004, -0.6, 0.6);
      d.x = e.clientX;
      d.y = e.clientY;
    };
    const onDown = (e: PointerEvent) => {
      if (!fine) return;
      Object.assign(drag.current, { active: true, x: e.clientX, y: e.clientY });
      el.style.cursor = "grabbing";
    };
    const onUp = () => {
      if (!drag.current.active) return;
      drag.current.active = false;
      drag.current.releasedAt = performance.now();
      el.style.cursor = fine ? "grab" : "";
    };
    if (fine) el.style.cursor = "grab";
    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [gl]);

  useFrame((state, delta) => {
    const root = rootRef.current;
    const spin = spinRef.current;
    if (!root || !spin) return;
    const dt = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime;
    const motion = reducedMotion ? 0 : 1;

    // ── Intro reveal (dots bloom outward from Uzbekistan while the globe spins in)
    intro.current = Math.min(1, intro.current + dt / 2.8);
    const reveal = easeOutCubic(intro.current);
    landMat.uniforms.uReveal.value = reveal;
    uzMat.uniforms.uReveal.value = reveal;
    landMat.uniforms.uTime.value = t * motion;
    uzMat.uniforms.uTime.value = t * motion;

    // ── Responsive layout: big globe on the right (landscape) / bottom (portrait)
    const { viewport, size } = state;
    const scroll = scrollProgress.current ?? 0;
    const landscape = size.width / size.height > 1.05;
    const baseScale = landscape
      ? Math.min(viewport.height * 0.5, viewport.width * 0.36)
      : Math.min(viewport.width * 0.92, viewport.height * 0.5);
    zoom.current = damp(zoom.current, activeRegion ? 2.1 : 1, 2.4, dt);
    const scale = baseScale * zoom.current * (1 - scroll * 0.25);
    root.scale.setScalar(scale);
    const targetX = landscape ? viewport.width * (activeRegion ? 0.1 : 0.22) : 0;
    const targetY = landscape ? -viewport.height * 0.02 : -viewport.height * 0.14;
    root.position.x = damp(root.position.x, targetX, 3, dt);
    root.position.y = damp(root.position.y, targetY + scroll * viewport.height * 0.35, 4, dt);

    // Dot sizes follow on-screen globe radius so density reads the same everywhere
    const pxPerUnit = size.height / viewport.height;
    const radiusPx = scale * pxPerUnit;
    const pr = state.gl.getPixelRatio();
    landMat.uniforms.uPixelRatio.value = pr;
    uzMat.uniforms.uPixelRatio.value = pr;
    landMat.uniforms.uSize.value = THREE.MathUtils.clamp(FIB_STEP * radiusPx * 0.4, 1.6, 3.6) * CAM_DIST;
    uzMat.uniforms.uSize.value =
      THREE.MathUtils.clamp(UZ_STEP * radiusPx * (tier === "low" ? 1.5 : 0.85), 1.3, 3.4) * CAM_DIST;

    // ── Rotation: target = UZ (or active region) + sway + parallax + drag + scroll
    const d = drag.current;
    if (!d.active && performance.now() - d.releasedAt > 1400) {
      d.yaw = damp(d.yaw, 0, 1.6, dt);
      d.pitch = damp(d.pitch, 0, 1.6, dt);
    }
    const base = activeRegion ? regionRot[activeRegion] : focusRot;
    const sway = activeRegion ? 0 : Math.sin(t * 0.18) * 0.14 * motion;
    const introSpin = (1 - reveal) * 2.2;
    const yaw = base.y + sway + introSpin + pointer.current.x * 0.08 * motion + d.yaw + scroll * 1.2;
    const pitch = base.x + pointer.current.y * 0.05 * motion + d.pitch - scroll * 0.25;
    spin.rotation.y = damp(spin.rotation.y, yaw, 3.2, dt);
    spin.rotation.x = damp(spin.rotation.x, pitch, 3.2, dt);

    // Active region → gold glow in the UZ dot-matrix
    const active = REGIONS.find((r) => r.id === (activeRegion ?? hoveredRegion));
    if (active) latLonToVec3(active.lat, active.lon, 1, uzMat.uniforms.uActiveDir.value).normalize();
    uzMat.uniforms.uActive.value = damp(uzMat.uniforms.uActive.value, active ? 1 : 0, 5, dt);

    if (haloRef.current) haloRef.current.rotation.y += dt * 0.05 * motion;
  });

  return (
    <group ref={rootRef}>
      {/* Atmosphere + halo sit outside the spin group so the glow stays put */}
      <mesh material={atmosphereMat} scale={1.16}>
        <sphereGeometry args={[1, 64, 64]} />
      </mesh>
      {tier !== "low" && (
        <group rotation={[0.42, 0, -0.28]}>
          <points ref={haloRef} geometry={haloGeo}>
            <pointsMaterial
              size={0.006}
              color="#d4af37"
              transparent
              opacity={0.55}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </points>
        </group>
      )}

      <group ref={spinRef}>
        <mesh material={occluderMat} renderOrder={0}>
          <sphereGeometry args={[0.992, 96, 96]} />
        </mesh>
        <points geometry={landGeo} material={landMat} renderOrder={1} />
        <points geometry={uzGeo} material={uzMat} renderOrder={2} />

        {uzOutline.map((ring, i) => (
          <Line key={i} points={ring} color="#d4af37" lineWidth={1.1} transparent opacity={0.85} />
        ))}

        {arcs.map((arc) => (
          <TechArc key={arc.hub.name} {...arc} reducedMotion={reducedMotion} />
        ))}

        {REGIONS.map((region, i) => (
          <RegionNode
            key={region.id}
            region={region}
            index={i}
            active={activeRegion === region.id}
            hovered={hoveredRegion === region.id}
            onHover={onRegionHover}
            onSelect={onRegionSelect}
            labelsRef={labelsRef}
            zoomRef={zoom}
            reducedMotion={reducedMotion}
          />
        ))}
      </group>
    </group>
  );
}

/* ─────────────────────────── region node ─────────────────────────── */

const UP = new THREE.Vector3(0, 1, 0);
const tmpA = new THREE.Vector3();
const tmpB = new THREE.Vector3();
const tmpC = new THREE.Vector3();

function RegionNode({
  region,
  index,
  active,
  hovered,
  onHover,
  onSelect,
  labelsRef,
  zoomRef,
  reducedMotion,
}: {
  region: AgroRegion;
  index: number;
  active: boolean;
  hovered: boolean;
  onHover?: (id: RegionId | null) => void;
  onSelect?: (id: RegionId) => void;
  labelsRef?: React.RefObject<HTMLDivElement | null>;
  zoomRef: React.RefObject<number>;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const beamRef = useRef<THREE.Mesh>(null);
  const labelEl = useRef<HTMLElement | null>(null);
  const labelOpacity = useRef(0);
  const facing = useRef(1);

  const { position, quaternion } = useMemo(() => {
    const p = latLonToVec3(region.lat, region.lon, 1.002);
    return { position: p, quaternion: new THREE.Quaternion().setFromUnitVectors(UP, p.clone().normalize()) };
  }, [region.lat, region.lon]);

  const color = region.hq ? GOLD : LIME;
  const beamHeight = region.hq ? 0.16 : region.major ? 0.1 : 0.065;

  const beamMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: beamVertex,
        fragmentShader: beamFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uColor: { value: color.clone() }, uOpacity: { value: 0.8 }, uTime: { value: 0 } },
      }),
    [color],
  );
  useEffect(() => () => beamMat.dispose(), [beamMat]);

  useFrame(({ clock, camera, size }, delta) => {
    const t = clock.elapsedTime + index * 0.37;
    const k = reducedMotion ? 0.5 : (t % 2.4) / 2.4;
    const ring = ringRef.current;
    if (ring) {
      ring.scale.setScalar(1 + k * (active ? 3.2 : 1.6));
      (ring.material as THREE.MeshBasicMaterial).opacity = (1 - k) * (active || hovered ? 1 : region.major ? 0.55 : 0.3);
    }
    const beam = beamRef.current;
    if (beam) {
      const target = active ? 2.2 : hovered ? 1.6 : 1;
      beam.scale.y = THREE.MathUtils.damp(beam.scale.y, target, 6, delta);
      beam.position.y = (beamHeight * beam.scale.y) / 2;
      beamMat.uniforms.uTime.value = reducedMotion ? 0 : t;
      beamMat.uniforms.uOpacity.value = active || hovered ? 1 : 0.7;
    }
    // Facing (for hit-testing + label fade) and label projection to screen space
    const g = groupRef.current;
    if (!g) return;
    // Counter-scale while zoomed so markers keep a crisp on-screen size
    g.scale.setScalar(1 / Math.pow(zoomRef.current, 0.85));
    g.getWorldPosition(tmpA);
    g.parent!.getWorldPosition(tmpB);
    const normal = tmpA.clone().sub(tmpB).normalize();
    facing.current = normal.dot(tmpC.copy(camera.position).sub(tmpA).normalize());

    labelEl.current ??= labelsRef?.current?.querySelector<HTMLElement>(`[data-region-label="${region.id}"]`) ?? null;
    const el = labelEl.current;
    if (!el) return;
    const show = region.hq || active || hovered ? 1 : 0;
    const target = show * THREE.MathUtils.smoothstep(facing.current, 0.15, 0.45);
    labelOpacity.current = THREE.MathUtils.damp(labelOpacity.current, target, 8, delta);
    // Label sits just above the beam tip
    const worldScale = g.parent!.getWorldScale(tmpB).x;
    const lift = (beamHeight * (beam?.scale.y ?? 1) + 0.02) * worldScale * g.scale.x;
    tmpC.copy(tmpA).addScaledVector(normal, lift).project(camera);
    const x = (tmpC.x * 0.5 + 0.5) * size.width;
    const y = (-tmpC.y * 0.5 + 0.5) * size.height;
    el.style.opacity = labelOpacity.current.toFixed(3);
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -100%)`;
  });

  const facingCamera = () => facing.current > 0.1;
  const over = (e: ThreeEvent<PointerEvent>) => {
    if (!facingCamera()) return;
    e.stopPropagation();
    onHover?.(region.id);
    document.body.style.cursor = "pointer";
  };
  const out = () => {
    onHover?.(null);
    document.body.style.cursor = "";
  };
  const click = (e: ThreeEvent<MouseEvent>) => {
    if (!facingCamera()) return;
    e.stopPropagation();
    onSelect?.(region.id);
  };

  return (
    <group ref={groupRef} position={position} quaternion={quaternion}>
      <mesh>
        <sphereGeometry args={[region.hq ? 0.011 : 0.0075, 16, 16]} />
        <meshBasicMaterial color={active ? GOLD : color} toneMapped={false} />
      </mesh>
      <mesh ref={ringRef} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.009, 0.0115, 40]} />
        <meshBasicMaterial
          color={active ? GOLD : color}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={beamRef} material={beamMat} position-y={beamHeight / 2}>
        <cylinderGeometry args={[0.0018, 0.0028, beamHeight, 8, 1, true]} />
      </mesh>
      {/* Invisible, generous hit-area */}
      <mesh onPointerOver={over} onPointerOut={out} onClick={click}>
        <sphereGeometry args={[0.028, 10, 10]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────── tech-hub arc ─────────────────────────── */

function TechArc({
  curve,
  points,
  start,
  phase,
  reducedMotion,
}: {
  curve: THREE.CubicBezierCurve3;
  points: THREE.Vector3[];
  start: THREE.Vector3;
  phase: number;
  reducedMotion: boolean;
}) {
  const dashRef = useRef<React.ComponentRef<typeof Line>>(null);
  const cometRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    if (reducedMotion) return;
    const mat = dashRef.current?.material as { dashOffset?: number } | undefined;
    if (mat && typeof mat.dashOffset === "number") mat.dashOffset -= delta * 0.12;
    const k = (clock.elapsedTime * 0.16 + phase) % 1;
    if (cometRef.current) {
      curve.getPoint(k, cometRef.current.position);
      cometRef.current.scale.setScalar(Math.sin(k * Math.PI) * 0.8 + 0.2);
    }
  });

  return (
    <group>
      <Line points={points} color="#2fbf7f" lineWidth={0.8} transparent opacity={0.22} />
      <Line
        ref={dashRef}
        points={points}
        color="#00ff66"
        lineWidth={1.3}
        dashed
        dashSize={0.035}
        gapSize={0.05}
        transparent
        opacity={0.75}
      />
      <mesh ref={cometRef}>
        <sphereGeometry args={[0.0065, 12, 12]} />
        <meshBasicMaterial color="#b9ffd6" toneMapped={false} />
      </mesh>
      {/* Hub endpoint */}
      <mesh position={start.clone().multiplyScalar(1.004)}>
        <sphereGeometry args={[0.006, 12, 12]} />
        <meshBasicMaterial color="#d4af37" toneMapped={false} />
      </mesh>
    </group>
  );
}
