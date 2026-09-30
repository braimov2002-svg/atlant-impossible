"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin, Move3d } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { NavLink } from "@/components/layout/NavLink";
import type { ViewMode } from "@/components/three/building/Building";
import { PROJECTS, type Project } from "@/data/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn, formatNumber } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/uz";

const ShowcaseStage = dynamic(() => import("@/components/three/ShowcaseStage"), {
  ssr: false,
  loading: () => <div className="bg-blueprint absolute inset-0" />,
});

type T = { showcase: Dictionary["showcase"]; common: Dictionary["common"]; text: Dictionary["projectsText"] };

export function ProjectShowcase({ t, locale }: { t: T; locale: string }) {
  const featured = PROJECTS.filter((p) => p.featured);
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<ViewMode>("realistic");
  const reduced = useReducedMotion();
  const active = featured[index];
  const go = (d: number) => setIndex((i) => (i + d + featured.length) % featured.length);

  return (
    <section id="showcase" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading index="01" eyebrow={t.showcase.eyebrow} title={t.showcase.title} accent={t.showcase.accent} description={t.showcase.description} />
          <ModeToggle value={mode} onChange={setMode} labels={{ realistic: t.common.realistic, blueprint: t.common.blueprint }} className="self-start lg:self-auto" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* ── 3D stage */}
          <div className="relative h-[460px] overflow-hidden rounded-[28px] border border-line bg-[radial-gradient(ellipse_at_50%_30%,#121a28,#06080d_75%)] sm:h-[560px] lg:col-span-8 lg:h-[620px]">
            <ShowcaseStage spec={active.spec} mode={mode} reducedMotion={reduced} />

            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-5">
              <span className="glass-cyan rounded-full px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-cyan uppercase">
                {mode === "blueprint" ? "BIM · LOD 400" : "Render · Dusk"}
              </span>
              <span className="font-sharp text-5xl leading-none font-extralight text-mist/15 sm:text-7xl">
                0{index + 1}
                <span className="text-2xl">/0{featured.length}</span>
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                className="pointer-events-none absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5"
              >
                <ProjectPanel project={active} t={t} />
              </motion.div>
            </AnimatePresence>

            <p className="pointer-events-none absolute top-16 left-5 hidden items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-slate uppercase sm:flex">
              <Move3d className="h-3.5 w-3.5 text-cyan" /> {t.common.dragHint}
            </p>
          </div>

          {/* ── Layered 3D card stack */}
          <div className="flex flex-col gap-5 lg:col-span-4">
            <div className="relative h-[300px] [perspective:1200px] sm:h-[340px] lg:h-full lg:min-h-[480px]">
              {featured.map((p, i) => {
                const depth = (i - index + featured.length) % featured.length;
                return (
                  <motion.button
                    key={p.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={t.text[p.id].name}
                    aria-current={depth === 0}
                    animate={{
                      z: -depth * 70,
                      y: depth * 40,
                      rotateX: depth * 3,
                      opacity: depth > 3 ? 0 : 1 - depth * 0.2,
                      scale: 1 - depth * 0.02,
                    }}
                    transition={{ type: "spring", stiffness: 180, damping: 24 }}
                    style={{ zIndex: featured.length - depth, transformStyle: "preserve-3d" }}
                    className={cn(
                      "absolute inset-x-0 top-0 flex h-[230px] flex-col justify-between overflow-hidden rounded-3xl border bg-[linear-gradient(145deg,#172030,#0c1119_70%)] p-5 text-left shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)] sm:h-[260px]",
                      depth === 0 ? "border-gold/40" : "cursor-pointer border-line-strong hover:border-cyan/40",
                    )}
                  >
                    <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(135deg,#000,transparent_70%)]" />
                    <div className="relative flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-[0.18em] text-cyan uppercase">
                        {t.common.types[p.type]} · {p.year}
                      </span>
                      <span className="rounded-full border border-gold/40 px-2 py-0.5 font-mono text-[9px] tracking-wider text-gold uppercase">
                        {t.common.sample}
                      </span>
                    </div>
                    <div className="relative">
                      <p className="font-sharp text-2xl leading-tight font-light text-mist">{t.text[p.id].name}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-steel">
                        <MapPin className="h-3 w-3 text-gold" /> {t.text[p.id].location}
                      </p>
                    </div>
                    <div className="relative flex gap-5 font-mono text-[11px] text-steel">
                      {p.floors > 0 && (
                        <span>
                          <span className="text-mist">{p.floors}</span> {t.common.units.floors}
                        </span>
                      )}
                      <span>
                        <span className="text-mist">{formatNumber(p.areaM2)}</span> m²
                      </span>
                      <span className={p.status === "ongoing" ? "text-cyan" : "text-gold"}>{t.common.status[p.status]}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex gap-2">
                <StepButton label={t.showcase.prev} onClick={() => go(-1)}>
                  <ChevronLeft className="h-4 w-4" />
                </StepButton>
                <StepButton label={t.showcase.next} onClick={() => go(1)}>
                  <ChevronRight className="h-4 w-4" />
                </StepButton>
              </div>
              <div className="flex flex-1 gap-1.5 px-2">
                {featured.map((p, i) => (
                  <span key={p.id} className={cn("h-0.5 flex-1 rounded-full transition-colors duration-500", i === index ? "bg-gold" : "bg-titanium-700")} />
                ))}
              </div>
              <NavLink href={`/${locale}/projects`} className="group flex items-center gap-1.5 text-sm text-cyan transition hover:text-cyan-soft">
                {t.showcase.viewAll}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepButton({ children, label, onClick }: { children: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-steel transition hover:border-gold/60 hover:text-gold"
    >
      {children}
    </button>
  );
}

export function ProjectPanel({ project, t }: { project: Project; t: T }) {
  const stats = [
    project.floors > 0 && { label: t.common.stats.floors, value: String(project.floors) },
    { label: t.common.stats.area, value: `${formatNumber(project.areaM2)} m²` },
    { label: t.common.stats.height, value: `${project.heightM} m` },
    { label: t.common.stats.year, value: String(project.year) },
  ].filter(Boolean) as { label: string; value: string }[];
  return (
    <div className="glass-strong grid gap-4 rounded-2xl p-4 sm:grid-cols-[1fr_auto] sm:items-end sm:p-5">
      <div>
        <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase">
          <span className={project.status === "ongoing" ? "text-cyan" : "text-gold"}>● {t.common.status[project.status]}</span>
          <span className="text-slate">· {t.common.sample}</span>
        </p>
        <h3 className="font-sharp mt-2 text-2xl font-light text-mist sm:text-3xl">{t.text[project.id].name}</h3>
        <p className="mt-1 max-w-md text-sm text-steel">{t.text[project.id].summary}</p>
      </div>
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="font-mono text-[9px] tracking-[0.14em] text-slate uppercase">{s.label}</dt>
            <dd className="font-sharp mt-1 text-base whitespace-nowrap text-mist sm:text-lg">{s.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
