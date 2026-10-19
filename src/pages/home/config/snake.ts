import type { IconName } from "@/shared/ui";

interface IBoltItem {
  icon: IconName;
  className: string;
}

export const BOLTS: IBoltItem[] = [
  {
    icon: "bolts/bolt-up-left",
    className: "top-4 left-4"
  },
  {
    icon: "bolts/bolt-up-right",
    className: "top-4 right-4"
  },
  {
    icon: "bolts/bolt-down-left",
    className: "bottom-4 left-4"
  },
  {
    icon: "bolts/bolt-down-right",
    className: "right-4 bottom-4"
  }
];

export const CELL_SIZE = 15;
export const CANVAS_WIDTH = 240;
export const CANVAS_HEIGHT = 405;
export const INITIAL_SNAKE: [number, number][] = [
  [10, 10],
  [9, 10]
];
export const INITIAL_FOOD: [number, number] = [14, 10];
export const TIME_DELAY = 120;
