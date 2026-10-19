"use client";

import { FC, useMemo } from "react";
import { Icon } from "@/shared/ui";
import { Direction, useSnakeStore } from "../../model";
import { IKeyboardArrowProps } from "./keyboard-arrow.types";

const arrowPositions: Record<Direction, string> = {
  "DOWN": "rotate-180",
  "UP": "",
  "LEFT": "-rotate-90",
  "RIGHT": "rotate-90"
};

const KeyboardArrow: FC<IKeyboardArrowProps> = ({ direction }) => {
  const { arrowName } = useSnakeStore();

  const isActive = useMemo(
    () => direction === arrowName,
    [direction, arrowName]
  );

  return (
    <div
      className={`border-line flex h-7 w-12.5 items-center justify-center rounded-lg border transition-all duration-300 ease-in-out ${isActive ? "bg-white" : "bg-primary-6"}`}
    >
      <Icon
        name="keyboard-arrow"
        className={arrowPositions[direction]}
        svgClass={`transition-all duration-300 ease-in-out ${isActive ? "text-primary-6" : "text-white"}`}
      />
    </div>
  );
};

export default KeyboardArrow;
