import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CELL_SIZE,
  FOOD_TOTAL,
  INITIAL_FOOD,
  INITIAL_SNAKE,
  TICK_START,
  TICK_STEP
} from "../config";

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
export type Cell = readonly [number, number];
export type GameStatus = "idle" | "playing" | "win" | "lose";

export interface SnakeState {
  /** Head first. */
  snake: readonly Cell[];
  food: Cell;
  /** Where the snake will go on the next tick. */
  direction: Direction;
  /** Where it went on the last tick; turns are checked against this, not the pending direction. */
  heading: Direction;
  /** The player has turned the snake this round (lights the on-screen arrow). */
  steered: boolean;
  foodLeft: number;
  status: GameStatus;
}

/** Returns a number in [0, 1), like `Math.random`; injected so the model stays deterministic. */
export type RandomSource = () => number;

const VECTORS: Record<Direction, Cell> = {
  UP: [0, -1],
  DOWN: [0, 1],
  LEFT: [-1, 0],
  RIGHT: [1, 0]
};

const COLUMNS = CANVAS_WIDTH / CELL_SIZE;
const ROWS = CANVAS_HEIGHT / CELL_SIZE;

const isOpposite = (a: Direction, b: Direction): boolean =>
  VECTORS[a][0] + VECTORS[b][0] === 0 && VECTORS[a][1] + VECTORS[b][1] === 0;

const sameCell = (a: Cell, b: Cell): boolean => a[0] === b[0] && a[1] === b[1];

const isOutside = ([x, y]: Cell): boolean =>
  x < 0 || y < 0 || x >= COLUMNS || y >= ROWS;

export const createInitialState = (): SnakeState => ({
  snake: INITIAL_SNAKE,
  food: INITIAL_FOOD,
  direction: "RIGHT",
  heading: "RIGHT",
  steered: false,
  foodLeft: FOOD_TOTAL,
  status: "idle"
});

export const startGame = (): SnakeState => ({
  ...createInitialState(),
  status: "playing"
});

/** Milliseconds between ticks: a calm start, a little faster with each food eaten. */
export const tickDelay = (foodLeft: number): number =>
  TICK_START - TICK_STEP * (FOOD_TOTAL - foodLeft);

export const placeFood = (random: RandomSource): Cell => [
  Math.floor(random() * COLUMNS),
  Math.floor(random() * ROWS)
];

/** Changes course; a turn straight back into the body is ignored. */
export const turn = (state: SnakeState, direction: Direction): SnakeState =>
  state.status !== "playing" || isOpposite(state.heading, direction)
    ? state
    : { ...state, direction, steered: true };

/** Advances one tick: moves, eats, or ends the round (win once all food is eaten). */
export const step = (state: SnakeState, random: RandomSource): SnakeState => {
  if (state.status !== "playing") return state;

  const [dx, dy] = VECTORS[state.direction];
  const head: Cell = [state.snake[0][0] + dx, state.snake[0][1] + dy];
  const won = state.foodLeft <= 0;

  if (won || isOutside(head) || state.snake.some(c => sameCell(c, head))) {
    return {
      ...state,
      status: won ? "win" : "lose",
      steered: false,
      foodLeft: FOOD_TOTAL
    };
  }

  if (sameCell(head, state.food)) {
    return {
      ...state,
      heading: state.direction,
      snake: [head, ...state.snake],
      food: placeFood(random),
      foodLeft: state.foodLeft - 1
    };
  }
  return {
    ...state,
    heading: state.direction,
    snake: [head, ...state.snake.slice(0, -1)]
  };
};
