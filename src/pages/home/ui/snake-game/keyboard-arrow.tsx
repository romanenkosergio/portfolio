"use client";

import type { FC } from "react";

import { useTranslations } from "next-intl";

import { cn } from "@/shared/lib";
import { Icon } from "@/shared/ui";

import { BOARD_ID } from "@/pages/home/config";
import type { Direction } from "@/pages/home/model";
import {
  selectActiveArrow,
  selectSteer,
  useSnakeStore
} from "@/pages/home/model";

import type { IKeyboardArrowProps } from "./keyboard-arrow.types";

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

  return (
    <button
      type="button"
      aria-label={t(arrowLabels[direction])}
      title={t(arrowLabels[direction])}
      onClick={() => {
        steer(direction);
        document.getElementById(BOARD_ID)?.focus();
      }}
      className={cn(
        "flex h-7.25 w-12.25 items-center justify-center rounded-lg border border-line transition-all duration-300 ease-in-out",
        isActive ? "bg-white" : "bg-primary-6"
      )}
    >
      <Icon
        name="keyboard-arrow"
        className={arrowPositions[direction]}
        svgClass={cn(
          "transition-all duration-300 ease-in-out",
          isActive ? "text-primary-6" : "text-white"
        )}
      />
    </button>
  );
};

export default KeyboardArrow;
