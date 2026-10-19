"use client";

import type { FC } from "react";

import Image from "next/image";

import { BASE_PATH } from "@/shared/config";
import { Button, E_BUTTON_VARIANT } from "@/shared/ui";

import { CANVAS_HEIGHT, CANVAS_WIDTH } from "@/pages/home/config";

import { useGame } from "../../lib";

const Game: FC = () => {
  const {
    canvasRef,
    isGameOver,
    isGameStart,
    onStartGame,
    changeDirection,
    gameStatus
  } = useGame();

  return (
    <div onKeyDown={e => changeDirection(e)} className="relative">
      <Image
        width={24}
        height={24}
        src={`${BASE_PATH}/assets/icons/game/food.svg`}
        alt="food"
        title="food"
        id="food"
        className="absolute opacity-0"
      />
      <canvas
        ref={canvasRef}
        width={`${CANVAS_WIDTH}px`}
        height={`${CANVAS_HEIGHT}px`}
        className="bg-primary-2/84 relative flex h-full w-60 items-center justify-center rounded-lg"
      />
      <div
        className={`absolute bottom-13.5 left-1/2 flex w-full -translate-x-1/2 flex-col items-center ${isGameStart ? "-z-1 opacity-0" : ""}`}
      >
        {isGameOver && (
          <p
            className={`bg-primary-2/90 mb-5 w-full rounded-lg py-3 text-center text-2xl uppercase ${gameStatus === "win" ? "text-accent-2" : "text-accent-1"}`}
          >
            {gameStatus === "win" ? "Well Done!" : "Game over!"}
          </p>
        )}
        <Button
          className={` ${isGameStart ? "-z-1 opacity-0" : ""}`}
          text={
            gameStatus === null
              ? "start-game"
              : gameStatus === "win"
                ? "play-again"
                : "start-again"
          }
          onClick={onStartGame}
          variant={
            isGameOver ? E_BUTTON_VARIANT.GHOST : E_BUTTON_VARIANT.PRIMARY
          }
        />
      </div>
    </div>
  );
};

export default Game;
