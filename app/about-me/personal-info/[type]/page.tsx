import { ContentLayout } from "@/widgets/content-layout";

import { AboutView } from "@/pages/about";

import type { ILayoutProps } from "@/app/model";

export const generateStaticParams = () => [
  { type: "bio" },
  { type: "interests" }
];

const PersonalItemInfo = async ({ params }: ILayoutProps) => {
  const { type } = await params;
  return (
    <ContentLayout type="about" subType="personal-info">
      <AboutView type={type} />
    </ContentLayout>
  );
};

export default PersonalItemInfo;
