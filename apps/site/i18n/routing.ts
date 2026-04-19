import { defineRouting } from "next-intl/routing";

export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localeDetection: false,
  localePrefix: "always",
});

export function isLocale(locale: string): locale is Locale {
  return (locales as readonly string[]).includes(locale);
}

export function resolveLocale(locale: string | undefined): Locale {
  return locale && isLocale(locale) ? locale : routing.defaultLocale;
}
