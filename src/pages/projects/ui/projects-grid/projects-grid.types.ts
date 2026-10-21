import type { RefObject } from "react";

import type { Tech } from "@/entities/project/config";

import type {
  IProjectSlot,
  IProjectsCopy
} from "../projects-explorer/projects-explorer.types";

export interface IProjectsGridProps {
  cards: readonly IProjectSlot[];
  checked: readonly Tech[];
  copy: IProjectsCopy;
  /** The element the motion hooks scope to: it holds the cards and the empty message. */
  rootRef: RefObject<HTMLDivElement | null>;
}
