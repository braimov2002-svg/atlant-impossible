"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown, ArrowUpRight, CalendarClock, Layers3 } from "lucide-react";
import { Button, ButtonShimmer } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { NavLink } from "@/components/layout/NavLink";
import { HeroFallback } from "./HeroFallback";
import type { HeroReadout } from "@/components/three/BuildingHero3D";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/uz";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false, loading: () => <HeroFallback /> });

/**
 * Scroll-to-build hero. The section is ~3.4 viewports tall; its inner stage is
 * sticky, so scrolling scrubs one progress value (GSAP ScrollTrigger) that the
 * WebGL tower and the DOM timeline both read.
 */
export function Hero({ t, locale, finale }: { t: Dictionary["hero"]; locale: string; finale: { name: string; meta: string; cta: string } }) {
  const section = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const readout = useRef<HeroReadout>({ progress: 0, floor: 0, floors: 48, heightM: 0, stage: 0 });
  const reduced = useReducedMotion();

  // DOM readouts driven from the 3D scene each frame (no React re-renders)
  const bar = useRef<HTMLDivElement>(null);
  const heightEl = useRef<HTMLSpanElement>(null);
  const floorEl = useRef<HTMLSpanElement>(null);
  const pctEl = useRef<HTMLSpanElement>(null);
  const stageEls = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    let last = "";
    const loop = () => {
      const r = readout.current;
      const key = `${r.floor}|${Math.round(r.progress * 100)}|${r.stage}`;
      if (key !== last) {
        last = key;
        if (bar.current) bar.current.style.transform = `scaleX(${r.progress})`;
        if (heightEl.current) heightEl.current.textContent = `+${r.heightM.toFixed(1)}`;
        if (floorEl.current) floorEl.current.textContent = `${String(r.floor).padStart(2, "0")}/${r.floors}`;
        if (pctEl.current) pctEl.current.textContent = `${Math.round(r.progress * 100)}%`;
        stageEls.current.forEach((el, i) => el?.setAttribute("data-state", i < r.stage ? "done" : i === r.stage ? "active" : "todo"));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });

      // Overlay choreography on the same scroll range (timeline length = 1)
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: section.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });
      tl.to("[data-hero-copy]", { autoAlpha: 0, y: -60, duration: 0.12 }, 0.12)
        .fromTo("[data-hero-stages]", { autoAlpha: 0, x: -30 }, { autoAlpha: 1, x: 0, duration: 0.1 }, 0.16)
        .to("[data-hero-stages]", { autoAlpha: 0, x: -30, duration: 0.08 }, 0.84)
        .fromTo("[data-hero-finale]", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.1 }, 0.88)
        .to("[data-hero-hint]", { autoAlpha: 0, duration: 0.05 }, 0.02)
        .set({}, {}, 1);

      // HUD entrance + counters
      const intro = gsap.timeline({ delay: 0.8, defaults: { ease: "expo.out" } });
      intro.fromTo("[data-hud]", { autoAlpha: 0, x: 30, filter: "blur(8px)" }, { autoAlpha: 1, x: 0, filter: "blur(0px)", duration: 1.2, stagger: 0.12 });
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const dec = Number(el.dataset.decimals ?? 0);
        const o = { v: 0 };
        intro.to(o, { v: end, duration: 2, ease: "power3.out", onUpdate: () => (el.textContent = o.v.toFixed(dec)) }, 0.3);
      });
    },
    { scope: section, dependencies: [] },
  );

  return (
    <section id="top" ref={section} className="relative h-[280vh] lg:h-[340vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <HeroScene progress={progress} readout={readout} reducedMotion={reduced} />

        {/* Legibility veils */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#06080d_0%,rgb(6_8_13/0.82)_26%,rgb(6_8_13/0)_55%)] max-lg:bg-[linear-gradient(180deg,#06080d_0%,rgb(6_8_13/0.85)_36%,rgb(6_8_13/0)_58%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-obsidian-900 to-transparent" />

        {/* ── Headline block */}
        <div data-hero-copy className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-start px-5 pt-28 sm:px-8 lg:justify-center lg:pt-10">
          <div className="max-w-[640px]">
            <p className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-line bg-obsidian-900/60 py-1.5 pr-4 pl-2 font-mono text-[9px] tracking-[0.12em] whitespace-nowrap text-steel uppercase backdrop-blur-md [animation-delay:0.1s] sm:text-[10.5px] sm:tracking-[0.18em]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan/10 text-cyan">
                <Layers3 className="h-3 w-3" />
              </span>
              {t.eyebrow}
            </p>
            <h1 className="font-sharp mt-6 leading-[1.02] font-light tracking-[-0.04em] text-mist">
              <span className="block overflow-hidden pb-1">
                <span className="block animate-word-up text-[clamp(1rem,0.8rem+0.8vw,1.5rem)] font-normal tracking-[0.02em] text-gold [animation-delay:0.1s]">
                  {t.brand}
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <span className="block animate-word-up text-[clamp(2.3rem,1.1rem+4.6vw,5.4rem)] [animation-delay:0.2s]">{t.lineA}</span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
                <span className="block animate-word-up text-[clamp(2.3rem,1.1rem+4.6vw,5.4rem)] [animation-delay:0.3s]">
                  {t.lineB} <span className="text-gold-gradient font-normal">{t.accent}</span>
                </span>
              </span>
            </h1>
            <p className="mt-6 max-w-[500px] animate-fade-up text-[15px] leading-relaxed text-steel sm:text-base [animation-delay:0.6s]">{t.sub}</p>
            <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:0.75s]">
              <Magnetic>
                <Button asChild size="lg" data-cursor="→">
                  <NavLink href={`/${locale}/projects`}>
                    {t.ctaPrimary}
                    <ArrowUpRight />
                    <ButtonShimmer />
                  </NavLink>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild size="lg" variant="glass">
                  <NavLink href={`/${locale}#contact`}>
                    <CalendarClock className="text-cyan" />
                    {t.ctaSecondary}
                  </NavLink>
                </Button>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* ── Construction stages (appear once building starts) */}
        <div data-hero-stages className="invisible absolute top-1/2 left-5 z-10 w-[min(340px,calc(100%-2.5rem))] -translate-y-1/2 sm:left-8 lg:left-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          <p className="font-mono text-[10px] tracking-[0.24em] text-cyan uppercase">{t.bim}</p>
          <ol className="mt-5 space-y-2">
            {t.stages.map((s, i) => (
              <li
                key={s.key}
                ref={(el) => {
                  stageEls.current[i] = el;
                }}
                data-state="todo"
                className="group glass flex items-start gap-4 rounded-2xl p-4 transition-all duration-500 data-[state=active]:border-gold/50 data-[state=active]:bg-gold/[0.07] data-[state=todo]:opacity-45"
              >
                <span className="font-sharp mt-0.5 text-2xl leading-none font-extralight text-steel group-data-[state=active]:text-gold group-data-[state=done]:text-cyan">
                  0{i + 1}
                </span>
                <span>
                  <span className="font-sharp block text-lg leading-tight text-mist">{s.title}</span>
                  <span className="mt-1 block text-xs text-steel">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* ── Finale card */}
        <div data-hero-finale className="invisible absolute bottom-28 left-5 z-10 w-[min(420px,calc(100%-2.5rem))] sm:left-8 lg:bottom-auto lg:top-1/2 lg:left-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:-translate-y-1/2">
          <div className="glass-strong rounded-3xl p-6">
            <p className="font-mono text-[10px] tracking-[0.24em] text-cyan uppercase">{t.stages[3].title} · 100%</p>
            <h2 className="font-sharp mt-3 text-4xl font-light text-mist">{finale.name}</h2>
            <p className="mt-2 text-sm text-steel">{finale.meta}</p>
            <Button asChild className="mt-6">
              <NavLink href={`/${locale}/projects`}>
                {finale.cta} <ArrowUpRight />
                <ButtonShimmer />
              </NavLink>
            </Button>
          </div>
        </div>

        {/* ── HUD metrics */}
        <div className="pointer-events-none absolute inset-x-4 bottom-20 z-20 grid grid-cols-3 gap-2 lg:inset-x-auto lg:top-28 lg:right-6 lg:bottom-auto lg:w-[220px] lg:grid-cols-1 lg:gap-3">
          {t.metrics.map((m) => (
            <div key={m.label} data-hud className="glass invisible relative overflow-hidden rounded-2xl p-3 lg:p-4">
              <span className="absolute top-2 left-2 h-2 w-2 border-t border-l border-cyan/60" />
              <span className="absolute right-2 bottom-2 h-2 w-2 border-r border-b border-gold/60" />
              <p className="font-sharp text-lg leading-none font-light text-mist tabular-nums lg:text-3xl">
                {m.prefix}
                <span data-count={m.value} data-decimals={m.decimals}>
                  {m.value.toFixed(m.decimals)}
                </span>
                <span className="text-gold">{m.suffix}</span>
              </p>
              <p className="mt-1.5 font-mono text-[8.5px] leading-tight tracking-[0.14em] text-steel uppercase lg:text-[10px]">{m.label}</p>
            </div>
          ))}
        </div>

        {/* ── Build progress rail */}
        <div className="absolute inset-x-4 bottom-5 z-20 lg:inset-x-auto lg:right-6 lg:bottom-8 lg:left-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          <div className="glass flex items-center gap-4 rounded-2xl px-4 py-3">
            <div className="flex shrink-0 gap-4 font-mono text-[10px] tracking-[0.12em] text-steel uppercase sm:gap-6">
              <span>
                {t.readouts.height} <span ref={heightEl} className="text-mist tabular-nums">+0.0</span> m
              </span>
              <span className="hidden sm:inline">
                {t.readouts.floor} <span ref={floorEl} className="text-mist tabular-nums">00/48</span>
              </span>
            </div>
            <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-titanium-800">
              <div ref={bar} className="absolute inset-0 origin-left scale-x-0 rounded-full bg-gradient-to-r from-cyan via-cyan to-gold shadow-[0_0_12px_#00f0ff]" />
              {[0.1, 0.55, 0.86].map((m) => (
                <span key={m} className="absolute top-0 h-full w-px bg-obsidian-900" style={{ left: `${m * 100}%` }} />
              ))}
            </div>
            <span ref={pctEl} className="w-10 text-right font-mono text-[11px] text-gold tabular-nums">
              0%
            </span>
          </div>
        </div>

        <div
          data-hero-hint
          className={cn(
            "pointer-events-none absolute bottom-24 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-cyan uppercase lg:flex",
          )}
        >
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          {t.scrollHint}
        </div>
      </div>
    </section>
  );
}
