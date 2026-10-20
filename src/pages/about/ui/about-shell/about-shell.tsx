import type { FC, PropsWithChildren } from "react";

import { useTranslations } from "next-intl";

import { byType } from "@/pages/about/lib";

import { FileTabs } from "../file-tabs";
import { SnippetShowcase } from "../snippet-showcase";

// Persists across the files of About (a layout): the tab bar and the snippet column keep their
// state while only the pane in `children` changes.
const AboutShell: FC<PropsWithChildren> = ({ children }) => {
  const t = useTranslations("about");
  const labels = byType(item => t(`types.${item}`));
  const closeLabels = byType(item => t("tabs.close", { name: labels[item] }));

  return (
    <div className="flex min-w-0 flex-1 flex-col overflow-y-auto desktop:min-h-0 desktop:flex-row desktop:overflow-hidden">
      <div className="flex min-w-0 flex-none flex-col desktop:min-h-0 desktop:flex-1 desktop:border-r desktop:border-r-line">
        <FileTabs
          labels={labels}
          closeLabels={closeLabels}
          navLabel={t("tabs.label")}
        />
        {children}
      </div>
      <div className="flex-none scrollbar-pane desktop:min-h-0 desktop:w-[45%] desktop:max-w-187.5 desktop:overflow-y-auto">
        <SnippetShowcase />
      </div>
    </div>
  );
};

export default AboutShell;
