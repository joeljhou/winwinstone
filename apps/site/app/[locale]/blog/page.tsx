import { setRequestLocale } from "next-intl/server";
import BlogPageClient from "@/components/pages/BlogPageClient";
import { resolveLocale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale: routeLocale } = await params;
  const locale = resolveLocale(routeLocale);
  return getPageMetadata(locale, "/blog");
}

export default async function BlogPage({ params }: PageProps) {
  const { locale: routeLocale } = await params;
  const locale = resolveLocale(routeLocale);
  setRequestLocale(locale);

  return <BlogPageClient />;
}
