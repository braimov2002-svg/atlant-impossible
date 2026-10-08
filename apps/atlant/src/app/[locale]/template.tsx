"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

// A template remounts on every navigation (unlike layout). The first mount is
// the initial page load — skip the curtain there so LCP is never covered.
let hasNavigated = false;

/**
 * Route transition: a graphite curtain with a brass hairline lifts off the
 * incoming page while it fades in. The content wrapper animates opacity only —
 * a transform/filter here would become the containing block for
 * `position: fixed` descendants.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => hasNavigated);
  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <>
      {animate && (
        <motion.div
          aria-hidden
          initial={{ y: "0%" }}
          animate={{ y: "-101%" }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.05 }}
          className="pointer-events-none fixed inset-0 z-[70] bg-obsidian-950"
        >
          <div className="absolute inset-x-0 bottom-0 h-px bg-gold" />
        </motion.div>
      )}
      <motion.div
        initial={animate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </>
  );
}
