import type { AboutType } from "@/pages/about/config";

export interface IFileTabsProps {
  current: AboutType;
  /** Tab titles by file, already translated. */
  labels: Record<AboutType, string>;
  /** Accessible name of each tab's × button, e.g. «Close bio». */
  /** Accessible name of the tab list. */
  navLabel: string;
  closeLabels: Record<AboutType, string>;
}
