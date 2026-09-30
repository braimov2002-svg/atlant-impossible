"use client";

import { SceneCanvas } from "@/components/three/SceneCanvas";
import { ContactPortal } from "@/components/three/ContactPortal";

/** Loaded via next/dynamic (ssr: false). */
export default function ContactCanvas({
  office,
  reducedMotion,
}: {
  office: { lat: number; lon: number };
  reducedMotion: boolean;
}) {
  return (
    <SceneCanvas
      className="absolute inset-0"
      camera={{ position: [0.3, 3.7, 3.6], fov: 40 }}
      fallback={<div className="bg-field-grid absolute inset-0" />}
    >
      {(tier) => <ContactPortal tier={tier} office={office} reducedMotion={reducedMotion} />}
    </SceneCanvas>
  );
}
