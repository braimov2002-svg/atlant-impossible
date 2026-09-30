"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { BuildingSpec } from "@/data/projects";
import { Building, frameDistance, type ViewMode } from "./building/Building";
import { ArchEnvironment, ArchLights, BlueprintGround, EnableClipping } from "./building/Stage";
import type { DeviceTier } from "@/hooks/useDeviceTier";

/**
 * Single-building stage: the model re-frames itself when the project changes
 * (camera distance eased from the model's bounds), auto-orbits, and supports
 * drag-to-rotate on fine pointers.
 */
export function ShowcaseScene({
  spec,
  mode,
  tier,
  reducedMotion = false,
  interactive = true,
  autoRotate = true,
}: {
  spec: BuildingSpec;
  mode: ViewMode;
  tier: Exclude<DeviceTier, "none">;
  reducedMotion?: boolean;
  interactive?: boolean;
  autoRotate?: boolean;
}) {
  const controls = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const { camera, size } = useThree();
  const frame = useMemo(() => frameDistance(spec, 32), [spec]);
  const dist = useRef(frame.dist * 1.4);
  const fine = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

  useFrame((_, delta) => {
    const c = controls.current;
    if (!c) return;
    const portrait = size.width / size.height < 0.9 ? 1.35 : 1;
    dist.current = THREE.MathUtils.damp(dist.current, frame.dist * 1.08 * portrait, 3, Math.min(delta, 0.1));
    c.target.y = THREE.MathUtils.damp(c.target.y, frame.height * 0.42, 3, Math.min(delta, 0.1));
    const dir = camera.position.clone().sub(c.target).normalize();
    camera.position.copy(c.target).addScaledVector(dir, dist.current);
    c.update();
  });

  return (
    <>
      <EnableClipping />
      <ArchLights />
      {tier !== "low" && <ArchEnvironment />}
      <BlueprintGround radius={9} />
      {/* key → fresh model (and its scan-in) whenever the project changes */}
      <Building key={`${spec.kind}-${spec.seed}`} spec={spec} mode={mode} lights={0.5} />
      <OrbitControls
        ref={controls}
        makeDefault
        enableZoom={false}
        enablePan={false}
        enableRotate={interactive && fine}
        autoRotate={autoRotate && !reducedMotion}
        autoRotateSpeed={0.6}
        minPolarAngle={0.6}
        maxPolarAngle={Math.PI / 2.08}
        enableDamping
      />
    </>
  );
}
