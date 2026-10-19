import { notFound } from "next/navigation";

import type { Metadata } from "next";

import { E_ROUTES } from "@/shared/config";
import { pageMetadata } from "@/shared/lib";

import { ContentLayout } from "@/widgets/content-layout";

import {
  AboutView,
  PERSONAL_INFO_TYPES,
  isPersonalInfoType
} from "@/pages/about";

import type { ILayoutProps } from "@/app/model";

export const generateStaticParams = () =>
  PERSONAL_INFO_TYPES.map(type => ({ type }));

export async function generateMetadata({
  params
}: ILayoutProps): Promise<Metadata> {
  const { type } = await params;
  return pageMetadata(`${E_ROUTES.ABOUT_PERSONAL}/${type}`);
}

const PersonalItemInfo = async ({ params }: ILayoutProps) => {
  const { type } = await params;
  if (!isPersonalInfoType(type)) {
    notFound();
  }
  return (
    <ContentLayout type="about" subType="personal-info">
      <AboutView type={type} />
    </ContentLayout>
  );
};

export default PersonalItemInfo;
