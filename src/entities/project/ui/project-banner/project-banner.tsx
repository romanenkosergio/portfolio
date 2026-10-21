import type { FC } from "react";

import { cn } from "@/shared/lib";
import { TechIcon } from "@/shared/ui/tech-icon";

import { COVER_LOGO_ATTR, TECHS } from "@/entities/project/config";

import { ProjectCover } from "../project-cover";

import type { IProjectBannerProps } from "./project-banner.types";

// The generated cover with its tech's logo large on it (a screenshot, `project.image`, will take
// its place once a personal project has one). Pattern and logo move on card hover.
const ProjectBanner: FC<IProjectBannerProps> = ({
  project,
  badge,
  className
}) => {
  const { slug, cover } = project;
  const { icon, accent } = TECHS[cover.tech];

  return (
    <div
      className={cn(
        "relative h-28 flex-none overflow-hidden border-b border-b-line desktop:h-35",
        className
      )}
    >
      <ProjectCover
        slug={slug}
        accent={accent}
        pattern={cover.pattern}
        className="size-full"
      />
      <TechIcon
        {...{ [COVER_LOGO_ATTR]: "" }}
        name={icon}
        style={{ color: accent }}
        className="absolute top-1/2 right-8 size-16 -translate-y-1/2 desktop:size-20"
      />
      <span className="absolute top-3.5 left-4 rounded-full border border-line bg-primary-3/80 px-2.5 py-0.5 text-xs text-secondary-1">
        {badge}
      </span>
    </div>
  );
};

export default ProjectBanner;
