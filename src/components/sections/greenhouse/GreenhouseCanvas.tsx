"use client";

import { SceneCanvas } from "@/components/three/SceneCanvas";
import { GreenhouseScene, type HotspotId } from "@/components/three/GreenhouseScene";

/** Loaded via next/dynamic (ssr: false). */
export default function GreenhouseCanvas({
  active,
  markersRef,
  reducedMotion,
}: {
  active: HotspotId | null;
  markersRef: React.RefObject<HTMLDivElement | null>;
  reducedMotion: boolean;
}) {
  return (
    <SceneCanvas
      className="absolute inset-0"
      camera={{ position: [13.5, 8.5, 14], fov: 38 }}
      fallback={
        <div className="bg-field-grid absolute inset-0 flex items-center justify-center text-sage">3D</div>
      }
    >
      {(tier) => (
        <GreenhouseScene tier={tier} active={active} markersRef={markersRef} reducedMotion={reducedMotion} />
      )}
    </SceneCanvas>
  );
}
