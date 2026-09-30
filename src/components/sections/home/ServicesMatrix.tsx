"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BrickWall, Construction, PencilRuler, Sofa } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { NavLink } from "@/components/layout/NavLink";
import { MaterialSurface, type SurfaceMaterial } from "@/components/shader/MaterialSurface";
import { EASE_OUT_EXPO, fadeUp, inViewOnce, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/uz";

type T = Dictionary["matrix"];

export function ServicesMatrix({ t, locale, more, years }: { t: T; locale: string; more: string; years: string }) {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading index="02" eyebrow={t.eyebrow} title={t.title} accent={t.accent} />
          <NavLink href={`/${locale}/services`} className="group flex items-center gap-1.5 self-start text-sm text-cyan md:self-auto">
            {more} <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </NavLink>
        </div>
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-6"
        >
          <motion.div variants={fadeUp} className="lg:col-span-3">
            <CivilCard t={t.civil} years={years} />
          </motion.div>
          <motion.div variants={fadeUp} className="lg:col-span-3">
            <BimCard t={t.bim} />
          </motion.div>
          <motion.div variants={fadeUp} className="lg:col-span-3">
            <InfraCard t={t.infra} />
          </motion.div>
          <motion.div variants={fadeUp} className="lg:col-span-3">
            <InteriorCard t={t.interior} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Header({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="relative">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-obsidian-900/70 text-gold backdrop-blur transition-colors duration-500 group-hover/card:border-gold/50">
        {icon}
      </span>
      <h3 className="font-sharp mt-5 text-xl leading-snug font-light text-mist sm:text-2xl">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-steel">{body}</p>
    </div>
  );
}

/* ── 1. Civil & commercial: live material + durability breakdown ─────────── */

function CivilCard({ t, years }: { t: T["civil"]; years: string }) {
  const [active, setActive] = useState(0);
  const card = useRef<HTMLDivElement>(null);
  const mat = t.materials[active];
  return (
    <SpotlightCard className="h-full" as="div">
      <div ref={card} className="relative grid h-full min-h-[440px] grid-rows-[1fr_auto]">
        <div className="absolute inset-0 overflow-hidden rounded-[26px]">
          <MaterialSurface material={mat.id as SurfaceMaterial} interactionTarget={card} />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian-900/85 via-obsidian-900/40 to-obsidian-900/90" />
        </div>
        <div className="relative p-6 sm:p-7">
          <Header icon={<BrickWall className="h-5 w-5" />} title={t.title} body={t.body} />
        </div>
        <div className="relative p-4 sm:p-5">
          <div className="glass-strong rounded-2xl p-4">
            <p className="mb-3 font-mono text-[10px] tracking-[0.18em] text-slate uppercase">{t.label}</p>
            <ul className="space-y-2">
              {t.materials.map((m, i) => (
                <li key={m.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={cn(
                      "grid w-full grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 rounded-xl px-3 py-2 text-left transition-colors duration-300",
                      i === active ? "bg-white/[0.06]" : "hover:bg-white/[0.03]",
                    )}
                  >
                    <span className="text-sm text-mist">
                      {m.name} <span className="ml-1 text-xs text-steel">{m.spec}</span>
                    </span>
                    <span className="font-mono text-xs text-gold tabular-nums">
                      {m.life} {years}
                    </span>
                    <span className="col-span-2 h-1 overflow-hidden rounded-full bg-titanium-800">
                      <motion.span
                        className={cn("block h-full rounded-full", i === active ? "bg-gradient-to-r from-cyan to-gold" : "bg-steel/40")}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${m.life}%` }}
                        viewport={inViewOnce}
                        transition={{ duration: 1.4, delay: i * 0.1, ease: EASE_OUT_EXPO }}
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

/* ── 2. BIM: exploded isometric model (CSS 3D) ────────────────────────────── */

function BimCard({ t }: { t: T["bim"] }) {
  const [hover, setHover] = useState<number | null>(null);
  const [exploded, setExploded] = useState(false);
  // Top → bottom: roof, architecture, MEP, frame, foundation
  const plates = [
    { cls: "bg-titanium-700/90 border-steel/40", render: <RoofPlate /> },
    { cls: "bg-obsidian-800/90 border-gold/50", render: <PlanPlate /> },
    { cls: "bg-obsidian-900/80 border-cyan/50", render: <MepPlate /> },
    { cls: "bg-titanium-800/90 border-steel/40", render: <FramePlate /> },
    { cls: "bg-[#4b525c]/90 border-steel/40", render: null },
  ];
  return (
    <SpotlightCard className="h-full" as="div">
      <div
        className="relative grid h-full min-h-[440px] grid-cols-1 gap-4 p-6 sm:grid-cols-[1fr_1.1fr] sm:p-7"
        onMouseEnter={() => setExploded(true)}
        onMouseLeave={() => {
          setExploded(false);
          setHover(null);
        }}
      >
        <div className="flex flex-col justify-between gap-6">
          <Header icon={<PencilRuler className="h-5 w-5" />} title={t.title} body={t.body} />
          <ol className="space-y-1.5">
            {t.layers.map((l, i) => (
              <li
                key={l}
                onMouseEnter={() => setHover(i)}
                className={cn(
                  "flex cursor-default items-center gap-3 rounded-lg px-2 py-1 font-mono text-[11px] transition-colors",
                  hover === i ? "bg-cyan/10 text-cyan" : "text-steel",
                )}
              >
                <span className="text-slate">L{t.layers.length - i}</span> {l}
              </li>
            ))}
          </ol>
        </div>
        <div className="relative flex min-h-[300px] items-center justify-center [perspective:1400px]" onClick={() => setExploded((v) => !v)}>
          <div className="relative h-40 w-40 [transform:rotateX(58deg)_rotateZ(-40deg)] [transform-style:preserve-3d] sm:h-44 sm:w-44">
            {plates.map((p, i) => {
              const level = plates.length - 1 - i;
              const z = level * (exploded ? 46 : 12);
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHover(i)}
                  className={cn(
                    "absolute inset-0 rounded-md border transition-all duration-700 ease-[var(--ease-out-expo)]",
                    p.cls,
                    hover === i && "border-cyan shadow-[0_0_30px_rgb(0_240_255/0.45)]",
                    hover !== null && hover !== i && "opacity-40",
                  )}
                  style={{ transform: `translateZ(${z}px)` }}
                >
                  {p.render}
                </div>
              );
            })}
          </div>
          <span className="absolute right-0 bottom-0 font-mono text-[10px] tracking-[0.18em] text-cyan uppercase">LOD 400</span>
        </div>
      </div>
    </SpotlightCard>
  );
}

const RoofPlate = () => (
  <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
    <rect x="14" y="16" width="26" height="18" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
    <rect x="58" y="60" width="24" height="22" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
    <circle cx="70" cy="28" r="9" fill="none" stroke="#e2b859" strokeWidth="1.2" />
  </svg>
);
const PlanPlate = () => (
  <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden fill="none" stroke="#e2b859" strokeWidth="1.1">
    <path d="M6 6 H94 V94 H6 Z M6 44 H52 M52 6 V70 M52 70 H94 M30 44 V94 M72 70 V94" />
    <path d="M40 44 A8 8 0 0 1 48 52" stroke="#94a3b8" />
  </svg>
);
const MepPlate = () => (
  <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden fill="none" stroke="#00f0ff" strokeWidth="1.2">
    <path d="M10 20 H90 M10 20 V80 H60 M60 80 V50 H90 M30 20 V60 H45" strokeDasharray="4 3" />
    <circle cx="30" cy="60" r="3" fill="#00f0ff" />
    <circle cx="90" cy="50" r="3" fill="#00f0ff" />
  </svg>
);
const FramePlate = () => (
  <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
    {Array.from({ length: 16 }, (_, i) => (
      <rect key={i} x={12 + (i % 4) * 24} y={12 + Math.floor(i / 4) * 24} width="5" height="5" fill="#a3a9b3" />
    ))}
    <rect x="42" y="42" width="16" height="16" fill="none" stroke="#a3a9b3" strokeWidth="1.5" />
  </svg>
);

/* ── 3. Infrastructure: particles + volumetric beams ─────────────────────── */

function InfraCard({ t }: { t: T["infra"] }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cv = canvas.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      const r = cv.getBoundingClientRect();
      w = r.width;
      h = r.height;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    // Dust + welding sparks drifting up through the light cones
    const parts = Array.from({ length: 140 }, () => ({
      x: Math.random(),
      y: Math.random(),
      v: 0.0006 + Math.random() * 0.0018,
      s: Math.random() * 1.8 + 0.3,
      spark: Math.random() < 0.18,
      phase: Math.random() * 6.28,
    }));
    let visible = true;
    let boost = 0;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(cv);
    const host = wrap.current!;
    const enter = () => (boost = 1);
    const leave = () => (boost = 0);
    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointerleave", leave);
    let raf = 0;
    let b = 0;
    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      b += (boost - b) * 0.05;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y -= p.v * (1 + b * 2.5);
        p.x += Math.sin(time * 0.001 + p.phase) * 0.0004;
        if (p.y < -0.02) {
          p.y = 1.02;
          p.x = Math.random();
        }
        const inBeam = Math.exp(-Math.pow((p.x - 0.32) * 5, 2)) + Math.exp(-Math.pow((p.x - 0.72) * 5, 2));
        const a = (p.spark ? 0.9 : 0.25 + inBeam * 0.5) * (0.6 + b * 0.4);
        ctx.fillStyle = p.spark ? `rgba(242, 200, 110, ${a})` : `rgba(180, 236, 255, ${a})`;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.s * (p.spark ? 1.2 : 1), 0, Math.PI * 2);
        ctx.fill();
      }
      if (reduced) cancelAnimationFrame(raf);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <SpotlightCard className="h-full" as="div">
      <div ref={wrap} className="relative flex h-full min-h-[440px] flex-col justify-between overflow-hidden rounded-[26px] p-6 sm:p-7">
        {/* volumetric light cones */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-10 left-[32%] h-[130%] w-40 origin-top -translate-x-1/2 animate-beam bg-[conic-gradient(from_180deg_at_50%_0%,transparent_160deg,rgb(226_184_89/0.28)_180deg,transparent_200deg)] blur-md" />
          <div className="absolute -top-10 left-[72%] h-[130%] w-40 origin-top -translate-x-1/2 animate-beam bg-[conic-gradient(from_180deg_at_50%_0%,transparent_162deg,rgb(0_240_255/0.2)_180deg,transparent_198deg)] blur-md [animation-delay:-3s]" />
        </div>
        <canvas ref={canvas} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
        <Header icon={<Construction className="h-5 w-5" />} title={t.title} body={t.body} />
        {/* bridge elevation — draws itself */}
        <svg viewBox="0 0 400 120" className="relative mt-6 w-full" fill="none" aria-hidden>
          <motion.path
            d="M0 60 H400"
            stroke="#e2b859"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={inViewOnce}
            transition={{ duration: 1.6, ease: EASE_OUT_EXPO }}
          />
          {[66, 133, 200, 266, 333].map((x, i) => (
            <motion.path
              key={x}
              d={`M${x - 8} 118 L${x - 5} 62 H${x + 5} L${x + 8} 118`}
              stroke="#94a3b8"
              strokeWidth="1.4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={inViewOnce}
              transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: EASE_OUT_EXPO }}
            />
          ))}
          <motion.path
            d="M0 60 Q100 -10 200 60 Q300 -10 400 60"
            stroke="#00f0ff"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={inViewOnce}
            transition={{ duration: 2, delay: 0.6, ease: EASE_OUT_EXPO }}
          />
          <path d="M0 118 H400" stroke="#334155" />
        </svg>
        <dl className="relative mt-4 grid grid-cols-2 gap-3">
          {t.stats.map((s) => (
            <div key={s.label} className="glass rounded-xl px-4 py-3">
              <dt className="font-mono text-[10px] tracking-[0.16em] text-slate uppercase">{s.label}</dt>
              <dd className="font-sharp mt-1 text-2xl font-light text-mist">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </SpotlightCard>
  );
}

/* ── 4. Interior: wall colour + floor texture switching ─────────────────── */

function InteriorCard({ t }: { t: T["interior"] }) {
  const [wall, setWall] = useState(t.walls[0]);
  const [floor, setFloor] = useState(t.floors[0].id);
  return (
    <SpotlightCard className="h-full" as="div">
      <div className="relative grid h-full min-h-[440px] grid-cols-1 gap-5 p-6 sm:grid-cols-[1fr_1.15fr] sm:p-7">
        <div className="flex flex-col justify-between gap-6">
          <Header icon={<Sofa className="h-5 w-5" />} title={t.title} body={t.body} />
          <div className="space-y-4">
            <Swatches label={t.wallsLabel}>
              {t.walls.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  aria-label={w.name}
                  aria-pressed={wall.id === w.id}
                  onClick={() => setWall(w)}
                  className={cn("h-8 w-8 rounded-full border-2 transition-transform", wall.id === w.id ? "scale-110 border-gold" : "border-transparent hover:scale-105")}
                  style={{ background: w.color }}
                />
              ))}
            </Swatches>
            <Swatches label={t.floorsLabel}>
              {t.floors.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={floor === f.id}
                  onClick={() => setFloor(f.id)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs transition",
                    floor === f.id ? "border-gold/60 bg-gold/10 text-gold-soft" : "border-line text-steel hover:text-mist",
                  )}
                >
                  {f.name}
                </button>
              ))}
            </Swatches>
          </div>
        </div>
        <Room wall={wall.color} floor={floor} />
      </div>
    </SpotlightCard>
  );
}

function Swatches({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 font-mono text-[10px] tracking-[0.18em] text-slate uppercase">{label}</p>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

/** Isometric room; wall fill and floor pattern animate between selections. */
function Room({ wall, floor }: { wall: string; floor: string }) {
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full" aria-hidden>
      <defs>
        <pattern id="fl-walnut" width="40" height="12" patternUnits="userSpaceOnUse" patternTransform="skewX(-30) rotate(0)">
          <rect width="40" height="12" fill="#6b4a2f" />
          <rect width="40" height="1" fill="#4a321f" />
          <rect x="18" y="1" width="1" height="11" fill="#4a321f" />
        </pattern>
        <pattern id="fl-marble" width="60" height="60" patternUnits="userSpaceOnUse">
          <rect width="60" height="60" fill="#e8e4dc" />
          <path d="M0 40 C20 30 30 50 60 20" stroke="#b9b2a6" strokeWidth="1" fill="none" />
          <path d="M0 10 C15 20 40 5 60 12" stroke="#cfc8bc" strokeWidth="0.8" fill="none" />
          <rect width="60" height="60" fill="none" stroke="#d6d0c6" strokeWidth="0.6" />
        </pattern>
        <filter id="fl-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" />
          <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.56  0 0 0 0 0.58  0 0 0 0.55 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <linearGradient id="win" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fd8ff" stopOpacity="0.8" />
          <stop offset="1" stopColor="#e2b859" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      {/* walls */}
      <path d="M40 60 L160 10 L160 150 L40 200 Z" fill={wall} style={{ transition: "fill 0.7s var(--ease-out-expo)" }} />
      <path d="M160 10 L290 64 L290 204 L160 150 Z" fill={wall} style={{ transition: "fill 0.7s var(--ease-out-expo)", filter: "brightness(0.78)" }} />
      {/* window + light spill */}
      <path d="M190 52 L260 81 L260 150 L190 121 Z" fill="url(#win)" stroke="#e2b859" strokeWidth="1.5" />
      <path d="M190 121 L260 150 L220 232 L140 192 Z" fill="#fff4d6" opacity="0.12" />
      {/* floor */}
      <g>
        <path d="M40 200 L160 150 L290 204 L170 256 Z" fill={floor === "walnut" ? "url(#fl-walnut)" : floor === "marble" ? "url(#fl-marble)" : "#8b9099"} />
        {floor === "microcement" && <path d="M40 200 L160 150 L290 204 L170 256 Z" filter="url(#fl-noise)" fill="#8b9099" />}
      </g>
      {/* sofa */}
      <path d="M80 196 L150 166 L200 187 L130 217 Z" fill="#1e293b" />
      <path d="M80 196 L80 176 L150 146 L150 166 Z" fill="#273449" />
      <path d="M150 146 L200 167 L200 187 L150 166 Z" fill="#334155" />
      {/* lamp */}
      <path d="M232 170 V112" stroke="#e2b859" strokeWidth="2" />
      <ellipse cx="232" cy="108" rx="16" ry="7" fill="#e2b859" />
      <ellipse cx="232" cy="118" rx="36" ry="14" fill="#ffd98a" opacity="0.08" />
    </svg>
  );
}
