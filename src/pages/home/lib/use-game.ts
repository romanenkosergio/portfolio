"use client";

import type { KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";

import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CELL_SIZE,
  INITIAL_FOOD,
  INITIAL_SNAKE,
  TIME_DELAY
} from "../config";
import { useSnakeStore } from "../model";

import useInterval from "./use-interval";

type DirectionKey = "ArrowLeft" | "ArrowUp" | "ArrowRight" | "ArrowDown";

type Position = [number, number]; // Для координат (x, y)

let debounceTimeout: NodeJS.Timeout | null = null;

export const useGame = () => {
  const { setArrowName, setScore, score, setVin } = useSnakeStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE); // Змейка как массив координат
  const [food, setFood] = useState<Position>(INITIAL_FOOD); // Координаты еды
  const [direction, setDirection] = useState<Position>([1, 0]); // Направление [x, y]
  const [delay, setDelay] = useState<number | null>(null); // Задержка для интервала
  const [isGameOver, setIsGameOver] = useState(false); // Статус окончания игры
  const [isGameStart, setIsGameStart] = useState(false); // Статус окончания игры
  const [gameStatus, setGameStatus] = useState<"win" | "lose" | null>(null); // Статус: победа/поражение
  const scale = CELL_SIZE; // Для удобства
  const timeDelay = TIME_DELAY; // Для удобства

  // Интервал обновления игры
  useInterval(() => runGame(), delay);

  // Отрисовка Canvas (змейки и еды)
  useEffect(() => {
    const HtmlFood = document.getElementById("food") as HTMLCanvasElement;
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        const gradient = ctx.createLinearGradient(0, 15, 15, 30);
        gradient.addColorStop(0.5, "#43D9AD");
        gradient.addColorStop(1, "#DEFFFF");
        ctx.fillStyle = gradient;

        const segmentSize = 1; // Размер сегмента

        snake.forEach(([x, y], index) => {
          const isHead = index === 0;
          ctx.beginPath();

          const radius = 0.4; // Радиус закругления для головы

          // Если это голова змейки
          if (isHead) {
            // Если змейка на старте (нет движения)
            const isAtRest = direction[0] === 0 && direction[1] === 0;

            // Устанавливаем направление по умолчанию (вправо)
            const currentDirection = isAtRest ? [1, 0] : direction;

            // Логика для закруглений головы
            if (currentDirection[0] === 1 && currentDirection[1] === 0) {
              // Движение вправо
              ctx.moveTo(x, y); // Верхний левый угол
              ctx.lineTo(x, y + segmentSize); // Левый край
              ctx.lineTo(x + segmentSize - radius, y + segmentSize); // Нижний край
              ctx.arcTo(
                x + segmentSize,
                y + segmentSize,
                x + segmentSize,
                y + segmentSize - radius,
                radius
              ); // Закругление нижнего правого угла
              ctx.lineTo(x + segmentSize, y + radius); // Правая сторона
              ctx.arcTo(
                x + segmentSize,
                y,
                x + segmentSize - radius,
                y,
                radius
              ); // Закругление верхнего правого угла
              ctx.lineTo(x, y); // Верхний левый угол
            } else if (
              currentDirection[0] === -1 &&
              currentDirection[1] === 0
            ) {
              // Движение влево
              ctx.moveTo(x + segmentSize, y); // Верхний правый угол
              ctx.lineTo(x + segmentSize, y + segmentSize); // Правый край
              ctx.lineTo(x + radius, y + segmentSize); // Нижний край
              ctx.arcTo(
                x,
                y + segmentSize,
                x,
                y + segmentSize - radius,
                radius
              ); // Закругление нижнего левого угла
              ctx.lineTo(x, y + radius); // Левая сторона
              ctx.arcTo(x, y, x + radius, y, radius); // Закругление верхнего левого угла
              ctx.lineTo(x + segmentSize, y); // Верхний правый угол
            } else if (
              currentDirection[0] === 0 &&
              currentDirection[1] === -1
            ) {
              // Движение вверх
              ctx.moveTo(x, y + segmentSize); // Нижний левый угол
              ctx.lineTo(x + segmentSize, y + segmentSize); // Нижний край
              ctx.lineTo(x + segmentSize, y + radius); // Правый край
              ctx.arcTo(
                x + segmentSize,
                y,
                x + segmentSize - radius,
                y,
                radius
              ); // Закругление верхнего правого угла
              ctx.lineTo(x + radius, y); // Верхний край
              ctx.arcTo(x, y, x, y + radius, radius); // Закругление верхнего левого угла
              ctx.lineTo(x, y + segmentSize); // Нижний левый угол
            } else if (currentDirection[0] === 0 && currentDirection[1] === 1) {
              // Движение вниз
              ctx.moveTo(x, y); // Верхний левый угол
              ctx.lineTo(x + segmentSize, y); // Верхний край
              ctx.lineTo(x + segmentSize, y + segmentSize - radius); // Правый край
              ctx.arcTo(
                x + segmentSize,
                y + segmentSize,
                x + segmentSize - radius,
                y + segmentSize,
                radius
              ); // Закругление нижнего правого угла
              ctx.lineTo(x + radius, y + segmentSize); // Нижний край
              ctx.arcTo(
                x,
                y + segmentSize,
                x,
                y + segmentSize - radius,
                radius
              ); // Закругление нижнего левого угла
              ctx.lineTo(x, y); // Верхний левый угол
            }
          } else {
            // Обычные сегменты тела (квадрат)
            ctx.rect(x, y, segmentSize, segmentSize);
          }

          ctx.closePath();
          ctx.fill();
        });

        // Отрисовка еды
        ctx.drawImage(HtmlFood, food[0], food[1], 1.5, 1.5);
      }
    }
  }, [snake, food, isGameOver, direction]);

  // Начало игры
  function onStartGame() {
    setGameStatus(null);
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection([1, 0]);
    setDelay(timeDelay);
    setArrowName(undefined);
    setScore(10);
    setIsGameStart(true);
    setIsGameOver(false);
    setVin(null);
  }

  // Проверка столкновений
  function checkCollision(head: Position): boolean {
    // Столкновения с границами
    if (
      head[1] < 0 ||
      head[1] * scale >= CANVAS_HEIGHT ||
      head[0] < 0 ||
      head[0] * scale >= CANVAS_WIDTH
    ) {
      return true;
    }

    // Столкновения с телом змейки
    return snake.some(([x, y]) => x === head[0] && y === head[1]);
  }

  // Проверка: съедена ли еда
  function foodAte(newSnake: Position[]): boolean {
    if (newSnake[0][0] === food[0] && newSnake[0][1] === food[1]) {
      const coord: Position = [
        Math.floor(Math.random() * (CANVAS_WIDTH / scale)),
        Math.floor(Math.random() * (CANVAS_HEIGHT / scale))
      ];
      setFood(coord); // Новая еда
      setScore(score - 1);
      return true; // Еда съедена
    }
    return false;
  }

  // Основной игровой цикл
  function runGame() {
    const newSnake = [...snake];
    const newSnakeHead: Position = [
      newSnake[0][0] + direction[0],
      newSnake[0][1] + direction[1]
    ];
    newSnake.unshift(newSnakeHead); // Добавляем голову в начало

    if (checkCollision(newSnakeHead) || score <= 0) {
      setDelay(null); // Останавливаем игру
      setIsGameOver(true);
      setArrowName(undefined);
      setScore(10);
      setIsGameStart(false);
      setGameStatus(score <= 0 ? "win" : "lose");
      setVin(score <= 0);
      return;
    }

    if (!foodAte(newSnake)) {
      newSnake.pop(); // Если еда не съедена — удаляем хвост
    }

    setSnake(newSnake); // Обновляем змейку
  }

  // Изменение направления (по нажатию клавиш)
  function changeDirection(e: KeyboardEvent<HTMLDivElement>) {
    if (isGameStart) {
      e.preventDefault();
      const { key } = e;

      // Возможные направления
      const directionMap: Record<DirectionKey, Position> = {
        ArrowLeft: [-1, 0],
        ArrowUp: [0, -1],
        ArrowRight: [1, 0],
        ArrowDown: [0, 1]
      };

      // Если нажата подходящая клавиша
      if (directionMap[key as DirectionKey]) {
        const [dx, dy] = directionMap[key as DirectionKey];

        // Проверка на возможность движения (не в обратную сторону)
        if (direction[0] + dx !== 0 || direction[1] + dy !== 0) {
          // Устанавливаем debounce: предотвращаем повторное срабатывание раньше времени
          if (!debounceTimeout) {
            // Обновляем направление
            setDirection([dx, dy]);
            setArrowName(
              key === "ArrowLeft"
                ? "LEFT"
                : key === "ArrowUp"
                  ? "UP"
                  : key === "ArrowRight"
                    ? "RIGHT"
                    : "DOWN"
            );

            // Задаем задержку (время debounce, например, 100 мс)
            debounceTimeout = setTimeout(() => {
              debounceTimeout = null; // Сбрасываем таймер
            }, 100); // 100 мс временной паузы
          }
        }
      }
    }
  }

  console.log({ score });
  return {
    canvasRef,
    snake,
    isGameOver,
    isGameStart,
    onStartGame,
    gameStatus,
    CELL_SIZE,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    changeDirection
  };
};
