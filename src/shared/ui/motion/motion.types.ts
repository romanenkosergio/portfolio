import type { ElementType, PropsWithChildren, Ref } from "react";

/** Elements a primitive may render as. */
export type MotionTag =
  "div" | "span" | "p" | "h1" | "h2" | "h3" | "section" | "ul" | "li";

export type IMotionBaseProps = PropsWithChildren<{
  /** Rendered element, `div` by default. */
  as?: MotionTag;
  /** Layout classes only. */
  className?: string;
}>;

/** Props the primitives pass to their element; lets the tag be chosen at runtime. */
export type MotionHostType = ElementType<{
  ref?: Ref<HTMLElement>;
  className?: string;
}>;
