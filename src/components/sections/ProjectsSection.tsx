"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { NavLink } from "@/components/layout/NavLink";
import { fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/uz";

type Project = Dictionary["projects"]["items"][number];

/**
 * Project cards. A photo frame appears only when a real photograph is set
 * (`image` in the dictionary) — never a fake render or an empty placeholder.
 */
export function ProjectsSection({
  t,
  common,
  index,
  more,
  heading = true,
}: {
  t: Dictionary["projects"];
  common: Dictionary["common"];
  index?: string;
  more?: string;
  heading?: boolean;
}) {
  return (
    <section className={cn("relative py-24 sm:py-32", heading && "border-t border-line")}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {heading && (
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading index={index} eyebrow={t.eyebrow} title={t.title} accent={t.accent} description={t.description} />
            {more && (
              <NavLink href={more} className="label-caps inline-flex shrink-0 items-center gap-2 text-mist transition hover:text-gold">
                {t.viewAll} <ArrowUpRight className="h-4 w-4" />
              </NavLink>
            )}
          </div>
        )}

        <motion.ul
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className={cn("grid gap-6 lg:grid-cols-12", heading && "mt-16")}
        >
          {t.items.map((p, i) => (
            <motion.li key={p.id} variants={fadeUp} className={i === 0 ? "lg:col-span-7" : "lg:col-span-5"}>
              <ProjectCard p={p} common={common} large={i === 0} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function ProjectCard({ p, common, large }: { p: Project; common: Dictionary["common"]; large: boolean }) {
  return (
    <article className="group flex h-full flex-col border border-line bg-obsidian-850">
      {p.image && (
        <div className={cn("relative overflow-hidden border-b border-line", large ? "aspect-[16/10]" : "aspect-[4/3]")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-7 sm:p-10">
        <div className="flex items-start justify-between gap-6">
          <p className="label-caps text-gold">{p.category}</p>
          {p.years && <p className="font-display text-sm text-steel tabular-nums">{p.years}</p>}
        </div>
        <h3 className={cn("font-display mt-10 font-semibold tracking-[-0.03em] text-mist", large ? "text-3xl sm:text-5xl" : "text-3xl sm:text-4xl")}>{p.name}</h3>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-steel">{p.text}</p>
        <dl className="mt-auto grid grid-cols-2 gap-6 border-t border-line pt-6 text-sm [&:not(:first-child)]:mt-10">
          {p.years && (
            <div>
              <dt className="label-caps text-slate">{common.years}</dt>
              <dd className="mt-1.5 text-mist tabular-nums">{p.years}</dd>
            </div>
          )}
          <div className={cn(!p.years && "col-span-2")}>
            <dt className="label-caps text-slate">{common.scope}</dt>
            <dd className="mt-1.5 text-mist">{p.scope.join(" · ")}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
