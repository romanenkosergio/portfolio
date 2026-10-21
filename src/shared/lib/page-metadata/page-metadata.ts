import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { OPEN_GRAPH } from "@/shared/config";
import type { Locale } from "@/shared/i18n";
import { DEFAULT_LOCALE, LOCALES, OG_LOCALES } from "@/shared/i18n";

interface IPageMetadataOptions {
  locale: Locale;
  /** The route without its locale prefix: "/", "/about-me/personal-info/bio". */
  path: string;
  /** The page title (the layout template appends the site name); also the og:title. */
  title?: string;
}

// `trailingSlash: true` serves every page under a path ending in "/".
export const localizedPath = (locale: Locale, path: string): string =>
  path === "/" ? `/${locale}/` : `/${locale}${path.replace(/\/+$/, "")}/`;

// Sets the page's own canonical, og:url and hreflang alternates (x-default → the
// default locale); the texts come from the `meta` messages.
export const pageMetadata = async ({
  locale,
  path,
  title
}: IPageMetadataOptions): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: "meta" });
  const url = localizedPath(locale, path);
  const languages = {
    ...Object.fromEntries(
      LOCALES.map(item => [item, localizedPath(item, path)])
    ),
    "x-default": localizedPath(DEFAULT_LOCALE, path)
  };
  return {
    ...(title ? { title } : {}),
    alternates: { canonical: url, languages },
    openGraph: {
      ...OPEN_GRAPH,
      title: title ?? t("ogTitle"),
      description: t("ogDescription"),
      url,
      locale: OG_LOCALES[locale]
    }
  };
};
