"use client";

import { useRef } from "react";
import type { FC } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { DURATION, EASE, matchMotion } from "@/shared/lib/motion";

// The rail draws top-down (scaleY from its top); reduced motion leaves it drawn.
const TimelineRail: FC = () => {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const rail = ref.current;
      if (!rail) return;
      const mm = matchMotion(rail, {
        full: () => {
          gsap.from(rail, {
            scaleY: 0,
            transformOrigin: "top",
            duration: DURATION.slow * 1.5,
            ease: EASE.inOut,
            clearProps: "transform"
          });
        }
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="absolute top-2 bottom-2 left-[5px] w-px bg-line"
    />
  );
};

export default TimelineRail;
