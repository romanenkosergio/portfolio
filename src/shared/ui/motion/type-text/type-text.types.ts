import type { IRevealInOptions } from "@/shared/lib/motion";

import type { IMotionBaseProps } from "../motion.types";

export type ITypeTextProps = Omit<IMotionBaseProps, "children"> &
  Pick<IRevealInOptions, "delay"> & {
    /** The final text; plain string, present in the HTML from the start. */
    children: string;
    /** Show a block caret that follows the typing. */
    caret?: boolean;
    /** Keep the caret blinking after the last char; otherwise it leaves. */
    keepCaret?: boolean;
    /** Characters per second. */
    speed?: number;
  };
