"use client";

import { useRef } from "react";
import type { FC } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import {
  DURATION,
  EASE,
  SCRAMBLE_CHARS,
  matchMotion,
  registerMotion
} from "@/shared/lib/motion";

import type { MotionHostType } from "../motion.types";

import type { IScrambleTextProps } from "./scramble-text.types";

registerMotion();

/**
 * Scrambles into its text like a terminal decoding it. Never hidden: the real
 * text is in the HTML and readable from first paint. Screen readers get an
 * sr-only copy; the animated copy is aria-hidden and overlays an invisible
 * copy of the final text, so the box never changes size.
 */
const ScrambleText: FC<IScrambleTextProps> = ({
  as = "span",
  className,
  children,
  chars = SCRAMBLE_CHARS,
  delay = 0,
  duration = DURATION.scramble
}) => {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const animated = ref.current;
      if (!animated) return;
      const mm = matchMotion(animated, {
        full: () => {
          gsap.to(animated, {
            duration,
            delay,
            ease: EASE.soft,
            scrambleText: { text: children, chars, speed: 0.6 }
          });
        }
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [children], revertOnUpdate: true }
  );

  const Tag = as as MotionHostType;
  return (
    <Tag className={className}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="inline-grid">
        <span className="invisible col-start-1 row-start-1">{children}</span>
        <span ref={ref} className="col-start-1 row-start-1">
          {children}
        </span>
      </span>
    </Tag>
  );
};

export default ScrambleText;
