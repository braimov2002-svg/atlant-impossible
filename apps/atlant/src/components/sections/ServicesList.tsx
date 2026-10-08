"use client";

import { motion } from "framer-motion";
import { fadeUp, inViewOnce } from "@/lib/motion";
import type { Dictionary } from "@/i18n/dictionaries/uz";

/** /services: one ruled block per service line, with the group company that delivers it. */
export function ServicesList({ t }: { t: Dictionary["servicesPage"]["services"] }) {
  return (
    <section className="relative py-12 sm:py-16">
      <ol className="mx-auto max-w-7xl px-5 sm:px-8">
        {t.map((s, i) => (
          <motion.li
            key={s.id}
            id={s.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
            className="grid scroll-mt-28 gap-8 border-b border-line py-14 lg:grid-cols-12 lg:gap-12"
          >
            <div className="lg:col-span-5">
              <p className="label-caps flex items-center gap-3 text-steel">
                <span className="text-gold tabular-nums">0{i + 1}</span>
                <span className="h-px w-8 bg-gold/70" />
                {s.company}
              </p>
              <h2 className="font-display mt-5 text-3xl font-semibold tracking-[-0.03em] text-mist sm:text-4xl">{s.title}</h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-base leading-relaxed text-steel sm:text-lg">{s.text}</p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {s.points.map((p) => (
                  <li key={p} className="border border-line px-4 py-2 text-sm text-mist">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
