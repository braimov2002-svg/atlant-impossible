"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Accessible before/after comparison. Pointer-drag anywhere (touch-action:
 * pan-y keeps vertical page scroll), or focus the handle and use ←/→.
 * On first view the handle sweeps once to hint that it's interactive.
 */
export function BeforeAfter({
  before,
  after,
  beforeLabel,
  afterLabel,
  className,
}: {
  before: React.ReactNode;
  after: React.ReactNode;
  beforeLabel: string;
  afterLabel: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useMotionValue(50);
  const [value, setValue] = useState(50);
  const dragging = useRef(false);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const clip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const left = useTransform(pos, (v) => `${v}%`);
  useMotionValueEvent(pos, "change", (v) => setValue(Math.round(v)));

  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const controls = animate(pos, [50, 22, 78, 50], { duration: 2.6, ease: [0.65, 0, 0.35, 1], delay: 0.3 });
    return () => controls.stop();
  }, [inView, pos]);

  const setFromClient = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    pos.set(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={ref}
      className={`relative touch-pan-y overflow-hidden select-none ${className ?? ""}`}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        setFromClient(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromClient(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      data-cursor="⟷"
    >
      <div className="absolute inset-0">{after}</div>
      <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
        {before}
        <div className="absolute inset-0 bg-forest-950/10 mix-blend-multiply" />
      </motion.div>

      <span className="pointer-events-none absolute top-4 left-4 rounded-full border border-mist/20 bg-forest-950/70 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-mist uppercase backdrop-blur">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute top-4 right-4 rounded-full border border-lime/40 bg-forest-950/70 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-lime uppercase backdrop-blur">
        {afterLabel}
      </span>

      {/* Handle */}
      <motion.div className="absolute inset-y-0 -ml-px w-0.5 bg-gradient-to-b from-gold via-lime to-gold shadow-[0_0_18px_#00ff66]" style={{ left }}>
        <div
          role="slider"
          tabIndex={0}
          aria-label={`${beforeLabel} / ${afterLabel}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") pos.set(Math.max(0, pos.get() - 5));
            if (e.key === "ArrowRight") pos.set(Math.min(100, pos.get() + 5));
          }}
          className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-gold/70 bg-forest-950/80 text-gold shadow-[0_0_30px_rgb(212_175_55/0.45)] backdrop-blur-md"
        >
          <ChevronLeft className="h-4 w-4" />
          <ChevronRight className="h-4 w-4" />
        </div>
      </motion.div>
    </div>
  );
}
