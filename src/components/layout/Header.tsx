"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { NavLink } from "./NavLink";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/uz";

/**
 * Full-width corporate header. Transparent over the home hero, then a
 * graphite bar with a hairline rule once the page scrolls; a brass hairline
 * tracks reading progress.
 */
export function Header({ t, locale }: { t: Dictionary["nav"]; locale: string }) {
  const pathname = usePathname();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const items = t.items.map((i) => ({ ...i, href: `/${locale}${i.href}` }));
  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    if (href === `/${locale}`) return pathname === href;
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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

  const solid = scrolled || open;

  return (
    <>
      <motion.div aria-hidden style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-gold" />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500",
          solid ? "glass-strong border-x-0 border-t-0 border-b-line" : "border-transparent bg-transparent",
        )}
      >
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Asosiy navigatsiya">
          <NavLink href={`/${locale}`} className="flex items-center gap-3 text-mist" aria-label="Atlant Group of Companies — bosh sahifa">
            <Logo className="h-8 w-8" />
            <span className="leading-none">
              <span className="font-display block text-[15px] font-semibold tracking-[0.22em]">ATLANT</span>
              <span className="label-caps block pt-1 !text-[9px] !tracking-[0.24em] text-steel">Group of Companies</span>
            </span>
          </NavLink>

          <ul className="hidden items-center gap-8 lg:flex">
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    className={cn("relative block py-2 text-sm transition-colors", active ? "text-mist" : "text-steel hover:text-mist")}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                    {active && (
                      <motion.span layoutId="nav-active" className="absolute inset-x-0 -bottom-px h-px bg-gold" transition={{ duration: 0.4, ease: EASE_OUT_EXPO }} />
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <span className="label-caps hidden text-steel sm:inline">{locale}</span>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <NavLink href={`/${locale}#contact`}>
                {t.cta}
                <ArrowRight />
              </NavLink>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              aria-label={open ? t.close : t.menu}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-obsidian-900 px-8 lg:hidden"
          >
            <ul className="space-y-1">
              {items.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.6, ease: EASE_OUT_EXPO }}
                  className="border-b border-line"
                >
                  <NavLink
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn("font-display flex items-baseline gap-4 py-4 text-2xl font-medium", isActive(item.href) ? "text-gold" : "text-mist")}
                  >
                    <span className="label-caps text-slate">0{i + 1}</span>
                    {item.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-10 self-start">
              <NavLink href={`/${locale}#contact`} onClick={() => setOpen(false)}>
                {t.cta}
                <ArrowRight />
              </NavLink>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
