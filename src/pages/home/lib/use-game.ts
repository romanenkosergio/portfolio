import type { KeyboardEvent, RefObject } from "react";
import { useEffect, useRef } from "react";

import { TIME_DELAY } from "../config";
import type { Direction } from "../model";
import {
  selectDirection,
  selectFood,
  selectSnake,
  selectReset,
  selectStart,
  selectStatus,
  selectTick,
  selectSteer,
  useSnakeStore
} from "../model";

import { drawBoard } from "./draw-board";
import useInterval from "./use-interval";

const KEY_DIRECTIONS: Partial<Record<string, Direction>> = {
  ArrowUp: "UP",
  ArrowDown: "DOWN",
  ArrowLeft: "LEFT",
  ArrowRight: "RIGHT",
  w: "UP",
  s: "DOWN",
  a: "LEFT",
  d: "RIGHT"
};

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
  const start = useSnakeStore(selectStart);
  const reset = useSnakeStore(selectReset);
  const tick = useSnakeStore(selectTick);
  const steer = useSnakeStore(selectSteer);

  // The store outlives the page; a fresh visit starts idle.
  useEffect(() => reset, [reset]);

  useInterval(tick, status === "playing" ? TIME_DELAY : null);

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
    const next =
      KEY_DIRECTIONS[event.key] ?? KEY_DIRECTIONS[event.key.toLowerCase()];
    if (!next || event.metaKey || event.ctrlKey || event.altKey) return;
    event.preventDefault();
    if (status !== "playing") return;
    steer(next);
  };

  return { canvasRef, foodRef, boardRef, onStartGame, onKeyDown };
};
