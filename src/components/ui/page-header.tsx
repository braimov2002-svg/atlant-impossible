"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { NavLink } from "@/components/layout/NavLink";
import { EASE_OUT_EXPO, fadeUp, lineReveal, stagger } from "@/lib/motion";

/** Shared sub-page hero: breadcrumb, masked title, description, optional stats. */
export function PageHeader({
  locale,
  home,
  eyebrow,
  title,
  accent,
  description,
  stats,
  children,
}: {
  locale: string;
  home: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  stats?: { value: string; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
      <div className="bg-blueprint pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_30%_0%,#000_20%,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-cyan/10 blur-[120px]" />
      <motion.div variants={stagger(0.08)} initial="hidden" animate="show" className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.nav variants={fadeUp} aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-slate uppercase">
          <NavLink href={`/${locale}`} className="transition hover:text-gold">
            {home}
          </NavLink>
          <ChevronRight className="h-3 w-3" />
          <span className="text-cyan">{eyebrow}</span>
        </motion.nav>
        <h1 className="font-sharp mt-6 text-[clamp(2.6rem,1.2rem+5vw,6rem)] leading-[0.98] font-extralight tracking-[-0.045em] text-mist">
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span variants={lineReveal} className="block">
              {title}
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span variants={lineReveal} className="text-gold-gradient block font-light">
              {accent}
            </motion.span>
          </span>
        </h1>
        <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-base leading-relaxed text-steel sm:text-lg">
          {description}
        </motion.p>
        {stats && (
          <motion.dl variants={fadeUp} className="mt-10 grid max-w-3xl grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl px-4 py-4">
                <dt className="font-mono text-[9.5px] tracking-[0.16em] text-slate uppercase">{s.label}</dt>
                <dd className="font-sharp mt-1.5 text-2xl font-light text-mist sm:text-3xl">{s.value}</dd>
              </div>
            ))}
          </motion.dl>
        )}
        {children}
      </motion.div>
      <motion.div
        aria-hidden
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.6, delay: 0.3, ease: EASE_OUT_EXPO }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-gold via-cyan/60 to-transparent"
      />
    </header>
  );
}
