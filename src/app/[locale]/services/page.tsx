import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { PageHeader } from "@/components/ui/page-header";
import { ServicesList } from "@/components/sections/ServicesList";
import { FullCycle } from "@/components/sections/FullCycle";
import { Principles } from "@/components/sections/Principles";
import { CtaBand } from "@/components/sections/CtaBand";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale);
  return { title: t.meta.pages.services, alternates: { canonical: `/${locale}/services` } };
}

/** /[locale]/services — the group's service lines, the full cycle and working principles. */
export default async function ServicesRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  return (
    <main>
      <PageHeader
        locale={locale}
        home={t.nav.items[0].label}
        eyebrow={t.servicesPage.eyebrow}
        title={t.servicesPage.title}
        accent={t.servicesPage.accent}
        description={t.servicesPage.description}
      />
      <ServicesList t={t.servicesPage.services} />
      <FullCycle t={t.cycle} index="01" />
      <Principles t={t.principles} index="02" />
      <CtaBand t={t.cta} locale={locale} />
    </main>
  );
}
