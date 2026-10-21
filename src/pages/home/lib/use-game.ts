import type { KeyboardEvent, RefObject } from "react";
import { useEffect, useRef } from "react";

import { FOOD_TOTAL, TICK_START, TICK_STEP } from "../config";
import {
  selectDirection,
  selectFood,
  selectFoodLeft,
  selectSnake,
  selectReset,
  selectStart,
  selectStatus,
  selectTick,
  selectSteer,
  useSnakeStore
} from "../model";

import { drawBoard } from "./draw-board";
import { useKeyPress } from "./key-press";
import { keyToDirection } from "./key-to-direction";
import useInterval from "./use-interval";

interface IUseGame {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  foodRef: RefObject<HTMLImageElement | null>;
  boardRef: RefObject<HTMLDivElement | null>;
  onStartGame: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
}

/** Wires the pure model to the browser: tick interval, board keys, canvas painting. */
export const useGame = (): IUseGame => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const foodRef = useRef<HTMLImageElement | null>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);

  const snake = useSnakeStore(selectSnake);
  const food = useSnakeStore(selectFood);
  const direction = useSnakeStore(selectDirection);
  const status = useSnakeStore(selectStatus);
  const foodLeft = useSnakeStore(selectFoodLeft);
  const start = useSnakeStore(selectStart);
  const reset = useSnakeStore(selectReset);
  const tick = useSnakeStore(selectTick);
  const steer = useSnakeStore(selectSteer);

  // The store outlives the page; a fresh visit starts idle.
  useEffect(() => reset, [reset]);

  const delay = TICK_START - TICK_STEP * (FOOD_TOTAL - foodLeft);
  // A hidden tab keeps its timers alive (throttled): the snake waits there instead of dying unseen.
  useInterval(
    () => {
      if (!document.hidden) tick();
    },
    status === "playing" ? delay : null
  );

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && foodRef.current) {
      drawBoard(ctx, foodRef.current, { snake, food, direction });
    }
  }, [snake, food, direction]);

  const onStartGame = () => {
    start();
    boardRef.current?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const next = keyToDirection(event);
    if (!next) return;
    event.preventDefault();
    if (status !== "playing") return;
    steer(next);
    useKeyPress.getState().press(next);
  };

  return { canvasRef, foodRef, boardRef, onStartGame, onKeyDown };
};
