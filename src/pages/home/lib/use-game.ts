import type { KeyboardEvent, RefObject } from "react";
import { useCallback, useEffect, useRef } from "react";

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
import { selectPaused, usePause } from "./pause";
import useInterval from "./use-interval";
import { useAway } from "./use-on-screen";
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
  useEffect(
    () => () => {
      reset();
      usePause.getState().resume();
    },
    [reset]
  );

  const delay = tickDelay(foodLeft);
  const paused = usePause(selectPaused);
  const isPlaying = status === "playing";
  // A hidden tab or a board scrolled mostly away pauses the round until the next input.
  useAway(
    boardRef,
    useCallback(() => {
      if (useSnakeStore.getState().status === "playing")
        usePause.getState().pause();
    }, [])
  );
  useInterval(tick, isPlaying && !paused ? delay : null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && foodRef.current) {
      drawBoard(ctx, foodRef.current, { snake, food, direction });
    }
  }, [snake, food, direction]);

  const onStartGame = () => {
    usePause.getState().resume();
    start();
    boardRef.current?.focus();
  };

  const steerBoard = (next: Direction) => {
    if (status !== "playing") return;
    usePause.getState().resume();
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
