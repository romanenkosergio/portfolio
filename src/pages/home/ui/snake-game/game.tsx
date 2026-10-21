"use client";

import type { FC } from "react";
import { useId } from "react";

import Image from "next/image";

import { useTranslations } from "next-intl";

import { BASE_PATH } from "@/shared/config";

import {
  BOARD_ID,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  FOOD_TOTAL
} from "@/pages/home/config";
import { selectPaused, useGame, usePause } from "@/pages/home/lib";
import {
  selectFoodLeft,
  selectStatus,
  useSnakeStore
} from "@/pages/home/model";

import GameOverlay from "./game-overlay";
import PausedHint from "./paused-hint";

const Game: FC = () => {
  const t = useTranslations("game");
  const { canvasRef, foodRef, boardRef, onStartGame, onKeyDown, swipe } =
    useGame();
  const status = useSnakeStore(selectStatus);
  const foodLeft = useSnakeStore(selectFoodLeft);
  const paused = usePause(selectPaused) && status === "playing";
  const instructionsId = useId();

  const announcement = {
    idle: "",
    playing: paused
      ? t("paused")
      : t("progress", { eaten: FOOD_TOTAL - foodLeft, total: FOOD_TOTAL }),
    win: t("won"),
    lose: t("lost")
  }[status];

  return (
    // role="application" makes screen readers pass arrow keys to the board instead of their virtual cursor.
    <div
      ref={boardRef}
      id={BOARD_ID}
      role="application"
      tabIndex={0}
      aria-label={t("title")}
      aria-describedby={instructionsId}
      onKeyDown={onKeyDown}
      {...swipe}
      className="relative touch-none rounded-lg select-none"
    >
      <p id={instructionsId} className="sr-only">
        {t("instructions", { total: FOOD_TOTAL })}
      </p>
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
      <Image
        ref={foodRef}
        width={24}
        height={24}
        src={`${BASE_PATH}/assets/icons/game/food.svg`}
        alt={t("foodAlt")}
        title={t("foodAlt")}
        aria-hidden="true"
        className="absolute opacity-0"
      />
      <canvas
        ref={canvasRef}
        width={`${CANVAS_WIDTH}px`}
        height={`${CANVAS_HEIGHT}px`}
        aria-hidden="true"
        className="relative flex h-full w-60 items-center justify-center rounded-lg bg-primary-2/84 shadow-[inset_1px_5px_11px_rgba(2,18,27,0.71)]"
      />
      {paused && <PausedHint />}
      <GameOverlay status={status} onStart={onStartGame} />
    </div>
  );
};

export default Game;
