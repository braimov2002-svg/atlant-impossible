"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";

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
    // once more after late layout (fonts, images) has settled.
    const glide = (duration: number) => {
      lenis.resize();
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

/** Lenis inertia scrolling. Lives in the root layout → persists across every sub-page. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        wheelMultiplier: 0.95,
        anchors: { offset: -80 },
        stopInertiaOnNavigate: true,
        respectReducedMotion: true,
      }}
    >
      <RouteScrollManager />
      {children}
    </ReactLenis>
  );
}
