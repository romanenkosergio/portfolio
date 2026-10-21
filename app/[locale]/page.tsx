import type { FC } from "react";

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { E_ROUTES } from "@/shared/config";
import { homeJsonLd, pageMetadata } from "@/shared/lib";
import { JsonLd } from "@/shared/ui";

import { HomeView } from "@/pages/home";

import { resolveLocale } from "@/app/lib";
import type { ILocaleProps } from "@/app/model";

export async function generateMetadata({
  params
}: ILocaleProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "titles" });
  return pageMetadata({ locale, path: E_ROUTES.HOME, title: t("home") });
}

const Home: FC<ILocaleProps> = async ({ params }) => {
  const locale = await resolveLocale(params);
  return (
    <>
      <JsonLd data={await homeJsonLd(locale)} />
      <HomeView />
    </>
  );
};

export default Home;
