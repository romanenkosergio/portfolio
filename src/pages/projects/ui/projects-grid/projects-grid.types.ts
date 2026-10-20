import type { Tech } from "@/entities/project/config";

import type {
  IProjectSlot,
  IProjectsCopy
} from "../projects-explorer/projects-explorer.types";

export interface IProjectsGridProps {
  cards: readonly IProjectSlot[];
  checked: readonly Tech[];
  copy: IProjectsCopy;
}
