import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { PageHeader } from "@/components/ui/page-header";
import { Timeline } from "@/components/sections/about/Timeline";
import { Values } from "@/components/sections/about/Values";
import { GroupCompanies } from "@/components/sections/about/GroupCompanies";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale);
  return { title: t.meta.pages.about, alternates: { canonical: `/${locale}/about` } };
}

/** /[locale]/about — the group: mission, member companies, footprint timeline, values. */
export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  return (
    <main>
      <PageHeader
        locale={locale}
        home={t.nav.items[0].label}
        eyebrow={t.aboutPage.eyebrow}
        title={t.aboutPage.title}
        accent={t.aboutPage.accent}
        description={t.aboutPage.description}
        stats={t.hero.metrics.map((m) => ({ value: `${m.prefix}${m.value.toFixed(m.decimals)}${m.suffix}`, label: m.label }))}
      />
      <GroupCompanies t={t.aboutPage.group} />
      <Timeline t={t.aboutPage} cityNames={t.common.cities} sample={t.common.sample} />
      <Values t={t.aboutPage} locale={locale} />
    </main>
  );
}
