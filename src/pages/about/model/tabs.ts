import type { AboutType } from "../config";

/** Adds a tab at the end unless it is already open. */
export const openTab = (
  tabs: readonly AboutType[],
  type: AboutType
): AboutType[] => (tabs.includes(type) ? [...tabs] : [...tabs, type]);

/** The tabs left after closing one, and the neighbour to show (the left one, else the right). */
export const closeTab = (
  tabs: readonly AboutType[],
  type: AboutType
): { tabs: AboutType[]; next: AboutType | undefined } => {
  const index = tabs.indexOf(type);
  const rest = tabs.filter(tab => tab !== type);
  return { tabs: rest, next: rest[Math.max(index - 1, 0)] };
};
