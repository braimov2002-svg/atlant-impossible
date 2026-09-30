"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Glass card with a cursor-following spotlight (--mx/--my) and the rotating
 * gold→lime hairline border on hover. The base surface for the bento grid.
 */
export function SpotlightCard({
  children,
  className,
  as: Tag = "article",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "article" | "div";
}) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      onPointerMove={onMove}
      className={cn(
        "group/card shimmer-border glass relative isolate overflow-hidden rounded-[26px] transition-[transform,border-color] duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1",
        className,
      )}
    >
      <div className="spotlight pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
      {/* diagonal sheen sweep */}
      <div className="pointer-events-none absolute inset-y-0 -left-1/2 -z-10 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent opacity-0 group-hover/card:animate-shimmer group-hover/card:opacity-100" />
      {children}
    </Tag>
  );
}
