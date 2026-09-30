"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, View } from "@react-three/drei";
import type { BuildingSpec } from "@/data/projects";
import { Building, frameDistance, type ViewMode } from "./building/Building";
import { ArchEnvironment, ArchLights, BlueprintGround, EnableClipping } from "./building/Stage";
import { TIER_CONFIG, type DeviceTier } from "@/hooks/useDeviceTier";

/*
 * Multi-viewport rendering for the /projects gallery: ONE fixed, transparent
 * WebGL canvas renders every card's building through drei <View> scissor
 * viewports (tracked DOM rects). Ten 3D cards cost one GPU context, and views
 * outside the viewport are skipped automatically.
 *
 *   <GalleryCanvas/>  — mount once per page (fixed, behind the content)
 *   <CardView/>       — drop inside each card's transparent media area
 */

export function GalleryCanvas({ tier }: { tier: Exclude<DeviceTier, "none"> }) {
  const cfg = TIER_CONFIG[tier];
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Canvas dpr={[1, Math.min(cfg.dpr, 1.5)]} gl={{ antialias: cfg.antialias, alpha: true }} style={{ pointerEvents: "none" }}>
        <EnableClipping />
        <View.Port />
      </Canvas>
    </div>
  );
}

export function CardView({
  spec,
  mode,
  tier,
  className,
}: {
  spec: BuildingSpec;
  mode: ViewMode;
  tier: Exclude<DeviceTier, "none">;
  className?: string;
}) {
  const { dist: d, height } = useMemo(() => frameDistance(spec, 30), [spec]);
  const dist = d * 1.15;
  return (
    <View className={className}>
      <PerspectiveCamera makeDefault fov={30} position={[dist * 0.62, height * 0.55 + dist * 0.32, dist * 0.78]} onUpdate={(c) => c.lookAt(0, height * 0.42, 0)} />
      <ArchLights />
      {tier === "high" && <ArchEnvironment />}
      <BlueprintGround radius={6} />
      <Turntable>
        <Building spec={spec} mode={mode} lights={0.45} />
      </Turntable>
    </View>
  );
}

/** Slow idle rotation so every card feels alive. */
function Turntable({ children }: { children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (g.current) g.current.rotation.y += Math.min(dt, 0.1) * 0.12;
  });
  return <group ref={g}>{children}</group>;
}
