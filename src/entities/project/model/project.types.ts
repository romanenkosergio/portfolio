import type { Tech } from "../config/techs";

export type ProjectKind = "commercial" | "personal";

export interface IProject {
  slug: string;
  kind: ProjectKind;
  stack: readonly Tech[];
  // Public link (store, Steam, demo); none exists yet, the card shows a button once one does.
  href?: string;
}

// The translated texts of a project (`projects.items.<slug>`).
export interface IProjectCopy {
  title: string;
  domain: string;
  role: string;
  summary: string;
}

export type IProjectItem = IProject & IProjectCopy;
