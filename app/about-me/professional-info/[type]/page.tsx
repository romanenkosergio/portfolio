import { ILayoutProps } from "@/app/model";
import { AboutView } from "@/pages/about";
import { ContentLayout } from "@/widgets/content-layout";

export const generateStaticParams = () => [
  { type: "skills" },
  { type: "experience" }
];

const ProfessionalItemInfo = async ({ params }: ILayoutProps) => {
  const { type } = await params;
  return (
    <ContentLayout type="about" subType="professional-info">
      <AboutView type={type} />
    </ContentLayout>
  );
};

export default ProfessionalItemInfo;
