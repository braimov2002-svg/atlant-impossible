"use client";

import { motion } from "framer-motion";
import { Building2, Cpu, Handshake, Package, Truck, Wrench } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { fadeUp, stagger } from "@/lib/motion";
import type { Dictionary } from "@/i18n/dictionaries/uz";

const ICONS = [Building2, Wrench, Truck, Cpu, Package, Handshake];

/** Mission + the member companies of Atlant Group of Companies (agcg.uz). */
export function GroupCompanies({ t }: { t: Dictionary["aboutPage"]["group"] }) {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="lg:col-span-8">
            <p className="font-mono text-[10px] tracking-[0.24em] text-gold uppercase">{t.eyebrow}</p>
            <blockquote className="font-sharp mt-4 text-2xl leading-snug font-light text-mist sm:text-3xl">“{t.mission}”</blockquote>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="lg:col-span-4">
            <div className="glass-strong relative overflow-hidden rounded-3xl p-6">
              <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-50" />
              <p className="relative font-mono text-[10px] tracking-[0.2em] text-cyan uppercase">
                {t.featured.label} · {t.featured.years}
              </p>
              <p className="font-sharp relative mt-3 text-2xl font-light text-mist">{t.featured.name}</p>
              <p className="relative mt-2 text-sm leading-relaxed text-steel">{t.featured.scope}</p>
            </div>
          </motion.div>
        </div>

        <h2 className="font-sharp mt-16 text-3xl font-light text-mist sm:text-4xl">{t.companiesTitle}</h2>
        <motion.ul
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {t.companies.map((c, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.li key={c.name} variants={fadeUp}>
                <SpotlightCard className="h-full p-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-obsidian-900/70 text-gold">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full border border-line px-3 py-1 font-mono text-[9.5px] tracking-[0.16em] text-steel uppercase">{c.sector}</span>
                  </div>
                  <h3 className="font-sharp mt-5 text-xl font-light text-mist">{c.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel">{c.text}</p>
                </SpotlightCard>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
