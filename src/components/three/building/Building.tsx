"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import type { BuildingSpec } from "@/data/projects";
import { buildModel } from "./geometry";
import { CYAN, createBlueprintLineMaterial, createRoleMaterials, setFacadeLights } from "./materials";

export type ViewMode = "realistic" | "blueprint";

/**
 * A procedural building that can morph between a finished, photoreal-style
 * render and its BIM blueprint. The morph is a horizontal scan plane:
 *   below the plane → realistic materials (clipping plane keeps y ≤ h)
 *   above the plane → cyan structural lines + ghosted glass (keeps y ≥ h)
 * Switching `mode` sweeps the plane up (build) or down (x-ray).
 */
export function Building({
  spec,
  mode,
  lights = 0.55,
  speed = 1.6,
}: {
  spec: BuildingSpec;
  mode: ViewMode;
  /** Window light intensity when realistic (0 day → 1 night) */
  lights?: number;
  speed?: number;
}) {
  const model = useMemo(() => buildModel(spec), [spec]);
  const clipReal = useMemo(() => new THREE.Plane(new THREE.Vector3(0, -1, 0), 0), []);
  const clipGhost = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);
  const mats = useMemo(() => createRoleMaterials([clipReal]), [clipReal]);
  const ghost = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: CYAN,
        transparent: true,
        opacity: 0.045,
        depthWrite: false,
        side: THREE.DoubleSide,
        clippingPlanes: [clipGhost],
        blending: THREE.AdditiveBlending,
      }),
    [clipGhost],
  );
  const lineMat = useMemo(() => createBlueprintLineMaterial(), []);
  const scanRef = useRef<THREE.Group>(null);
  const scanMat = useRef<THREE.MeshBasicMaterial>(null);
  // Always enter from blueprint → every model "builds" itself on first view.
  const h = useRef(-0.3);

  useEffect(
    () => () => {
      model.parts.forEach((p) => p.geometry.dispose());
      model.lines.dispose();
    },
    [model],
  );
  useEffect(
    () => () => {
      Object.values(mats).forEach((m) => m.dispose());
      ghost.dispose();
      lineMat.dispose();
    },
    [mats, ghost, lineMat],
  );

  const outline = useMemo(() => {
    const x = model.halfX * 1.12;
    const z = model.halfZ * 1.12;
    return new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-x, 0, -z),
      new THREE.Vector3(x, 0, -z),
      new THREE.Vector3(x, 0, z),
      new THREE.Vector3(-x, 0, z),
      new THREE.Vector3(-x, 0, -z),
    ]);
  }, [model]);
  const scanLine = useMemo(() => new THREE.Line(outline, new THREE.LineBasicMaterial({ color: CYAN, transparent: true })), [outline]);

  useFrame(({ clock }, delta) => {
    const top = model.height + 0.3;
    const target = mode === "realistic" ? top : -0.3;
    h.current = THREE.MathUtils.damp(h.current, target, speed, Math.min(delta, 0.1));
    clipReal.constant = h.current;
    clipGhost.constant = -h.current;
    lineMat.uniforms.uMin.value = h.current;
    lineMat.uniforms.uTime.value = clock.elapsedTime;

    const realness = THREE.MathUtils.clamp(h.current / model.height, 0, 1);
    setFacadeLights(mats, lights * realness);

    // Scan plane only visible while sweeping
    const sweeping = h.current > 0.02 && h.current < model.height + 0.1;
    if (scanRef.current) {
      scanRef.current.position.y = h.current;
      scanRef.current.visible = sweeping;
    }
    if (scanMat.current) scanMat.current.opacity = sweeping ? 0.16 : 0;
  });

  return (
    <group>
      {model.parts.map((p, i) => (
        <mesh
          key={i}
          geometry={p.geometry}
          material={Array.isArray(p.role) ? p.role.map((r) => mats[r]) : mats[p.role]}
          position={p.position}
          rotation={p.rotation}
        />
      ))}
      {model.parts.map((p, i) => (
        <mesh key={`g${i}`} geometry={p.geometry} material={ghost} position={p.position} rotation={p.rotation} />
      ))}
      <lineSegments geometry={model.lines} material={lineMat} />

      <group ref={scanRef}>
        <primitive object={scanLine} />
        <mesh rotation-x={-Math.PI / 2}>
          <planeGeometry args={[model.halfX * 2.24, model.halfZ * 2.24]} />
          <meshBasicMaterial
            ref={scanMat}
            color={CYAN}
            transparent
            opacity={0}
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
}

/** Camera distance that frames a model of the given spec. */
export function frameDistance(spec: BuildingSpec, fov = 35) {
  const m = buildModel(spec);
  const size = Math.max(m.height * 1.15, m.halfX * 2.2, m.halfZ * 2.2);
  const dist = size / 2 / Math.tan(THREE.MathUtils.degToRad(fov / 2));
  m.parts.forEach((p) => p.geometry.dispose());
  m.lines.dispose();
  return { dist, height: m.height };
}
