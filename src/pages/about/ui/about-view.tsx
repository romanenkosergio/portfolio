import type { FC } from "react";

import { useTranslations } from "next-intl";

import { ContentWithCodeLines } from "@/shared/ui";

import type { IAboutViewProps } from "./about-view.types";

const AboutView: FC<IAboutViewProps> = ({ type }) => {
  const t = useTranslations("about");
  return (
    <div className="flex w-full flex-col">
      <p className="w-fit border-r border-r-line px-3.5 py-2.5 text-secondary-1">
        {t(`types.${type}`)}
      </p>
      <ContentWithCodeLines content={t(`content.${type}`)} />
    </div>
  );
};

export default AboutView;
