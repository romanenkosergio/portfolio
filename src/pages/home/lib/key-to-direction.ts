import type { KeyboardEvent } from "react";

import { KEY_DIRECTIONS } from "../config";
import type { Direction } from "../model";

/** The direction a board key press means; none for other keys or with ctrl/meta/alt held. */
export const keyToDirection = (
  event: Pick<KeyboardEvent, "key" | "metaKey" | "ctrlKey" | "altKey">
): Direction | undefined => {
  if (event.metaKey || event.ctrlKey || event.altKey) return undefined;
  return KEY_DIRECTIONS[event.key] ?? KEY_DIRECTIONS[event.key.toLowerCase()];
};
