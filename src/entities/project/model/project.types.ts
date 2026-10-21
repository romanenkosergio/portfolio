import type { Tech } from "../config/techs";

export type ProjectKind = "commercial" | "personal";

export interface IProject {
  slug: string;
  kind: ProjectKind;
  stack: readonly Tech[];
  // Public link (site, store, Steam, demo); the card shows a view-project button when set.
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
