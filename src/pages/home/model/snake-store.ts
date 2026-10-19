import { create } from "zustand/react";

import type { Direction, SnakeState } from "./snake";
import { createInitialState, startGame, step, turn } from "./snake";

interface ISnakeStore extends SnakeState {
  start: () => void;
  tick: () => void;
  reset: () => void;
  steer: (direction: Direction) => void;
}

export const useSnakeStore = create<ISnakeStore>()(set => ({
  ...createInitialState(),
  start: () => set(startGame()),
  reset: () => set(createInitialState()),
  tick: () => set(state => step(state, Math.random)),
  steer: direction => set(state => turn(state, direction))
}));

export const selectSnake = (s: ISnakeStore) => s.snake;
export const selectFood = (s: ISnakeStore) => s.food;
export const selectDirection = (s: ISnakeStore) => s.direction;
export const selectStatus = (s: ISnakeStore) => s.status;
export const selectFoodLeft = (s: ISnakeStore) => s.foodLeft;
export const selectStart = (s: ISnakeStore) => s.start;
export const selectReset = (s: ISnakeStore) => s.reset;
export const selectTick = (s: ISnakeStore) => s.tick;
export const selectSteer = (s: ISnakeStore) => s.steer;
/** The arrow to light up: the current heading once the player has steered. */
export const selectActiveArrow = (s: ISnakeStore): Direction | undefined =>
  s.steered ? s.direction : undefined;
/** `null` until a round has ended, then whether it was won. */
export const selectIsWin = (s: ISnakeStore): boolean | null =>
  s.status === "win" ? true : s.status === "lose" ? false : null;
