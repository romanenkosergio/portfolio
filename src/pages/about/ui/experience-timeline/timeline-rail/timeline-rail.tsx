"use client";

import { useRef } from "react";
import type { FC } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { DURATION, EASE, PENDING_ATTR, matchMotion } from "@/shared/lib/motion";

// The rail draws top-down (scaleY from its top). It is hidden by the pending attribute until GSAP
// has set scaleY 0, so a full load does not flash it drawn first; reduced motion just shows it.
const TimelineRail: FC = () => {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const rail = ref.current;
      if (!rail) return;
      const mm = matchMotion(rail, {
        full: () => {
          gsap.set(rail, { scaleY: 0, transformOrigin: "top" });
          rail.removeAttribute(PENDING_ATTR);
          gsap.to(rail, {
            scaleY: 1,
            duration: DURATION.slow * 1.5,
            ease: EASE.inOut,
            clearProps: "transform"
          });
        },
        reduced: () => rail.removeAttribute(PENDING_ATTR)
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <span
      ref={ref}
      {...{ [PENDING_ATTR]: "" }}
      aria-hidden="true"
      className="absolute top-2 bottom-2 left-[5px] w-px bg-line"
    />
  );
};

export default TimelineRail;
