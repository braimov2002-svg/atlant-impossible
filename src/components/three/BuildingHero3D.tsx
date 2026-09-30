"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { FLOOR_H, LineSet, facadeBox, towerLevel, towerLines, twistedTower, type TowerOptions } from "./building/geometry";
import { CYAN, createBeamMaterial, createBlueprintLineMaterial, createRoleMaterials, setFacadeLights } from "./building/materials";
import { ArchEnvironment, ArchLights, BlueprintGround, EnableClipping } from "./building/Stage";
import type { DeviceTier } from "@/hooks/useDeviceTier";

/*
 * BuildingHero3D — scroll-driven construction of the Atlant Tower.
 *
 *  scroll p   stage        what grows
 *  0.00–0.10  Poydevor     foundation raft rises, pile blueprint glows
 *  0.08–0.55  Karkas       concrete core, floor plates, twisting columns (clip plane)
 *  0.30–0.86  Fasad        glass skin climbs behind a glowing build line
 *  0.82–1.00  Topshirish   crown + spire, crane leaves, window lights, light beams
 *
 * On load (before any scroll) the full BIM wireframe draws itself bottom-up.
 * Everything reads one smoothed progress value, so the scene is fully
 * reversible when scrolling back up.
 */

export interface HeroReadout {
  progress: number;
  floor: number;
  floors: number;
  heightM: number;
  stage: number;
}

interface Props {
  tier: Exclude<DeviceTier, "none">;
  /** 0 → 1, written by the hero's GSAP ScrollTrigger */
  progress: React.RefObject<number>;
  /** Filled every frame for the DOM HUD (no React re-renders) */
  readout: React.RefObject<HeroReadout>;
  reducedMotion?: boolean;
}

const REAL_HEIGHT_M = 212;
const TOWER: Omit<TowerOptions, "floors"> = { baseY: 0.4, r0: 0.55, taper: 0.22, twist: 1.35 };
// [scroll, radius, targetY (fraction of height, or absolute when ≥ 1), elevation, azimuth]
const CAMERA_KEYS: [number, number, number, number, number][] = [
  [0.0, 13.8, 0.46, 0.2, -0.5],
  [0.12, 8.4, 1.0, 0.42, -0.85],
  [0.5, 10.6, 0.36, 0.3, -0.2],
  [0.85, 12.6, 0.47, 0.16, 0.35],
  [1.0, 13.2, 0.47, 0.12, 0.6],
];
function cameraAt(p: number, height: number) {
  let i = 0;
  while (i < CAMERA_KEYS.length - 2 && p > CAMERA_KEYS[i + 1][0]) i++;
  const a = CAMERA_KEYS[i];
  const b = CAMERA_KEYS[i + 1];
  const k = easeInOut(THREE.MathUtils.clamp((p - a[0]) / (b[0] - a[0]), 0, 1));
  const ty = (v: number) => (v >= 1 ? v : v * height);
  return {
    r: THREE.MathUtils.lerp(a[1], b[1], k),
    ty: THREE.MathUtils.lerp(ty(a[2]), ty(b[2]), k),
    el: THREE.MathUtils.lerp(a[3], b[3], k),
    az: THREE.MathUtils.lerp(a[4], b[4], k),
  };
}
const band = (p: number, a: number, b: number) => THREE.MathUtils.clamp((p - a) / (b - a), 0, 1);
const easeInOut = (t: number) => t * t * (3 - 2 * t);

