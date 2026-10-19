import type { IconName } from "@/shared/ui";

interface IBoltItem {
  icon: IconName;
  className: string;
}

export const BOLTS: IBoltItem[] = [
  {
    icon: "bolts/bolt-up-left",
    className: "top-3 left-3"
  },
  {
    icon: "bolts/bolt-up-right",
    className: "top-3 right-3"
  },
  {
    icon: "bolts/bolt-down-left",
    className: "bottom-3 left-3"
  },
  {
    icon: "bolts/bolt-down-right",
    className: "right-3 bottom-3"
  }
];

export const CELL_SIZE = 15;
// Mirror --color-accent-2 and the board fill (primary-2) from styles.css: canvas needs literal values.
export const SNAKE_COLOR = "#43d9ad";
export const BOARD_COLOR = "#011627";
export const SNAKE_WIDTH = 8;
export const CANVAS_WIDTH = 240;
export const CANVAS_HEIGHT = 405;
export const INITIAL_SNAKE: [number, number][] = [
  [10, 10],
  [9, 10]
];
export const INITIAL_FOOD: [number, number] = [14, 10];
export const TIME_DELAY = 120;
export const FOOD_TOTAL = 10;
export const BOARD_ID = "snake-board";
