import type { IProjectItem } from "@/entities/project";

import type { IProjectsCopy } from "../projects-explorer/projects-explorer.types";

export interface IProjectsGridProps {
  items: readonly IProjectItem[];
  copy: IProjectsCopy;
}
