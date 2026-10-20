"use client";

import { useRef } from "react";
import type { FC } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import {
  DURATION,
  EASE,
  PENDING_ATTR,
  SCRAMBLE_CHARS,
  matchMotion,
  registerMotion
} from "@/shared/lib/motion";

import type { MotionHostType } from "../motion.types";

import type { IScrambleTextProps } from "./scramble-text.types";

registerMotion();

/** Scrambles into its text like a terminal decoding it; the text is in the HTML from the start. */
const ScrambleText: FC<IScrambleTextProps> = ({
  as = "span",
  className,
  children,
  chars = SCRAMBLE_CHARS,
  delay = 0,
  duration = DURATION.scramble
}) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const host = ref.current;
      if (!host) return;
      const mm = matchMotion(host, {
        full: () => {
          gsap.to(host, {
            duration,
            delay,
            ease: EASE.soft,
            scrambleText: { text: children, chars, speed: 0.6 }
          });
          host.removeAttribute(PENDING_ATTR);
        },
        reduced: () => {
          host.removeAttribute(PENDING_ATTR);
        }
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [children] }
  );

  const Tag = as as MotionHostType;
  return (
    <Tag ref={ref} className={className} {...{ [PENDING_ATTR]: "" }}>
      {children}
    </Tag>
  );
};

export default ScrambleText;
