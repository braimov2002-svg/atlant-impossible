import { memo } from "react";

/**
 * Procedural "satellite" tile — an illustrative stand-in until real
 * before/after imagery is supplied (drop JPGs into /public/projects and swap
 * this for next/image). Deterministic per `seed`, so SSR and client match.
 */
export type ProjectType = "greenhouse" | "drip" | "orchard" | "pivot";

const W = 800;
const H = 500;

function rng(seed: number) {
  let a = seed * 2654435761;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DRY = ["#8c7b55", "#a08f67", "#7d6f4d", "#b3a47a", "#6f6446", "#95865c"];
const LUSH = ["#1f5a32", "#2d6e3c", "#3d8446", "#27643a", "#4b9650", "#35773f"];

interface Parcel {
  x: number;
  y: number;
  w: number;
  h: number;
}

function parcels(r: () => number): Parcel[] {
  const out: Parcel[] = [];
  let y = -20;
  while (y < H + 20) {
    const rowH = 70 + r() * 70;
    let x = -30;
    while (x < W + 30) {
      const w = 90 + r() * 150;
      out.push({ x, y, w: w - 6, h: rowH - 6 });
      x += w;
    }
    y += rowH;
  }
  return out;
}

function SatelliteMapImpl({
  type,
  variant,
  seed,
  className,
}: {
  type: ProjectType;
  variant: "before" | "after";
  seed: number;
  className?: string;
}) {
  const r = rng(seed);
  const ps = parcels(r);
  const uid = `${type}-${variant}-${seed}`;
  const after = variant === "after";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <filter id={`grain-${uid}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={seed} />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <pattern id={`rows-${uid}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(90)">
          <rect width="6" height="6" fill="transparent" />
          <line x1="0" y1="0" x2="0" y2="6" stroke={after ? "#0d2a17" : "#5d5238"} strokeWidth="1.6" strokeOpacity="0.55" />
        </pattern>
        <pattern id={`glass-${uid}`} width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#dfeee8" />
          <line x1="0" y1="0" x2="0" y2="8" stroke="#9fb7ad" strokeWidth="1.2" />
        </pattern>
        <pattern id={`pv-${uid}`} width="10" height="7" patternUnits="userSpaceOnUse">
          <rect width="10" height="7" fill="#12294d" />
          <rect x="0.6" y="0.6" width="8.8" height="5.8" fill="#1b3a6b" />
        </pattern>
      </defs>

      <rect width={W} height={H} fill={after ? "#26452e" : "#8a7a55"} />

      <g transform={`rotate(${-6 + (seed % 5)} ${W / 2} ${H / 2})`}>
        {ps.map((p, i) => {
          const k = r();
          if (!after) {
            return (
              <g key={i}>
                <rect x={p.x} y={p.y} width={p.w} height={p.h} fill={DRY[Math.floor(k * DRY.length)]} />
                {k > 0.45 && <rect x={p.x} y={p.y} width={p.w} height={p.h} fill={`url(#rows-${uid})`} opacity="0.5" />}
                {k < 0.18 && <ellipse cx={p.x + p.w / 2} cy={p.y + p.h / 2} rx={p.w / 3} ry={p.h / 4} fill="#d9d3bf" opacity="0.45" />}
              </g>
            );
          }
          return <AfterParcel key={i} p={p} k={k} type={type} uid={uid} i={i} />;
        })}
      </g>

      {/* Canal + road network */}
      <path
        d={`M-10 ${H * 0.62} C ${W * 0.3} ${H * 0.52}, ${W * 0.6} ${H * 0.75}, ${W + 10} ${H * 0.6}`}
        stroke={after ? "#3aa6d8" : "#9a9884"}
        strokeWidth={after ? 7 : 4}
        fill="none"
        opacity={after ? 0.9 : 0.6}
      />
      <path d={`M${W * 0.35} -10 L${W * 0.42} ${H + 10}`} stroke="#c9bf9f" strokeWidth="3" opacity="0.55" />

      {after && type === "greenhouse" && (
        <>
          <rect x={W * 0.08} y={H * 0.08} width="120" height="70" rx="10" fill="#2f8fc4" opacity="0.9" />
          <rect x={W * 0.7} y={H * 0.08} width="170" height="90" fill={`url(#pv-${uid})`} />
        </>
      )}
      {after && type !== "greenhouse" && (
        <circle cx={W * 0.12} cy={H * 0.18} r="34" fill="#2f8fc4" opacity="0.85" />
      )}

      {/* Sensor texture */}
      <rect width={W} height={H} filter={`url(#grain-${uid})`} opacity="0.35" />
      {/* Survey overlay */}
      <g stroke={after ? "#00ff66" : "#e8f2ec"} strokeOpacity="0.14">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line key={`v${i}`} x1={i * 100} x2={i * 100} y1="0" y2={H} />
        ))}
        {[1, 2, 3, 4].map((i) => (
          <line key={`h${i}`} x1="0" x2={W} y1={i * 100} y2={i * 100} />
        ))}
      </g>
    </svg>
  );
}

