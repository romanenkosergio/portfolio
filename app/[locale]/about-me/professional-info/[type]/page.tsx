import { notFound } from "next/navigation";

import type { Metadata } from "next";

import { E_ROUTES } from "@/shared/config";
import { pageMetadata } from "@/shared/lib";

import { ContentLayout } from "@/widgets/content-layout";

import {
  AboutView,
  PROFESSIONAL_INFO_TYPES,
  isProfessionalInfoType
} from "@/pages/about";

import { resolveLocale } from "@/app/lib";
import type { ILocaleTypeProps } from "@/app/model";

// Next merges the parent [locale] params, so only the types are listed.
export const generateStaticParams = () =>
  PROFESSIONAL_INFO_TYPES.map(type => ({ type }));

export async function generateMetadata({
  params
}: ILocaleTypeProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { type } = await params;
  return pageMetadata({
    locale,
    path: `${E_ROUTES.ABOUT_PROFESSIONAL}/${type}`
  });
}

const ProfessionalItemInfo = async ({ params }: ILocaleTypeProps) => {
  await resolveLocale(params);
  const { type } = await params;
  if (!isProfessionalInfoType(type)) {
    notFound();
  }
  return (
    <ContentLayout type="about" subType="professional-info">
      <AboutView type={type} />
    </ContentLayout>
  );
};

export default ProfessionalItemInfo;
