import type { FC } from "react";

import { useTranslations } from "next-intl";

import { CAREER_START } from "@/shared/config";
import { yearsSince } from "@/shared/lib";
import { ContentWithCodeLines } from "@/shared/ui";

import type { IAboutViewProps } from "./about-view.types";

// The pane of one file; its own scroll container, so a new file starts at the top.
const AboutView: FC<IAboutViewProps> = ({ type }) => {
  const t = useTranslations("about");
  // Evaluated at build time (static export): the number refreshes on each build/deploy.
  const years = yearsSince(CAREER_START);

  return (
    <div className="scrollbar-pane desktop:min-h-0 desktop:flex-1 desktop:overflow-x-hidden desktop:overflow-y-auto">
      <ContentWithCodeLines content={t(`content.${type}`, { years })} />
    </div>
  );
};

export default AboutView;
