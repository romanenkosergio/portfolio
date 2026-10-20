import { FILTER_TECHS, PROJECTS } from "../config";
import type { Tech } from "../config";

import type { IProject } from "./project.types";

// A project passes when it uses ANY checked tech; nothing checked passes everything.
export const matchesTechs = (
  project: Pick<IProject, "stack">,
  checked: readonly Tech[]
): boolean =>
  checked.length === 0 || project.stack.some(tech => checked.includes(tech));

// Filters that at least one project uses, in sidebar order.
export const usedFilterTechs = (): Tech[] =>
  FILTER_TECHS.filter(tech =>
    PROJECTS.some(project => project.stack.some(used => used === tech))
  );

export const toggleTech = (checked: readonly Tech[], tech: Tech): Tech[] =>
  checked.includes(tech)
    ? checked.filter(item => item !== tech)
    : [...checked, tech];

// Tab label: the checked techs in sidebar order joined by "; ".
export const orderedTechs = (checked: readonly Tech[]): Tech[] =>
  FILTER_TECHS.filter(tech => checked.includes(tech));
