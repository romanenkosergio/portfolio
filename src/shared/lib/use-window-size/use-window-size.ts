"use client";

import { useEffect, useState } from "react";
import { IWindowSize } from "./use-window-size.types";

// Constants
const INITIAL_WINDOW_SIZE: IWindowSize = { width: 0, height: 0 };
const RESIZE_EVENT = "resize";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] =
    useState<IWindowSize>(INITIAL_WINDOW_SIZE);

  const updateWindowSize = () => {
    const width: number = window.innerWidth;
    const height: number = window.innerHeight;
    setWindowSize({ width, height });
  };

  const cleanupResizeListener = () => {
    window.removeEventListener(RESIZE_EVENT, updateWindowSize);
  };

  useEffect(() => {
    updateWindowSize();
    window.addEventListener(RESIZE_EVENT, updateWindowSize);
    return cleanupResizeListener;
  }, []);

  return windowSize;
};
