"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Cycles the last headline word letter-by-letter with a blur/rise morph. */
export function RotatingWord({ words, interval = 2800 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval, reduced]);

  const word = words[index];

  return (
    <span className="relative inline-grid">
      {/* Longest word reserves the width → no layout shift while cycling */}
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {words.reduce((a, b) => (b.length > a.length ? b : a))}
      </span>
      <span className="sr-only">{words.join(", ")}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={word}
          aria-hidden
          className="text-lime-glow col-start-1 row-start-1"
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {Array.from(word).map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: "0.45em", filter: "blur(10px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { delay: i * 0.028, duration: 0.6, ease: EASE_OUT_EXPO },
                },
                exit: {
                  opacity: 0,
                  y: "-0.35em",
                  filter: "blur(8px)",
                  transition: { delay: i * 0.012, duration: 0.3 },
                },
              }}
            >
              {ch}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
