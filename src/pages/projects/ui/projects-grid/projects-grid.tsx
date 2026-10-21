import type { FC } from "react";

import { cn } from "@/shared/lib";
import { PENDING_ATTR } from "@/shared/lib/motion";

import { matchesTechs } from "@/entities/project/model";

import { CARD_ATTR, isEagerCard, EMPTY_ATTR } from "@/pages/projects/lib";

import type { IProjectsGridProps } from "./projects-grid.types";

// Every card stays in the DOM, keyed by slug, and is hidden when filtered out: Flip tracks them
// across a filter change, and the server-rendered markup is never rebuilt.
const ProjectsGrid: FC<IProjectsGridProps> = ({
  cards,
  checked,
  copy,
  rootRef
}) => {
  const visible = cards.filter(card => matchesTechs(card, checked));

  return (
    <div ref={rootRef}>
      {visible.length === 0 && (
        <p
          {...{ [EMPTY_ATTR]: "" }}
          className="p-7.5 text-base text-secondary-1"
        >
          {copy.empty}
        </p>
      )}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,22rem),1fr))] gap-x-10 gap-y-12 p-7.5 desktop:px-17.5 desktop:py-20">
        {cards.map((card, index) => (
          <div
            key={card.slug}
            {...{
              [CARD_ATTR]: "",
              ...(isEagerCard(index) ? {} : { [PENDING_ATTR]: "" })
            }}
            className={cn("flex", !visible.includes(card) && "hidden")}
          >
            {card.node}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsGrid;
