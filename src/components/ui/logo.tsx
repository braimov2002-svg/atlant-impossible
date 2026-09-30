/**
 * AGCG monogram — a leaf whose vein is a circuit trace ending in a data node.
 * Placeholder mark: swap for the official logo SVG when available.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="agcg-leaf" x1="6" y1="34" x2="34" y2="6" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9c7c1f" />
          <stop offset="0.5" stopColor="#d4af37" />
          <stop offset="1" stopColor="#f3e3a0" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="0.5" width="39" height="39" rx="12" fill="#0d2117" stroke="rgb(110 231 183 / 0.25)" />
      <path
        d="M9 31C9 18 17 9 31 9c0 14-9 22-22 22Z"
        fill="url(#agcg-leaf)"
        fillOpacity="0.16"
        stroke="url(#agcg-leaf)"
        strokeWidth="1.6"
      />
      <path d="M11 29l7-7h5l4-4" stroke="#00ff66" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="27.5" cy="17.5" r="2.2" fill="#00ff66" />
      <circle cx="18" cy="22" r="1.2" fill="#e8f2ec" />
    </svg>
  );
}
