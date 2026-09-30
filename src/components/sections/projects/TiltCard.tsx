"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * 3D parallax depth card: rotates toward the pointer while its layers sit at
 * different Z depths (`data-depth` children via <TiltLayer depth={…}>),
 * plus a moving specular glare.
 */
export function TiltCard({
  children,
  className,
  active,
  onClick,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  onClick?: () => void;
  label: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [9, -9]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-11, 11]), { stiffness: 180, damping: 18 });
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, rgb(255 255 255 / 0.12), transparent 45%)`;

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current!.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className="[perspective:1100px]">
      <motion.button
        ref={ref}
        type="button"
        onClick={onClick}
        onPointerMove={onMove}
        onPointerLeave={reset}
        aria-pressed={active}
        aria-label={label}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className={cn(
          // no overflow-hidden here: it would flatten preserve-3d; layers clip themselves
          "group relative block w-full rounded-[22px] border text-left transition-[border-color,box-shadow] duration-500",
          active
            ? "border-gold/60 shadow-[0_20px_60px_-20px_rgb(212_175_55/0.45)]"
            : "border-emerald-line hover:border-lime/40",
          className,
        )}
      >
        {children}
        <motion.span className="pointer-events-none absolute inset-0 z-30 rounded-[22px]" style={{ background: glare }} />
      </motion.button>
    </div>
  );
}

export function TiltLayer({ depth, className, children }: { depth: number; className?: string; children: React.ReactNode }) {
  return (
    <div className={className} style={{ transform: `translateZ(${depth}px)`, transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}
