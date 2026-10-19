import { getRequestConfig } from "next-intl/server";

import { DEFAULT_LOCALE, isLocale } from "./routing";

// Reached through the next-intl plugin in next.config.ts. A static export has no
// request, so the locale comes from `setRequestLocale` in the layout and pages.
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = requested && isLocale(requested) ? requested : DEFAULT_LOCALE;
  return {
    locale,
    messages: (await import(`../../../messages/${locale}.json`)).default
  };
});
