import type { Tech } from "../config/techs";

export type ProjectKind = "commercial" | "personal";

// Which of the four generated patterns a cover draws (dots, stripes, grid, rings).
export type CoverPattern = 0 | 1 | 2 | 3;

export interface IProject {
  slug: string;
  kind: ProjectKind;
  stack: readonly Tech[];
  // The generated banner: the logo (a tech from `stack`) and its colour, and the pattern. Chosen by
  // hand so neighbouring cards never repeat either.
  cover: { tech: Tech; pattern: CoverPattern };
  // Spans the whole grid row, the banner beside the text on wide cards.
  featured?: boolean;
  // Public link (site, store, Steam, demo); the card shows a view-project button when set.
  href?: string;
  // A screenshot for the banner of a personal project only (D16 bans captures of commercial work);
  // not drawn yet, none is set.
  image?: { src: string; alt: string };
}

// The translated texts of a project (`projects.items.<slug>`).
export interface IProjectCopy {
  title: string;
  domain: string;
  role: string;
  summary: string;
}

export type IProjectItem = IProject & IProjectCopy;
