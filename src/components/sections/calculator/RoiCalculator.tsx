"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Cylinder,
  Flower2,
  Info,
  Minus,
  Plus,
  TreeDeciduous,
  Warehouse,
  WavesArrowDown,
  WavesHorizontal,
  Wheat,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Slider } from "@/components/ui/slider";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Button, ButtonShimmer } from "@/components/ui/button";
import { AREA_LIMITS, CROP_PROFILES, calculateRoi, type CropType, type WaterSource } from "@/lib/roi";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn, formatNumber, formatUsd } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/uz";

const CROP_ICONS: Record<CropType, React.ComponentType<{ className?: string }>> = {
  greenhouse: Warehouse,
  cotton: Flower2,
  grain: Wheat,
  orchard: TreeDeciduous,
};
const WATER_ICONS: Record<WaterSource, React.ComponentType<{ className?: string }>> = {
  canal: WavesHorizontal,
  well: WavesArrowDown,
  reservoir: Cylinder,
};

// Log-scale slider: 0..1000 ↔ 1..2000 ha, so 1–20 ha is as easy to set as 200–2000 ha.
const LOG_MAX = Math.log10(AREA_LIMITS.max);
const toArea = (s: number) => Math.max(1, Math.round(10 ** ((s / 1000) * LOG_MAX)));
const toSlider = (a: number) => Math.round((Math.log10(Math.max(1, a)) / LOG_MAX) * 1000);

export function RoiCalculator({ t }: { t: Dictionary["calculator"] }) {
  const [area, setArea] = useState(120);
  const [crop, setCrop] = useState<CropType>("cotton");
  const [water, setWater] = useState<WaterSource>("canal");

  const maxArea = CROP_PROFILES[crop].maxArea;
  const effectiveArea = Math.min(area, maxArea);
  const r = useMemo(() => calculateRoi({ areaHa: effectiveArea, crop, water }), [effectiveArea, crop, water]);

  const step = (dir: 1 | -1) => {
    const inc = effectiveArea < 20 ? 1 : effectiveArea < 200 ? 10 : 50;
    setArea(Math.min(maxArea, Math.max(1, effectiveArea + dir * inc)));
  };

  return (
    <section id="calculator" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[520px] bg-[radial-gradient(ellipse_at_center,rgb(0_255_102/0.07),transparent_65%)]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="03" eyebrow={t.eyebrow} title={t.title} accent={t.titleAccent} description={t.description} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO }}
          className="glass-strong mt-12 grid grid-cols-1 overflow-hidden rounded-[30px] lg:grid-cols-12"
        >
          {/* ── Inputs */}
          <div className="space-y-9 border-b border-emerald-line p-6 sm:p-8 lg:col-span-5 lg:border-r lg:border-b-0">
            <fieldset>
              <legend className="flex w-full items-baseline justify-between">
                <span className="font-mono text-[11px] tracking-[0.2em] text-sage uppercase">{t.area}</span>
                <span className="flex items-center gap-2">
                  <StepButton label="−" onClick={() => step(-1)}>
                    <Minus className="h-3.5 w-3.5" />
                  </StepButton>
                  <span className="min-w-[5.5ch] text-right font-display text-3xl text-mist tabular-nums">
                    {formatNumber(effectiveArea)}
                  </span>
                  <span className="text-sm text-sage">{t.areaUnit}</span>
                  <StepButton label="+" onClick={() => step(1)}>
                    <Plus className="h-3.5 w-3.5" />
                  </StepButton>
                </span>
              </legend>
              <Slider
                className="mt-6"
                min={0}
                max={1000}
                step={1}
                value={[toSlider(effectiveArea)]}
                onValueChange={([v]) => setArea(Math.min(maxArea, toArea(v)))}
                aria-label={t.area}
              />
              <div className="mt-2.5 flex justify-between font-mono text-[10px] text-moss">
                <span>1 {t.areaUnit}</span>
                <span>{formatNumber(AREA_LIMITS.max)} {t.areaUnit}</span>
              </div>
              {area > maxArea || effectiveArea === maxArea ? (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-gold-soft">
                  <Info className="h-3.5 w-3.5" />
                  {t.maxAreaNote}: {formatNumber(maxArea)} {t.areaUnit}
                </p>
              ) : null}
            </fieldset>

            <Segmented
              legend={t.crop}
              value={crop}
              onChange={setCrop}
              options={(Object.keys(t.crops) as CropType[]).map((k) => ({ value: k, label: t.crops[k], Icon: CROP_ICONS[k] }))}
              columns="grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4"
            />

            <Segmented
              legend={t.water}
              value={water}
              onChange={setWater}
              options={(Object.keys(t.waters) as WaterSource[]).map((k) => ({ value: k, label: t.waters[k], Icon: WATER_ICONS[k] }))}
              columns="grid-cols-3"
            />
          </div>

          {/* ── Live output */}
          <div className="flex flex-col gap-6 p-6 sm:p-8 lg:col-span-7" aria-live="polite">
            <div className="grid grid-cols-3 gap-3">
              <Kpi label={t.results.yield} tone="lime">
                +<AnimatedNumber value={r.yieldBoostPct} />%
              </Kpi>
              <Kpi label={t.results.water} tone="water">
                −<AnimatedNumber value={r.waterSavedPct} />%
              </Kpi>
              <Kpi label={t.results.payback} tone="gold">
                <AnimatedNumber value={r.paybackMonths} />
                <span className="ml-1 text-base text-sage">{t.results.months}</span>
              </Kpi>
            </div>

            <CashflowChart cashflow={r.cashflow} payback={r.paybackMonths} t={t.results} />

            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Secondary label={t.results.capex} value={<AnimatedNumber value={r.capex} format={formatUsd} />} />
              <Secondary label={t.results.gain} value={<AnimatedNumber value={r.annualGain} format={formatUsd} />} />
              <Secondary
                label={t.results.waterVolume}
                value={
                  <>
                    <AnimatedNumber value={r.waterSavedM3} format={(v) => formatNumber(Math.round(v / 100) * 100)} /> m³
                  </>
                }
              />
            </dl>

            <div className="mt-auto flex flex-col gap-4 border-t border-emerald-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex max-w-sm gap-2 text-xs leading-relaxed text-moss">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {t.disclaimer}
              </p>
              <Button asChild data-cursor="TEO">
                <a href="#contact">
                  {t.cta}
                  <ArrowUpRight />
                  <ButtonShimmer />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StepButton({ children, label, onClick }: { children: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-7 w-7 items-center justify-center rounded-full border border-emerald-line text-sage transition hover:border-lime/50 hover:text-lime"
    >
      {children}
    </button>
  );
}

