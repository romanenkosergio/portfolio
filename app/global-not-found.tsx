import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { CSP, REFERRER_POLICY } from "@/shared/config";
import { DEFAULT_LOCALE } from "@/shared/i18n";

import { NotFound } from "@/pages/not-found";

import { fonts } from "@/app/config";
import "@/app/styles";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({
    locale: DEFAULT_LOCALE,
    namespace: "meta"
  });
  return {
    title: t("appName"),
    robots: { index: false },
    referrer: REFERRER_POLICY
  };
}

// A URL that matches no route (outside every locale): bypasses the layouts, so
// it carries its own <html> and speaks the default language.
const GlobalNotFound = () => {
  return (
    <html lang={DEFAULT_LOCALE} className={fonts}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={CSP} />
      </head>
      <body>
        <NotFound locale={DEFAULT_LOCALE} />
      </body>
    </html>
  );
};

export default GlobalNotFound;
