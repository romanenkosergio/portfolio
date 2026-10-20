import type { IRevealInOptions } from "@/shared/lib/motion";

import type { IMotionBaseProps } from "../motion.types";

export type IScrambleTextProps = Omit<IMotionBaseProps, "children"> &
  Pick<IRevealInOptions, "delay" | "duration"> & {
    /** The final text; plain string, present in the HTML from the start. */
    children: string;
    /** Characters the scramble cycles through. */
    chars?: string;
  };
