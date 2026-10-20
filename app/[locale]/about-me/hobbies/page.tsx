import { E_ROUTES } from "@/shared/config";
import { permanentRedirect } from "@/shared/i18n";

import { resolveLocale } from "@/app/lib";
import type { ILocaleProps } from "@/app/model";

const About = async ({ params }: ILocaleProps) => {
  const locale = await resolveLocale(params);
  permanentRedirect({ href: E_ROUTES.ABOUT_HOBBIES_GAMES, locale });
};

export default About;
