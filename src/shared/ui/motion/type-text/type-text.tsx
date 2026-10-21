"use client";

import { useRef } from "react";
import type { FC } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import {
  DURATION,
  EASE,
  PENDING_ATTR,
  TYPE,
  isAlreadyVisible,
  loadScrambleText,
  matchMotion,
  playAfterLoad
} from "@/shared/lib/motion";

import type { MotionHostType } from "../motion.types";

import type { ITypeTextProps } from "./type-text.types";

/** Caret box at a char's right edge (or its left edge), as long as the char is tall. */
const edgeOf = (
  char: HTMLElement,
  width = char.offsetWidth
): gsap.TweenVars => ({
  x: char.offsetLeft + width,
  y: char.offsetTop,
  height: char.offsetHeight
});

interface ITypingOptions {
  chars: HTMLElement[];
  caret: HTMLElement | null;
  keepCaret: boolean;
  speed: number;
  delay: number;
}

/**
 * Reveals the chars one by one, moving the caret to each char's right edge.
 * Afterwards the caret blinks (kept) or fades out. All of it is created
 * synchronously, so the surrounding matchMedia context reverts it.
 */
const typeChars = ({
  chars,
  caret,
  keepCaret,
  speed,
  delay
}: ITypingOptions): gsap.core.Timeline => {
  const timeline = gsap.timeline({ delay });
  gsap.set(chars, { opacity: 0 });
  if (caret && chars[0])
    gsap.set(caret, { opacity: 1, ...edgeOf(chars[0], 0) });
  const blink = caret
    ? gsap.to(caret, {
        opacity: 0,
        duration: TYPE.blink,
        repeat: -1,
        yoyo: true,
        ease: EASE.blink,
        paused: true
      })
    : null;
  chars.forEach((char, index) => {
    const at = index / speed;
    timeline.set(char, { opacity: 1 }, at);
    if (caret) {
      timeline.set(caret, edgeOf(char), at);
    }
  });
  if (!caret || !blink) return timeline;
  if (keepCaret) return timeline.add(() => void blink.play(), `+=${TYPE.hold}`);
  return timeline.to(
    caret,
    { opacity: 0, duration: DURATION.fast },
    `+=${TYPE.hold}`
  );
};

/** Caret box after the last line box of the unsplit text. */
const endOf = (text: HTMLElement): gsap.TweenVars => {
  const range = document.createRange();
  range.selectNodeContents(text);
  const last = Array.from(range.getClientRects()).at(-1);
  if (!last) return { x: text.offsetWidth };
  const origin = text.getBoundingClientRect();
  return {
    x: last.right - origin.left,
    y: last.top - origin.top,
    height: last.height
  };
};

interface IPlayTyping extends Omit<ITypingOptions, "chars"> {
  host: HTMLElement;
  text: HTMLElement;
}

/** Splits the text and types it (full motion), or shows it at once (reduced); returns the context to revert. */
const playTyping = ({ host, text, ...options }: IPlayTyping): gsap.MatchMedia =>
  matchMotion(host, {
    full: contextSafe =>
      playAfterLoad(
        // The same loader as ScrambleText, so both hero lines start together and keep HERO_DELAY.
        loadScrambleText,
        SplitText => {
          if (isAlreadyVisible(host)) return;
          const instance = SplitText.create(text, {
            type: "chars",
            smartWrap: true,
            aria: "none",
            onSplit: self =>
              typeChars({ ...options, chars: self.chars as HTMLElement[] })
          });
          host.removeAttribute(PENDING_ATTR);
          return () => instance.revert();
        },
        contextSafe
      ),
    reduced: () => {
      host.removeAttribute(PENDING_ATTR);
      const { caret, keepCaret } = options;
      if (caret && keepCaret) {
        gsap.set(caret, { opacity: 1, ...endOf(text) });
      }
    }
  });

/**
 * Types its text char by char, like a terminal. The real text is in the HTML
 * (sr-only copy for screen readers); the animated copy is aria-hidden, its
 * chars occupy their final space from the start, so the box never shifts.
 * The caret is an absolutely placed block that never takes part in layout.
 * Reduced motion: the final text, with a static caret when it is kept.
 */
const TypeText: FC<ITypeTextProps> = ({
  as = "span",
  className,
  children,
  caret = false,
  keepCaret = true,
  speed = TYPE.speed,
  delay = 0
}) => {
  const hostRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const host = hostRef.current;
      const text = textRef.current;
      if (!host || !text) return;
      const mm = playTyping({
        host,
        text,
        caret: caretRef.current,
        keepCaret,
        speed,
        delay
      });
      return () => mm.revert();
    },
    {
      scope: hostRef,
      dependencies: [children, caret, keepCaret, speed, delay],
      revertOnUpdate: true
    }
  );

  const Tag = as as MotionHostType;
  return (
    <Tag ref={hostRef} className={className} {...{ [PENDING_ATTR]: "" }}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="relative inline-block">
        <span key={children} ref={textRef}>
          {children}
        </span>
        {caret && (
          <span
            ref={caretRef}
            className="absolute top-0 left-0 h-[1em] w-[0.55em] bg-current opacity-0"
          />
        )}
      </span>
    </Tag>
  );
};

export default TypeText;
