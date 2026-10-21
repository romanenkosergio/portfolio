import type { FC } from "react";

import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/button";

import { badgeTechs } from "@/entities/project/lib";

import { ProjectBanner } from "../project-banner";
import { TechBadge } from "../tech-badge";

import type { IProjectCardProps } from "./project-card.types";

// One box: a generated banner (the main tech's logo large on its own colour and pattern, or a
// screenshot once the project has one), then the title, role, summary and a footer pinned to the
// bottom so cards of one grid row share a height without a gap in the middle.
const ProjectCard: FC<IProjectCardProps> = ({ project, labels }) => {
  const { kind, stack, title, domain, role, summary, href, featured } = project;

  return (
    <article
      className={cn(
        "flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-line bg-primary-3 transition-colors focus-within:border-accent-1 hover:border-accent-1",
        featured && "@2xl:flex-row"
      )}
    >
      <ProjectBanner
        project={project}
        badge={kind === "personal" ? labels.personal : labels.commercial}
        className={
          featured
            ? "@2xl:h-auto @2xl:w-2/5 @2xl:border-r @2xl:border-b-0"
            : undefined
        }
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-col gap-1">
          <p className="text-xs text-secondary-1">
            <span className="font-bold text-secondary-3">{labels.number}</span>{" "}
            {labels.separator}
          </p>
          <h2 className="text-2xl leading-tight font-bold break-words text-white">
            {title}
          </h2>
        </div>
        <p className="flex flex-wrap gap-x-3 gap-y-0.5 text-sm text-secondary-1">
          <span className="text-white">{role}</span>
          <span>{domain}</span>
        </p>
        <p className="text-base leading-normal text-secondary-1">{summary}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
          <ul aria-label={labels.stack} className="flex flex-wrap gap-1.5">
            {badgeTechs(stack).map(tech => (
              <TechBadge key={tech} tech={tech} />
            ))}
          </ul>
          {href !== undefined && (
            <Button
              variant="primary"
              isExternalLink
              target="_blank"
              href={href}
              title={labels.viewTitle}
              text={labels.view}
            />
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
