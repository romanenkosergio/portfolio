"use client";

import { useRef } from "react";
import type { FC } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

import {
  DURATION,
  EASE,
  PENDING_ATTR,
  STAGGER,
  matchMotion,
  registerMotion
} from "@/shared/lib/motion";

import type { MotionHostType } from "../motion.types";

import type { ISplitRevealProps } from "./split-reveal.types";

registerMotion();

/** Reveals text unit by unit; the original text is restored on unmount. */
const SplitReveal: FC<ISplitRevealProps> = ({
  as = "span",
  className,
  children,
  split = "chars",
  delay = 0,
  duration = DURATION.base,
  stagger = split === "chars" ? STAGGER.chars : STAGGER.words
}) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const host = ref.current;
      if (!host) return;
      const mm = matchMotion(host, {
        full: () => {
          const instance = SplitText.create(host, {
            type: split,
            aria: "auto",
            mask: split === "lines" ? "lines" : undefined
          });
          gsap.from(instance[split], {
            yPercent: 100,
            opacity: 0,
            duration,
            delay,
            stagger,
            ease: EASE.out
          });
          host.removeAttribute(PENDING_ATTR);
          return () => instance.revert();
        },
        reduced: () => {
          host.removeAttribute(PENDING_ATTR);
        }
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  const Tag = as as MotionHostType;
  return (
    <Tag ref={ref} className={className} {...{ [PENDING_ATTR]: "" }}>
      {children}
    </Tag>
  );
};

export default SplitReveal;
