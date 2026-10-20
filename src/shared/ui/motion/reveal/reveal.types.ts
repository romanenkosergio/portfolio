import type { IRevealInOptions } from "@/shared/lib/motion";

import type { IMotionBaseProps } from "../motion.types";

export type IRevealProps = IMotionBaseProps & Omit<IRevealInOptions, "stagger">;