export function BuildingHero3D({ tier, progress, readout, reducedMotion = false }: Props) {
  const floors = tier === "high" ? 48 : tier === "mid" ? 40 : 30;
  const opts = useMemo<TowerOptions>(() => ({ ...TOWER, floors }), [floors]);
  const towerTop = opts.baseY + floors * FLOOR_H;
  const H = towerTop + 0.6; // incl. spire

  const { camera, size } = useThree();
  const p = useRef(reducedMotion ? 1 : 0);
  const intro = useRef(reducedMotion ? 1 : 0);
  const pointer = useRef({ x: 0, y: 0 });

  /* ── clipping planes: frame and facade reveal independently */
  const frameClip = useMemo(() => new THREE.Plane(new THREE.Vector3(0, -1, 0), 0), []);
  const facadeClip = useMemo(() => new THREE.Plane(new THREE.Vector3(0, -1, 0), 0), []);
  const frameMats = useMemo(() => createRoleMaterials([frameClip]), [frameClip]);
  const facadeMats = useMemo(() => createRoleMaterials([facadeClip]), [facadeClip]);
  const lineMat = useMemo(() => createBlueprintLineMaterial(), []);
  const beamMat = useMemo(() => createBeamMaterial(), []);

  /* ── geometry */
  const tower = useMemo(() => twistedTower(opts), [opts]);
  const lines = useMemo(() => {
    const set = new LineSet();
    towerLines(set, opts, tower.profile);
    const podium = facadeBox(opts.r0 * 3.2, opts.baseY, opts.r0 * 2.6);
    set.edges(podium, [0, opts.baseY / 2, 0]);
    // Bored piles under the raft
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 4; j++) {
        const x = -0.72 + i * 0.36;
        const z = -0.5 + j * 0.33;
        set.seg({ x, y: -1.3, z }, { x, y: -0.25, z });
      }
    }
    const raft = new THREE.BoxGeometry(opts.r0 * 3.6, 0.25, opts.r0 * 3);
    set.edges(raft, [0, -0.125, 0]);
    set.seg({ x: 0, y: towerTop, z: 0 }, { x: 0, y: H, z: 0 });
    podium.dispose();
    raft.dispose();
    return set.build();
  }, [opts, tower.profile, towerTop, H]);

  const slabGeo = useMemo(() => {
    const shape = new THREE.Shape(tower.profile.map(([x, z]) => new THREE.Vector2(x * opts.r0 * 1.015, -z * opts.r0 * 1.015)));
    const g = new THREE.ExtrudeGeometry(shape, { depth: 0.022, bevelEnabled: false });
    g.rotateX(-Math.PI / 2);
    return g;
  }, [tower.profile, opts.r0]);

  const podiumGeo = useMemo(() => facadeBox(opts.r0 * 3.2, opts.baseY, opts.r0 * 2.6), [opts.r0, opts.baseY]);
  const slabs = useRef<THREE.InstancedMesh>(null);
  const columns = useRef<THREE.InstancedMesh>(null);
  const COLS = 8;

  useEffect(() => {
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    for (let k = 0; k < floors; k++) {
      const lv = towerLevel(opts, k + 1);
      slabs.current?.setMatrixAt(k, m.compose(new THREE.Vector3(0, lv.y - 0.022, 0), q.setFromEuler(new THREE.Euler(0, -lv.angle, 0)), new THREE.Vector3(lv.scale, 1, lv.scale)));
      for (let c = 0; c < COLS; c++) {
        const j = (c * tower.profile.length) / COLS;
        const pt = (kk: number) => {
          const l = towerLevel(opts, kk);
          const [px, pz] = tower.profile[j];
          const x = px * opts.r0 * l.scale * 0.9;
          const z = pz * opts.r0 * l.scale * 0.9;
          return new THREE.Vector3(x * Math.cos(l.angle) - z * Math.sin(l.angle), l.y, x * Math.sin(l.angle) + z * Math.cos(l.angle));
        };
        const a = pt(k);
        const b = pt(k + 1);
        const dir = b.clone().sub(a);
        const len = dir.length();
        columns.current?.setMatrixAt(
          k * COLS + c,
          m.compose(a.clone().add(b).multiplyScalar(0.5), q.setFromUnitVectors(up, dir.normalize()), new THREE.Vector3(0.035, len, 0.035)),
        );
      }
    }
    if (slabs.current) slabs.current.instanceMatrix.needsUpdate = true;
    if (columns.current) columns.current.instanceMatrix.needsUpdate = true;
  }, [floors, opts, tower.profile]);

  /* ── build-line ring (follows the facade edge) */
  const ringGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array((tower.profile.length + 1) * 3), 3));
    return g;
  }, [tower.profile.length]);
  const ring = useMemo(
    () => new THREE.Line(ringGeo, new THREE.LineBasicMaterial({ color: CYAN, transparent: true, blending: THREE.AdditiveBlending })),
    [ringGeo],
  );

  const crown = useRef<THREE.Group>(null);
  const crane = useRef<THREE.Group>(null);
  const mast = useRef<THREE.Mesh>(null);
  const jib = useRef<THREE.Group>(null);
  const sparkles = useRef<THREE.Group>(null);

  useEffect(
    () => () => {
      [tower.skin, tower.cap, lines, slabGeo, ringGeo, podiumGeo].forEach((g) => g.dispose());
      [...Object.values(frameMats), ...Object.values(facadeMats), lineMat, beamMat].forEach((m) => m.dispose());
    },
    [tower, lines, slabGeo, ringGeo, podiumGeo, frameMats, facadeMats, lineMat, beamMat],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const cam = camera as THREE.PerspectiveCamera;
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 0.1);
    const t = clock.elapsedTime;
    const motion = reducedMotion ? 0 : 1;

    // Smoothed scroll progress + one-off wireframe draw-in
    p.current = THREE.MathUtils.damp(p.current, reducedMotion ? 1 : (progress.current ?? 0), 5, dt);
    intro.current = Math.min(1, intro.current + dt / 2.6);
    const P = p.current;

    const found = easeInOut(band(P, 0, 0.1));
    const frame = easeInOut(band(P, 0.08, 0.55));
    const facade = easeInOut(band(P, 0.3, 0.86));
    const done = easeInOut(band(P, 0.82, 1));

    const frameH = found > 0 ? -0.26 + found * 0.26 + frame * (towerTop + 0.05) : -1;
    const facadeH = facade > 0 ? facade * (towerTop + 0.05) : -1;
    frameClip.constant = frameH;
    facadeClip.constant = facadeH;

    // Blueprint: draws on load, then dims as the real building takes over
    lineMat.uniforms.uMax.value = -1.4 + easeInOut(intro.current) * (H + 1.5);
    lineMat.uniforms.uOpacity.value = THREE.MathUtils.lerp(0.95, 0.12, done);
    lineMat.uniforms.uTime.value = t * motion;

    // Build-line ring hugs the facade edge
    const ringVisible = facade > 0.001 && facade < 0.999;
    ring.visible = ringVisible;
    if (ringVisible) {
      const k = THREE.MathUtils.clamp((facadeH - opts.baseY) / FLOOR_H, 0, floors);
      const lv = towerLevel(opts, k);
      const arr = ringGeo.attributes.position.array as Float32Array;
      const c = Math.cos(lv.angle);
      const s = Math.sin(lv.angle);
      tower.profile.concat([tower.profile[0]]).forEach(([px, pz], i) => {
        const x = px * opts.r0 * lv.scale * 1.03;
        const z = pz * opts.r0 * lv.scale * 1.03;
        arr[i * 3] = x * c - z * s;
        arr[i * 3 + 1] = Math.max(facadeH, 0.02);
        arr[i * 3 + 2] = x * s + z * c;
      });
      ringGeo.attributes.position.needsUpdate = true;
    }
    if (sparkles.current) {
      sparkles.current.position.y = Math.max(0.1, frameH);
      sparkles.current.visible = frame > 0.01 && frame < 0.99 && tier !== "low";
    }

    // Crown, lights, beams
    if (crown.current) {
      crown.current.scale.setScalar(Math.max(0.001, done));
      crown.current.visible = done > 0.01;
    }
    const night = easeInOut(band(P, 0.7, 1));
    setFacadeLights(facadeMats, 0.65 * night);
    beamMat.uniforms.uIntensity.value = 0.55 * done;

    // Tower crane: mast climbs with the frame, then is dismantled
    if (crane.current && mast.current && jib.current) {
      const mastH = Math.max(1.4, frameH + 1.1);
      mast.current.scale.y = mastH;
      mast.current.position.y = mastH / 2;
      jib.current.position.y = mastH;
      jib.current.rotation.y = -0.6 + Math.sin(t * 0.25) * 0.5 * motion;
      const leave = band(P, 0.86, 0.96);
      crane.current.position.y = -leave * (mastH + 1);
      crane.current.visible = leave < 0.999;
    }

    // ── Camera path: keyframed on scroll (wide blueprint → dive to foundation →
    //    rise with the frame → heroic wide shot) + pointer parallax + idle drift
    const landscape = size.width / size.height > 1.05;
    const fit = landscape ? 1 : Math.min(1.7, 1.05 / (size.width / size.height));
    const cam0 = cameraAt(P, H);
    const az = cam0.az + pointer.current.x * 0.08 * motion + Math.sin(t * 0.1) * 0.04 * motion;
    const r = cam0.r * fit;
    const el = cam0.el - pointer.current.y * 0.03 * motion;
    const ty = cam0.ty;
    target.set(0, ty, 0);
    cam.position.set(Math.sin(az) * Math.cos(el) * r, ty + Math.sin(el) * r, Math.cos(az) * Math.cos(el) * r);
    cam.lookAt(target);
    // Frame composition: tower right of the headline (landscape) or pushed
    // below it (portrait) — shifts the frustum, not the camera.
    const layoutKey = `${size.width}x${size.height}`;
    if (cam.userData.layoutKey !== layoutKey) {
      cam.userData.layoutKey = layoutKey;
      if (landscape) {
        cam.clearViewOffset();
        cam.filmOffset = -4.5;
      } else {
        cam.filmOffset = 0;
        cam.setViewOffset(size.width, size.height, 0, -size.height * 0.17, size.width, size.height);
      }
      cam.updateProjectionMatrix();
    }

    // HUD readout (read by the DOM overlay via rAF)
    const r0 = readout.current;
    if (r0) {
      r0.progress = P;
      r0.floors = 48;
      r0.floor = Math.round(frame * 48);
      r0.heightM = frame * REAL_HEIGHT_M;
      r0.stage = P < 0.1 ? 0 : P < 0.5 ? 1 : P < 0.84 ? 2 : 3;
    }
  });

  const top = towerLevel(opts, floors);

  return (
    <>
      <EnableClipping />
      <color attach="background" args={["#06080d"]} />
      <fog attach="fog" args={["#06080d", 14, 34]} />
      <ArchLights sun={1.6} />
      {tier !== "low" && <ArchEnvironment />}
      <BlueprintGround radius={16} />

      {/* Foundation raft (−0.25…0) — revealed bottom-up by the frame clip plane */}
      <mesh position-y={-0.125} material={frameMats.concrete}>
        <boxGeometry args={[opts.r0 * 3.6, 0.25, opts.r0 * 3]} />
      </mesh>

      {/* Structure (frame clip) */}
      <mesh position-y={towerTop / 2} material={frameMats.concrete}>
        <boxGeometry args={[0.36, towerTop, 0.36]} />
      </mesh>
      <instancedMesh ref={slabs} args={[slabGeo, frameMats.concrete, floors]} />
      <instancedMesh ref={columns} args={[undefined, frameMats.titanium, floors * COLS]}>
        <boxGeometry />
      </instancedMesh>

      {/* Podium + skin (facade clip) */}
      <mesh
        geometry={podiumGeo}
        position-y={opts.baseY / 2}
        material={[facadeMats.office, facadeMats.office, facadeMats.roof, facadeMats.roof, facadeMats.office, facadeMats.office]}
      />
      <mesh position-y={opts.baseY + 0.012} material={facadeMats.gold}>
        <boxGeometry args={[opts.r0 * 3.4, 0.025, opts.r0 * 2.8]} />
      </mesh>
      <mesh geometry={tower.skin} material={facadeMats.curtain} />
      <mesh geometry={tower.cap} material={facadeMats.roof} />

      {/* Blueprint overlay */}
      <lineSegments geometry={lines} material={lineMat} />
      <primitive object={ring} />
      <group ref={sparkles}>
        <Sparkles count={40} scale={[2, 0.3, 2]} size={2.5} speed={0.6} color="#e2b859" />
      </group>

      {/* Crown */}
      <group ref={crown} position-y={top.y}>
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2 + top.angle;
          const rr = opts.r0 * top.scale * 0.88;
          return (
            <mesh key={i} position={[Math.cos(a) * rr, 0.17, Math.sin(a) * rr]} rotation-y={-a} material={facadeMats.gold}>
              <boxGeometry args={[0.018, 0.34, 0.07]} />
            </mesh>
          );
        })}
        <mesh position-y={0.3} material={facadeMats.gold}>
          <cylinderGeometry args={[0.008, 0.03, 0.6, 8]} />
        </mesh>
        <pointLight position-y={0.62} color="#e2b859" intensity={2} distance={3} />
      </group>

      {/* Volumetric up-lights from the podium corners */}
      {[
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ].map(([sx, sz], i) => (
        <mesh
          key={i}
          material={beamMat}
          position={[sx * opts.r0 * 1.9, 1.6, sz * opts.r0 * 1.6]}
          rotation={[sz * -0.16, 0, sx * 0.16]}
        >
          <cylinderGeometry args={[0.55, 0.04, 3.2, 24, 1, true]} />
        </mesh>
      ))}

      <TowerCrane craneRef={crane} mastRef={mast} jibRef={jib} />
    </>
  );
}

