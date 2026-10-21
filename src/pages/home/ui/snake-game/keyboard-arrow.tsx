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
import { useKeyPress } from "@/pages/home/lib";
import type { Direction } from "@/pages/home/model";
import {
  selectActiveArrow,
  selectSteer,
  useSnakeStore
} from "@/pages/home/model";

import type { IKeyboardArrowProps } from "./keyboard-arrow.types";

registerMotion();

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

  // A board key that steers the game presses its on-screen arrow.
  useGSAP(
    (_, contextSafe) => {
      const button = buttonRef.current;
      if (!button || !contextSafe) return;
      const mm = matchMotion(button, {
        full: () => {
          const press = contextSafe(() =>
            gsap.fromTo(
              button,
              { scale: SCALE.press },
              { scale: 1, duration: DURATION.fast, ease: EASE.soft }
            )
          );
          return useKeyPress.subscribe(state => {
            if (state.pressed?.direction === direction) press();
          });
        }
      });
      return () => mm.revert();
    },
    { scope: buttonRef, dependencies: [direction], revertOnUpdate: true }
  );

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={t(arrowLabels[direction])}
      title={t(arrowLabels[direction])}
      onClick={() => {
        steer(direction);
        useKeyPress.getState().press(direction);
        document.getElementById(BOARD_ID)?.focus({ preventScroll: true });
      }}
      className={cn(
        "flex h-7.25 w-12.25 touch-manipulation items-center justify-center rounded-lg border border-line transition-[background-color,border-color] duration-300 ease-in-out",
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
