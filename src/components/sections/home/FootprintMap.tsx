"use client";

import { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MapPinned, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { NavLink } from "@/components/layout/NavLink";
import { PROJECTS } from "@/data/projects";
import type { MapSite } from "@/components/three/UzMap3D";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn, formatNumber } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/uz";

const MapStage = dynamic(() => import("@/components/three/MapStage"), {
  ssr: false,
  loading: () => <div className="bg-blueprint absolute inset-0" />,
});

type T = { map: Dictionary["map"]; common: Dictionary["common"]; text: Dictionary["projectsText"] };

export function FootprintMap({ t, locale }: { t: T; locale: string }) {
  const [mode, setMode] = useState<"country" | "city">("country");
  const [active, setActive] = useState<string | null>(null);
  const pinsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const sites: MapSite[] = useMemo(
    () => PROJECTS.map((p) => ({ id: p.id, lat: p.lat, lon: p.lon, status: p.status, inTashkent: p.cityId === "tashkent" })),
    [],
  );
  const visible = sites.filter((s) => mode === "country" || s.inTashkent);
  const counts = {
    completed: visible.filter((s) => s.status === "completed").length,
    ongoing: visible.filter((s) => s.status === "ongoing").length,
  };
  const project = PROJECTS.find((p) => p.id === active);

  return (
    <section id="map" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading index="04" eyebrow={t.map.eyebrow} title={t.map.title} accent={t.map.accent} description={t.map.description} />
          <div role="radiogroup" className="glass-strong inline-flex self-start rounded-full p-1 lg:self-auto">
            {(["country", "city"] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={mode === m}
                onClick={() => {
                  setMode(m);
                  setActive(null);
                }}
                className={cn("relative isolate rounded-full px-5 py-2 text-sm transition-colors", mode === m ? "text-obsidian-900" : "text-steel hover:text-mist")}
              >
                {mode === m && (
                  <motion.span layoutId="map-mode" className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-[#f3dc9f] to-gold" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                )}
                {t.map.modes[m]}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-12 h-[460px] overflow-hidden rounded-[28px] border border-line bg-[radial-gradient(ellipse_at_50%_40%,#111827,#06080d_75%)] sm:h-[600px]">
          <MapStage mode={mode} sites={sites} active={active} pinsRef={pinsRef} reducedMotion={reduced} />

          {/* DOM pins (projected by the scene) */}
          <div ref={pinsRef} className="pointer-events-none absolute inset-0 overflow-hidden">
            {sites.map((s) => (
              <button
                key={s.id}
                type="button"
                data-pin={s.id}
                onClick={() => setActive((a) => (a === s.id ? null : s.id))}
                aria-label={t.text[s.id].name}
                className="group absolute top-0 left-0 opacity-0 transition-opacity duration-300"
              >
                <span
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-2 py-1 font-mono text-[9.5px] tracking-[0.1em] whitespace-nowrap uppercase backdrop-blur-md transition-all duration-300",
                    active === s.id
                      ? "border-gold bg-gold text-obsidian-900"
                      : s.status === "completed"
                        ? "border-gold/40 bg-obsidian-900/70 text-gold-soft group-hover:border-gold"
                        : "border-cyan/40 bg-obsidian-900/70 text-cyan-soft group-hover:border-cyan",
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full", s.status === "completed" ? "bg-gold" : "bg-cyan")} />
                  <span className="hidden max-w-0 overflow-hidden transition-all duration-500 group-hover:max-w-[180px] sm:inline-block">{t.text[s.id].name}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="glass pointer-events-none absolute top-4 left-4 rounded-2xl px-4 py-3">
            <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-steel uppercase">
              <MapPinned className="h-3.5 w-3.5 text-cyan" /> {t.map.modes[mode]}
            </p>
            <div className="mt-2 flex gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-gold-soft">
                <span className="h-2 w-2 rounded-full bg-gold" /> {t.map.legend.completed} · {counts.completed}
              </span>
              <span className="flex items-center gap-1.5 text-cyan-soft">
                <span className="h-2 w-2 rounded-full bg-cyan" /> {t.map.legend.ongoing} · {counts.ongoing}
              </span>
            </div>
            <p className="mt-2 font-mono text-[9px] tracking-wider text-slate uppercase">{t.common.sample}</p>
          </div>

          {/* Selected site */}
          <AnimatePresence>
            {project && (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                className="glass-strong absolute right-4 bottom-4 w-[min(320px,calc(100%-2rem))] rounded-2xl p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className={cn("font-mono text-[10px] tracking-[0.18em] uppercase", project.status === "ongoing" ? "text-cyan" : "text-gold")}>
                      ● {t.common.status[project.status]} · {t.common.types[project.type]}
                    </p>
                    <h3 className="font-sharp mt-2 text-xl font-light text-mist">{t.text[project.id].name}</h3>
                    <p className="text-xs text-steel">{t.text[project.id].location}</p>
                  </div>
                  <button type="button" onClick={() => setActive(null)} aria-label="Yopish" className="rounded-full border border-line p-1.5 text-steel hover:text-mist">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="mt-3 text-sm text-steel">{t.text[project.id].summary}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-mono text-xs text-mist">
                    {formatNumber(project.areaM2)} m² · {project.year}
                  </span>
                  <NavLink href={`/${locale}/projects`} className="flex items-center gap-1 text-sm text-cyan hover:text-cyan-soft">
                    {t.map.open} <ArrowUpRight className="h-4 w-4" />
                  </NavLink>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
