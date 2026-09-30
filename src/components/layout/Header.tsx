"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button, ButtonShimmer } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Logo } from "@/components/ui/logo";
import { NavLink } from "./NavLink";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/uz";

/**
 * Shared glass header for every page. The active route gets a sliding
 * underline (Framer `layoutId`), the bar condenses into titanium glass once
 * the page scrolls, and a gold→cyan hairline tracks scroll progress.
 */
export function Header({ t, locale }: { t: Dictionary["nav"]; locale: string }) {
  const pathname = usePathname();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  const items = t.items.map((i) => ({ ...i, href: `/${locale}${i.href}` }));
  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    if (href === `/${locale}`) return pathname === href;
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation; freeze Lenis while it's open
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-gold via-cyan to-cyan"
      />

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.15 }}
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-3 py-2 pl-4 transition-all duration-700 ease-[var(--ease-out-expo)]",
            scrolled || pathname !== `/${locale}` ? "glass-strong" : "border border-transparent",
          )}
          aria-label="Asosiy navigatsiya"
        >
          <NavLink href={`/${locale}`} className="flex items-center gap-3" aria-label="Atlant — bosh sahifa">
            <Logo className="h-9 w-9" />
            <span className="hidden leading-none sm:block">
              <span className="font-sharp block text-[15px] font-medium tracking-[0.28em] text-mist">ATLANT</span>
              <span className="block pt-1 font-mono text-[9px] tracking-[0.26em] text-steel uppercase">Construction Group</span>
            </span>
          </NavLink>

          <ul className="hidden items-center gap-1 lg:flex">
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href} className="relative">
                  <NavLink
                    href={item.href}
                    className={cn(
                      "relative isolate block rounded-xl px-4 py-2 text-sm transition-colors",
                      active ? "text-mist" : "text-steel hover:text-mist",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-xl border border-line bg-white/[0.04]"
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                    {item.label}
                    {active && <span className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-gold to-cyan" />}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <span className="hidden rounded-lg border border-line px-2.5 py-1.5 font-mono text-[10px] tracking-widest text-steel uppercase sm:inline-block">
              {locale}
            </span>
            <Magnetic className="hidden sm:inline-block">
              <Button asChild size="sm" data-cursor="→">
                <NavLink href={`/${locale}#contact`}>
                  {t.cta}
                  <ArrowUpRight />
                  <ButtonShimmer />
                </NavLink>
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
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-obsidian-900/95 px-8 backdrop-blur-xl lg:hidden"
          >
            <div className="bg-blueprint absolute inset-0 opacity-60" />
            <ul className="relative space-y-1">
              {items.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.7, ease: EASE_OUT_EXPO }}
                >
                  <NavLink
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "font-sharp flex items-baseline gap-4 py-2 text-3xl font-light",
                      isActive(item.href) ? "text-gold" : "text-mist",
                    )}
                  >
                    <span className="font-mono text-xs text-cyan">0{i + 1}</span>
                    {item.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <Button asChild size="lg" className="relative mt-10 self-start">
              <NavLink href={`/${locale}#contact`} onClick={() => setOpen(false)}>
                {t.cta}
                <ArrowUpRight />
              </NavLink>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
