/** Markers of the grid markup the motion hooks look up. */
export const CARD_ATTR = "data-project-card";
export const EMPTY_ATTR = "data-projects-empty";

/** The first cards (by position; the filter starts empty, so all are shown) are above the fold: painted visible in the server HTML, they only lift (LCP). */
export const EAGER_CARDS = 2;
export const isEagerCard = (index: number): boolean => index < EAGER_CARDS;
