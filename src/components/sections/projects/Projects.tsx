"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Satellite } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { BeforeAfter } from "./BeforeAfter";
import { SatelliteMap, type ProjectType } from "./SatelliteMap";
import { TiltCard, TiltLayer } from "./TiltCard";
import { EASE_OUT_EXPO, fadeUp, stagger } from "@/lib/motion";
import type { Dictionary } from "@/i18n/dictionaries/uz";

type T = Dictionary["projects"];
type Item = T["items"][number];

export function Projects({ t }: { t: T }) {
  const [activeId, setActiveId] = useState(t.items[0].id);
  const active = t.items.find((p) => p.id === activeId) ?? t.items[0];

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="04" eyebrow={t.eyebrow} title={t.title} accent={t.titleAccent} description={t.description} />

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* ── Comparison stage */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO }}
            className="lg:col-span-8"
          >
            <div className="overflow-hidden rounded-[28px] border border-emerald-line bg-forest-900">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
                  transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                >
                  <BeforeAfter
                    className="aspect-[4/3] sm:aspect-[16/10]"
                    beforeLabel={t.before}
                    afterLabel={t.after}
                    before={<SatelliteMap type={active.type as ProjectType} variant="before" seed={active.seed} className="h-full w-full" />}
                    after={<SatelliteMap type={active.type as ProjectType} variant="after" seed={active.seed} className="h-full w-full" />}
                  />
                </motion.div>
              </AnimatePresence>
              <ProjectMeta item={active} t={t} />
            </div>
          </motion.div>

          {/* ── Case cards */}
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0 lg:col-span-4"
          >
            {t.items.map((p) => (
              <motion.div key={p.id} variants={fadeUp} className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-full">
                <TiltCard active={p.id === activeId} onClick={() => setActiveId(p.id)} label={p.title}>
                  <TiltLayer depth={0} className="absolute inset-0 overflow-hidden rounded-[21px]">
                    <SatelliteMap type={p.type as ProjectType} variant="after" seed={p.seed} className="h-full w-full scale-110 opacity-50 transition-opacity duration-500 group-hover:opacity-70" />
                    <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/85 to-forest-950/30" />
                  </TiltLayer>
                  <TiltLayer depth={40} className="relative z-10 flex min-h-[132px] flex-col justify-between gap-3 p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.16em] text-sage uppercase">
                        <MapPin className="h-3 w-3 text-lime" />
                        {p.region} · {p.area}
                      </span>
                      <span className="rounded-full border border-gold/40 px-2 py-0.5 font-mono text-[9px] tracking-wider text-gold uppercase">
                        {t.sampleBadge}
                      </span>
                    </div>
                    <p className="font-display text-[15px] leading-snug text-mist">{p.title}</p>
                    <TiltLayer depth={30} className="flex gap-4 font-mono text-xs">
                      <span className="text-lime">{p.yield}</span>
                      <span className="text-water">{p.water}</span>
                      <span className="text-gold-soft">{p.payback}</span>
                    </TiltLayer>
                  </TiltLayer>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectMeta({ item, t }: { item: Item; t: T }) {
  const metrics = [
    { label: t.metrics.yield, value: item.yield, cls: "text-lime-glow" },
    { label: t.metrics.water, value: item.water, cls: "text-water" },
    { label: t.metrics.payback, value: item.payback, cls: "text-gold-gradient" },
  ];
  return (
    <div className="grid gap-5 border-t border-emerald-line p-5 sm:grid-cols-[1.3fr_2fr] sm:items-center sm:p-6">
      <div>
        <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-moss uppercase">
          <Satellite className="h-3.5 w-3.5 text-lime" />
          {t.illustration} · {t.sampleBadge}
        </p>
        <h3 className="mt-2 font-display text-lg text-mist sm:text-xl">{item.title}</h3>
        <p className="mt-1 text-sm text-sage">
          {item.region} · {item.area}
        </p>
      </div>
      <dl className="grid grid-cols-3 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-emerald-line/70 bg-forest-950/40 px-3 py-2.5">
            <dt className="font-mono text-[9.5px] tracking-[0.14em] text-moss uppercase">{m.label}</dt>
            <dd className={`mt-1 font-display text-xl sm:text-2xl ${m.cls}`}>{m.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
