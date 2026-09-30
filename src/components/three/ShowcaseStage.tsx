"use client";

import { SceneCanvas } from "./SceneCanvas";
import { ShowcaseScene } from "./ShowcaseScene";
import type { BuildingSpec } from "@/data/projects";
import type { ViewMode } from "./building/Building";

/**
 * Canvas + single-building scene. Always import this through next/dynamic
 * (ssr: false) so three.js stays out of the page's initial bundle.
 */
export default function ShowcaseStage({
  spec,
  mode,
  reducedMotion,
  className = "absolute inset-0",
}: {
  spec: BuildingSpec;
  mode: ViewMode;
  reducedMotion: boolean;
  className?: string;
}) {
  return (
    <SceneCanvas className={className} camera={{ position: [7, 4.5, 9], fov: 32 }} fallback={<div className="bg-blueprint absolute inset-0" />}>
      {(tier) => <ShowcaseScene spec={spec} mode={mode} tier={tier} reducedMotion={reducedMotion} />}
    </SceneCanvas>
  );
}
