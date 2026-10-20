import { getTranslations } from "next-intl/server";

import { APP_CONFIG, BASE_PATH, CSP, REFERRER_POLICY } from "@/shared/config";
import { DEFAULT_LOCALE } from "@/shared/i18n";

// GitHub Pages has no middleware, and the root has no <html> of its own (the real root
// layout is app/[locale]/layout.tsx), so this page renders the document itself: a meta
// refresh and a fallback link to /en/, canonical pointing there.
const Root = async () => {
  const t = await getTranslations({
    locale: DEFAULT_LOCALE,
    namespace: "root"
  });
  const target = `${BASE_PATH}/${DEFAULT_LOCALE}/`;
  return (
    <html lang={DEFAULT_LOCALE}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={CSP} />
        <meta name="referrer" content={REFERRER_POLICY} />
        <title>{t("title")}</title>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <link
          rel="canonical"
          href={`${APP_CONFIG.BASE_URL}/${DEFAULT_LOCALE}/`}
        />
      </head>
      <body>
        <a href={target} title={t("continue")}>
          {t("continue")}
        </a>
      </body>
    </html>
  );
};

export default Root;
