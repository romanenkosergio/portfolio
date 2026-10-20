import type { FC } from "react";

import { cn } from "@/shared/lib";

import { matchesTechs } from "@/entities/project/model";

import type { IProjectsGridProps } from "./projects-grid.types";

// Every card stays in the DOM, keyed by slug, and is hidden when filtered out: a later reorder
// animation can track them, and the server-rendered markup is never rebuilt.
const ProjectsGrid: FC<IProjectsGridProps> = ({ cards, checked, copy }) => {
  const visible = cards.filter(card => matchesTechs(card, checked));

  return (
    <>
      {visible.length === 0 && (
        <p className="p-7.5 text-base text-secondary-1">{copy.empty}</p>
      )}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,22rem),1fr))] gap-x-10 gap-y-12 p-7.5 desktop:px-17.5 desktop:py-20">
        {cards.map(card => (
          <div
            key={card.slug}
            className={cn("flex", !visible.includes(card) && "hidden")}
          >
            {card.node}
          </div>
        ))}
      </div>
    </>
  );
};

export default ProjectsGrid;
