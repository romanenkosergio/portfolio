import type { Direction } from "../model";

/** Board keys (arrows and WASD) and the way each steers the snake. */
export const KEY_DIRECTIONS: Partial<Record<string, Direction>> = {
  ArrowUp: "UP",
  ArrowDown: "DOWN",
  ArrowLeft: "LEFT",
  ArrowRight: "RIGHT",
  w: "UP",
  s: "DOWN",
  a: "LEFT",
  d: "RIGHT"
};
