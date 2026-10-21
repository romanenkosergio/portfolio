import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { CSP, REFERRER_POLICY } from "@/shared/config";
import { DEFAULT_LOCALE } from "@/shared/i18n";

import { NotFound } from "@/pages/not-found";

import { fonts } from "@/app/config";
import { generateIcons } from "@/app/lib";
import "@/app/styles";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({
    locale: DEFAULT_LOCALE,
    namespace: "meta"
  });
  return {
    title: t("appName"),
    robots: { index: false },
    referrer: REFERRER_POLICY,
    icons: generateIcons()
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
        <main className="flex min-h-dvh flex-col">
          <NotFound locale={DEFAULT_LOCALE} />
        </main>
      </body>
    </html>
  );
};

export default GlobalNotFound;
