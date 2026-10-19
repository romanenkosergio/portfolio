import { notFound } from "next/navigation";

import { setRequestLocale } from "next-intl/server";

import type { Locale } from "@/shared/i18n";
import { isLocale } from "@/shared/i18n";

/**
 * The route's locale, validated; also pins it for static rendering (next-intl
 * reads it instead of request headers). Every layout and page calls this first.
 */
export const resolveLocale = async (
  params: Promise<{ locale: string }>
): Promise<Locale> => {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  setRequestLocale(locale);
  return locale;
};
