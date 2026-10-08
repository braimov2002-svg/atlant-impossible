"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/i18n/dictionaries/uz";

/** Partner names as uniform wordmarks on two slow, opposite marquees (static grid without motion). */
export function PartnersSection({ t, index }: { t: Dictionary["partners"]; index?: string }) {
  const half = Math.ceil(t.names.length / 2);
  const rows = [t.names.slice(0, half), t.names.slice(half)];
  return (
    <section className="relative overflow-hidden border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index={index} eyebrow={t.eyebrow} title={t.title} accent={t.accent} description={t.description} />
      </div>

      <div className="mt-16 space-y-px [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] motion-reduce:hidden">
        {rows.map((row, r) => (
          <div key={r} className="flex border-y border-line">
            <ul className={`flex shrink-0 ${r ? "animate-marquee-reverse" : "animate-marquee"}`}>
              {[...row, ...row].map((name, i) => (
                <li
                  key={i}
                  aria-hidden={i >= row.length}
                  className="font-display flex h-24 shrink-0 items-center border-r border-line px-10 text-lg font-semibold tracking-[0.04em] whitespace-nowrap text-steel uppercase transition-colors hover:text-mist sm:h-28 sm:px-14 sm:text-xl"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Reduced motion: the same names as a static grid */}
      <ul className="mx-auto mt-16 hidden max-w-7xl grid-cols-2 gap-px bg-line px-5 motion-reduce:grid sm:grid-cols-3 sm:px-8 lg:grid-cols-4">
        {t.names.map((name) => (
          <li key={name} className="font-display bg-obsidian-900 px-5 py-6 text-sm font-semibold tracking-[0.04em] text-steel uppercase">
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}
