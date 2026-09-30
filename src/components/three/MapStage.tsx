"use client";

import { SceneCanvas } from "./SceneCanvas";
import { UzMap3D, type MapSite } from "./UzMap3D";

/** Canvas + map scene — import through next/dynamic (ssr: false). */
export default function MapStage(props: {
  mode: "country" | "city";
  sites: MapSite[];
  active: string | null;
  pinsRef: React.RefObject<HTMLDivElement | null>;
  reducedMotion: boolean;
}) {
  return (
    <SceneCanvas className="absolute inset-0" camera={{ position: [0.1, 3.5, 3.3], fov: 40 }} fallback={<div className="bg-blueprint absolute inset-0" />}>
      {(tier) => <UzMap3D tier={tier} {...props} />}
    </SceneCanvas>
  );
}
