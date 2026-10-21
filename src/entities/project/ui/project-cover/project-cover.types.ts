import type { CoverPattern } from "@/entities/project/model";

export interface IProjectCoverProps {
  slug: string;
  // The project's main-tech colour (a CSS variable): the first glow and the pattern take it.
  accent: string;
  pattern: CoverPattern;
  className?: string;
}
