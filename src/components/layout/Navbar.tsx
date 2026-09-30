"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button, ButtonShimmer } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Logo } from "@/components/ui/logo";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/uz";

export function Navbar({ t, locale }: { t: Dictionary["nav"]; locale: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      {/* Scroll progress hairline */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-gold via-lime to-lime"
      />

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.2 }}
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between rounded-full px-3 py-2 pl-5 transition-all duration-700 ease-[var(--ease-out-expo)]",
            scrolled ? "glass-strong" : "border border-transparent",
          )}
          aria-label="Asosiy navigatsiya"
        >
          <a href="#top" className="flex items-center gap-3" aria-label="AGCG — bosh sahifa">
            <Logo className="h-8 w-8" />
            <span className="hidden leading-none sm:block">
              <span className="block font-display text-[13px] tracking-[0.18em] text-mist">AGCG</span>
              <span className="block pt-1 font-mono text-[9.5px] tracking-[0.2em] text-sage uppercase">
                Agro Global Consulting
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {t.items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative rounded-full px-4 py-2 text-sm text-sage transition-colors hover:text-mist"
                >
                  {item.label}
                  <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-lime transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <span className="hidden rounded-full border border-emerald-line px-3 py-1.5 font-mono text-[11px] tracking-widest text-sage uppercase sm:inline-block">
              {locale}
            </span>
            <Magnetic className="hidden sm:inline-block">
              <Button asChild size="sm" data-cursor="→">
                <a href="#contact">
                  {t.cta}
                  <ArrowUpRight />
                  <ButtonShimmer />
                </a>
              </Button>
            </Magnetic>
            <Button
              variant="glass"
              size="icon"
              className="lg:hidden"
              aria-label={open ? t.close : t.menu}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-forest-950/95 px-8 backdrop-blur-xl lg:hidden"
          >
            <div className="bg-field-grid absolute inset-0 opacity-40" />
            <ul className="relative space-y-2">
              {t.items.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.7, ease: EASE_OUT_EXPO }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-2 font-display text-3xl text-mist"
                  >
                    <span className="font-mono text-xs text-lime">0{i + 1}</span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <Button asChild size="lg" className="relative mt-10 self-start">
              <a href="#contact" onClick={() => setOpen(false)}>
                {t.cta}
                <ArrowUpRight />
              </a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
