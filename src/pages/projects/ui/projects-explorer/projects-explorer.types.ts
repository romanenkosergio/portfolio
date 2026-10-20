import type { ReactNode } from "react";

import type { Tech } from "@/entities/project/config";

export interface IProjectsCopy {
  heading: string;
  filterTitle: string;
  filterLabel: string;
  all: string;
  clear: string;
  empty: string;
}

// A card rendered on the server; the explorer only shows or hides it by the tech it uses.
export interface IProjectSlot {
  slug: string;
  stack: readonly Tech[];
  node: ReactNode;
}

// A filter row's content (logo and name), rendered on the server.
export interface IFilterSlot {
  tech: Tech;
  node: ReactNode;
}

export interface IProjectsExplorerProps {
  cards: readonly IProjectSlot[];
  filters: readonly IFilterSlot[];
  copy: IProjectsCopy;
}
