/**
 * Neutral placeholder mark (an "A" drawn as a triangular frame). Replace with
 * the official AGC logo file when Atlant supplies it — see README → Content.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <path d="M20 5 L35 34 H5 Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="miter" />
      <path d="M20 15 L28.5 31.5 M13 26 H27" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}
