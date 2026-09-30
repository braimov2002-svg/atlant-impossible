"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, CalendarClock } from "lucide-react";
import { Button, ButtonShimmer } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { NavLink } from "@/components/layout/NavLink";
import { createSequencePlayer, type SequencePlayer } from "@/components/sequence/player";
import { CHAPTER_STARTS, PORTRAIT_QUERY, SEQUENCES, chapterAt, frameUrl } from "@/lib/sequence";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Dictionary } from "@/i18n/dictionaries/uz";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function subscribePortrait(cb: () => void) {
  const mq = window.matchMedia(PORTRAIT_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const usePortrait = () =>
  useSyncExternalStore(
    subscribePortrait,
    () => window.matchMedia(PORTRAIT_QUERY).matches,
    () => false,
  );

const smooth = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * Scroll-scrubbed construction film (the "Belvédère" pattern): a sticky stage
 * plays a pre-rendered image sequence — empty plot → foundations → concrete
 * frame → façade → landscaping → into the apartment — while a fixed headline,
 * a chapter label and project facts sit over it.
 */
export function SequenceHero({ t, locale }: { t: Dictionary["hero"]; locale: string }) {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const player = useRef<SequencePlayer | null>(null);
  const progress = useRef(0);
  const bar = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const endVeil = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState(0);
  const [live, setLive] = useState(false);
  const portrait = usePortrait();
  const reduced = useReducedMotion();
  const source = portrait ? SEQUENCES.portrait : SEQUENCES.landscape;

  // (Re)create the player whenever the cut changes (rotation / resize across 4:5).
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const p = createSequencePlayer(el, source, { saveData: !!conn?.saveData, onFirstDraw: () => setLive(true) });
    p.setProgress(progress.current);
    player.current = p;
    const ro = new ResizeObserver(() => p.resize());
    ro.observe(el);
    return () => {
      ro.disconnect();
      p.destroy();
      player.current = null;
    };
  }, [source]);

  useGSAP(
    () => {
      const proxy = { p: 0 };
      gsap.to(proxy, {
        p: 1,
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "top top", end: "bottom bottom", scrub: 0.45 },
        onUpdate: () => {
          const p = proxy.p;
          progress.current = p;
          player.current?.setProgress(p);
          setChapter(chapterAt(p));
          if (bar.current) bar.current.style.transform = `scaleX(${p})`;
          if (hint.current) hint.current.style.opacity = String(1 - smooth(0.005, 0.04, p));
          if (endVeil.current) endVeil.current.style.opacity = String(smooth(0.94, 1, p) * 0.9);
        },
      });

      // Project facts count up once, like a site board coming to life.
      const nums = gsap.utils.toArray<HTMLElement>("[data-count]");
      nums.forEach((el) => {
        const end = Number(el.dataset.count);
        if (reduced) {
          el.textContent = String(end);
          return;
        }
        const o = { v: 0 };
        gsap.to(o, { v: end, duration: 2.4, delay: 0.5, ease: "power3.out", onUpdate: () => (el.textContent = String(Math.round(o.v))) });
      });
    },
    { scope: section, dependencies: [reduced] },
  );

  const current = t.chapters[chapter];

  return (
    <section id="top" ref={section} className="relative h-[440vh] lg:h-[520vh]" aria-label={`${t.titleA} ${t.titleB}`}>
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-obsidian-950">
        {/* First frame as a real <img>: paints before JS, then the canvas takes over on top. */}
        <picture>
          <source media={PORTRAIT_QUERY} srcSet={frameUrl(SEQUENCES.portrait, 0)} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={frameUrl(SEQUENCES.landscape, 0)}
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>
        <canvas
          ref={canvas}
          aria-hidden
          className="absolute inset-0 h-full w-full transition-opacity duration-500"
          style={{ opacity: live ? 1 : 0 }}
        />

        {/* Legibility veils */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-black/80 via-black/35 to-transparent lg:h-[58%]" />
        <div ref={endVeil} className="pointer-events-none absolute inset-0 bg-obsidian-900 opacity-0" />

        {/* ── Chapter label */}
        <div className="absolute top-24 left-5 z-10 flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-white uppercase sm:left-8 lg:top-28 lg:left-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-gold/70" />
            <span className="relative h-2 w-2 rounded-full bg-gold" />
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={current.key}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {current.label}
            </motion.span>
          </AnimatePresence>
          <span className="text-white/45 tabular-nums">
            {String(chapter + 1).padStart(2, "0")} / {String(t.chapters.length).padStart(2, "0")}
          </span>
        </div>
        <p className="absolute top-24 right-5 z-10 hidden font-mono text-[10px] tracking-[0.18em] text-white/55 uppercase sm:right-8 sm:block lg:top-28 lg:right-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {t.sample}
        </p>

        {/* ── Headline + facts */}
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 pb-9 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:pb-14">
            <div className="max-w-[920px]">
              <p className="animate-fade-up font-mono text-[10.5px] tracking-[0.26em] text-gold uppercase [animation-delay:0.1s]">{t.eyebrow}</p>
              <h1 className="font-sharp mt-3 text-[clamp(2rem,0.8rem+3.7vw,4.7rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-white">
                <span className="block overflow-hidden pb-[0.04em]">
                  <span className="block animate-word-up [animation-delay:0.15s]">{t.titleA}</span>
                </span>
                <span className="block overflow-hidden pb-[0.06em]">
                  <span className="block animate-word-up [animation-delay:0.25s]">{t.titleB}</span>
                </span>
              </h1>
              <div className="mt-4 min-h-[4.5em] max-w-[460px] text-[13px] leading-relaxed text-white/80 sm:text-[15px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={current.key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {current.text}
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="mt-5 flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:0.5s]">
                <Magnetic>
                  <Button asChild size="lg" data-cursor="→" className="max-sm:h-11 max-sm:px-6 max-sm:text-sm">
                    <NavLink href={`/${locale}/projects`}>
                      {t.ctaPrimary}
                      <ArrowUpRight />
                      <ButtonShimmer />
                    </NavLink>
                  </Button>
                </Magnetic>
                <Magnetic className="max-sm:hidden">
                  <Button asChild size="lg" variant="glass">
                    <NavLink href={`/${locale}#contact`}>
                      <CalendarClock className="text-gold" />
                      {t.ctaSecondary}
                    </NavLink>
                  </Button>
                </Magnetic>
              </div>
            </div>

            <dl className="grid grid-cols-4 gap-3 sm:gap-6 lg:flex lg:gap-0">
              {t.facts.map((f) => (
                <div key={f.label} className="flex flex-col-reverse lg:items-end lg:px-6 lg:last:pr-0 lg:[&+&]:border-l lg:[&+&]:border-white/20">
                  <dt className="mt-1.5 font-mono text-[8.5px] leading-tight tracking-[0.16em] text-white/65 uppercase sm:text-[10px]">{f.label}</dt>
                  <dd className="font-sharp text-[1.6rem] leading-none font-semibold tracking-[-0.03em] text-white tabular-nums sm:text-4xl">
                    {"value" in f ? (
                      <span data-count={f.value}>{f.value}</span>
                    ) : (
                      <span className="inline-flex h-[1em] min-w-[1em] items-center justify-center rounded-[0.18em] bg-[#3fae49] px-[0.18em] text-[0.8em]">
                        {f.text}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Scroll progress with chapter ticks */}
          <div className="relative h-[2px] bg-white/15">
            <div ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-gold" />
            {CHAPTER_STARTS.slice(1).map((c) => (
              <span key={c} className="absolute top-0 h-full w-[2px] bg-black/60" style={{ left: `${c * 100}%` }} />
            ))}
          </div>
        </div>

        {/* ── Scroll hint */}
        <div
          ref={hint}
          className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.32em] text-white/85 uppercase lg:flex"
        >
          {t.scrollHint}
          <span className="relative h-9 w-px overflow-hidden bg-white/25">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-line bg-white" />
          </span>
        </div>
      </div>
    </section>
  );
}
