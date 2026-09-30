"use client";

import { SceneCanvas } from "@/components/three/SceneCanvas";
import { BuildingHero3D, type HeroReadout } from "@/components/three/BuildingHero3D";
import { HeroFallback } from "./HeroFallback";

/** Loaded via next/dynamic (ssr: false) so three.js never blocks first paint. */
export default function HeroScene({
  progress,
  readout,
  reducedMotion,
}: {
  progress: React.RefObject<number>;
  readout: React.RefObject<HeroReadout>;
  reducedMotion: boolean;
}) {
  return (
    <SceneCanvas
      className="absolute inset-0"
      rootMargin="0px"
      camera={{ position: [6, 4, 9], fov: 30 }}
      fallback={<HeroFallback />}
    >
      {(tier) => <BuildingHero3D tier={tier} progress={progress} readout={readout} reducedMotion={reducedMotion} />}
    </SceneCanvas>
  );
}
