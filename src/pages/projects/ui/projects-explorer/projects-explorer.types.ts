import type { IProjectItem } from "@/entities/project";

export interface IProjectsCopy {
  heading: string;
  filterTitle: string;
  filterLabel: string;
  all: string;
  clear: string;
  personal: string;
  stack: string;
  separator: string;
  empty: string;
  // «Project 1» … «Project N», one per position in the unfiltered list (the longest a filter can show).
  numbers: string[];
}

export interface IProjectsExplorerProps {
  items: IProjectItem[];
  copy: IProjectsCopy;
}
