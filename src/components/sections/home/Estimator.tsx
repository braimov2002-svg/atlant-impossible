"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Building, Factory, Gem, House, Info, ShieldCheck, Sparkles, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Slider } from "@/components/ui/slider";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Button, ButtonShimmer } from "@/components/ui/button";
import { NavLink } from "@/components/layout/NavLink";
import { AREA_LIMITS, estimate, type EstimateType, type FinishLevel } from "@/lib/estimator";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn, formatNumber, formatUsd } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/uz";

const TYPE_ICONS: Record<EstimateType, typeof House> = { residential: House, commercial: Building, industrial: Factory };
const FINISH_ICONS: Record<FinishLevel, typeof Star> = { standard: Star, premium: Sparkles, luxury: Gem };

// Square-root slider scale: fine control for small plots, still reaches 150 000 m²
const toArea = (s: number) => Math.round((AREA_LIMITS.min + (s / 1000) ** 2 * (AREA_LIMITS.max - AREA_LIMITS.min)) / AREA_LIMITS.step) * AREA_LIMITS.step;
const toSlider = (a: number) => Math.round(Math.sqrt((a - AREA_LIMITS.min) / (AREA_LIMITS.max - AREA_LIMITS.min)) * 1000);

export function Estimator({ t, locale, years }: { t: Dictionary["estimator"]; locale: string; years: string }) {
  const [type, setType] = useState<EstimateType>("residential");
  const [area, setArea] = useState(12_000);
  const [finish, setFinish] = useState<FinishLevel>("premium");
  const e = useMemo(() => estimate({ type, areaM2: area, finish }), [type, area, finish]);

  return (
    <section id="estimator" className="relative py-24 sm:py-32">
      <div className="bg-blueprint pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="03" eyebrow={t.eyebrow} title={t.title} accent={t.accent} description={t.description} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO }}
          className="glass-strong mt-12 grid grid-cols-1 overflow-hidden rounded-[30px] lg:grid-cols-12"
        >
          {/* ── Inputs */}
          <div className="space-y-9 border-b border-line p-6 sm:p-8 lg:col-span-5 lg:border-r lg:border-b-0">
            <Segmented
              legend={t.type}
              value={type}
              onChange={setType}
              options={(Object.keys(t.types) as EstimateType[]).map((k) => ({ value: k, label: t.types[k], Icon: TYPE_ICONS[k] }))}
            />
            <fieldset>
              <legend className="flex w-full items-baseline justify-between gap-4">
                <span className="font-mono text-[11px] tracking-[0.2em] text-steel uppercase">{t.area}</span>
                <span className="font-sharp text-3xl font-light text-mist tabular-nums">
                  {formatNumber(area)} <span className="text-base text-steel">m²</span>
                </span>
              </legend>
              <Slider
                className="mt-6"
                min={0}
                max={1000}
                value={[toSlider(area)]}
                onValueChange={([v]) => setArea(toArea(v))}
                aria-label={t.area}
              />
              <div className="mt-2.5 flex justify-between font-mono text-[10px] text-slate">
                <span>{formatNumber(AREA_LIMITS.min)} m²</span>
                <span>{formatNumber(AREA_LIMITS.max)} m²</span>
              </div>
            </fieldset>
            <Segmented
              legend={t.finish}
              value={finish}
              onChange={setFinish}
              options={(Object.keys(t.finishes) as FinishLevel[]).map((k) => ({ value: k, label: t.finishes[k], Icon: FINISH_ICONS[k] }))}
            />
          </div>

          {/* ── Live results */}
          <div className="flex flex-col gap-6 p-6 sm:p-8 lg:col-span-7" aria-live="polite">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1.4fr]">
              <Tile label={t.results.time}>
                <span className="text-cyan-glow">
                  <AnimatedNumber value={e.months} />
                </span>
                <span className="ml-2 text-lg text-steel">{t.results.month}</span>
              </Tile>
              <Tile label={t.results.cost}>
                <span className="text-gold-gradient">
                  <AnimatedNumber value={e.costLow} format={formatUsd} /> – <AnimatedNumber value={e.costHigh} format={formatUsd} />
                </span>
              </Tile>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {(
                [
                  [t.results.structure, e.warranty.structure],
                  [t.results.systems, e.warranty.systems],
                  [t.results.finishing, e.warranty.finishing],
                ] as const
              ).map(([label, v]) => (
                <div key={label} className="rounded-2xl border border-line bg-obsidian-900/50 p-3 sm:p-4">
                  <p className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.12em] text-slate uppercase sm:text-[10px]">
                    <ShieldCheck className="h-3 w-3 text-gold" /> {t.results.warranty}
                  </p>
                  <p className="font-sharp mt-2 text-2xl font-light text-mist">
                    <AnimatedNumber value={v} /> <span className="text-sm text-steel">{years}</span>
                  </p>
                  <p className="mt-1 text-xs text-steel">{label}</p>
                </div>
              ))}
            </div>

            {/* Stage roadmap (Gantt) */}
            <div className="rounded-2xl border border-line bg-obsidian-900/50 p-4 sm:p-5">
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-slate uppercase">
                <span>{t.results.roadmap}</span>
                <span>
                  0 — {e.months} {t.results.month}
                </span>
              </div>
              <ul className="mt-4 space-y-2">
                {e.stages.map((s, i) => {
                  const left = (s.startMonth / e.months) * 100;
                  const width = ((s.endMonth - s.startMonth) / e.months) * 100;
                  return (
                    <li key={s.key} className="grid grid-cols-[7.5rem_1fr] items-center gap-3 sm:grid-cols-[10rem_1fr]">
                      <span className="truncate text-xs text-steel">{t.stages[s.key]}</span>
                      <span className="relative h-5 rounded-md bg-titanium-800/60">
                        <motion.span
                          className={cn(
                            "absolute inset-y-0 flex items-center justify-end rounded-md pr-1.5 font-mono text-[9px] text-obsidian-900",
                            i % 2 ? "bg-gradient-to-r from-cyan/70 to-cyan" : "bg-gradient-to-r from-gold-deep to-gold",
                          )}
                          initial={false}
                          animate={{ left: `${left}%`, width: `${width}%` }}
                          transition={{ type: "spring", stiffness: 140, damping: 22 }}
                        >
                          {Math.max(1, Math.round(s.endMonth - s.startMonth))}
                        </motion.span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-auto flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex max-w-sm gap-2 text-xs leading-relaxed text-slate">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {t.disclaimer}
              </p>
              <Button asChild data-cursor="→">
                <NavLink href={`/${locale}#contact`}>
                  {t.cta}
                  <ArrowUpRight />
                  <ButtonShimmer />
                </NavLink>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Tile({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-obsidian-900/50 p-4 sm:p-5">
      <p className="font-mono text-[10px] tracking-[0.16em] text-slate uppercase">{label}</p>
      <p className="font-sharp mt-2 text-3xl font-light tabular-nums sm:text-4xl">{children}</p>
    </div>
  );
}

function Segmented<V extends string>({
  legend,
  value,
  onChange,
  options,
}: {
  legend: string;
  value: V;
  onChange: (v: V) => void;
  options: { value: V; label: string; Icon: typeof Star }[];
}) {
  return (
    <fieldset>
      <legend className="font-mono text-[11px] tracking-[0.2em] text-steel uppercase">{legend}</legend>
      <div role="radiogroup" className="mt-4 grid grid-cols-3 gap-2">
        {options.map(({ value: v, label, Icon }) => {
          const on = v === value;
          return (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(v)}
              className={cn(
                "relative isolate flex flex-col items-center gap-2 rounded-2xl border px-2 py-3.5 text-center text-xs transition-colors duration-500",
                on ? "border-gold/60 text-gold-soft" : "border-line text-steel hover:border-cyan/40 hover:text-mist",
              )}
            >
              {on && (
                <motion.span
                  layoutId={`est-${legend}`}
                  className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-gold/20 to-gold/5 shadow-[0_0_30px_-10px_rgb(226_184_89/0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <Icon className={cn("h-5 w-5", on ? "text-gold" : "text-cyan/80")} />
              <span className="leading-tight">{label}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
