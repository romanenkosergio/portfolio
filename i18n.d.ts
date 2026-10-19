import type { Locale } from "@/shared/i18n";

import type messages from "./messages/en.json";

// Typed keys: a missing message is a type error, a locale outside routing too.
declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof messages;
  }
}
