import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { PageHeader } from "@/components/ui/page-header";
import { ServicesBentoPage } from "@/components/sections/services/ServicesPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale);
  return { title: t.meta.pages.services, alternates: { canonical: `/${locale}/services` } };
}

/** /[locale]/services — bento of the three disciplines over live material shaders. */
export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
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
      <ServicesBentoPage t={t.servicesPage} locale={locale} />
    </main>
  );
}
