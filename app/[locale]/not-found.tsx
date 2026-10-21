import { DEFAULT_LOCALE } from "@/shared/i18n";

import { NotFound } from "@/pages/not-found";

// Rendered for a `notFound()` inside a locale; the view reads the language from the URL itself.
const NotFoundPage = () => {
  return <NotFound locale={DEFAULT_LOCALE} />;
};

export default NotFoundPage;
