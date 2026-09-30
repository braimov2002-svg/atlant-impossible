import { cn } from "@/lib/utils";

/**
 * Floating glass HUD tile. The number is rendered at its final value (SSR/SEO)
 * and counted up by the hero GSAP timeline via `data-count`.
 */
export function HudMetric({
  value,
  prefix,
  suffix,
  label,
  kind,
  className,
  compact = false,
}: {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  kind: string;
  className?: string;
  compact?: boolean;
}) {
  const decimals = value % 1 === 0 ? 0 : 1;
  const display = decimals ? value.toFixed(decimals) : value.toLocaleString("en-US").replace(/,/g, " ");

  return (
    <div
      data-hud
      className={cn(
        "glass group relative overflow-hidden rounded-2xl",
        compact ? "p-3" : "w-[232px] p-4",
        className,
      )}
    >
      {/* corner brackets — HUD framing */}
      <span className="absolute top-2 left-2 h-2 w-2 border-t border-l border-lime/60" />
      <span className="absolute right-2 bottom-2 h-2 w-2 border-r border-b border-lime/60" />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div
            className={cn(
              "font-display leading-none tracking-tight text-mist tabular-nums",
              compact ? "text-lg" : "text-[28px]",
            )}
          >
            {prefix}
            <span data-count={value} data-decimals={decimals}>
              {display}
            </span>
            <span className="text-gold">{suffix}</span>
          </div>
          <div
            className={cn(
              "mt-1.5 font-mono tracking-wider text-sage uppercase",
              compact ? "text-[8.5px] leading-tight" : "text-[10px]",
            )}
          >
            {label}
          </div>
        </div>
        {!compact && <HudGlyph kind={kind} value={value} />}
      </div>
      {!compact && kind === "bars" && (
        <div className="mt-3 flex h-7 items-end gap-[3px]" aria-hidden>
          {[35, 48, 42, 60, 55, 72, 66, 84, 78, 92, 88, 100].map((h, i) => (
            <span
              key={i}
              data-hud-bar
              className="flex-1 origin-bottom rounded-sm bg-gradient-to-t from-lime/20 to-lime/80"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function HudGlyph({ kind, value }: { kind: string; value: number }) {
  if (kind === "ring") {
    const c = 2 * Math.PI * 16;
    return (
      <svg viewBox="0 0 40 40" className="h-11 w-11 -rotate-90" aria-hidden>
        <circle cx="20" cy="20" r="16" fill="none" stroke="rgb(110 231 183 / 0.15)" strokeWidth="3" />
        <circle
          data-hud-ring
          cx="20"
          cy="20"
          r="16"
          fill="none"
          stroke="#00ff66"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
          style={{ filter: "drop-shadow(0 0 4px #00ff66)" }}
        />
      </svg>
    );
  }
  if (kind === "spark") {
    return (
      <svg viewBox="0 0 64 32" className="h-9 w-16" aria-hidden>
        <defs>
          <linearGradient id="hud-spark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d4af37" stopOpacity="0.45" />
            <stop offset="1" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 28 L10 24 L20 25 L30 17 L40 18 L50 9 L64 4 L64 32 L0 32Z" fill="url(#hud-spark)" />
        <path
          data-hud-line
          d="M0 28 L10 24 L20 25 L30 17 L40 18 L50 9 L64 4"
          fill="none"
          stroke="#d4af37"
          strokeWidth="1.6"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="0"
        />
        <circle cx="64" cy="4" r="2.4" fill="#d4af37" />
      </svg>
    );
  }
  return (
    <span className="relative mt-1 flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-60" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime" />
    </span>
  );
}
