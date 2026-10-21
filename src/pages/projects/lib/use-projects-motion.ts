import type { RefObject } from "react";

import { useCardHover } from "./use-card-hover";
import { useCardsEntrance } from "./use-cards-entrance";
import { useFilterFlip } from "./use-filter-flip";
import { useTabSwap } from "./use-tab-swap";

/**
 * All the motion of the projects page: card entrance and hover, the Flip on a
 * filter change and the tab label swap. Returns `capture`, to be called right
 * before the filter state changes.
 */
export const useProjectsMotion = (
  gridRef: RefObject<HTMLDivElement | null>,
  tabRef: RefObject<HTMLElement | null>,
  filter: unknown,
  tab: string
): (() => void) => {
  const capture = useFilterFlip(gridRef, filter);
  useCardsEntrance(gridRef);
  useCardHover(gridRef);
  useTabSwap(tabRef, tab);
  return capture;
};
