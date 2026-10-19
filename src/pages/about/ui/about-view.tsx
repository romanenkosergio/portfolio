import type { FC } from "react";

import { useTranslations } from "next-intl";

import { CAREER_START } from "@/shared/config";
import { yearsSince } from "@/shared/lib";
import { ContentWithCodeLines } from "@/shared/ui";

import type { IAboutViewProps } from "./about-view.types";

const AboutView: FC<IAboutViewProps> = ({ type }) => {
  const t = useTranslations("about");
  // Evaluated at build time (static export): the number refreshes on each build/deploy.
  const years = yearsSince(CAREER_START);
  return (
    <div className="flex w-full flex-col">
      <p className="w-fit border-r border-r-line px-3.5 py-2.5 text-secondary-1">
        {t(`types.${type}`)}
      </p>
      <ContentWithCodeLines content={t(`content.${type}`, { years })} />
    </div>
  );
};

export default AboutView;
