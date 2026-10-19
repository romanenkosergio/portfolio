import { defineRouting } from "next-intl/routing";

// Every route lives under /[locale] (D4): the prefix is always in the URL, so a
// static export can serve each language from its own folder.
export const routing = defineRouting({
  locales: ["en", "uk", "ru"],
  defaultLocale: "en",
  localePrefix: "always"
});

export const LOCALES = routing.locales;
export const DEFAULT_LOCALE = routing.defaultLocale;

export type Locale = (typeof LOCALES)[number];

export const isLocale = (value: string): value is Locale =>
  LOCALES.some(locale => locale === value);

// A language is always named in itself (paired with `lang` where shown), never translated.
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  uk: "Українська",
  ru: "Русский"
};

// og:locale wants language_TERRITORY.
export const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  uk: "uk_UA",
  ru: "ru_RU"
};