function AfterParcel({ p, k, type, uid, i }: { p: Parcel; k: number; type: ProjectType; uid: string; i: number }) {
  const green = LUSH[Math.floor(k * LUSH.length)];
  switch (type) {
    case "greenhouse": {
      if (k < 0.35) return <rect x={p.x} y={p.y} width={p.w} height={p.h} fill={green} />;
      const bays = Math.max(2, Math.floor(p.w / 26));
      return (
        <g>
          <rect x={p.x} y={p.y} width={p.w} height={p.h} fill="#3b4a3f" />
          {Array.from({ length: bays }, (_, b) => (
            <rect key={b} x={p.x + 3 + (b * (p.w - 6)) / bays} y={p.y + 3} width={(p.w - 6) / bays - 3} height={p.h - 6} fill={`url(#glass-${uid})`} opacity="0.95" />
          ))}
        </g>
      );
    }
    case "orchard": {
      const cols = Math.floor(p.w / 14);
      const rows = Math.floor(p.h / 14);
      return (
        <g>
          <rect x={p.x} y={p.y} width={p.w} height={p.h} fill={k < 0.2 ? "#6f7a4c" : "#4a5e38"} />
          {k >= 0.2 &&
            Array.from({ length: cols * rows }, (_, n) => (
              <circle key={n} cx={p.x + 7 + (n % cols) * 14} cy={p.y + 7 + Math.floor(n / cols) * 14} r={4.6} fill={LUSH[(n + i) % LUSH.length]} />
            ))}
        </g>
      );
    }
    case "pivot": {
      const rad = Math.min(p.w, p.h) / 2 - 2;
      const cx = p.x + p.w / 2;
      const cy = p.y + p.h / 2;
      return (
        <g>
          <rect x={p.x} y={p.y} width={p.w} height={p.h} fill="#8c7b55" />
          <circle cx={cx} cy={cy} r={rad} fill={green} />
          <circle cx={cx} cy={cy} r={rad * 0.66} fill="none" stroke="#0d2a17" strokeOpacity="0.35" />
          <circle cx={cx} cy={cy} r={rad * 0.33} fill="none" stroke="#0d2a17" strokeOpacity="0.35" />
          <line x1={cx} y1={cy} x2={cx + rad * Math.cos(k * 6.28)} y2={cy + rad * Math.sin(k * 6.28)} stroke="#e8f2ec" strokeWidth="1.5" opacity="0.8" />
        </g>
      );
    }
    default:
      return (
        <g>
          <rect x={p.x} y={p.y} width={p.w} height={p.h} fill={green} />
          <rect x={p.x} y={p.y} width={p.w} height={p.h} fill={`url(#rows-${uid})`} opacity="0.6" />
        </g>
      );
  }
}

export const SatelliteMap = memo(SatelliteMapImpl);
