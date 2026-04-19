"use client";

import { useLocale, useMessages } from "next-intl";
import { resolveLocale, type Locale } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { translations } from "./translations";

export type Language = Locale;

type TranslationSet = typeof translations.en;

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: TranslationSet;
}

export function useLanguage(): LanguageContextType {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const language = resolveLocale(locale);
  const t = useMessages() as unknown as TranslationSet;

  const toggleLanguage = () => {
    const nextLocale = language === "en" ? "zh" : "en";
    const query = window.location.search;
    const hash = window.location.hash;
    const href = `${pathname}${query}${hash}`;

    router.replace(href, { locale: nextLocale });
  };

  return { language, toggleLanguage, t };
}
