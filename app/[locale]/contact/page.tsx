import type { FC } from "react";

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { E_ROUTES } from "@/shared/config";
import { pageMetadata } from "@/shared/lib";

import { HomeView } from "@/pages/home";

import { resolveLocale } from "@/app/lib";
import type { ILocaleProps } from "@/app/model";

export async function generateMetadata({
  params
}: ILocaleProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "titles" });
  return pageMetadata({ locale, path: E_ROUTES.CONTACT, title: t("contact") });
}

const Contact: FC<ILocaleProps> = async ({ params }) => {
  await resolveLocale(params);
  return <HomeView />;
};

export default Contact;