/* ─────────────────────────── tower crane ─────────────────────────── */

function TowerCrane({
  craneRef,
  mastRef,
  jibRef,
}: {
  craneRef: React.RefObject<THREE.Group | null>;
  mastRef: React.RefObject<THREE.Mesh | null>;
  jibRef: React.RefObject<THREE.Group | null>;
}) {
  const steel = useMemo(() => new THREE.MeshStandardMaterial({ color: "#e2b859", metalness: 0.6, roughness: 0.45 }), []);
  const lattice = useMemo(() => new THREE.MeshBasicMaterial({ color: "#e2b859", wireframe: true, transparent: true, opacity: 0.45 }), []);
  useEffect(() => () => (steel.dispose(), lattice.dispose()), [steel, lattice]);

  return (
    <group ref={craneRef} position={[1.45, 0, -0.55]}>
      <mesh ref={mastRef} material={lattice}>
        <boxGeometry args={[0.08, 1, 0.08, 1, 12, 1]} />
      </mesh>
      <group ref={jibRef}>
        <mesh position={[-1.05, 0.03, 0]} material={lattice}>
          <boxGeometry args={[2.3, 0.06, 0.06, 18, 1, 1]} />
        </mesh>
        <mesh position={[0.45, 0.03, 0]} material={steel}>
          <boxGeometry args={[0.7, 0.05, 0.07]} />
        </mesh>
        <mesh position={[0.72, -0.04, 0]} material={steel}>
          <boxGeometry args={[0.16, 0.12, 0.12]} />
        </mesh>
        <mesh position={[0.02, -0.05, 0.06]} material={steel}>
          <boxGeometry args={[0.1, 0.08, 0.08]} />
        </mesh>
        <mesh position={[0, 0.2, 0]} material={steel}>
          <cylinderGeometry args={[0.012, 0.02, 0.35, 6]} />
        </mesh>
        {/* hook cable */}
        <mesh position={[-1.5, -0.45, 0]} material={steel}>
          <cylinderGeometry args={[0.004, 0.004, 0.9, 4]} />
        </mesh>
        <mesh position={[-1.5, -0.92, 0]} material={steel}>
          <boxGeometry args={[0.05, 0.05, 0.05]} />
        </mesh>
      </group>
    </group>
  );
}
