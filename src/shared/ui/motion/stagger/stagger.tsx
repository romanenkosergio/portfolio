"use client";

import { useRef } from "react";
import type { FC } from "react";

import {
  PENDING_ATTR,
  STAGGER,
  registerMotion,
  useReveal
} from "@/shared/lib/motion";

import type { MotionHostType } from "../motion.types";

import type { IStaggerProps } from "./stagger.types";

registerMotion();

/** Reveals its direct children (or `selector` matches) one after another. */
const Stagger: FC<IStaggerProps> = ({
  as = "div",
  className,
  children,
  selector,
  stagger = STAGGER.children,
  eager = false,
  afterLoad = false,
  ...options
}) => {
  const ref = useRef<HTMLElement>(null);

  useReveal(ref, {
    ...options,
    eager,
    afterLoad,
    selector,
    stagger,
    children: !selector
  });

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

export default Stagger;
