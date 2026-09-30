"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Droplets, FlaskConical, TrendingUp, Warehouse } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { EASE_OUT_EXPO, fadeUp, inViewOnce, stagger } from "@/lib/motion";
import { calculateRoi } from "@/lib/roi";
import { formatUsd } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/uz";

type T = Dictionary["services"];

export function ServicesBento({ t }: { t: T }) {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="01" eyebrow={t.eyebrow} title={t.title} accent={t.titleAccent} />
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6"
        >
          <motion.div variants={fadeUp} className="lg:col-span-3">
            <AuditCard t={t.items.audit} />
          </motion.div>
          <motion.div variants={fadeUp} className="lg:col-span-3">
            <IrrigationCard t={t.items.irrigation} />
          </motion.div>
          <motion.div variants={fadeUp} className="md:col-span-2 lg:col-span-4">
            <GreenhouseCard t={t.items.greenhouse} />
          </motion.div>
          <motion.div variants={fadeUp} className="md:col-span-2 lg:col-span-2">
            <InvestmentCard t={t.items.investment} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CardHeader({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div>
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-line bg-forest-900 text-lime transition-colors duration-500 group-hover/card:border-lime/40 group-hover/card:shadow-[0_0_24px_-6px_#00ff66]">
        {icon}
      </span>
      <h3 className="mt-5 font-display text-lg leading-snug text-mist sm:text-xl">{title}</h3>
      <p className="mt-2.5 max-w-md text-sm leading-relaxed text-sage">{body}</p>
    </div>
  );
}

/* ── 1. Agro-audit: animated N-P-K bars ─────────────────────────────── */

function AuditCard({ t }: { t: T["items"]["audit"] }) {
  const colors = ["from-lime/30 to-lime", "from-gold-deep/40 to-gold", "from-emerald-500/30 to-emerald-300"];
  return (
    <SpotlightCard className="flex h-full flex-col justify-between gap-8 p-6 sm:p-7">
      <CardHeader icon={<FlaskConical className="h-5 w-5" />} title={t.title} body={t.body} />
      <div className="rounded-2xl border border-emerald-line bg-forest-950/50 p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] tracking-[0.18em] text-moss uppercase">
          <span>{t.sampleLabel} · #A-0142</span>
          <span className="flex gap-3">
            {t.extras.map((e) => (
              <span key={e.label}>
                {e.label} <span className="text-mist">{e.value}</span>
              </span>
            ))}
          </span>
        </div>
        <div className="space-y-3.5">
          {t.nutrients.map((n, i) => (
            <div key={n.key} className="flex items-center gap-3">
              <span className="w-7 font-display text-sm text-mist">{n.key}</span>
              <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-forest-800">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${n.value}%` }}
                  viewport={inViewOnce}
                  transition={{ duration: 1.6, delay: 0.2 + i * 0.15, ease: EASE_OUT_EXPO }}
                  className={`h-full rounded-full bg-gradient-to-r ${colors[i]}`}
                />
                {/* optimal band */}
                <span className="absolute inset-y-0 left-[55%] w-[25%] border-x border-dashed border-mist/20" />
              </div>
              <span className="w-24 text-right font-mono text-[11px] text-sage">
                {n.name} <span className="text-mist">{n.value}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </SpotlightCard>
  );
}

/* ── 2. Smart irrigation: liquid tanks + drip ────────────────────────── */

function LiquidTank({ value, label, tone }: { value: number; label: string; tone: "lime" | "sage" }) {
  const fill = tone === "lime" ? "#00ff66" : "#8fa89a";
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-36 w-20 overflow-hidden rounded-2xl border border-emerald-line bg-forest-950/70">
        <motion.div
          initial={{ height: "0%" }}
          whileInView={{ height: `${value}%` }}
          viewport={inViewOnce}
          transition={{ duration: 2.2, ease: EASE_OUT_EXPO }}
          className="absolute inset-x-0 bottom-0"
          style={{ background: `linear-gradient(180deg, ${fill}55, ${fill}14)` }}
        >
          {/* two offset sine waves riding the surface */}
          {[0, 1].map((k) => (
            <svg
              key={k}
              viewBox="0 0 160 12"
              preserveAspectRatio="none"
              className="absolute -top-2.5 left-0 h-3 w-[200%] animate-wave"
              style={{ animationDuration: `${4 + k * 2.5}s`, opacity: k ? 0.5 : 0.9 }}
              aria-hidden
            >
              <path
                d="M0 6 Q10 0 20 6 T40 6 T60 6 T80 6 T100 6 T120 6 T140 6 T160 6 V12 H0Z"
                fill={`${fill}${k ? "40" : "66"}`}
              />
            </svg>
          ))}
        </motion.div>
        <span className="absolute inset-x-0 top-3 text-center font-display text-lg text-mist">{value}%</span>
      </div>
      <span className="font-mono text-[10px] tracking-[0.16em] text-sage uppercase">{label}</span>
    </div>
  );
}

function IrrigationCard({ t }: { t: T["items"]["irrigation"] }) {
  return (
    <SpotlightCard className="flex h-full flex-col justify-between gap-8 p-6 sm:p-7">
      <CardHeader icon={<Droplets className="h-5 w-5" />} title={t.title} body={t.body} />
      <div className="flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-emerald-line bg-forest-950/50 p-4">
        <div className="flex gap-4">
          <LiquidTank value={t.furrowValue} label={t.furrow} tone="sage" />
          <LiquidTank value={t.dripValue} label={t.drip} tone="lime" />
        </div>
        <div className="flex flex-col items-end gap-3 pb-6">
          {/* drip emitter */}
          <div className="relative h-16 w-10" aria-hidden>
            <span className="absolute top-0 left-1/2 h-2 w-8 -translate-x-1/2 rounded-full bg-forest-700" />
            {[0, 0.55, 1.1].map((d) => (
              <span
                key={d}
                className="absolute top-2 left-1/2 h-2.5 w-2 -translate-x-1/2 animate-drip rounded-full rounded-t-[40%] bg-water shadow-[0_0_10px_#38bdf8]"
                style={{ animationDelay: `${d}s` }}
              />
            ))}
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] tracking-[0.16em] text-moss uppercase">{t.saving}</p>
            <p className="font-display text-3xl text-lime-glow">−40%</p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-moss uppercase">{t.compareLabel}</p>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

/* ── 3. Greenhouse engineering: self-drawing wireframe + steps ───────── */

function GreenhouseCard({ t }: { t: T["items"]["greenhouse"] }) {
  const draw = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: inViewOnce,
    transition: { duration: 2, delay, ease: EASE_OUT_EXPO },
  });
  return (
    <SpotlightCard className="grid h-full gap-8 p-6 sm:p-7 md:grid-cols-[1fr_1.1fr] md:items-center">
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <CardHeader icon={<Warehouse className="h-5 w-5" />} title={t.title} body={t.body} />
        </div>
        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {t.steps.map((s, i) => (
            <li key={s} className="rounded-xl border border-emerald-line bg-forest-950/50 px-3 py-2.5">
              <span className="block font-mono text-[10px] text-lime">0{i + 1}</span>
              <span className="text-[13px] text-mist">{s}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="relative">
        <span className="absolute top-0 right-0 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-gold uppercase">
          {t.badge}
        </span>
        <svg viewBox="0 0 320 190" className="w-full" fill="none" aria-hidden>
          <motion.path {...draw(0)} d="M20 170 H300" stroke="#1f6b45" strokeWidth="1.5" />
          {/* three Venlo spans in isometric-ish elevation */}
          {[0, 1, 2].map((i) => {
            const x = 30 + i * 86;
            return (
              <g key={i}>
                <motion.path
                  {...draw(0.2 + i * 0.2)}
                  d={`M${x} 170 V95 L${x + 43} 55 L${x + 86} 95 V170`}
                  stroke="#d4af37"
                  strokeWidth="1.6"
                />
                <motion.path
                  {...draw(0.6 + i * 0.2)}
                  d={`M${x + 43} 55 V170 M${x} 132 H${x + 86} M${x + 21} 75 V170 M${x + 64} 75 V170`}
                  stroke="#2fbf7f"
                  strokeOpacity="0.5"
                  strokeWidth="1"
                />
                <motion.path
                  {...draw(1.1 + i * 0.15)}
                  d={`M${x + 45} 57 L${x + 84} 93`}
                  stroke="#00ff66"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeOpacity="0.8"
                />
              </g>
            );
          })}
          {/* crop rows */}
          {Array.from({ length: 12 }, (_, i) => (
            <motion.circle
              key={i}
              cx={42 + i * 21.5}
              cy={160}
              r={4}
              fill="#2fbf7f"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={inViewOnce}
              transition={{ delay: 1.4 + i * 0.05, duration: 0.6, ease: EASE_OUT_EXPO }}
            />
          ))}
        </svg>
      </div>
    </SpotlightCard>
  );
}

/* ── 4. Investment: ROI preview (same model as the calculator) ───────── */

function InvestmentCard({ t }: { t: T["items"]["investment"] }) {
  const roi = calculateRoi({ areaHa: 100, crop: "cotton", water: "canal" });
  const pts = roi.cashflow.filter((_, i) => i % 3 === 0);
  const min = Math.min(...pts);
  const max = Math.max(...pts);
  const y = (v: number) => 80 - ((v - min) / (max - min)) * 72;
  const line = pts.map((v, i) => `${i ? "L" : "M"}${(i / (pts.length - 1)) * 200} ${y(v).toFixed(1)}`).join(" ");
  const zeroY = y(0);

  return (
    <SpotlightCard className="flex h-full flex-col justify-between gap-6 p-6 sm:p-7">
      <CardHeader icon={<TrendingUp className="h-5 w-5" />} title={t.title} body={t.body} />
      <div className="rounded-2xl border border-emerald-line bg-forest-950/50 p-4">
        <p className="font-mono text-[10px] tracking-[0.18em] text-moss uppercase">{t.preview} · {t.scenario}</p>
        <svg viewBox="0 0 200 84" className="mt-3 w-full" aria-hidden>
          <line x1="0" x2="200" y1={zeroY} y2={zeroY} stroke="#8fa89a" strokeOpacity="0.35" strokeDasharray="3 3" />
          <motion.path
            d={line}
            fill="none"
            stroke="#d4af37"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={inViewOnce}
            transition={{ duration: 2, ease: EASE_OUT_EXPO }}
          />
        </svg>
        <dl className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <dt className="font-mono text-[10px] tracking-wider text-moss uppercase">{t.paybackLabel}</dt>
            <dd className="font-display text-xl text-mist">{roi.paybackMonths} {t.months}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] tracking-wider text-moss uppercase">{t.irrLabel}</dt>
            <dd className="font-display text-xl text-gold">+{formatUsd(roi.annualGain)}</dd>
          </div>
        </dl>
      </div>
      <a
        href="#calculator"
        className="group/link inline-flex items-center gap-2 self-start text-sm text-lime transition hover:text-lime-soft"
      >
        {t.cta}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
      </a>
    </SpotlightCard>
  );
}
