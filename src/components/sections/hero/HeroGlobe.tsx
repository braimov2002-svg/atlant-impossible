"use client";

import { SceneCanvas } from "@/components/three/SceneCanvas";
import { AgroGlobe, GLOBE_CAMERA, type AgroGlobeProps } from "@/components/three/AgroGlobe";
import { GlobeFallback } from "./GlobeFallback";

/** Loaded via next/dynamic (ssr: false) so three.js never blocks first paint. */
export default function HeroGlobe(props: Omit<AgroGlobeProps, "tier"> & { className?: string }) {
  const { className, ...globe } = props;
  return (
    <SceneCanvas
      className={className}
      rootMargin="0px"
      fallback={<GlobeFallback />}
      camera={GLOBE_CAMERA}
    >
      {(tier) => <AgroGlobe tier={tier} {...globe} />}
    </SceneCanvas>
  );
}
