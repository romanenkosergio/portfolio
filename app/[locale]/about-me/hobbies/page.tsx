import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { E_ROUTES } from "@/shared/config";
import { pageMetadata } from "@/shared/lib";

import { resolveLocale } from "@/app/lib";
import type { ILocaleProps } from "@/app/model";

export async function generateMetadata({
  params
}: ILocaleProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "titles" });
  return pageMetadata({
    locale,
    path: E_ROUTES.ABOUT_HOBBIES,
    title: t("hobbies")
  });
}

const AboutMeHobbies = async ({ params }: ILocaleProps) => {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "hobbies" });
  return <div>{t("placeholder")}</div>;
};

export default AboutMeHobbies;
