import type { IRevealInOptions } from "@/shared/lib/motion";

import type { IMotionBaseProps } from "../motion.types";

export type ISplitRevealProps = Omit<IMotionBaseProps, "children"> &
  Omit<IRevealInOptions, "y" | "scroll"> & {
    /** The text to split; plain string. */
    children: string;
    /** Unit to animate, `chars` by default. */
    split?: "chars" | "words" | "lines";
  };
