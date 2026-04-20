"use client";

import { useLocale, useMessages } from "next-intl";
import { resolveLocale, type Locale } from "@/i18n/routing";
import { usePathname } from "@/i18n/navigation";
import type { translations } from "./translations";

export type Language = Locale;

type TranslationSet = typeof translations.en;

interface LanguageContextType {
  language: Language;
  languageHref: string;
  t: TranslationSet;
}

export function useLanguage(): LanguageContextType {
  const locale = useLocale();
  const pathname = usePathname();
  const language = resolveLocale(locale);
  const nextLocale = language === "en" ? "zh" : "en";
  const normalizedPath = pathname === "/" ? "/" : `${pathname.replace(/\/$/, "")}/`;
  const languageHref = `/${nextLocale}${normalizedPath}`;
  const t = useMessages() as unknown as TranslationSet;

  return { language, languageHref, t };
}
