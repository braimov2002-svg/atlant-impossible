"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { NavLink } from "@/components/layout/NavLink";
import { fadeUp, inViewOnce, stagger } from "@/lib/motion";
import type { Dictionary } from "@/i18n/dictionaries/uz";

/** The group: what AGC is, its mission, and the member companies as a ruled list. */
export function GroupSection({
  t,
  index,
  more,
  showMission = true,
}: {
  t: Dictionary["group"];
  index?: string;
  more?: { label: string; href: string };
  showMission?: boolean;
}) {
  return (
    <section className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading index={index} eyebrow={t.eyebrow} title={t.title} accent={t.accent} description={t.description} />
          {showMission && (
            <motion.figure variants={fadeUp} initial="hidden" whileInView="show" viewport={inViewOnce} className="mt-12 border-l border-gold pl-6">
              <figcaption className="label-caps text-gold">{t.missionLabel}</figcaption>
              <blockquote className="font-display mt-3 text-lg leading-relaxed text-mist sm:text-xl">{t.mission}</blockquote>
            </motion.figure>
          )}
          {more && (
            <NavLink href={more.href} className="label-caps mt-10 inline-flex items-center gap-2 text-mist transition hover:text-gold">
              {more.label} <ArrowUpRight className="h-4 w-4" />
            </NavLink>
          )}
        </div>

        <motion.ol variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="border-t border-line lg:col-span-7 lg:mt-2">
          {t.companies.map((c, i) => (
            <motion.li key={c.id} variants={fadeUp} className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-line py-9 sm:grid-cols-[4rem_1fr_auto] sm:gap-x-8">
              <span className="label-caps pt-2 text-gold tabular-nums">0{i + 1}</span>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-mist sm:text-3xl">{c.name}</h3>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-steel">{c.text}</p>
              </div>
              <span className="label-caps col-start-2 mt-4 self-start border border-line px-3 py-1.5 text-steel sm:col-start-3 sm:mt-1.5">{c.sector}</span>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
