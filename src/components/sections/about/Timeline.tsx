"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MapPin } from "lucide-react";
import globeData from "@/components/three/data/globe-data.json";
import { CITIES } from "@/data/projects";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/uz";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type T = Dictionary["aboutPage"];

/* Uzbekistan outline → SVG (equirectangular with cos(lat) correction) */
const BOX = { lonMin: 55.8, lonMax: 73.3, latMin: 37.0, latMax: 45.7 };
const W = 600;
const SX = W / ((BOX.lonMax - BOX.lonMin) * Math.cos((41.3 * Math.PI) / 180));
const H = Math.round((BOX.latMax - BOX.latMin) * SX);
const px = (lat: number, lon: number) => [(lon - BOX.lonMin) * Math.cos((41.3 * Math.PI) / 180) * SX, (BOX.latMax - lat) * SX] as const;
const OUTLINE = globeData.uzOutline.map((ring) => ring.map(([lon, lat], i) => `${i ? "L" : "M"}${px(lat, lon).map((v) => v.toFixed(1)).join(" ")}`).join(" ") + "Z").join(" ");

/**
 * Corporate footprint timeline.
 *  • each milestone owns a ScrollTrigger (center line) → becomes "active"
 *  • a spine fills with scroll (scrub) and the sticky map lights every city
 *    reached so far; the newest cities pulse cyan
 */
export function Timeline({ t, cityNames, sample }: { t: T; cityNames: Record<string, string>; sample: string }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const ms = t.milestones;

  const lit = useMemo(() => {
    const set = new Set<string>(["tashkent"]);
    ms.slice(0, active + 1).forEach((m) => m.cities.forEach((c) => set.add(c)));
    return set;
  }, [active, ms]);
  const fresh = new Set(ms[active].cities);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-spine]",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-milestones]", start: "top 55%", end: "bottom 55%", scrub: true } },
      );
      gsap.utils.toArray<HTMLElement>("[data-milestone]").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(i),
        });
        gsap.fromTo(el, { autoAlpha: 0.3, x: 30 }, { autoAlpha: 1, x: 0, ease: "none", scrollTrigger: { trigger: el, start: "top 85%", end: "top 55%", scrub: true } });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-12">
        {/* ── Sticky footprint panel */}
        <div className="lg:col-span-5">
          <div className="glass-strong sticky top-24 z-10 overflow-hidden rounded-[28px] p-5 sm:p-6 lg:top-28">
            <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-50" />
            <div className="relative flex items-end justify-between">
              <div>
                <p className="font-mono text-[10px] tracking-[0.22em] text-cyan uppercase">{t.footprint}</p>
                <div className="relative mt-2 h-[3.5rem] overflow-hidden sm:h-[4.5rem]">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.p
                      key={ms[active].year}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                      className="font-sharp text-5xl leading-none font-extralight text-mist sm:text-7xl"
                    >
                      {ms[active].year}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
              <p className="text-right font-mono text-xs text-steel">
                <span className="font-sharp block text-3xl font-light text-gold">{lit.size}</span>
                / {CITIES.length}
              </p>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="relative mt-4 w-full" aria-hidden>
              <path d={OUTLINE} fill="rgb(0 240 255 / 0.04)" stroke="#e2b859" strokeWidth="1.2" strokeLinejoin="round" />
              {CITIES.map((c) => {
                const [x, y] = px(c.lat, c.lon);
                const on = lit.has(c.id);
                const isNew = fresh.has(c.id);
                return (
                  <g key={c.id}>
                    {isNew && (
                      <circle cx={x} cy={y} r="6" fill="none" stroke="#00f0ff" strokeWidth="1.5">
                        <animate attributeName="r" from="6" to="26" dur="1.8s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.9" to="0" dur="1.8s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle
                      cx={x}
                      cy={y}
                      r={c.id === "tashkent" ? 7 : 5}
                      fill={isNew ? "#00f0ff" : on ? "#e2b859" : "#334155"}
                      style={{ transition: "fill 0.6s var(--ease-out-expo)" }}
                    />
                    <text x={x + 10} y={y + 4} fontSize="15" fill={on ? "#e6edf5" : "#64748b"} style={{ transition: "fill 0.6s" }} fontFamily="var(--font-onest)">
                      {cityNames[c.id]}
                    </text>
                  </g>
                );
              })}
            </svg>
            <p className="relative mt-3 font-mono text-[9.5px] tracking-[0.16em] text-slate uppercase">{t.timelineHint}</p>
          </div>
        </div>

        {/* ── Milestones */}
        <div className="relative lg:col-span-7" data-milestones>
          <h2 className="font-sharp text-3xl font-light text-mist sm:text-4xl">{t.timelineTitle}</h2>
          <div className="relative mt-10 pl-10 sm:pl-14">
            <div className="absolute top-0 bottom-0 left-3 w-px bg-titanium-700 sm:left-5" />
            <div data-spine className="absolute top-0 bottom-0 left-3 w-px origin-top bg-gradient-to-b from-gold via-cyan to-cyan shadow-[0_0_12px_#00f0ff] sm:left-5" />
            <ol className="space-y-6">
              {ms.map((m, i) => (
                <li key={m.year} data-milestone className="relative">
                  <span
                    className={cn(
                      "absolute top-7 -left-10 flex h-6 w-6 -translate-x-[1px] items-center justify-center rounded-full border transition-all duration-500 sm:-left-14 sm:translate-x-[7px]",
                      i === active ? "scale-110 border-cyan bg-cyan/20 shadow-[0_0_20px_#00f0ff]" : i < active ? "border-gold bg-gold/20" : "border-line bg-obsidian-900",
                    )}
                  >
                    <span className={cn("h-2 w-2 rounded-full", i <= active ? (i === active ? "bg-cyan" : "bg-gold") : "bg-titanium-600")} />
                  </span>
                  <article
                    className={cn(
                      "rounded-3xl border p-6 transition-all duration-500",
                      i === active ? "glass-strong border-gold/40" : "border-line bg-obsidian-850/40",
                    )}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <p className={cn("font-sharp text-4xl font-extralight transition-colors", i === active ? "text-gold" : "text-steel")}>{m.year}</p>
                      <span className="font-mono text-[9px] tracking-wider text-slate uppercase">{sample}</span>
                    </div>
                    <h3 className="font-sharp mt-3 text-xl font-light text-mist sm:text-2xl">{m.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-steel">{m.text}</p>
                    {m.cities.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {m.cities.map((c) => (
                          <li key={c} className="flex items-center gap-1 rounded-full border border-cyan/30 bg-cyan/5 px-2.5 py-1 text-xs text-cyan-soft">
                            <MapPin className="h-3 w-3" /> {cityNames[c]}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
