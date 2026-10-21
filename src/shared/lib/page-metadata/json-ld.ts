import { getTranslations } from "next-intl/server";

import {
  APP_CONFIG,
  GITHUB_URL,
  LINKEDIN_URL,
  OPEN_GRAPH
} from "@/shared/config";
import type { Locale } from "@/shared/i18n";

import { localizedPath } from "./page-metadata";

const KNOWS_ABOUT = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS"
];

/** schema.org `Person` + `WebSite` for a locale's home page, from the `meta` messages. */
export const homeJsonLd = async (locale: Locale) => {
  const t = await getTranslations({ locale, namespace: "meta" });
  const url = `${APP_CONFIG.BASE_URL}${localizedPath(locale, "/")}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: t("appName"),
        jobTitle: t("jobTitle"),
        description: t("appDescription"),
        url,
        image: `${APP_CONFIG.BASE_URL}${OPEN_GRAPH.images.url}`,
        sameAs: [GITHUB_URL, LINKEDIN_URL],
        knowsAbout: KNOWS_ABOUT
      },
      { "@type": "WebSite", name: t("appName"), url, inLanguage: locale }
    ]
  };
};
