import type { FC } from "react";

import { LOCALES } from "@/shared/i18n";
import type { Locale } from "@/shared/i18n";

import { NotFoundView } from "../not-found-view";

import type { INotFoundProps } from "./not-found.types";

const loadMessages = async (locale: Locale) => {
  const { default: messages } = await import(
    `../../../../../messages/${locale}.json`
  );
  return messages.notFound;
};

// GitHub Pages serves one `404.html` for every missing path (the export emits no
// `/<locale>/404.html`), so the server cannot know the visitor's language. It
// renders the default one, and the client swaps it for the locale in the URL.
// Only the small `notFound` namespace of each locale travels with the page.
const NotFound: FC<INotFoundProps> = async ({ locale }) => {
  const [en, uk, ru] = await Promise.all(LOCALES.map(loadMessages));
  return <NotFoundView locale={locale} messages={{ en, uk, ru }} />;
};

export default NotFound;
