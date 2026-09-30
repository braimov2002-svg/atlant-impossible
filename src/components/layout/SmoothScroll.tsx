"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Feeds every Lenis scroll frame to ScrollTrigger (must live inside <ReactLenis>). */
function ScrollTriggerSync() {
  useLenis(ScrollTrigger.update);
  return null;
}

/**
 * Client-side route changes keep the same Lenis instance (the layout never
 * remounts), so its internal target must be reset — otherwise Lenis would
 * glide back to the previous page's scroll position. Cross-page hash links
 * (/uz#contact from /uz/about) are resolved here once the new page renders.
 */
function RouteScrollManager() {
  const pathname = usePathname();
  const lenis = useLenis();
  const first = useRef(true);

  useEffect(() => {
    if (!lenis) return;
    if (first.current) {
      first.current = false;
      return;
    }
    const hash = window.location.hash;
    lenis.resize();
    lenis.scrollTo(0, { immediate: true, force: true });
    // Lenis caches the scroll limit — re-measure before gliding, then correct
    // once more after late layout (lazy 3D sections, fonts) has settled.
    const glide = (duration: number) => {
      lenis.resize();
      ScrollTrigger.refresh();
      if (hash && document.querySelector(hash)) lenis.scrollTo(hash, { offset: -80, duration });
    };
    const a = window.setTimeout(() => glide(1.4), 150);
    const b = window.setTimeout(() => hash && glide(0.6), 1600);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [pathname, lenis]);

  return null;
}

/**
 * Lenis inertia scrolling driven by GSAP's ticker, so ScrollTrigger and Lenis
 * share one clock. Lives in the root layout → persists across every sub-page.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    // Read the instance lazily — ReactLenis creates it after this effect runs.
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.09,
        wheelMultiplier: 0.95,
        anchors: { offset: -80 },
        stopInertiaOnNavigate: true,
        respectReducedMotion: true,
      }}
    >
      <ScrollTriggerSync />
      <RouteScrollManager />
      {children}
    </ReactLenis>
  );
}
