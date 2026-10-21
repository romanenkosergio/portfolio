import type { FC } from "react";

import Image from "next/image";

import { TechIcon } from "@/shared/ui/tech-icon";

import { TECHS } from "@/entities/project/config";

import { ProjectCover } from "../project-cover";

import type { IProjectBannerProps } from "./project-banner.types";

// The generated cover with the main tech's logo large on it, or a screenshot once the project has one.
const ProjectBanner: FC<IProjectBannerProps> = ({ project, badge, index }) => {
  const { slug, stack, image } = project;
  const { icon, accent } = TECHS[stack[0]];

  return (
    <div className="relative h-32 flex-none border-b border-b-line">
      <ProjectCover
        slug={slug}
        accent={accent}
        variant={index}
        className="size-full"
      />
      {image === undefined ? (
        <TechIcon
          name={icon}
          style={{ color: accent }}
          className="absolute top-1/2 right-8 size-16 -translate-y-1/2"
        />
      ) : (
        <Image
          src={image.src}
          alt={image.alt}
          title={image.alt}
          fill
          sizes="(min-width: 768px) 22rem, 100vw"
          className="object-cover"
        />
      )}
      <span className="absolute top-3.5 left-4 rounded-full border border-line bg-primary-3/80 px-2.5 py-0.5 text-xs text-secondary-1">
        {badge}
      </span>
    </div>
  );
};

export default ProjectBanner;
