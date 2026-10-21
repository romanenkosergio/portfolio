"use client";

import { useRef } from "react";
import type { FC } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import {
  DURATION,
  EASE,
  PENDING_ATTR,
  STAGGER,
  isAlreadyVisible,
  loadSplitText,
  matchMotion,
  playAfterLoad
} from "@/shared/lib/motion";

import type { MotionHostType } from "../motion.types";

import type { ISplitRevealProps } from "./split-reveal.types";

/**
 * Reveals text unit by unit. Screen readers read an sr-only copy once; the
 * split copy is aria-hidden. The split reverts on unmount and re-runs when
 * the text changes, and `lines` re-split after fonts load or on resize.
 */
const SplitReveal: FC<ISplitRevealProps> = ({
  as = "span",
  className,
  children,
  split = "chars",
  delay = 0,
  duration = DURATION.base,
  stagger = split === "chars" ? STAGGER.chars : STAGGER.words
}) => {
  const hostRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const host = hostRef.current;
      const text = textRef.current;
      if (!host || !text) return;
      const mm = matchMotion(host, {
        full: contextSafe =>
          playAfterLoad(
            loadSplitText,
            SplitText => {
              if (isAlreadyVisible(host)) return;
              const instance = SplitText.create(text, {
                type: split,
                aria: "none",
                autoSplit: true,
                mask: split === "lines" ? "lines" : undefined,
                onSplit: self =>
                  gsap.from(self[split], {
                    yPercent: 100,
                    opacity: 0,
                    duration,
                    delay,
                    stagger,
                    ease: EASE.out
                  })
              });
              host.removeAttribute(PENDING_ATTR);
              return () => instance.revert();
            },
            contextSafe
          ),
        reduced: () => {
          host.removeAttribute(PENDING_ATTR);
        }
      });
      return () => mm.revert();
    },
    { scope: hostRef, dependencies: [children], revertOnUpdate: true }
  );

  const Tag = as as MotionHostType;
  return (
    <Tag ref={hostRef} className={className} {...{ [PENDING_ATTR]: "" }}>
      <span className="sr-only">{children}</span>
      <span key={children} ref={textRef} aria-hidden="true" className="block">
        {children}
      </span>
    </Tag>
  );
};

export default SplitReveal;
