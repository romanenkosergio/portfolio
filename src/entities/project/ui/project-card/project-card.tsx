import type { FC } from "react";

import { badgeTechs } from "@/entities/project/lib";

import { ProjectCover } from "../project-cover";
import { TechBadge } from "../tech-badge";

import type { IProjectCardProps } from "./project-card.types";

// The title sits above the card, like a file name over its preview. `h-full` + the flex column
// let cards of one grid row share a height.
const ProjectCard: FC<IProjectCardProps> = ({ project, labels }) => {
  const { slug, kind, stack, title, domain, role, summary } = project;

  return (
    <article className="flex min-w-0 flex-1 flex-col gap-3.5">
      <h2 className="text-base font-normal text-secondary-1">
        <span className="font-bold text-secondary-3">{labels.number}</span>{" "}
        {labels.separator} {title}
      </h2>
      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-line bg-primary-3">
        <div className="relative h-36 flex-none border-b border-b-line">
          <ProjectCover slug={slug} className="size-full" />
          {kind === "personal" && (
            <span className="absolute top-4.5 left-4 rounded-sm border border-line bg-primary-3/80 px-2 py-0.5 text-xs text-secondary-1">
              {labels.personal}
            </span>
          )}
          <ul
            aria-label={labels.stack}
            className="absolute top-4.5 right-4 flex gap-1.5"
          >
            {badgeTechs(stack).map(tech => (
              <TechBadge key={tech} tech={tech} />
            ))}
          </ul>
        </div>
        <div className="flex flex-1 flex-col gap-5 p-7.5">
          <p className="text-lg leading-normal text-secondary-1">{summary}</p>
          <p className="mt-auto flex flex-wrap gap-x-3 gap-y-1 text-sm text-secondary-1">
            <span className="text-white">{role}</span>
            <span>{domain}</span>
          </p>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
