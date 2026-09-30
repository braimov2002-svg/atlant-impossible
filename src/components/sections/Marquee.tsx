"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sprout } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Infinite keyword ticker whose speed and direction follow scroll velocity
 * (GSAP timeline timeScale driven by ScrollTrigger.getVelocity()).
 */
export function Marquee({ items }: { items: string[] }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const loop = gsap.to(track.current, { xPercent: -50, ease: "none", duration: 36, repeat: -1 });
      let direction = 1;
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          if (v !== 0) direction = v > 0 ? 1 : -1;
          const boost = gsap.utils.clamp(1, 6, Math.abs(v) / 250);
          gsap.to(loop, { timeScale: direction * boost, duration: 0.2, overwrite: true });
          gsap.to(loop, { timeScale: direction, duration: 1.2, delay: 0.2, ease: "power2.out" });
          gsap.to(track.current, { skewX: gsap.utils.clamp(-8, 8, -v / 300), duration: 0.4, overwrite: "auto" });
        },
      });
    },
    { scope: root },
  );

  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((w) => (
        <span key={w} className="flex items-center gap-10 px-5">
          <span className="font-display text-[clamp(1.6rem,1rem+2.5vw,3.2rem)] whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgb(143_168_154/0.45)] transition-colors hover:text-mist">
            {w}
          </span>
          <Sprout className="h-6 w-6 shrink-0 text-lime" />
        </span>
      ))}
    </div>
  );

  return (
    <div ref={root} className="relative overflow-hidden border-y border-emerald-line py-7" aria-label={items.join(", ")}>
      <div ref={track} className="flex w-max" aria-hidden>
        {row}
        {row}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-forest-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-forest-950 to-transparent" />
    </div>
  );
}
