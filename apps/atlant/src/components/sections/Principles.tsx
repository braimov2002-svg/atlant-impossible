"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUp, stagger } from "@/lib/motion";
import type { Dictionary } from "@/i18n/dictionaries/uz";

export function Principles({ t, index }: { t: Dictionary["principles"]; index?: string }) {
  return (
    <section className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index={index} eyebrow={t.eyebrow} title={t.title} accent={t.accent} />
        <motion.ul
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4"
        >
          {t.items.map((v, i) => (
            <motion.li key={v.title} variants={fadeUp} className="bg-obsidian-900 p-7 sm:p-8">
              <span className="label-caps text-gold tabular-nums">0{i + 1}</span>
              <h3 className="font-display mt-6 text-xl font-semibold text-mist">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-steel">{v.text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
