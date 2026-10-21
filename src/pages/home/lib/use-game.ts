import type { KeyboardEvent, RefObject } from "react";
import { useEffect, useRef } from "react";

import type { Direction } from "../model";
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
  tickDelay,
  useSnakeStore
} from "../model";

import { drawBoard } from "./draw-board";
import { useKeyPress } from "./key-press";
import { keyToDirection } from "./key-to-direction";
import useInterval from "./use-interval";
import { useOnScreen } from "./use-on-screen";
import type { ISwipeHandlers } from "./use-swipe";
import { useSwipe } from "./use-swipe";

interface IUseGame {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  foodRef: RefObject<HTMLImageElement | null>;
  boardRef: RefObject<HTMLDivElement | null>;
  onStartGame: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  swipe: ISwipeHandlers;
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

  const delay = tickDelay(foodLeft);
  const onScreen = useOnScreen(boardRef);
  // A hidden tab keeps its timers alive (throttled), and a board scrolled away is not watched:
  // the snake waits in both cases instead of dying unseen.
  useInterval(
    () => {
      if (!document.hidden && onScreen.current) tick();
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

  const steerBoard = (next: Direction) => {
    if (status !== "playing") return;
    steer(next);
    useKeyPress.getState().press(next);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const next = keyToDirection(event);
    if (!next) return;
    event.preventDefault();
    steerBoard(next);
  };

  const swipe = useSwipe(steerBoard);

  return { canvasRef, foodRef, boardRef, onStartGame, onKeyDown, swipe };
};
