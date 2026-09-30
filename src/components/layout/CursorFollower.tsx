"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Trailing ring + label pill that follow the native cursor (which stays
 * visible). Hovering an element with `data-cursor="Label"` morphs the ring
 * into a pill showing that label. Disabled on touch and reduced-motion.
 */
export function CursorFollower() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled || !ringRef.current || !dotRef.current) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const xRing = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3.out" });
    const xDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });

    let current: string | null = null;
    const onMove = (e: PointerEvent) => {
      xRing(e.clientX);
      yRing(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);
      const target = (e.target as Element | null)?.closest?.("[data-cursor]");
      const next = target?.getAttribute("data-cursor") ?? null;
      if (next !== current) {
        current = next;
        setLabel(next);
      }
      gsap.to([ring, dot], { autoAlpha: 1, duration: 0.3, overwrite: "auto" });
    };
    const onLeave = () => gsap.to([ring, dot], { autoAlpha: 0, duration: 0.3 });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
      <div ref={ringRef} className="invisible absolute top-0 left-0 opacity-0">
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,background-color,border-color] duration-500 ease-[var(--ease-out-expo)] ${
            label
              ? "flex h-9 w-auto items-center border-lime/60 bg-forest-950/80 px-4 backdrop-blur-md"
              : "h-9 w-9 border-lime/40"
          }`}
        >
          {label && (
            <span className="font-mono text-[11px] tracking-widest whitespace-nowrap text-lime uppercase">
              {label}
            </span>
          )}
        </div>
      </div>
      <div ref={dotRef} className="invisible absolute top-0 left-0 opacity-0">
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime shadow-[0_0_12px_#00ff66]" />
      </div>
    </div>
  );
}
