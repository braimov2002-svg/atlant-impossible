"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";
import { NavLink } from "@/components/layout/NavLink";
import { TowerDrawing } from "./TowerDrawing";
import type { Dictionary } from "@/i18n/dictionaries/uz";

/**
 * Home hero: the group's own slogan, what it does, and its published figures.
 * The visual is an architectural line drawing (worm's-eye tower corner) that
 * drifts with scroll. Headline animates in CSS so it paints before hydration.
 */
export function Hero({ t, figures, locale }: { t: Dictionary["hero"]; figures: Dictionary["figures"]; locale: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Drawing + light */}
      <motion.div style={{ y, opacity: fade }} className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[58%]">
        <TowerDrawing className="h-full w-full opacity-60 [mask-image:linear-gradient(90deg,transparent,#000_30%)] max-lg:opacity-30 lg:opacity-100 lg:[mask-image:linear-gradient(90deg,transparent,#000_25%)]" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_600px_at_75%_0%,rgb(255_255_255/0.06),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-obsidian-900 to-transparent" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pt-32 pb-12 sm:px-8 lg:pb-16">
        <p className="label-caps flex animate-fade-up items-center gap-3 text-steel [animation-delay:0.05s]">
          <span className="h-px w-10 bg-gold" />
          {t.eyebrow}
        </p>
        <h1 className="font-display mt-7 text-[clamp(2.5rem,1rem+5.6vw,6.6rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-mist">
          <span className="block overflow-hidden pb-[0.04em]">
            <span className="block animate-word-up [animation-delay:0.1s]">{t.titleA}</span>
          </span>
          <span className="block overflow-hidden pb-[0.07em]">
            <span className="block animate-word-up text-slate [animation-delay:0.2s]">{t.titleB}</span>
          </span>
        </h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,560px)_1fr] lg:items-end">
          <div>
            <p className="animate-fade-up text-base leading-relaxed text-steel sm:text-lg [animation-delay:0.45s]">{t.lead}</p>
            <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:0.6s]">
              <Button asChild size="lg">
                <NavLink href={`/${locale}/about`}>
                  {t.ctaPrimary}
                  <ArrowRight />
                </NavLink>
              </Button>
              <Button asChild size="lg" variant="outline">
                <NavLink href={`/${locale}#contact`}>{t.ctaSecondary}</NavLink>
              </Button>
            </div>
          </div>
          <ul aria-label={t.sectorsLabel} className="flex animate-fade-up flex-wrap gap-x-8 gap-y-3 lg:justify-end [animation-delay:0.75s]">
            {t.sectors.map((s, i) => (
              <li key={s} className="flex items-baseline gap-2 text-sm text-mist">
                <span className="label-caps text-gold tabular-nums">0{i + 1}</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        <dl className="mt-14 grid animate-fade-up grid-cols-3 border-t border-line [animation-delay:0.9s]">
          {figures.map((f) => (
            <div key={f.label} className="flex flex-col-reverse border-line pt-6 pr-3 [&+&]:border-l [&+&]:pl-4 sm:[&+&]:pl-8">
              <dt className="mt-3 text-xs leading-snug text-steel sm:text-sm">{f.label}</dt>
              <dd className="font-display text-[clamp(1.8rem,1rem+3vw,3.6rem)] leading-none font-semibold tracking-[-0.03em] text-mist tabular-nums">
                <CountUp value={f.value} suffix={f.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="label-caps pointer-events-none absolute right-8 bottom-8 hidden items-center gap-2 text-slate xl:flex">
        {t.scroll} <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
      </div>
    </section>
  );
}
