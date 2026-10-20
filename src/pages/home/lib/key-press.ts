import { create } from "zustand/react";

import type { Direction } from "../model";

interface IKeyPress {
  /** The last board key that steered a running game; `id` makes a repeated press a new signal. */
  pressed: { direction: Direction; id: number } | null;
  press: (direction: Direction) => void;
}

/** A signal only: the on-screen arrows subscribe to it (no re-render) and flash. */
export const useKeyPress = create<IKeyPress>()(set => ({
  pressed: null,
  press: direction =>
    set(state => ({
      pressed: { direction, id: (state.pressed?.id ?? 0) + 1 }
    }))
}));
