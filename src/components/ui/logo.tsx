/**
 * Atlant monogram — an "A" drawn as a tapering tower on a gold foundation
 * line, with a blueprint-cyan core. Placeholder until the official mark.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="atlant-gold" x1="4" y1="36" x2="36" y2="4" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a9832f" />
          <stop offset="0.5" stopColor="#e2b859" />
          <stop offset="1" stopColor="#f7e5b5" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="0.5" width="39" height="39" rx="11" fill="#0e131d" stroke="rgb(148 163 184 / 0.28)" />
      <path d="M20 7 L30 31 H10 Z" stroke="url(#atlant-gold)" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M20 13 V31 M15.5 24 H24.5" stroke="#00f0ff" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M7 33.5 H33" stroke="url(#atlant-gold)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="7" r="1.6" fill="#00f0ff" />
    </svg>
  );
}
