"use client";

import { useState } from "react";
import type { FC } from "react";

import { Icon } from "@/shared/ui";

import {
  matchesTechs,
  orderedTechs,
  toggleTech,
  usedFilterTechs,
  TECHS
} from "@/entities/project";
import type { Tech } from "@/entities/project";

import { ProjectsGrid } from "../projects-grid";
import { TechFilter } from "../tech-filter";

import type { IProjectsExplorerProps } from "./projects-explorer.types";

const FILTERS = usedFilterTechs();

// Filter sidebar, the open «file» tab that names the filter, and the card grid. Nothing checked
// shows every project; otherwise a card stays when it uses any checked tech.
const ProjectsExplorer: FC<IProjectsExplorerProps> = ({ items, copy }) => {
  const [checked, setChecked] = useState<Tech[]>([]);
  const shown = items.filter(project => matchesTechs(project, checked));
  const tab =
    checked.length > 0
      ? orderedTechs(checked)
          .map(tech => TECHS[tech].label)
          .join("; ")
      : copy.all;

  return (
    <section className="flex h-full min-h-0 w-full min-w-0 flex-col overflow-y-auto desktop:flex-row desktop:overflow-hidden">
      <h1 className="sr-only">{copy.heading}</h1>
      <TechFilter
        title={copy.filterTitle}
        label={copy.filterLabel}
        techs={FILTERS}
        checked={checked}
        onToggle={tech => setChecked(list => toggleTech(list, tech))}
      />
      <div className="flex min-w-0 flex-1 flex-col desktop:min-h-0">
        <div className="flex h-10 flex-none border-b border-b-line">
          <p className="flex items-center border-r border-b-2 border-r-line border-b-accent-1 pr-3.5 pl-3.5 text-base text-white">
            {tab}
            {checked.length > 0 && (
              <Icon
                name="close"
                onClick={() => setChecked([])}
                label={copy.clear}
                interactive
                className="ml-5 size-3.5"
              />
            )}
          </p>
        </div>
        <div className="scrollbar-pane desktop:min-h-0 desktop:flex-1 desktop:overflow-y-auto">
          <ProjectsGrid items={shown} copy={copy} />
        </div>
      </div>
    </section>
  );
};

export default ProjectsExplorer;
