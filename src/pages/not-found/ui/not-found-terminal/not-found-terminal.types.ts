export interface INotFoundTerminalProps {
  /** The requested path; null until the browser has read it. */
  path: string | null;
  /** Seconds before the first line starts typing. */
  delay: number;
  className?: string;
}
