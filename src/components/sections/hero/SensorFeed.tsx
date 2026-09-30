"use client";

import { useEffect, useState } from "react";
import { Droplets, Thermometer, Zap } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/uz";

type Reading = { moisture: number; temp: number; ec: number };
const START: Reading = { moisture: 32.4, temp: 24.1, ec: 1.82 };

/**
 * Simulated telemetry stream (clearly badged as a simulation in the UI).
 * Wire it to a real SSE/WebSocket endpoint when field sensors are connected.
 */
export function SensorFeed({ t, className }: { t: Dictionary["hero"]["sensor"]; className?: string }) {
  const [{ r, history }, setFeed] = useState(() => ({
    r: START,
    history: Array.from({ length: 24 }, (_, i) => 30 + Math.sin(i / 2) * 2),
  }));

  useEffect(() => {
    const id = window.setInterval(() => {
      setFeed(({ r: p, history: h }) => {
        const next: Reading = {
          moisture: clampTo(p.moisture + (Math.random() - 0.5) * 0.8, 28, 38),
          temp: clampTo(p.temp + (Math.random() - 0.5) * 0.3, 22, 27),
          ec: clampTo(p.ec + (Math.random() - 0.5) * 0.06, 1.5, 2.2),
        };
        return { r: next, history: [...h.slice(1), next.moisture] };
      });
    }, 1400);
    return () => window.clearInterval(id);
  }, []);

  const min = Math.min(...history) - 0.5;
  const max = Math.max(...history) + 0.5;
  const path = history
    .map((v, i) => `${i === 0 ? "M" : "L"}${(i / (history.length - 1)) * 100} ${28 - ((v - min) / (max - min)) * 26}`)
    .join(" ");

  return (
    <div data-hud className={`glass w-[264px] rounded-2xl p-4 ${className ?? ""}`}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-sage uppercase">
          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-lime opacity-70" />
            <span className="relative h-2 w-2 rounded-full bg-lime" />
          </span>
          {t.title}
        </span>
        <span className="rounded-full border border-gold/40 px-2 py-0.5 font-mono text-[9px] tracking-wider text-gold uppercase">
          {t.badge}
        </span>
      </div>
      <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="mt-3 h-10 w-full" aria-hidden>
        <path d={`${path} L100 30 L0 30Z`} fill="rgb(0 255 102 / 0.08)" />
        <path d={path} fill="none" stroke="#00ff66" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <dl className="mt-3 grid grid-cols-3 gap-2 font-mono">
        <Stat icon={<Droplets className="h-3 w-3" />} label={t.moisture} value={`${r.moisture.toFixed(1)}%`} />
        <Stat icon={<Thermometer className="h-3 w-3" />} label={t.temp} value={`${r.temp.toFixed(1)}°`} />
        <Stat icon={<Zap className="h-3 w-3" />} label={t.ec} value={r.ec.toFixed(2)} />
      </dl>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <dt className="flex items-center gap-1 text-[8.5px] leading-tight tracking-wider text-moss uppercase">
        {icon}
        <span className="truncate">{label}</span>
      </dt>
      <dd className="mt-1 text-sm text-mist tabular-nums">{value}</dd>
    </div>
  );
}

const clampTo = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
