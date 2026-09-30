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
          "flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-steel uppercase",
          align === "center" && "justify-center",
        )}
      >
        <span className="text-cyan">{index}</span>
        <span className="h-px w-8 bg-gradient-to-r from-cyan to-transparent" />
        {eyebrow}
      </motion.p>
      <h2 className="font-sharp mt-5 text-[clamp(1.85rem,1rem+2.8vw,3.5rem)] leading-[1.05] font-light tracking-[-0.035em] text-balance text-mist">
        <span className="block overflow-hidden pb-[0.06em]">
          <motion.span variants={lineReveal} className="block">
            {title} {accent && <span className="text-gold-gradient">{accent}</span>}
          </motion.span>
        </span>
      </h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className={cn("mt-5 max-w-xl text-[15px] leading-relaxed text-steel sm:text-base", align === "center" && "mx-auto")}
        >
          {description}
        </motion.p>
      )}
    </motion.header>
  );
}
