import type { Locale } from "@/shared/i18n";

export interface INotFoundProps {
  /** The language to server-render; the browser may swap it for the visitor's. */
  locale: Locale;
}
