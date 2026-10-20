import { notFound } from "next/navigation";

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { E_ROUTES } from "@/shared/config";
import { pageMetadata } from "@/shared/lib";

import { ContentLayout } from "@/widgets/content-layout";

import { AboutView, HOBBIES_TYPES, isHobbiesType } from "@/pages/about";

import { resolveLocale } from "@/app/lib";
import type { ILocaleTypeProps } from "@/app/model";

// Next merges the parent [locale] params, so only the types are listed.
export const generateStaticParams = () => HOBBIES_TYPES.map(type => ({ type }));

export async function generateMetadata({
  params
}: ILocaleTypeProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { type } = await params;
  const t = await getTranslations({ locale, namespace: "titles" });
  return pageMetadata({
    locale,
    path: `${E_ROUTES.ABOUT_HOBBIES}/${type}`,
    title: isHobbiesType(type) ? t(type) : undefined
  });
}

const HobbiesItem = async ({ params }: ILocaleTypeProps) => {
  await resolveLocale(params);
  const { type } = await params;
  if (!isHobbiesType(type)) {
    notFound();
  }
  return (
    <ContentLayout type="about" subType="hobbies">
      <AboutView type={type} />
    </ContentLayout>
  );
};

export default HobbiesItem;
