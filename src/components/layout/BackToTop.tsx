"use client";

import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";

/** Scrolls the current page (any route) back to the top through Lenis. */
export function BackToTop({ label }: { label: string }) {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
      className="flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[10px] tracking-[0.18em] text-steel uppercase transition hover:border-cyan/50 hover:text-cyan"
    >
      {label} <ArrowUp className="h-3 w-3" />
    </button>
  );
}
