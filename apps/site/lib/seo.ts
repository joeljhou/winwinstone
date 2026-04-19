import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { translations } from "./translations";

export const metadataBase = new URL("https://winwinstonecustom.vercel.app");

export type LocalizedPathname = "/" | "/products" | "/blog";

export function getLocalizedPath(locale: Locale, pathname: LocalizedPathname) {
  return `/${locale}${pathname === "/" ? "" : pathname}`;
}

function getLanguageAlternates(pathname: LocalizedPathname) {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, getLocalizedPath(locale, pathname)]),
  );
}

export function getPageMetadata(
  locale: Locale,
  pathname: LocalizedPathname,
): Metadata {
  const t = translations[locale];
  const image = pathname === "/blog" ? "/images/calacatta-sink.jpg" : "/images/green-marble-sink.jpg";

  const page =
    pathname === "/products"
      ? {
          title: `${t.productsPage.heroEyebrow} | ${t.brandName}`,
          description: t.productsPage.heroCopy,
        }
      : pathname === "/blog"
        ? {
            title: `${t.blogPage.heroEyebrow} | ${t.brandName}`,
            description: t.blogPage.heroCopy,
          }
        : {
            title: t.metaTitle,
            description: t.metaDescription,
          };

  const url = getLocalizedPath(locale, pathname);

  return {
    metadataBase,
    title: page.title,
    description: page.description,
    alternates: {
      canonical: url,
      languages: getLanguageAlternates(pathname),
    },
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
      url,
      images: [image],
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? ["en_US"] : ["zh_CN"],
    },
  };
}
