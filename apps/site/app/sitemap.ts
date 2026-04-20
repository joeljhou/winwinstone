import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getLocalizedPath, metadataBase, type LocalizedPathname } from "@/lib/seo";

const routes: LocalizedPathname[] = ["/", "/products", "/blog"];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: new URL(getLocalizedPath(locale, route), metadataBase).toString(),
      lastModified: new Date("2026-04-20"),
      changeFrequency: route === "/" ? "weekly" : "monthly",
      priority: route === "/" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((alternateLocale) => [
            alternateLocale,
            new URL(getLocalizedPath(alternateLocale, route), metadataBase).toString(),
          ]),
        ),
      },
    })),
  );
}
