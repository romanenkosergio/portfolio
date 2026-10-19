import { ILayoutProps } from "@/app/model";
import { AboutView } from "@/pages/about";
import { ContentLayout } from "@/widgets/content-layout";

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