function Segmented<V extends string>({
  legend,
  value,
  onChange,
  options,
  columns,
}: {
  legend: string;
  value: V;
  onChange: (v: V) => void;
  options: { value: V; label: string; Icon: React.ComponentType<{ className?: string }> }[];
  columns: string;
}) {
  return (
    <fieldset>
      <legend className="font-mono text-[11px] tracking-[0.2em] text-sage uppercase">{legend}</legend>
      <div role="radiogroup" className={cn("mt-4 grid gap-2", columns)}>
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
                "relative flex flex-col items-center gap-2 rounded-2xl border px-2 py-3.5 text-center text-xs transition-colors duration-500",
                on ? "border-gold/60 text-gold-soft" : "border-emerald-line text-sage hover:border-lime/40 hover:text-mist",
              )}
            >
              {on && (
                <motion.span
                  layoutId={`seg-${legend}`}
                  className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-gold/20 to-gold/5 shadow-[0_0_30px_-10px_rgb(212_175_55/0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <Icon className={cn("h-5 w-5", on ? "text-gold" : "text-lime/80")} />
              <span className="leading-tight">{label}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function Kpi({ label, tone, children }: { label: string; tone: "lime" | "water" | "gold"; children: React.ReactNode }) {
  const color = { lime: "text-lime-glow", water: "text-water", gold: "text-gold-gradient" }[tone];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-line bg-forest-950/50 p-3 sm:p-4">
      <p className="font-mono text-[9px] leading-tight tracking-[0.14em] text-moss uppercase sm:text-[10px]">{label}</p>
      <p className={cn("mt-2 font-display text-2xl tabular-nums sm:text-4xl", color)}>{children}</p>
    </div>
  );
}

function Secondary({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-emerald-line/70 px-4 py-3">
      <dt className="font-mono text-[10px] tracking-[0.14em] text-moss uppercase">{label}</dt>
      <dd className="mt-1 font-display text-lg text-mist tabular-nums">{value}</dd>
    </div>
  );
}

/** Cumulative cash position over 60 months; the path morphs as inputs change. */
function CashflowChart({
  cashflow,
  payback,
  t,
}: {
  cashflow: number[];
  payback: number;
  t: Dictionary["calculator"]["results"];
}) {
  const W = 600;
  const H = 180;
  const min = Math.min(...cashflow);
  const max = Math.max(...cashflow, 1);
  const y = (v: number) => 12 + (1 - (v - min) / (max - min)) * (H - 24);
  const x = (i: number) => (i / (cashflow.length - 1)) * W;
  const line = cashflow.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const area = `${line} L${W} ${y(0).toFixed(1)} L0 ${y(0).toFixed(1)} Z`;
  const pbX = x(Math.min(payback, 60));

  return (
    <div className="rounded-2xl border border-emerald-line bg-forest-950/50 p-4">
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-moss uppercase">
        <span>{t.cashflow}</span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-3 rounded-full bg-gold" /> USD
          </span>
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 h-40 w-full sm:h-44" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="cf-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#00ff66" stopOpacity="0.28" />
            <stop offset="1" stopColor="#00ff66" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[12, 24, 36, 48].map((m) => (
          <line key={m} x1={x(m)} x2={x(m)} y1="0" y2={H} stroke="#8fa89a" strokeOpacity="0.08" />
        ))}
        <line x1="0" x2={W} y1={y(0)} y2={y(0)} stroke="#8fa89a" strokeOpacity="0.4" strokeDasharray="4 5" vectorEffect="non-scaling-stroke" />
        <motion.path
          initial={false}
          animate={{ d: area }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          fill="url(#cf-fill)"
        />
        <motion.path
          initial={false}
          animate={{ d: line }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          fill="none"
          stroke="#d4af37"
          strokeWidth="2.2"
          vectorEffect="non-scaling-stroke"
        />
        <motion.line
          initial={false}
          animate={{ x1: pbX, x2: pbX }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          y1="0"
          y2={H}
          stroke="#00ff66"
          strokeWidth="1.5"
          strokeDasharray="3 4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="mt-2 flex justify-between font-mono text-[10px] text-moss">
        {[0, 12, 24, 36, 48, 60].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
      <p className="mt-2 font-mono text-[10px] tracking-[0.14em] text-lime uppercase">
        ● {t.breakEven}: {payback} {t.months}
      </p>
    </div>
  );
}
