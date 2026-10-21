export interface IProjectCoverProps {
  slug: string;
  // The project's main-tech colour (a CSS variable): the first glow and the pattern take it.
  accent: string;
  // Picks the pattern (dots, stripes, grid, rings); the caller passes the project's index.
  variant: number;
  className?: string;
}
