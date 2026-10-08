import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { NavLink } from "./NavLink";
import { BackToTop } from "./BackToTop";
import { site, telHref } from "@/lib/site";
import type { Dictionary } from "@/i18n/dictionaries/uz";

export function Footer({ t, nav, locale }: { t: Dictionary["footer"]; nav: Dictionary["nav"]; locale: string }) {
  const contacts = [
    ...site.phones.map((p) => ({ icon: Phone, label: p, href: telHref(p) })),
    site.email && { icon: Mail, label: site.email, href: `mailto:${site.email}` },
    site.telegram && { icon: Send, label: site.telegram, href: `https://t.me/${site.telegram.replace("@", "")}` },
  ].filter(Boolean) as { icon: typeof MapPin; label: string; href: string }[];

  return (
    <footer className="relative border-t border-line bg-obsidian-950">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pt-20 pb-14 sm:px-8 md:grid-cols-[1.5fr_1fr_1.2fr]">
        <div className="max-w-sm">
          <div className="flex items-center gap-3 text-mist">
            <Logo className="h-10 w-10" />
            <div className="leading-none">
              <p className="font-display text-lg font-semibold tracking-[0.22em]">ATLANT</p>
              <p className="label-caps pt-1 !text-[9.5px] text-steel">Group of Companies</p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-steel">{t.tagline}</p>
        </div>
        <nav aria-label={t.pages}>
          <p className="label-caps text-slate">{t.pages}</p>
          <ul className="mt-5 space-y-3">
            {nav.items.map((i) => (
              <li key={i.href}>
                <NavLink href={`/${locale}${i.href}`} className="text-sm text-steel transition hover:text-mist">
                  {i.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="label-caps text-slate">{t.contact}</p>
          <ul className="mt-5 space-y-3 text-sm text-steel">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {site.office.address}
            </li>
            {contacts.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a href={href} className="flex items-center gap-3 tabular-nums transition hover:text-mist">
                  <Icon className="h-4 w-4 shrink-0 text-gold" /> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-center justify-between gap-4 border-t border-line py-6">
          <p className="text-xs text-slate">
            © {new Date().getFullYear()} {site.name}. {t.rights}
          </p>
          <BackToTop label={t.backToTop} />
        </div>
      </div>
    </footer>
  );
}
