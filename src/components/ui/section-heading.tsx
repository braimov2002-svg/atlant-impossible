"use client";

import { motion } from "framer-motion";
import { fadeUp, inViewOnce, lineReveal, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Numbered eyebrow + masked two-tone title + optional description. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  className,
}: {
  index: string;
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <motion.header
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
      className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}
    >
      <motion.p
        variants={fadeUp}
        className={cn(
          "flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-sage uppercase",
          align === "center" && "justify-center",
        )}
      >
        <span className="text-lime">{index}</span>
        <span className="h-px w-8 bg-gradient-to-r from-lime to-transparent" />
        {eyebrow}
      </motion.p>
      <h2 className="mt-5 font-display text-[clamp(1.75rem,1rem+2.6vw,3.25rem)] leading-[1.08] font-normal tracking-[-0.03em] text-balance text-mist">
        <span className="block overflow-hidden pb-[0.06em]">
          <motion.span variants={lineReveal} className="block">
            {title} {accent && <span className="text-gold-gradient">{accent}</span>}
          </motion.span>
        </span>
      </h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className={cn("mt-5 max-w-xl text-[15px] leading-relaxed text-sage sm:text-base", align === "center" && "mx-auto")}
        >
          {description}
        </motion.p>
      )}
    </motion.header>
  );
}
