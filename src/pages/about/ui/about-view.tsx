import type { FC } from "react";

import { useTranslations } from "next-intl";

import { CAREER_START } from "@/shared/config";
import { yearsSince } from "@/shared/lib";
import { ContentWithCodeLines } from "@/shared/ui";

import { byType } from "../lib";

import type { IAboutViewProps } from "./about-view.types";
import { FileTabs } from "./file-tabs";
import { SnippetShowcase } from "./snippet-showcase";

const AboutView: FC<IAboutViewProps> = ({ type }) => {
  const t = useTranslations("about");
  // Evaluated at build time (static export): the number refreshes on each build/deploy.
  const years = yearsSince(CAREER_START);
  const labels = byType(item => t(`types.${item}`));
  const closeLabels = byType(item => t("tabs.close", { name: labels[item] }));

  return (
    <div className="flex min-w-0 flex-1 flex-col overflow-y-auto desktop:min-h-0 desktop:flex-row desktop:overflow-hidden">
      <div className="flex min-w-0 flex-none flex-col desktop:min-h-0 desktop:flex-1 desktop:border-r desktop:border-r-line">
        <FileTabs current={type} labels={labels} closeLabels={closeLabels} />
        <div className="scrollbar-pane desktop:min-h-0 desktop:flex-1 desktop:overflow-auto">
          <ContentWithCodeLines content={t(`content.${type}`, { years })} />
        </div>
      </div>
      <div className="flex-none scrollbar-pane desktop:min-h-0 desktop:w-[45%] desktop:max-w-187.5 desktop:overflow-y-auto">
        <SnippetShowcase />
      </div>
    </div>
  );
};

export default AboutView;
