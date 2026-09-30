"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { Building, Grid3x3 } from "lucide-react";
import type { ViewMode } from "@/components/three/building/Building";
import { cn } from "@/lib/utils";

/**
 * Realistic ⇄ Blueprint switch. A sliding thumb (shared layoutId) moves
 * between the two segments; exposed as an accessible radiogroup.
 */
export function ModeToggle({
  value,
  onChange,
  labels,
  size = "md",
  className,
}: {
  value: ViewMode;
  onChange: (v: ViewMode) => void;
  labels: { realistic: string; blueprint: string };
  size?: "sm" | "md";
  className?: string;
}) {
  const id = useId();
  const opts: { v: ViewMode; label: string; Icon: typeof Building }[] = [
    { v: "realistic", label: labels.realistic, Icon: Building },
    { v: "blueprint", label: labels.blueprint, Icon: Grid3x3 },
  ];
  return (
    <div
      role="radiogroup"
      className={cn("glass-strong relative inline-flex rounded-full p-1", className)}
      data-cursor={value === "realistic" ? labels.blueprint : labels.realistic}
    >
      {opts.map(({ v, label, Icon }) => {
        const on = v === value;
        return (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(v)}
            className={cn(
              "relative isolate flex items-center gap-2 rounded-full font-mono tracking-[0.12em] uppercase transition-colors duration-300",
              size === "sm" ? "px-3 py-1.5 text-[9.5px]" : "px-4 py-2 text-[11px]",
              on ? "text-obsidian-900" : "text-steel hover:text-mist",
            )}
          >
            {on && (
              <motion.span
                layoutId={`mode-thumb-${id}`}
                className={cn(
                  "absolute inset-0 -z-10 rounded-full",
                  v === "blueprint" ? "bg-cyan shadow-[0_0_24px_rgb(0_240_255/0.6)]" : "bg-gradient-to-b from-[#f3dc9f] to-gold shadow-[0_0_24px_rgb(226_184_89/0.5)]",
                )}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <Icon className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
