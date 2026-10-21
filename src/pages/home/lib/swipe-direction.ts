import { SWIPE_THRESHOLD } from "../config";
import type { Direction } from "../model";

/** The direction of a drag by `dx`/`dy` px: the dominant axis wins; none under the threshold. */
export const swipeDirection = (
  dx: number,
  dy: number,
  threshold: number = SWIPE_THRESHOLD
): Direction | undefined => {
  const [ax, ay] = [Math.abs(dx), Math.abs(dy)];
  if (Math.max(ax, ay) < threshold) return undefined;
  if (ax > ay) return dx > 0 ? "RIGHT" : "LEFT";
  return dy > 0 ? "DOWN" : "UP";
};
