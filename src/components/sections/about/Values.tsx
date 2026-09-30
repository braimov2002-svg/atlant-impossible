"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Award, Lightbulb, ShieldCheck, Target } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button, ButtonShimmer } from "@/components/ui/button";
import { NavLink } from "@/components/layout/NavLink";
import { fadeUp, stagger } from "@/lib/motion";
import type { Dictionary } from "@/i18n/dictionaries/uz";

const ICONS = [Award, ShieldCheck, Lightbulb, Target];

export function Values({ t, locale }: { t: Dictionary["aboutPage"]; locale: string }) {
  return (
    <>
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-sharp text-3xl font-light text-mist sm:text-4xl">{t.values.title}</h2>
          <motion.ul
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {t.values.items.map((v, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <motion.li key={v.title} variants={fadeUp}>
                  <SpotlightCard className="h-full p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-obsidian-900/70 text-gold">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-sharp mt-5 text-xl font-light text-mist">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-steel">{v.text}</p>
                  </SpotlightCard>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </section>
      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="glass-strong relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[30px] p-8 sm:p-12 md:flex-row md:items-center">
            <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-50" />
            <h2 className="font-sharp relative max-w-xl text-3xl leading-tight font-light text-mist sm:text-4xl">{t.cta.title}</h2>
            <Button asChild size="lg" className="relative">
              <NavLink href={`/${locale}#contact`}>
                {t.cta.button} <ArrowUpRight />
                <ButtonShimmer />
              </NavLink>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
