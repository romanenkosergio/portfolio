"use client";

import { useRef } from "react";
import type { FC } from "react";

import { PENDING_ATTR, registerMotion, useReveal } from "@/shared/lib/motion";

import type { MotionHostType } from "../motion.types";

import type { IRevealProps } from "./reveal.types";

registerMotion();

/** Fades and lifts its content in, on mount or when scrolled into view. */
const Reveal: FC<IRevealProps> = ({
  as = "div",
  className,
  children,
  eager = false,
  afterLoad = false,
  ...options
}) => {
  const ref = useRef<HTMLElement>(null);

  useReveal(ref, { ...options, eager, afterLoad });

  const Tag = as as MotionHostType;
  return (
    <Tag
      ref={ref}
      className={className}
      {...(eager ? {} : { [PENDING_ATTR]: "" })}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
