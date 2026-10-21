import type { AbstractIntlMessages } from "next-intl";

import type { Locale } from "@/shared/i18n";

export interface INotFoundViewProps {
  /** The language the server rendered. */
  locale: Locale;
  /** The `notFound` messages of every locale. */
  messages: Record<Locale, AbstractIntlMessages>;
}
