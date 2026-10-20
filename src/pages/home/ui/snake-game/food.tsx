"use client";

import { useRef } from "react";
import type { FC } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslations } from "next-intl";

import {
  DURATION,
  EASE,
  SCALE,
  matchMotion,
  registerMotion
} from "@/shared/lib/motion";
import { Icon } from "@/shared/ui";

import { FOOD_TOTAL } from "@/pages/home/config";
import { selectFoodLeft, useSnakeStore } from "@/pages/home/model";

registerMotion();

/** The icon that just turned faded pops; a reset (food left grows) stays quiet. */
const Food: FC = () => {
  const t = useTranslations("game");
  const foodLeft = useSnakeStore(selectFoodLeft);
  const gridRef = useRef<HTMLDivElement>(null);
  const previous = useRef(foodLeft);

  useGSAP(
    () => {
      const grid = gridRef.current;
      const wasLeft = previous.current;
      previous.current = foodLeft;
      const eaten = grid?.children[foodLeft];
      if (!grid || !eaten || foodLeft >= wasLeft) return;
      const mm = matchMotion(grid, {
        full: () => {
          gsap.to(eaten, {
            scale: SCALE.pop,
            duration: DURATION.fast / 2,
            repeat: 1,
            yoyo: true,
            ease: EASE.soft
          });
        }
      });
      return () => mm.revert();
    },
    { scope: gridRef, dependencies: [foodLeft], revertOnUpdate: true }
  );
  return (
    <div className="mt-5 px-3">
      <span className="text-sm leading-4.5 text-white">{t("foodLeft")}</span>
      <div ref={gridRef} className="mt-2.75 grid w-33 grid-cols-5 gap-2">
        {Array.from({ length: FOOD_TOTAL }).map((_, idx: number) => (
          <Icon
            name="game/food"
            key={`score-${idx}`}
            className="h-5 w-5"
            faded={idx >= foodLeft}
          />
        ))}
      </div>
    </div>
  );
};

export default Food;
