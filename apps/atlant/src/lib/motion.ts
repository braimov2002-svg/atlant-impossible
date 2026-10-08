import type { Transition, Variants } from "framer-motion";

/** Shared Framer Motion variants — one easing language across the site. */
export const EASE_OUT_EXPO: Transition["ease"] = [0.16, 1, 0.3, 1];
export const EASE_LIQUID: Transition["ease"] = [0.65, 0, 0.35, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Masked line reveal — wrap text in overflow-hidden and animate the child. */
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1, ease: EASE_OUT_EXPO } },
};

/** Step transitions for the multi-step form (direction-aware). */
export const stepSlide: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0, transition: { duration: 0.25, ease: EASE_LIQUID } }),
};

export const inViewOnce = { once: true, amount: 0.3 } as const;
