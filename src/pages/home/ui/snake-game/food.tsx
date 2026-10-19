"use client";

import type { FC } from "react";

import { Icon } from "@/shared/ui";

import { useSnakeStore } from "../../model";

const Food: FC = () => {
  const { score } = useSnakeStore();
  return (
    <div className="mt-5">
      <span className="text-sm text-white">{"//"} food left</span>
      <div className="mt-4.5 grid w-33 grid-cols-5 gap-2">
        {Array.from({ length: 10 }).map((_, idx: number) => (
          <Icon
            name="food"
            folder="game"
            key={`score-${idx}`}
            className={`h-5 w-5 transition-all duration-300 ease-in-out ${idx >= score ? "opacity-30" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Food;
