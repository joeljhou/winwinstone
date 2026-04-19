import { setRequestLocale } from "next-intl/server";
import ProductsPageClient from "@/components/pages/ProductsPageClient";
import { resolveLocale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale: routeLocale } = await params;
  const locale = resolveLocale(routeLocale);
  return getPageMetadata(locale, "/products");
}

export default async function ProductsPage({ params }: PageProps) {
  const { locale: routeLocale } = await params;
  const locale = resolveLocale(routeLocale);
  setRequestLocale(locale);

  return <ProductsPageClient />;
}
