"use client";

import { motion } from "framer-motion";
import { Clock3, Globe, Mail, MapPin, Phone, PencilRuler, Send } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { InquiryForm } from "./InquiryForm";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { site, telHref } from "@/lib/site";
import type { Dictionary } from "@/i18n/dictionaries/uz";

export function ConsultationPortal({
  t,
  types,
  cities,
}: {
  t: Dictionary["contact"];
  types: Dictionary["common"]["types"];
  cities: Record<string, string>;
}) {
  const contacts = [
    ...site.phones.map((p) => ({ icon: Phone, label: p, href: telHref(p) })),
    site.email && { icon: Mail, label: site.email, href: `mailto:${site.email}` },
    site.telegram && { icon: Send, label: site.telegram, href: `https://t.me/${site.telegram.replace("@", "")}` },
  ].filter(Boolean) as { icon: typeof Phone; label: string; href: string }[];

  const perks = [PencilRuler, Clock3, Globe].map((icon, i) => ({ icon, text: t.perks[i] }));

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-5">
            <SectionHeading index="05" eyebrow={t.eyebrow} title={t.title} accent={t.accent} description={t.description} />
            <ul className="flex flex-wrap gap-2">
              {perks.map(({ icon: Icon, text }) => (
                <li key={text} className="glass flex items-center gap-2 rounded-full px-3.5 py-2 text-xs text-steel">
                  <Icon className="h-3.5 w-3.5 text-gold" /> {text}
                </li>
              ))}
            </ul>
            <div className="glass-strong relative overflow-hidden rounded-3xl p-6">
              <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-60" />
              <p className="relative flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-cyan uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
                  <span className="relative h-2 w-2 rounded-full bg-cyan" />
                </span>
                {t.hq}
              </p>
              <p className="font-sharp relative mt-3 text-2xl font-light text-mist">{t.city}</p>
              <p className="relative mt-1 font-mono text-[11px] text-slate">
                {site.office.lat.toFixed(4)}° N · {site.office.lon.toFixed(4)}° E
              </p>
              {(site.office.address || contacts.length > 0) && (
                <ul className="relative mt-5 space-y-2 border-t border-line pt-5 text-sm text-steel">
                  {site.office.address && (
                    <li className="flex items-center gap-2.5">
                      <MapPin className="h-4 w-4 text-gold" /> {site.office.address}
                    </li>
                  )}
                  {contacts.map(({ icon: Icon, label, href }) => (
                    <li key={label}>
                      <a href={href} className="flex items-center gap-2.5 transition hover:text-cyan">
                        <Icon className="h-4 w-4 text-gold" /> {label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO }}
            className="glass-strong rounded-[30px] p-6 sm:p-8 lg:col-span-7"
          >
            <InquiryForm t={t} types={types} cities={cities} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
