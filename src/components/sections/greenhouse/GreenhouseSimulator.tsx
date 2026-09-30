"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { Cpu, Droplets, Fan, Move3d, RotateCcw, Sun } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HotspotId } from "@/components/three/GreenhouseScene";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_OUT_EXPO, fadeUp, inViewOnce, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/uz";

const GreenhouseCanvas = dynamic(() => import("./GreenhouseCanvas"), {
  ssr: false,
  loading: () => <div className="bg-field-grid absolute inset-0 animate-pulse" />,
});

const ICONS: Record<HotspotId, React.ComponentType<{ className?: string }>> = {
  climate: Fan,
  drip: Droplets,
  sensors: Cpu,
  solar: Sun,
};

export function GreenhouseSimulator({ t }: { t: Dictionary["greenhouse"] }) {
  const [active, setActive] = useState<HotspotId | null>(null);
  const [hovered, setHovered] = useState<HotspotId | null>(null);
  const markersRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const shown = hovered ?? active;
  const spots = t.hotspots as { id: HotspotId; title: string; body: string; specs: string[] }[];
  const detail = spots.find((h) => h.id === shown);
  const toggle = (id: HotspotId) => setActive((cur) => (cur === id ? null : id));

  return (
    <section id="greenhouse" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="02" eyebrow={t.eyebrow} title={t.title} accent={t.titleAccent} description={t.description} />

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* ── 3D viewport */}
          <motion.div
            initial={{ opacity: 0, y: 40, clipPath: "inset(8% 8% 8% 8% round 28px)" }}
            whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 28px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
            className="relative h-[440px] overflow-hidden rounded-[28px] border border-emerald-line sm:h-[560px] lg:col-span-8 lg:h-[640px]"
            data-cursor={t.dragHint}
          >
            <GreenhouseCanvas active={active} markersRef={markersRef} reducedMotion={reduced} />

            {/* Hotspot markers — positioned each frame by the scene */}
            <div ref={markersRef} className="pointer-events-none absolute inset-0 overflow-hidden">
              {spots.map((h, i) => (
                <button
                  key={h.id}
                  type="button"
                  data-hotspot={h.id}
                  onClick={() => toggle(h.id)}
                  onMouseEnter={() => setHovered(h.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(h.id)}
                  onBlur={() => setHovered(null)}
                  aria-label={h.title}
                  aria-pressed={active === h.id}
                  className="group pointer-events-auto absolute top-0 left-0 opacity-0 transition-opacity duration-300"
                >
                  <span
                    className={cn(
                      "absolute inset-0 rounded-full",
                      shown === h.id ? "bg-gold/50" : "bg-lime/40",
                      !reduced && "animate-pulse-ring",
                    )}
                  />
                  <span
                    className={cn(
                      "relative flex h-8 w-8 items-center justify-center rounded-full border font-mono text-[11px] backdrop-blur-md transition-all duration-500",
                      shown === h.id
                        ? "scale-110 border-gold bg-gold text-forest-950"
                        : "border-lime/60 bg-forest-950/70 text-lime group-hover:border-lime",
                    )}
                  >
                    0{i + 1}
                  </span>
                </button>
              ))}
            </div>

            {/* Viewport chrome */}
            <div className="pointer-events-none absolute top-4 left-4 flex items-center gap-2 rounded-full border border-emerald-line bg-forest-950/60 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-sage uppercase backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
              {t.specLabel}
            </div>
            <div className="pointer-events-none absolute bottom-4 left-4 hidden items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-moss uppercase sm:flex">
              <Move3d className="h-3.5 w-3.5 text-lime" />
              {t.dragHint}
            </div>
            {active && (
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 flex items-center gap-2 rounded-full border border-emerald-line bg-forest-950/70 px-3 py-1.5 text-xs text-sage backdrop-blur-md transition hover:border-lime/50 hover:text-mist"
              >
                <RotateCcw className="h-3.5 w-3.5" /> {t.reset}
              </button>
            )}

            {/* Floating detail card (desktop: over the scene) */}
            <AnimatePresence mode="wait">
              {detail && (
                <motion.div
                  key={detail.id}
                  initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                  className="glass-strong pointer-events-none absolute right-4 bottom-4 hidden w-[320px] rounded-2xl p-5 md:block"
                >
                  <DetailBody spot={detail} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Feature list (synced with 3D) */}
          <motion.ul
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
            className="flex flex-col gap-3 lg:col-span-4"
          >
            {spots.map((h, i) => {
              const Icon = ICONS[h.id];
              const on = shown === h.id;
              return (
                <motion.li key={h.id} variants={fadeUp}>
                  <button
                    type="button"
                    onClick={() => toggle(h.id)}
                    onMouseEnter={() => setHovered(h.id)}
                    onMouseLeave={() => setHovered(null)}
                    aria-pressed={active === h.id}
                    className={cn(
                      "shimmer-border glass relative w-full rounded-2xl p-5 text-left transition-all duration-500 ease-[var(--ease-out-expo)]",
                      on ? "border-gold/40 bg-gold/[0.06]" : "hover:border-lime/30",
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors duration-500",
                          on ? "border-gold/60 bg-gold/15 text-gold" : "border-emerald-line bg-forest-900 text-lime",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-mono text-[10px] tracking-[0.2em] text-moss">0{i + 1}</p>
                        <p className="font-display text-[15px] leading-snug text-mist">{h.title}</p>
                      </div>
                    </div>
                    {/* Mobile: details expand inline */}
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                          className="overflow-hidden md:hidden"
                        >
                          <div className="pt-4">
                            <DetailBody spot={h} compact />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

function DetailBody({
  spot,
  compact = false,
}: {
  spot: { id: HotspotId; title: string; body: string; specs: string[] };
  compact?: boolean;
}) {
  const Icon = ICONS[spot.id];
  return (
    <>
      {!compact && (
        <div className="mb-3 flex items-center gap-2 text-gold">
          <Icon className="h-4 w-4" />
          <span className="font-display text-sm text-mist">{spot.title}</span>
        </div>
      )}
      <p className="text-sm leading-relaxed text-sage">{spot.body}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {spot.specs.map((s) => (
          <li key={s} className="rounded-full border border-lime/25 bg-lime/[0.06] px-2.5 py-1 font-mono text-[10.5px] text-lime-soft">
            {s}
          </li>
        ))}
      </ul>
    </>
  );
}
