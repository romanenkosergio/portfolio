"use client";

import type { MouseEvent } from "react";
import { useCallback } from "react";

const SMOOTH_SCROLL_OPTIONS: boolean | ScrollIntoViewOptions | undefined = {
  behavior: "smooth"
};

const resolveTargetId = (
  event?: MouseEvent<HTMLAnchorElement>,
  targetIdOverride?: string
): string => {
  return (
    targetIdOverride ||
    event?.currentTarget.getAttribute("href")?.substring(1) ||
    ""
  );
};

const useSmoothScroll = () => {
  return useCallback(
    (
      event?: MouseEvent<HTMLAnchorElement>,
      targetIdOverride?: string
    ): void => {
      if (event) {
        event.preventDefault();
      }

      const resolvedTargetId = resolveTargetId(event, targetIdOverride);
      const element = document.getElementById(resolvedTargetId);

      if (element) {
        element.scrollIntoView(SMOOTH_SCROLL_OPTIONS);
      }
    },
    []
  );
};

export default useSmoothScroll;
