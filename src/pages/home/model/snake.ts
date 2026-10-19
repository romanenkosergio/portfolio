"use client";

import { create } from "zustand/react";

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

interface ISnakeStore {
  score: number;
  arrowName: undefined | Direction;
  setArrowName: (arrowName: Direction | undefined) => void;
  setScore: (score: number) => void;
  isVin: boolean | null;
  setVin: (isVin: boolean | null) => void;
}

export const useSnakeStore = create<ISnakeStore>()(set => ({
  score: 10,
  arrowName: undefined,
  isVin: null,
  setArrowName: (arrowName: Direction | undefined) =>
    set(state => ({ arrowName })),
  setScore: (score: number) => set({ score }),
  setVin: (isVin: boolean | null) => set({ isVin })
}));
