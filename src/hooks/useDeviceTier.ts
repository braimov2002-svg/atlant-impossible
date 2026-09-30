"use client";

import { useEffect, useState } from "react";

/**
 * Level-of-detail tier for WebGL scenes.
 *  - "none": no WebGL / reduced motion → static fallback, no canvas at all
 *  - "low":  phones, ≤4 cores or ≤4 GB RAM → fewer particles, DPR 1, no post-effects
 *  - "mid":  laptops / tablets
 *  - "high": desktop GPUs
 * Runtime FPS is still watched by <PerformanceMonitor> inside each canvas,
 * which can drop DPR further if the device struggles.
 */
export type DeviceTier = "none" | "low" | "mid" | "high";

export const TIER_CONFIG = {
  none: { dpr: 1, particleRatio: 0, antialias: false },
  low: { dpr: 1, particleRatio: 0.85, antialias: false },
  mid: { dpr: 1.5, particleRatio: 1, antialias: true },
  high: { dpr: 2, particleRatio: 1, antialias: true },
} as const satisfies Record<DeviceTier, { dpr: number; particleRatio: number; antialias: boolean }>;

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function detectTier(): DeviceTier {
  if (typeof window === "undefined") return "mid";
  // QA override: ?lod=high|mid|low|none
  const forced = new URLSearchParams(window.location.search).get("lod");
  if (forced && forced in TIER_CONFIG) return forced as DeviceTier;
  if (!hasWebGL()) return "none";

  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 8;
  const saveData = nav.connection?.saveData ?? false;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const small = window.innerWidth < 768;

  if (saveData || cores <= 4 || memory <= 4 || (coarse && small)) return "low";
  if (coarse || cores <= 8 || window.innerWidth < 1280) return "mid";
  return "high";
}

/** Returns null during SSR / first paint so canvases never hydrate-mismatch. */
export function useDeviceTier(): DeviceTier | null {
  const [tier, setTier] = useState<DeviceTier | null>(null);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const detected = detectTier();
    // Reduced motion keeps 3D but at the lowest tier (scenes also stop auto-animating).
    setTier(reduced && detected !== "none" ? "low" : detected);
  }, []);
  return tier;
}
