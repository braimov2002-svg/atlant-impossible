import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { PageHeader } from "@/components/ui/page-header";
import { GroupSection } from "@/components/sections/GroupSection";
import { Principles } from "@/components/sections/Principles";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { CtaBand } from "@/components/sections/CtaBand";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale);
  return { title: t.meta.pages.about, alternates: { canonical: `/${locale}/about` } };
}

/** /[locale]/about — the group: figures, mission, member companies, principles, partners. */
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
        stats={t.figures.map((f) => ({ value: `${f.value.toLocaleString("en-US").replace(/,/g, " ")}${f.suffix}`, label: f.label }))}
      />
      <GroupSection t={t.group} index="01" />
      <Principles t={t.principles} index="02" />
      <PartnersSection t={t.partners} index="03" />
      <CtaBand t={t.cta} locale={locale} />
    </main>
  );
}
