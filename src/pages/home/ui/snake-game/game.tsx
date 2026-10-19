"use client";

import type { FC } from "react";
import { useId } from "react";

import Image from "next/image";

import { BASE_PATH } from "@/shared/config";

import {
  BOARD_ID,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  FOOD_TOTAL
} from "@/pages/home/config";
import { useGame } from "@/pages/home/lib";
import {
  selectFoodLeft,
  selectStatus,
  useSnakeStore
} from "@/pages/home/model";

import GameOverlay from "./game-overlay";

const Game: FC = () => {
  const { canvasRef, foodRef, boardRef, onStartGame, onKeyDown } = useGame();
  const status = useSnakeStore(selectStatus);
  const foodLeft = useSnakeStore(selectFoodLeft);
  const instructionsId = useId();

  const announcement = {
    idle: "",
    playing: `${FOOD_TOTAL - foodLeft} of ${FOOD_TOTAL} food eaten`,
    win: "Well done! You won.",
    lose: "Game over."
  }[status];

  return (
    // role="application" makes screen readers pass arrow keys to the board instead of their virtual cursor.
    <div
      ref={boardRef}
      id={BOARD_ID}
      role="application"
      tabIndex={0}
      aria-label="Snake game"
      aria-describedby={instructionsId}
      onKeyDown={onKeyDown}
      className="relative rounded-lg"
    >
      <p id={instructionsId} className="sr-only">
        Press Start, then steer the snake with the arrow keys or W, A, S, D
        while this board has focus. Eat {FOOD_TOTAL} pieces of food to win.
      </p>
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
      <Image
        ref={foodRef}
        width={24}
        height={24}
        src={`${BASE_PATH}/assets/icons/game/food.svg`}
        alt="food"
        title="food"
        aria-hidden="true"
        className="absolute opacity-0"
      />
      <canvas
        ref={canvasRef}
        width={`${CANVAS_WIDTH}px`}
        height={`${CANVAS_HEIGHT}px`}
        aria-hidden="true"
        className="relative flex h-full w-60 items-center justify-center rounded-lg bg-primary-2/84"
      />
      <GameOverlay status={status} onStart={onStartGame} />
    </div>
  );
};

export default Game;
