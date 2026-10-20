"use client";

import type { FC } from "react";

import { usePathname } from "@/shared/i18n";

import { aboutSectionOf } from "@/widgets/content-layout/lib";

import type { ISectionPanelsProps } from "./section-panels.types";

// The layout persists across files, so the section on screen follows the URL here.
const SectionPanels: FC<ISectionPanelsProps> = ({ panels }) => {
  const section = aboutSectionOf(usePathname());

  return (
    <div key={section} className="min-w-0 flex-1 overflow-y-auto">
      {panels[section]}
    </div>
  );
};

export default SectionPanels;
