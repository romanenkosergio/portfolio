import type { IRevealInOptions } from "@/shared/lib/motion";

import type { IMotionBaseProps } from "../motion.types";

export type IStaggerProps = IMotionBaseProps &
  IRevealInOptions & {
    /** CSS selector for the items; the direct children by default. */
    selector?: string;
    /** Wait for the text plugins (see `useReveal`). */
    afterLoad?: boolean;
  };
