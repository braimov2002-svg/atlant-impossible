"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { InquiryForm } from "./InquiryForm";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { site, telHref } from "@/lib/site";
import type { Dictionary } from "@/i18n/dictionaries/uz";

/** Contact block: head office details + the four-step project inquiry. */
export function ContactSection({ t, index }: { t: Dictionary["contact"]; index?: string }) {
  const contacts = [
    ...site.phones.map((p) => ({ icon: Phone, label: p, href: telHref(p) })),
    site.email && { icon: Mail, label: site.email, href: `mailto:${site.email}` },
    site.telegram && { icon: Send, label: site.telegram, href: `https://t.me/${site.telegram.replace("@", "")}` },
  ].filter(Boolean) as { icon: typeof Phone; label: string; href: string }[];

  return (
    <section id="contact" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="flex flex-col gap-10 lg:col-span-5">
          <SectionHeading index={index} eyebrow={t.eyebrow} title={t.title} accent={t.accent} description={t.description} />
          <ul className="space-y-2.5">
            {t.perks.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm text-steel">
                <span className="h-px w-5 bg-gold" /> {p}
              </li>
            ))}
          </ul>
          <address className="border-t border-line pt-8 not-italic">
            <p className="label-caps text-gold">{t.hq}</p>
            <p className="mt-4 flex items-start gap-3 text-[15px] text-mist">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-steel" /> {site.office.address}
            </p>
            <ul className="mt-4 space-y-3 text-[15px]">
              {contacts.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a href={href} className="flex items-center gap-3 text-mist tabular-nums transition hover:text-gold">
                    <Icon className="h-4 w-4 shrink-0 text-steel" /> {label}
                  </a>
                </li>
              ))}
            </ul>
          </address>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO }}
          className="border border-line bg-obsidian-850 p-6 sm:p-10 lg:col-span-7"
        >
          <InquiryForm t={t} />
        </motion.div>
      </div>
    </section>
  );
}
