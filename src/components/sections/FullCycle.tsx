"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { EASE_OUT_EXPO, fadeUp, stagger } from "@/lib/motion";
import type { Dictionary } from "@/i18n/dictionaries/uz";

/** Design → construction → supply & fit-out → automation, plus the range of facilities. */
export function FullCycle({ t, index }: { t: Dictionary["cycle"]; index?: string }) {
  return (
    <section className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index={index} eyebrow={t.eyebrow} title={t.title} accent={t.accent} description={t.description} />

        <motion.ol
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="relative mt-16 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4"
        >
          {t.steps.map((s, i) => (
            <motion.li key={s.title} variants={fadeUp} className="relative bg-obsidian-900 p-7 pt-10 sm:p-8 sm:pt-12">
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: EASE_OUT_EXPO }}
                className="absolute inset-x-0 top-0 h-px origin-left bg-gold"
              />
              <span className="font-display text-5xl font-semibold tracking-[-0.04em] text-titanium-600 tabular-nums">0{i + 1}</span>
              <h3 className="font-display mt-8 text-xl font-semibold text-mist">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-steel">{s.text}</p>
            </motion.li>
          ))}
        </motion.ol>

        <div className="mt-14 flex flex-col gap-5 border-t border-line pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="label-caps text-steel">{t.scopeLabel}</p>
          <ul className="flex flex-wrap gap-2">
            {t.scope.map((s) => (
              <li key={s} className="border border-line px-4 py-2 text-sm text-mist">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
