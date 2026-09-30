"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Tracks whether an element is near the viewport.
 * `mounted` flips once (lazy-mount heavy canvases shortly before they're needed);
 * `visible` follows the element so offscreen canvases can pause their render loop.
 */
export function useInViewport<T extends Element>(ref: RefObject<T | null>, rootMargin = "300px") {
  const [state, setState] = useState({ mounted: false, visible: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) =>
        setState((s) => ({ mounted: s.mounted || entry.isIntersecting, visible: entry.isIntersecting })),
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);

  return state;
}
