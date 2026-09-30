"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, type CanvasProps } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { TIER_CONFIG, useDeviceTier, type DeviceTier } from "@/hooks/useDeviceTier";
import { useInViewport } from "@/hooks/useInViewport";
import { cn } from "@/lib/utils";

/**
 * Shared WebGL shell for every 3D scene on the page.
 *  • Lazy: the <Canvas> mounts only when the section nears the viewport.
 *  • Paused: frameloop stops while offscreen (battery + GPU for other canvases).
 *  • LOD: device tier caps DPR/antialias; PerformanceMonitor lowers DPR at runtime.
 *  • Fallback: tier "none" (no WebGL) renders the static `fallback` instead.
 */
export function SceneCanvas({
  children,
  fallback,
  className,
  camera,
  rootMargin = "300px",
  canvasProps,
}: {
  children: (tier: Exclude<DeviceTier, "none">) => React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  camera?: CanvasProps["camera"];
  rootMargin?: string;
  canvasProps?: Partial<CanvasProps>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const tier = useDeviceTier();
  const { mounted, visible } = useInViewport(ref, rootMargin);
  const [dprScale, setDprScale] = useState(1);

  const ready = tier && tier !== "none" && mounted;
  const cfg = tier ? TIER_CONFIG[tier] : TIER_CONFIG.low;

  return (
    <div ref={ref} className={cn("relative", className)}>
      {tier === "none" && fallback}
      {ready && (
        <Canvas
          className="!absolute inset-0"
          frameloop={visible ? "always" : "never"}
          dpr={[1, cfg.dpr * dprScale]}
          gl={{ antialias: cfg.antialias, alpha: true, powerPreference: "high-performance" }}
          camera={camera ?? { position: [0, 0, 4.2], fov: 35 }}
          {...canvasProps}
        >
          <PerformanceMonitor
            onDecline={() => setDprScale((s) => Math.max(0.6, s - 0.2))}
            onIncline={() => setDprScale((s) => Math.min(1, s + 0.1))}
          />
          <AdaptiveDpr pixelated={false} />
          <Suspense fallback={null}>{children(tier)}</Suspense>
        </Canvas>
      )}
    </div>
  );
}
