"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { Grid3x3, MapPin, SlidersHorizontal } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import type { ViewMode } from "@/components/three/building/Building";
import { PROJECTS, PROJECT_TYPES, type Project, type ProjectStatus, type ProjectType } from "@/data/projects";
import { useDeviceTier } from "@/hooks/useDeviceTier";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn, formatNumber } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/uz";

// Both come from the same chunk → one shared drei <View> tunnel.
const GalleryCanvas = dynamic(() => import("@/components/three/GalleryViews").then((m) => m.GalleryCanvas), { ssr: false });
const CardView = dynamic(() => import("@/components/three/GalleryViews").then((m) => m.CardView), { ssr: false });

type T = { page: Dictionary["projectsPage"]; common: Dictionary["common"]; text: Dictionary["projectsText"] };

export function ProjectsGallery({ t }: { t: T }) {
  const tier = useDeviceTier();
  const [type, setType] = useState<ProjectType | "all">("all");
  const [status, setStatus] = useState<ProjectStatus | "all">("all");
  const [allBlueprint, setAllBlueprint] = useState(false);
  const [modes, setModes] = useState<Record<string, ViewMode>>({});

  const list = useMemo(
    () => PROJECTS.filter((p) => (type === "all" || p.type === type) && (status === "all" || p.status === status)),
    [type, status],
  );
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: PROJECTS.length };
    PROJECT_TYPES.forEach((k) => (c[k] = PROJECTS.filter((p) => p.type === k).length));
    return c;
  }, []);

  const modeOf = (id: string): ViewMode => modes[id] ?? (allBlueprint ? "blueprint" : "realistic");
  const toggleAll = () => {
    setAllBlueprint((v) => !v);
    setModes({});
  };
  const webgl = tier !== null && tier !== "none";

  return (
    <section className="relative pb-24">
      {webgl && <GalleryCanvas tier={tier} />}

      {/* ── Sticky filter bar */}
      <div className="sticky top-24 z-30 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="glass-strong flex flex-col gap-3 rounded-2xl p-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto" role="tablist" aria-label={t.page.typeFilter}>
            <SlidersHorizontal className="mx-2 h-4 w-4 shrink-0 text-gold" />
            {(["all", ...PROJECT_TYPES] as const).map((k) => (
              <FilterChip key={k} on={type === k} onClick={() => setType(k)} count={counts[k]}>
                {k === "all" ? t.common.all : t.common.types[k]}
              </FilterChip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-full border border-line p-0.5" role="radiogroup" aria-label={t.page.statusFilter}>
              {(["all", "completed", "ongoing"] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  role="radio"
                  aria-checked={status === k}
                  onClick={() => setStatus(k)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs transition",
                    status === k ? "bg-white/10 text-mist" : "text-steel hover:text-mist",
                  )}
                >
                  {k === "all" ? t.common.all : t.common.status[k]}
                </button>
              ))}
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={allBlueprint}
              onClick={toggleAll}
              className="flex items-center gap-2.5 rounded-full border border-line px-3 py-1.5 text-xs text-steel transition hover:border-cyan/40 hover:text-mist"
            >
              <Grid3x3 className="h-3.5 w-3.5 text-cyan" />
              {t.page.globalToggle}
              <span className={cn("relative h-4 w-7 rounded-full transition-colors", allBlueprint ? "bg-cyan" : "bg-titanium-700")}>
                <span className={cn("absolute top-0.5 h-3 w-3 rounded-full bg-obsidian-900 transition-transform", allBlueprint ? "translate-x-3.5" : "translate-x-0.5")} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Grid */}
      <div className="relative z-10 mx-auto mt-8 max-w-7xl px-5 sm:px-8">
        <p className="mb-5 font-mono text-[11px] tracking-[0.18em] text-slate uppercase" aria-live="polite">
          {list.length} {t.page.count}
        </p>
        <motion.ul layout className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
              >
                <ProjectCard
                  project={p}
                  t={t}
                  mode={modeOf(p.id)}
                  onMode={(m) => setModes((s) => ({ ...s, [p.id]: m }))}
                  tier={webgl ? tier : null}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        {list.length === 0 && <p className="py-20 text-center text-steel">{t.page.empty}</p>}
      </div>
    </section>
  );
}

function FilterChip({ on, onClick, count, children }: { on: boolean; onClick: () => void; count: number; children: React.ReactNode }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={on}
      onClick={onClick}
      className={cn(
        "relative isolate flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-sm transition-colors",
        on ? "text-obsidian-900" : "text-steel hover:text-mist",
      )}
    >
      {on && <motion.span layoutId="proj-filter" className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-[#f3dc9f] to-gold" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
      {children}
      <span className={cn("font-mono text-[10px]", on ? "text-obsidian-900/70" : "text-slate")}>{count}</span>
    </button>
  );
}

function ProjectCard({
  project: p,
  t,
  mode,
  onMode,
  tier,
}: {
  project: Project;
  t: T;
  mode: ViewMode;
  onMode: (m: ViewMode) => void;
  tier: "low" | "mid" | "high" | null;
}) {
  const text = t.text[p.id];
  return (
    <article className="group relative overflow-hidden rounded-[26px] border border-line transition-colors duration-500 hover:border-gold/40">
      {/* Media: transparent window onto the shared WebGL canvas (no blur here!) */}
      <div className="relative aspect-[4/3]">
        {tier ? (
          <CardView spec={p.spec} mode={mode} tier={tier} className="absolute inset-0" />
        ) : (
          <div className="bg-blueprint absolute inset-0 flex items-center justify-center">
            <Grid3x3 className="h-10 w-10 text-cyan/40" />
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <span className={cn("rounded-full border bg-obsidian-900/80 px-2.5 py-1 font-mono text-[9.5px] tracking-[0.14em] uppercase", p.status === "ongoing" ? "border-cyan/40 text-cyan" : "border-gold/40 text-gold")}>
            ● {t.common.status[p.status]}
          </span>
          <span className="rounded-full border border-line bg-obsidian-900/80 px-2 py-1 font-mono text-[9px] tracking-wider text-slate uppercase">{t.common.sample}</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex justify-center p-4">
          <ModeToggle size="sm" value={mode} onChange={onMode} labels={{ realistic: t.common.realistic, blueprint: t.common.blueprint }} />
        </div>
      </div>
      {/* Details */}
      <div className="relative border-t border-line bg-obsidian-850 p-5">
        <p className="font-mono text-[10px] tracking-[0.16em] text-cyan uppercase">
          {t.common.types[p.type]} · {p.year}
        </p>
        <h2 className="font-sharp mt-2 text-xl font-light text-mist">{text.name}</h2>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-steel">
          <MapPin className="h-3 w-3 text-gold" /> {text.location}
        </p>
        <p className="mt-3 line-clamp-2 text-sm text-steel">{text.summary}</p>
        <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-4">
          {[
            { label: t.common.stats.floors, value: p.floors > 0 ? String(p.floors) : "—" },
            { label: t.common.stats.area, value: `${formatNumber(p.areaM2)}` },
            { label: t.common.stats.height, value: `${p.heightM} m` },
          ].map((s) => (
            <div key={s.label}>
              <dt className="font-mono text-[9px] tracking-[0.14em] text-slate uppercase">{s.label}</dt>
              <dd className="font-sharp mt-1 text-base text-mist">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
