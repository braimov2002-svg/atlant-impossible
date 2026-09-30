import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { NavLink } from "./NavLink";
import { BackToTop } from "./BackToTop";
import { site, telHref } from "@/lib/site";
import type { Dictionary } from "@/i18n/dictionaries/uz";

export function Footer({ t, nav, locale }: { t: Dictionary["footer"]; nav: Dictionary["nav"]; locale: string }) {
  const contacts = [
    site.office.address && { icon: MapPin, label: site.office.address, href: undefined },
    ...site.phones.map((p) => ({ icon: Phone, label: p, href: telHref(p) })),
    site.email && { icon: Mail, label: site.email, href: `mailto:${site.email}` },
    site.telegram && { icon: Send, label: site.telegram, href: `https://t.me/${site.telegram.replace("@", "")}` },
  ].filter(Boolean) as { icon: typeof MapPin; label: string; href?: string }[];

  return (
    <footer className="relative mt-16 overflow-hidden border-t border-line">
      <div className="bg-blueprint pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,#000,transparent_70%)] opacity-60" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pt-20 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <Logo className="h-11 w-11" />
            <div className="leading-none">
              <p className="font-sharp text-lg font-medium tracking-[0.28em] text-mist">ATLANT</p>
              <p className="pt-1 font-mono text-[10px] tracking-[0.26em] text-steel uppercase">Group of Companies</p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-steel">{t.tagline}</p>
        </div>
        <nav aria-label={t.pages}>
          <p className="font-mono text-[10px] tracking-[0.24em] text-slate uppercase">{t.pages}</p>
          <ul className="mt-4 space-y-2.5">
            {nav.items.map((i) => (
              <li key={i.href}>
                <NavLink href={`/${locale}${i.href}`} className="text-sm text-steel transition hover:text-gold">
                  {i.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-mono text-[10px] tracking-[0.24em] text-slate uppercase">{t.contact}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-steel">
            <li className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-gold" /> Toshkent, O‘zbekiston
            </li>
            {contacts.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a href={href} className="flex items-center gap-2.5 transition hover:text-cyan">
                  <Icon className="h-4 w-4 text-gold" /> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p
        aria-hidden
        className="font-sharp relative mt-14 text-center text-[clamp(4.5rem,19vw,17rem)] leading-[0.8] font-extralight tracking-[0.04em] text-transparent select-none [-webkit-text-stroke:1px_rgb(226_184_89/0.22)] [mask-image:linear-gradient(180deg,#000_35%,transparent)]"
      >
        ATLANT
      </p>

      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 border-t border-line px-5 py-6 sm:px-8">
        <p className="text-xs text-slate">
          © {new Date().getFullYear()} {site.name}. {t.rights}
        </p>
        <BackToTop label={t.backToTop} />
      </div>
    </footer>
  );
}
