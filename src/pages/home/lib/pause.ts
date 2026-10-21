import { create } from "zustand/react";

interface IPause {
  /** The round waits: the board left the view or the tab was hidden. It stays so until the player's next input. */
  paused: boolean;
  pause: () => void;
  resume: () => void;
}

export const usePause = create<IPause>()(set => ({
  paused: false,
  pause: () => set({ paused: true }),
  resume: () => set({ paused: false })
}));

export const selectPaused = (s: IPause) => s.paused;
