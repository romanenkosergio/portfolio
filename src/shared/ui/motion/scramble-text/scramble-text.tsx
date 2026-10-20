"use client";

import { useRef } from "react";
import type { FC } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

import {
  SCRAMBLE_CHARS,
  WAVE,
  matchMotion,
  registerScrambleText
} from "@/shared/lib/motion";

import type { MotionHostType } from "../motion.types";

import type { IScrambleTextProps } from "./scramble-text.types";

registerScrambleText();

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
  delay = 0
}) => {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const animated = ref.current;
      if (!animated) return;
      const mm = matchMotion(animated, {
        full: () => {
          const instance = SplitText.create(animated, {
            type: "chars",
            aria: "none",
            onSplit: self => {
              const wave = gsap.timeline({ delay });
              self.chars.forEach((char, index) => {
                const letter = char.textContent ?? "";
                if (letter.trim() === "") return;
                wave.to(
                  char,
                  {
                    duration: WAVE.char,
                    scrambleText: { text: letter, chars, speed: 1 }
                  },
                  index * WAVE.stagger
                );
              });
              return wave;
            }
          });
          return () => instance.revert();
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
