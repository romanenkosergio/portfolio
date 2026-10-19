import type { FC } from "react";

import { ContentWithCodeLines } from "@/shared/ui";

import { ABOUT_CONTENT } from "@/pages/about";

import type { IAboutViewProps } from "./about-view.types";

const AboutView: FC<IAboutViewProps> = ({ type }) => {
  return (
    <div className="flex w-full flex-col">
      <p className="w-fit border-r border-r-line px-3.5 py-2.5 text-secondary-1">
        {type}
      </p>
      <ContentWithCodeLines content={ABOUT_CONTENT[type]} />
    </div>
  );
};

export default AboutView;
