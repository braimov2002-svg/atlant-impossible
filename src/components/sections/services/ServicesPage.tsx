"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Check, Construction, HardHat, PencilRuler } from "lucide-react";
import { MaterialSurface, type SurfaceMaterial } from "@/components/shader/MaterialSurface";
import { Button, ButtonShimmer } from "@/components/ui/button";
import { NavLink } from "@/components/layout/NavLink";
import { EASE_OUT_EXPO, fadeUp, inViewOnce, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/uz";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type T = Dictionary["servicesPage"];
type Service = T["services"][number];

const ICONS: Record<string, typeof PencilRuler> = { bim: PencilRuler, construction: HardHat, infrastructure: Construction };
// Bento placement: BIM hero tile, construction tall tile, infrastructure full-width strip
const LAYOUT: Record<string, string> = {
  bim: "lg:col-span-4 lg:row-span-2 min-h-[560px]",
  construction: "lg:col-span-2 lg:row-span-2 min-h-[560px]",
  infrastructure: "lg:col-span-6 min-h-[420px]",
};

export function ServicesBentoPage({ t, locale }: { t: T; locale: string }) {
  return (
    <>
      <section className="relative pb-20">
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-5 sm:px-8 lg:grid-cols-6"
        >
          {t.services.map((s) => (
            <motion.div key={s.id} variants={fadeUp} className={LAYOUT[s.id]}>
              <MaterialCard service={s} wide={s.id === "infrastructure"} />
            </motion.div>
          ))}
        </motion.div>
      </section>
      <Process t={t.process} />
      <section className="relative py-24">
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

/**
 * Service tile over a live material shader. Hovering brings the light to the
 * cursor and draws a technical wireframe overlay specific to the discipline.
 */
function MaterialCard({ service: s, wide }: { service: Service; wide: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = ICONS[s.id] ?? PencilRuler;
  return (
    <article
      ref={ref}
      className="group shimmer-border relative isolate flex h-full flex-col overflow-hidden rounded-[28px] border border-line"
      data-cursor={s.material === "blueprint" ? "BIM" : s.material === "concrete" ? "B40" : "S355"}
    >
      <div className="absolute inset-0 -z-10">
        <MaterialSurface material={s.material as SurfaceMaterial} interactionTarget={ref} />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/95 via-obsidian-900/55 to-obsidian-900/20" />
      </div>
      <Wireframe id={s.id} />

      <div className={cn("flex h-full flex-col justify-between gap-8 p-6 sm:p-8", wide && "lg:flex-row lg:items-end")}>
        <div className="max-w-xl">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-obsidian-900/70 text-gold backdrop-blur">
            <Icon className="h-5 w-5" />
          </span>
          <p className="mt-6 font-mono text-[10px] tracking-[0.22em] text-cyan uppercase">{s.tagline}</p>
          <h2 className="font-sharp mt-3 text-3xl leading-tight font-light text-mist sm:text-4xl">{s.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-steel sm:text-base">{s.body}</p>
        </div>
        <div className={cn("space-y-5", wide && "lg:w-[46%]")}>
          <ul className={cn("grid gap-2", wide ? "sm:grid-cols-2" : "")}>
            {s.capabilities.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm text-mist/90">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {c}
              </li>
            ))}
          </ul>
          <dl className="grid grid-cols-2 gap-3">
            {s.metrics.map((m) => (
              <div key={m.label} className="glass rounded-2xl px-4 py-3">
                <dt className="font-mono text-[9.5px] tracking-[0.16em] text-slate uppercase">{m.label}</dt>
                <dd className="font-sharp mt-1 text-2xl font-light text-mist">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </article>
  );
}

/** Hover-triggered technical line drawing (stroke-dashoffset transition). */
function Wireframe({ id }: { id: string }) {
  const common = "absolute right-6 top-6 h-40 w-56 opacity-0 transition-opacity duration-700 group-hover:opacity-100 sm:h-52 sm:w-72";
  const path = "[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:[stroke-dashoffset:0]";
  if (id === "bim") {
    return (
      <svg viewBox="0 0 200 140" className={common} fill="none" stroke="#00f0ff" strokeWidth="1" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <path key={i} pathLength={1} className={path} style={{ transitionDelay: `${i * 0.12}s` }} d={`M40 ${110 - i * 22} L100 ${130 - i * 22} L170 ${100 - i * 22} L110 ${80 - i * 22} Z`} />
        ))}
        <path pathLength={1} className={path} d="M40 110 V44 M100 130 V64 M170 100 V34" stroke="#e2b859" />
      </svg>
    );
  }
  if (id === "construction") {
    return (
      <svg viewBox="0 0 200 140" className={common} fill="none" stroke="#e2b859" strokeWidth="1" aria-hidden>
        <path pathLength={1} className={path} d="M30 130 V30 H170 V130 M30 60 H170 M30 95 H170 M76 30 V130 M124 30 V130" />
        <path pathLength={1} className={path} style={{ transitionDelay: "0.3s" }} d="M30 30 L76 60 M124 30 L170 60 M30 60 L76 95 M124 60 L170 95" stroke="#00f0ff" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 280 140" className={common} fill="none" stroke="#00f0ff" strokeWidth="1" aria-hidden>
      <path pathLength={1} className={path} d="M0 70 H280" stroke="#e2b859" strokeWidth="1.6" />
      <path pathLength={1} className={path} style={{ transitionDelay: "0.2s" }} d="M0 70 Q70 10 140 70 Q210 10 280 70" />
      {[46, 93, 140, 187, 234].map((x) => (
        <path key={x} pathLength={1} className={path} style={{ transitionDelay: "0.35s" }} d={`M${x} 70 V136`} />
      ))}
    </svg>
  );
}

/** Process strip — connector line draws with scroll (GSAP ScrollTrigger scrub). */
function Process({ t }: { t: T["process"] }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        "[data-process-line]",
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 60%", scrub: true } },
      );
      gsap.utils.toArray<HTMLElement>("[data-process-step]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0.25, y: 20 },
          { autoAlpha: 1, y: 0, scrollTrigger: { trigger: root.current, start: `top+=${i * 60} 70%`, end: `top+=${i * 60 + 120} 60%`, scrub: true } },
        );
      });
    },
    { scope: root },
  );
  return (
    <section ref={root} className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewOnce}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
          className="font-sharp text-3xl font-light text-mist sm:text-4xl"
        >
          {t.title}
        </motion.h2>
        <div className="relative mt-12">
          <div className="absolute top-6 right-0 left-0 hidden h-px bg-titanium-700 md:block" />
          <div data-process-line className="absolute top-6 right-0 left-0 hidden h-px origin-left bg-gradient-to-r from-gold to-cyan md:block" />
          <ol className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {t.steps.map((s, i) => (
              <li key={s.title} data-process-step className="relative">
                <span className="font-sharp relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-obsidian-900 text-lg font-light text-gold">
                  0{i + 1}
                </span>
                <h3 className="font-sharp mt-5 text-xl font-light text-mist">{s.title}</h3>
                <p className="mt-2 text-sm text-steel">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
