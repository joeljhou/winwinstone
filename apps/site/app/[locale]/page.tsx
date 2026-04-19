import { setRequestLocale } from "next-intl/server";
import HomePageClient from "@/components/pages/HomePageClient";
import { resolveLocale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale: routeLocale } = await params;
  const locale = resolveLocale(routeLocale);
  return getPageMetadata(locale, "/");
}

export default async function HomePage({ params }: PageProps) {
  const { locale: routeLocale } = await params;
  const locale = resolveLocale(routeLocale);
  setRequestLocale(locale);

  return <HomePageClient />;
}
