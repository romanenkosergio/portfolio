"use client";

import type { FC } from "react";

import { cn } from "@/shared/lib";
import { Icon } from "@/shared/ui";

import { FOOD_TOTAL } from "@/pages/home/config";
import { selectFoodLeft, useSnakeStore } from "@/pages/home/model";

const Food: FC = () => {
  const foodLeft = useSnakeStore(selectFoodLeft);
  return (
    <div className="mt-5 px-3">
      <span className="text-sm leading-4.5 text-white">{"//"} food left</span>
      <div className="mt-2.75 grid w-33 grid-cols-5 gap-2">
        {Array.from({ length: FOOD_TOTAL }).map((_, idx: number) => (
          <Icon
            name="game/food"
            key={`score-${idx}`}
            className={cn(
              "h-5 w-5 transition-all duration-300 ease-in-out",
              idx >= foodLeft && "opacity-30"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Food;
