import type { MetadataRoute } from "next";

import { APP_CONFIG, E_ROUTES } from "@/shared/config";
import { DEFAULT_LOCALE, LOCALES } from "@/shared/i18n";
import type { Locale } from "@/shared/i18n";

export const dynamic = "force-static";

// The pages that render; /about-me and its three folders only redirect.
const PAGES: E_ROUTES[] = [
  E_ROUTES.HOME,
  E_ROUTES.ABOUT_PERSONAL_BIO,
  E_ROUTES.ABOUT_PERSONAL_INTERESTS,
  E_ROUTES.ABOUT_PROFESSIONAL_SKILLS,
  E_ROUTES.ABOUT_PROFESSIONAL_EXPERIENCE,
  E_ROUTES.ABOUT_HOBBIES_GAMES,
  E_ROUTES.ABOUT_HOBBIES_LEARNING,
  E_ROUTES.PROJECTS,
  E_ROUTES.CONTACT
];

const pageUrl = (locale: Locale, path: string): string =>
  `${APP_CONFIG.BASE_URL}/${locale}${path === "/" ? "" : path}/`;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.flatMap(path => {
    const languages = {
      ...Object.fromEntries(
        LOCALES.map(locale => [locale, pageUrl(locale, path)])
      ),
      "x-default": pageUrl(DEFAULT_LOCALE, path)
    };
    return LOCALES.map(locale => ({
      url: pageUrl(locale, path),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: path === E_ROUTES.HOME ? 1 : 0.7,
      alternates: { languages }
    }));
  });
}
