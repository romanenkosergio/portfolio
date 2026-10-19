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

import type { ILayoutProps } from "@/app/model";

export const generateStaticParams = () =>
  PROFESSIONAL_INFO_TYPES.map(type => ({ type }));

export async function generateMetadata({
  params
}: ILayoutProps): Promise<Metadata> {
  const { type } = await params;
  return pageMetadata(`${E_ROUTES.ABOUT_PROFESSIONAL}/${type}`);
}

const ProfessionalItemInfo = async ({ params }: ILayoutProps) => {
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
