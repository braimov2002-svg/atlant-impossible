"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown, ArrowUpRight, Calculator, MapPin, Sprout, X } from "lucide-react";
import { Button, ButtonShimmer } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { HudMetric } from "./HudMetric";
import { SensorFeed } from "./SensorFeed";
import { RotatingWord } from "./RotatingWord";
import { GlobeFallback } from "./GlobeFallback";
import { REGIONS, type RegionId } from "@/lib/regions";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/uz";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HeroGlobe = dynamic(() => import("./HeroGlobe"), {
  ssr: false,
  loading: () => <GlobeFallback />,
});

export function Hero({ t }: { t: Dictionary["hero"] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const [active, setActive] = useState<RegionId | null>(null);
  const [hovered, setHovered] = useState<RegionId | null>(null);
  const reduced = useReducedMotion();

  const activeRegion = REGIONS.find((r) => r.id === active) ?? null;
  const toggleRegion = (id: RegionId) => setActive((cur) => (cur === id ? null : id));

  useGSAP(
    () => {
      // ── Intro timeline: HUD tiles fly in, then counters, bars and rings fill.
      const tl = gsap.timeline({ delay: 0.9, defaults: { ease: "expo.out" } });
      tl.fromTo(
        "[data-hud]",
        { autoAlpha: 0, y: 36, scale: 0.94, filter: "blur(10px)" },
        { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.3, stagger: 0.12 },
      );
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const decimals = Number(el.dataset.decimals ?? 0);
        const counter = { v: 0 };
        tl.to(
          counter,
          {
            v: end,
            duration: 2.2,
            ease: "power3.out",
            onUpdate: () => {
              el.textContent = decimals
                ? counter.v.toFixed(decimals)
                : Math.round(counter.v).toLocaleString("en-US").replace(/,/g, " ");
            },
          },
          0.35,
        );
      });
      tl.from("[data-hud-bar]", { scaleY: 0, duration: 1.2, stagger: 0.04 }, 0.4);
      tl.from("[data-hud-ring]", { strokeDashoffset: 2 * Math.PI * 16, duration: 2 }, 0.4);
      tl.from("[data-hud-line]", { strokeDashoffset: 1, duration: 1.8 }, 0.4);

      // Idle float on HUDs (desynchronised)
      if (!reduced) {
        gsap.utils.toArray<HTMLElement>("[data-hud-float]").forEach((el, i) => {
          gsap.to(el, { y: i % 2 ? 10 : -10, duration: 3.5 + i * 0.6, yoyo: true, repeat: -1, ease: "sine.inOut" });
        });
      }

      // ── Scroll-out: feeds the globe (rotate / rise / shrink) and lifts the copy.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
        },
      });
      gsap.to(contentRef.current, {
        yPercent: -18,
        autoAlpha: 0.1,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  const words = [
    ...t.headlineLead.split(" ").map((w) => ({ w, accent: false })),
    { w: t.headlineAccent, accent: true },
    ...t.headlineJoin.split(" ").map((w) => ({ w, accent: false })),
  ];

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative isolate overflow-hidden pb-[430px] sm:pb-[500px] lg:min-h-[100svh] lg:pb-0"
    >
      {/* ── 3D globe layer */}
      <div className="absolute inset-x-0 bottom-0 h-[620px] sm:h-[700px] lg:inset-0 lg:h-auto">
        <HeroGlobe
          className="h-full w-full"
          activeRegion={active}
          hoveredRegion={hovered}
          onRegionHover={setHovered}
          onRegionSelect={toggleRegion}
          scrollProgress={scrollProgress}
          reducedMotion={reduced}
          labelsRef={labelsRef}
        />
        {/* Region labels — positioned every frame by <AgroGlobe /> */}
        <div ref={labelsRef} aria-hidden className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
          {REGIONS.map((r) => {
            const on = active === r.id || r.hq;
            return (
              <div key={r.id} data-region-label={r.id} className="absolute top-0 left-0 opacity-0 will-change-transform">
                <span
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] whitespace-nowrap uppercase backdrop-blur-md transition-colors duration-500",
                    on ? "border-gold/50 bg-forest-950/75 text-gold-soft" : "border-lime/40 bg-forest-950/75 text-lime-soft",
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full", on ? "bg-gold" : "bg-lime")} />
                  {r.name}
                  {r.hq && <span className="text-sage">· HQ</span>}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legibility veils */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#0a1a12_0%,rgb(10_26_18/0.85)_28%,rgb(10_26_18/0)_58%)] max-lg:bg-[linear-gradient(180deg,#0a1a12_0%,rgb(10_26_18/0.9)_42%,rgb(10_26_18/0)_62%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-forest-950 to-transparent" />

      {/* ── Copy */}
      <div
        ref={contentRef}
        className="pointer-events-none relative z-10 mx-auto flex max-w-7xl flex-col justify-start px-5 pt-28 sm:px-8 lg:min-h-[100svh] lg:justify-center lg:pt-24"
      >
        <div className="pointer-events-auto max-w-[660px]">
          <p className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-emerald-line bg-forest-900/60 py-1.5 pr-4 pl-2 font-mono text-[9px] tracking-[0.1em] whitespace-nowrap text-sage uppercase backdrop-blur-md [animation-delay:0.1s] sm:text-[10.5px] sm:tracking-[0.16em]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime/15 text-lime">
              <Sprout className="h-3 w-3" />
            </span>
            {t.eyebrow}
          </p>

          <h1 className="mt-6 font-display text-[clamp(1.85rem,0.9rem+3.3vw,3.9rem)] leading-[1.06] font-normal tracking-[-0.035em] text-balance text-mist">
            {words.map(({ w, accent }, i) => (
              <span key={i} className="inline-block overflow-hidden pr-[0.26em] pb-[0.08em] align-bottom">
                <span
                  className={cn("inline-block animate-word-up", accent && "text-gold-gradient")}
                  style={{ animationDelay: `${0.15 + i * 0.07}s` }}
                >
                  {w}
                </span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="inline-block animate-word-up" style={{ animationDelay: `${0.15 + words.length * 0.07}s` }}>
                <RotatingWord words={t.rotating} />
              </span>
            </span>
          </h1>

          <p className="mt-6 max-w-[540px] animate-fade-up text-[15px] leading-relaxed text-sage sm:text-base [animation-delay:0.75s]">
            {t.sub}
          </p>

          <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:0.9s]">
            <Magnetic>
              <Button asChild size="lg" data-cursor="→">
                <a href="#contact">
                  {t.ctaPrimary}
                  <ArrowUpRight />
                  <ButtonShimmer />
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild size="lg" variant="glass">
                <a href="#calculator">
                  <Calculator className="text-lime" />
                  {t.ctaSecondary}
                </a>
              </Button>
            </Magnetic>
          </div>

          {/* Region selector — drives the globe */}
          <div className="mt-10 animate-fade-up [animation-delay:1.05s]">
            <p className="mb-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-moss uppercase">
              <MapPin className="h-3 w-3 text-lime" /> {t.regionHint}
            </p>
            <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [mask-image:linear-gradient(90deg,transparent,#000_20px,#000_calc(100%-40px),transparent)] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:[mask-image:none]">
              {REGIONS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => toggleRegion(r.id)}
                  onMouseEnter={() => setHovered(r.id)}
                  onMouseLeave={() => setHovered(null)}
                  aria-pressed={active === r.id}
                  className={cn(
                    "shrink-0 rounded-full border px-3 py-1.5 text-xs transition-all duration-500 ease-[var(--ease-out-expo)]",
                    active === r.id
                      ? "border-gold/70 bg-gold/15 text-gold-soft shadow-[0_0_24px_-6px_rgb(212_175_55/0.7)]"
                      : "border-emerald-line bg-forest-900/50 text-sage backdrop-blur hover:border-lime/50 hover:text-mist",
                  )}
                >
                  {r.hq && <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-gold align-middle" />}
                  {r.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop HUD layer */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-20 hidden transition-opacity duration-700 lg:block",
          active && "opacity-20",
        )}
      >
        <div data-hud-float className="absolute top-[17%] right-[3%]">
          <HudMetric {...t.metrics[0]} className="invisible" />
        </div>
        <div data-hud-float className="absolute top-[19%] left-[53%]">
          <HudMetric {...t.metrics[2]} className="invisible" />
        </div>
        <div data-hud-float className="absolute right-[5%] bottom-[13%]">
          <HudMetric {...t.metrics[1]} className="invisible" />
        </div>
        <div data-hud-float className="absolute bottom-[9%] left-[50%]">
          <SensorFeed t={t.sensor} className="invisible" />
        </div>
      </div>

      {/* ── Region detail panel */}
      <AnimatePresence>
        {activeRegion && (
          <motion.aside
            key={activeRegion.id}
            initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 30, filter: "blur(8px)" }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            className="glass-strong absolute right-4 bottom-28 z-30 w-[min(320px,calc(100%-2rem))] rounded-2xl p-5 lg:top-[42%] lg:right-[3%] lg:bottom-auto"
            aria-live="polite"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-lime uppercase">
                  {activeRegion.lat.toFixed(2)}°N · {activeRegion.lon.toFixed(2)}°E
                </p>
                <h2 className="mt-1.5 font-display text-xl text-mist">{activeRegion.name}</h2>
                <p className="text-xs text-moss">{activeRegion.center}</p>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="rounded-full border border-emerald-line p-1.5 text-sage transition hover:border-lime/50 hover:text-mist"
                aria-label={t.close}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-mist/90">{activeRegion.focus}</p>
            <p className="mt-4 font-mono text-[10px] tracking-[0.18em] text-sage uppercase">{t.cropsLabel}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {activeRegion.crops.map((c) => (
                <span key={c} className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-xs text-gold-soft">
                  {c}
                </span>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Mobile / tablet metrics strip */}
      <div className="absolute inset-x-0 bottom-5 z-20 grid grid-cols-3 gap-2 px-4 lg:hidden">
        {t.metrics.map((m) => (
          <HudMetric key={m.label} {...m} compact className="invisible" />
        ))}
      </div>

      {/* Hints */}
      <a
        href="#services"
        aria-label={t.scroll}
        className="absolute bottom-8 left-6 z-20 hidden h-9 w-5 justify-center rounded-full border border-emerald-line pt-1.5 transition hover:border-lime/60 xl:flex"
      >
        <ArrowDown className="h-3 w-3 animate-bounce text-lime" />
      </a>
      <p className="pointer-events-none absolute right-8 bottom-4 z-20 hidden font-mono text-[10px] tracking-[0.2em] text-moss uppercase lg:block">
        ⟲ {t.dragHint}
      </p>
    </section>
  );
}
