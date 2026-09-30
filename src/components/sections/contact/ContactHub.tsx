"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ConsultationForm } from "./ConsultationForm";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { site } from "@/lib/site";
import type { Dictionary } from "@/i18n/dictionaries/uz";

const ContactCanvas = dynamic(() => import("./ContactCanvas"), {
  ssr: false,
  loading: () => <div className="bg-field-grid absolute inset-0" />,
});

export function ContactHub({ t, crops }: { t: Dictionary["contact"]; crops: string[] }) {
  const reduced = useReducedMotion();
  // Only render contact rows that have real values (see src/lib/site.ts)
  const rows = [
    site.office.address && { icon: MapPin, label: site.office.address, href: undefined },
    site.phone && { icon: Phone, label: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    site.email && { icon: Mail, label: site.email, href: `mailto:${site.email}` },
    site.telegram && { icon: Send, label: site.telegram, href: `https://t.me/${site.telegram.replace("@", "")}` },
  ].filter(Boolean) as { icon: typeof MapPin; label: string; href?: string }[];

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="05" eyebrow={t.eyebrow} title={t.title} accent={t.titleAccent} description={t.description} />

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* ── 3D portal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO }}
            className="relative flex min-h-[420px] flex-col overflow-hidden rounded-[28px] border border-emerald-line bg-[radial-gradient(ellipse_at_60%_30%,#10301f,#07140d_70%)] lg:col-span-5"
          >
            <ContactCanvas office={site.office} reducedMotion={reduced} />
            <div className="pointer-events-none relative mt-auto p-5">
              <div className="glass-strong pointer-events-auto rounded-2xl p-5">
                <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-lime uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-lime opacity-70" />
                    <span className="relative h-2 w-2 rounded-full bg-lime" />
                  </span>
                  {t.office}
                </p>
                <p className="mt-2 font-display text-lg text-mist">{t.city}</p>
                <p className="mt-1 font-mono text-[11px] text-moss">
                  {site.office.lat.toFixed(4)}° N · {site.office.lon.toFixed(4)}° E
                </p>
                {rows.length > 0 && (
                  <ul className="mt-4 space-y-2 border-t border-emerald-line pt-4">
                    {rows.map(({ icon: Icon, label, href }) => (
                      <li key={label}>
                        <a href={href} className="flex items-center gap-3 text-sm text-sage transition hover:text-lime">
                          <Icon className="h-4 w-4 text-gold" />
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-4 flex items-center gap-2 text-xs text-moss">
                  <Clock className="h-3.5 w-3.5" /> UTC+5 · Tashkent
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Multi-step form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="glass-strong rounded-[28px] p-6 sm:p-8 lg:col-span-7"
          >
            <ConsultationForm t={t} crops={crops} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
