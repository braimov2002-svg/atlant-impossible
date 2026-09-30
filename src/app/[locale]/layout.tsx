import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geologica, JetBrains_Mono, Onest } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CursorFollower } from "@/components/layout/CursorFollower";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { site } from "@/lib/site";
import "../globals.css";

// Google Fonts, self-hosted at build time by next/font. All include Cyrillic.
// Geologica is variable with a SHRP (sharpness) axis → crisp architectural display type.
const display = Geologica({
  subsets: ["latin", "latin-ext", "cyrillic"],
  axes: ["SHRP"],
  variable: "--font-geologica",
  display: "swap",
});
const sans = Onest({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: "%s" },
    description: t.meta.description,
    alternates: { canonical: `/${locale}` },
    openGraph: { type: "website", siteName: site.name, title: t.meta.title, description: t.meta.description, locale: "uz_UZ" },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
  };
}

export const viewport: Viewport = { themeColor: "#0b0f17", colorScheme: "dark" };

/**
 * Root layout (lives under [locale] so <html lang> follows the route).
 * Header, footer, Lenis and the cursor persist across client-side navigations;
 * only {children} swaps, animated by template.tsx.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: site.name,
    url: site.url,
    areaServed: "UZ",
    address: { "@type": "PostalAddress", addressLocality: "Tashkent", addressCountry: "UZ" },
  };

  return (
    <html lang={locale} className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="min-h-dvh antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll>
          <Header t={t.nav} locale={locale} />
          {children}
          <Footer t={t.footer} nav={t.nav} locale={locale} />
        </SmoothScroll>
        <CursorFollower />
      </body>
    </html>
  );
}
