import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CELL_SIZE,
  FOOD_TOTAL,
  TICK_START,
  TICK_STEP
} from "../config";

import {
  createInitialState,
  placeFood,
  startGame,
  step,
  tickDelay,
  turn
} from "./snake";
import type { SnakeState } from "./snake";

const COLUMNS = CANVAS_WIDTH / CELL_SIZE;
const ROWS = CANVAS_HEIGHT / CELL_SIZE;
const never = () => 0;

const playing = (patch: Partial<SnakeState> = {}): SnakeState => ({
  ...startGame(),
  // Food out of the way, so a plain move is not an accidental meal.
  food: [0, 0],
  ...patch
});

describe("snake model", () => {
  it("starts idle and does not move until the round starts", () => {
    const idle = createInitialState();
    expect(idle.status).toBe("idle");
    expect(step(idle, never)).toBe(idle);
    expect(turn(idle, "UP")).toBe(idle);
    expect(startGame().status).toBe("playing");
  });

  it("moves one cell in its direction, keeping its length", () => {
    const next = step(playing(), never);
    expect(next.snake).toEqual([
      [11, 10],
      [10, 10]
    ]);
  });

  it("grows and spawns new food when it eats", () => {
    const state = playing({ food: [11, 10] });
    const next = step(state, () => 0.5);
    expect(next.snake).toHaveLength(3);
    expect(next.snake[0]).toEqual([11, 10]);
    expect(next.foodLeft).toBe(FOOD_TOTAL - 1);
    expect(next.food).toEqual([Math.floor(COLUMNS / 2), Math.floor(ROWS / 2)]);
  });

  it("loses on every wall", () => {
    const at = (head: [number, number], direction: SnakeState["direction"]) =>
      step(
        playing({
          snake: [head, [head[0] - 1, head[1]]],
          direction,
          heading: direction
        }),
        never
      ).status;
    expect(at([COLUMNS - 1, 5], "RIGHT")).toBe("lose");
    expect(at([0, 5], "LEFT")).toBe("lose");
    expect(at([5, 0], "UP")).toBe("lose");
    expect(at([5, ROWS - 1], "DOWN")).toBe("lose");
    expect(at([COLUMNS - 1, 5], "UP")).toBe("playing");
  });

  it("loses when it runs into itself", () => {
    const coiled = playing({
      snake: [
        [5, 5],
        [5, 6],
        [4, 6],
        [4, 5],
        [4, 4]
      ],
      direction: "LEFT",
      heading: "UP"
    });
    expect(step(coiled, never).status).toBe("lose");
  });

  it("resets the food counter when the round ends", () => {
    const lost = step(
      playing({
        snake: [
          [0, 5],
          [1, 5]
        ],
        direction: "LEFT",
        foodLeft: 3
      }),
      never
    );
    expect(lost.status).toBe("lose");
    expect(lost.foodLeft).toBe(FOOD_TOTAL);
  });

  it("wins once all the food is eaten", () => {
    const won = step(playing({ foodLeft: 0 }), never);
    expect(won.status).toBe("win");
    expect(won.foodLeft).toBe(FOOD_TOTAL);
  });

  it("ignores a turn straight back, but takes a side turn", () => {
    const state = playing();
    expect(turn(state, "LEFT")).toBe(state);
    const up = turn(state, "UP");
    expect(up.direction).toBe("UP");
    expect(up.steered).toBe(true);
  });

  it("checks a turn against the last move, not the pending turn", () => {
    // UP is pending, the snake still heads RIGHT: LEFT would still be a U-turn.
    const pending = turn(playing(), "UP");
    expect(turn(pending, "LEFT")).toBe(pending);
  });

  it("places food inside the board", () => {
    expect(placeFood(() => 0)).toEqual([0, 0]);
    expect(placeFood(() => 0.999999)).toEqual([COLUMNS - 1, ROWS - 1]);
  });

  it("ticks faster with each food eaten", () => {
    expect(tickDelay(FOOD_TOTAL)).toBe(TICK_START);
    expect(tickDelay(FOOD_TOTAL - 1)).toBe(TICK_START - TICK_STEP);
    expect(tickDelay(1)).toBeLessThan(tickDelay(2));
  });
});
