import { ArrowUp } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { site } from "@/lib/site";
import type { Dictionary } from "@/i18n/dictionaries/uz";

export function Footer({ t, nav }: { t: Dictionary["footer"]; nav: Dictionary["nav"] }) {
  return (
    <footer className="relative overflow-hidden border-t border-emerald-line pt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <Logo className="h-10 w-10" />
              <span className="font-display text-sm tracking-[0.18em] text-mist">{site.name}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-sage">{t.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {nav.items.map((i) => (
                <li key={i.href}>
                  <a href={i.href} className="text-sm text-sage transition hover:text-lime">
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Oversized outlined wordmark */}
      <p
        aria-hidden
        className="mt-16 text-center font-display text-[clamp(5rem,22vw,20rem)] leading-[0.8] font-medium tracking-[-0.06em] text-transparent select-none [-webkit-text-stroke:1px_rgb(110_231_183/0.14)] [mask-image:linear-gradient(180deg,#000_30%,transparent)]"
      >
        AGCG
      </p>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 border-t border-emerald-line px-5 py-6 sm:px-8">
        <p className="text-xs text-moss">
          © {new Date().getFullYear()} {site.name}. {t.rights}
        </p>
        <a
          href="#top"
          className="flex items-center gap-2 rounded-full border border-emerald-line px-4 py-2 font-mono text-[10px] tracking-[0.18em] text-sage uppercase transition hover:border-lime/50 hover:text-lime"
        >
          {t.backToTop} <ArrowUp className="h-3 w-3" />
        </a>
      </div>
    </footer>
  );
}
