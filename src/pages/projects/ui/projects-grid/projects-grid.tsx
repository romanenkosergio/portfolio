import type { FC } from "react";

import { ProjectCard } from "@/entities/project";

import type { IProjectsGridProps } from "./projects-grid.types";

// Cards are direct children and keyed by slug, so a later reorder animation can track them.
const ProjectsGrid: FC<IProjectsGridProps> = ({ items, copy }) => {
  if (items.length === 0) {
    return <p className="p-7.5 text-base text-secondary-1">{copy.empty}</p>;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,22rem),1fr))] gap-x-10 gap-y-12 p-7.5 desktop:px-17.5 desktop:py-20">
      {items.map((project, index) => (
        <ProjectCard
          key={project.slug}
          project={project}
          labels={{
            number: copy.numbers[index],
            separator: copy.separator,
            personal: copy.personal,
            stack: copy.stack
          }}
        />
      ))}
    </div>
  );
};

export default ProjectsGrid;
