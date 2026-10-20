"use client";

import { useRef } from "react";
import type { FC } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslations } from "next-intl";

import { cn } from "@/shared/lib";
import {
  DURATION,
  EASE,
  SCALE,
  matchMotion,
  registerMotion
} from "@/shared/lib/motion";
import { Icon } from "@/shared/ui";

import { BOARD_ID } from "@/pages/home/config";
import type { Direction } from "@/pages/home/model";
import {
  selectActiveArrow,
  selectSteer,
  useSnakeStore
} from "@/pages/home/model";

import type { IKeyboardArrowProps } from "./keyboard-arrow.types";

registerMotion();

const KEY_DIRECTIONS: Record<string, Direction> = {
  arrowup: "UP",
  arrowdown: "DOWN",
  arrowleft: "LEFT",
  arrowright: "RIGHT",
  w: "UP",
  s: "DOWN",
  a: "LEFT",
  d: "RIGHT"
};

const arrowPositions: Record<Direction, string> = {
  "DOWN": "rotate-180",
  "UP": "",
  "LEFT": "-rotate-90",
  "RIGHT": "rotate-90"
};

const arrowLabels = {
  UP: "moveUp",
  DOWN: "moveDown",
  LEFT: "moveLeft",
  RIGHT: "moveRight"
} as const;

const KeyboardArrow: FC<IKeyboardArrowProps> = ({ direction }) => {
  const t = useTranslations("game");
  const isActive = useSnakeStore(selectActiveArrow) === direction;
  const steer = useSnakeStore(selectSteer);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // A key pressed while the board has focus presses its on-screen arrow.
  useGSAP(
    (_, contextSafe) => {
      const button = buttonRef.current;
      const board = document.getElementById(BOARD_ID);
      if (!button || !board || !contextSafe) return;
      const mm = matchMotion(button, {
        full: () => {
          const press = contextSafe((event: KeyboardEvent) => {
            if (KEY_DIRECTIONS[event.key.toLowerCase()] !== direction) return;
            gsap.fromTo(
              button,
              { scale: SCALE.press },
              { scale: 1, duration: DURATION.fast, ease: EASE.soft }
            );
          });
          board.addEventListener("keydown", press);
          return () => board.removeEventListener("keydown", press);
        }
      });
      return () => mm.revert();
    },
    { scope: buttonRef, dependencies: [direction] }
  );

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={t(arrowLabels[direction])}
      title={t(arrowLabels[direction])}
      onClick={() => {
        steer(direction);
        document.getElementById(BOARD_ID)?.focus();
      }}
      className={cn(
        "flex h-7.25 w-12.25 items-center justify-center rounded-lg border border-line transition-[background-color,border-color] duration-300 ease-in-out",
        isActive ? "bg-white" : "bg-primary-6 text-white"
      )}
    >
      <Icon
        name="keyboard-arrow"
        className={arrowPositions[direction]}
        tone={isActive ? "active" : "inherit"}
      />
    </button>
  );
};

export default KeyboardArrow;
