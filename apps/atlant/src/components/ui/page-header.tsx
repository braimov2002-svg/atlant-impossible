"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { NavLink } from "@/components/layout/NavLink";
import { EASE_OUT_EXPO, fadeUp, lineReveal, stagger } from "@/lib/motion";

/** Shared sub-page header: breadcrumb, two-tone title, description, optional figures. */
export function PageHeader({
  locale,
  home,
  eyebrow,
  title,
  accent,
  description,
  stats,
}: {
  locale: string;
  home: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  stats?: { value: string; label: string }[];
}) {
  return (
    <header className="relative overflow-hidden border-b border-line pt-40 pb-16 sm:pt-48 sm:pb-20">
      <motion.div variants={stagger(0.08)} initial="hidden" animate="show" className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.nav variants={fadeUp} aria-label="Breadcrumb" className="label-caps flex items-center gap-2 text-slate">
          <NavLink href={`/${locale}`} className="transition hover:text-mist">
            {home}
          </NavLink>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gold">{eyebrow}</span>
        </motion.nav>
        <h1 className="font-display mt-8 max-w-5xl text-[clamp(2.4rem,1.2rem+4.4vw,5.4rem)] leading-[1] font-semibold tracking-[-0.035em] text-mist">
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span variants={lineReveal} className="block">
              {title}
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span variants={lineReveal} className="block text-slate">
              {accent}
            </motion.span>
          </span>
        </h1>
        <motion.p variants={fadeUp} className="mt-8 max-w-2xl text-base leading-relaxed text-steel sm:text-lg">
          {description}
        </motion.p>
        {stats && (
          <motion.dl variants={fadeUp} className="mt-12 grid max-w-3xl grid-cols-3 border-t border-line">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse border-line py-5 pr-4 [&+&]:border-l [&+&]:pl-5">
                <dt className="mt-2 text-xs leading-snug text-steel sm:text-sm">{s.label}</dt>
                <dd className="font-display text-3xl font-semibold tracking-[-0.02em] text-mist tabular-nums sm:text-4xl">{s.value}</dd>
              </div>
            ))}
          </motion.dl>
        )}
      </motion.div>
      <motion.div
        aria-hidden
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: EASE_OUT_EXPO }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gold/60"
      />
    </header>
  );
}
