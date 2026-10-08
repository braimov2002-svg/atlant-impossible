"use client";

import { motion } from "framer-motion";
import { fadeUp, inViewOnce, lineReveal, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Numbered eyebrow + two-tone title (white / grey) + optional description. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  description,
  className,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  className?: string;
}) {
  return (
    <motion.header variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={inViewOnce} className={cn("max-w-3xl", className)}>
      <motion.p variants={fadeUp} className="label-caps flex items-center gap-3 text-steel">
        {index && <span className="text-gold tabular-nums">{index}</span>}
        <span className="h-px w-10 bg-gold/70" />
        {eyebrow}
      </motion.p>
      <h2 className="font-display mt-6 text-[clamp(1.6rem,1rem+3vw,3.6rem)] leading-[1.04] font-semibold tracking-[-0.03em] text-balance [overflow-wrap:anywhere] text-mist">
        <span className="block overflow-hidden pb-[0.06em]">
          <motion.span variants={lineReveal} className="block">
            {title} {accent && <span className="text-slate">{accent}</span>}
          </motion.span>
        </span>
      </h2>
      {description && (
        <motion.p variants={fadeUp} className="mt-6 max-w-xl text-[15px] leading-relaxed text-steel sm:text-base">
          {description}
        </motion.p>
      )}
    </motion.header>
  );
}
