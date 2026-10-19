"use client";
import { useLayoutEffect, useRef, useState } from "react";

import {
  IOriginalStyle,
  IUseScrollLockOptions,
  IUseScrollLockReturn
} from "./use-scroll-lock.types";

const isServerRendering = typeof window === "undefined";

const resolveLockTarget = (
  lockTarget?: HTMLElement | string
): HTMLElement | null => {
  if (!lockTarget) return document.body;
  return typeof lockTarget === "string"
    ? document.querySelector(lockTarget)
    : lockTarget;
};

const adjustScrollbarPadding = (element: HTMLElement): void => {
  const elementWidth =
    element === document.body ? window.innerWidth : element.offsetWidth;
  const currentPaddingRight = parseInt(
    window.getComputedStyle(element).paddingRight || "0",
    10
  );
  const scrollbarWidth = elementWidth - element.scrollWidth;
  element.style.paddingRight = `${scrollbarWidth + currentPaddingRight}px`;
};

const restoreOriginalStyle = (
  element: HTMLElement,
  originalStyle: IOriginalStyle,
  widthReflow: boolean
): void => {
  const { overflow, paddingRight } = originalStyle;
  element.style.overflow = overflow;
  if (widthReflow) {
    element.style.paddingRight = paddingRight;
  }
};

const useScrollLock = ({
  autoLock = true,
  lockTarget,
  widthReflow = true
}: IUseScrollLockOptions = {}): IUseScrollLockReturn => {
  const [isLocked, setIsLocked] = useState(false);
  const target = useRef<HTMLElement | null>(null);
  const originalStyle = useRef<IOriginalStyle | null>(null);

  const preventTouchMove = (event: TouchEvent) => {
    event.preventDefault();
  };

  const lock = (): void => {
    const element = target.current;
    if (!element) return;

    const { overflow, paddingRight } = element.style;
    originalStyle.current = { overflow, paddingRight };

    if (widthReflow) {
      adjustScrollbarPadding(element);
    }

    element.style.overflow = "hidden";

    element.addEventListener("touchmove", preventTouchMove, { passive: false });

    setIsLocked(true);
  };

  const unlock = (): void => {
    const element = target.current;
    if (!element || !originalStyle.current) return;

    restoreOriginalStyle(element, originalStyle.current, widthReflow);

    // Удаление обработчика жестов прокрутки
    element.removeEventListener("touchmove", preventTouchMove);

    setIsLocked(false);
  };

  useLayoutEffect(() => {
    if (isServerRendering) return;

    target.current = resolveLockTarget(lockTarget);
    if (autoLock && target.current) {
      lock();
    }
    return () => unlock(); // Cleanup function
  }, [autoLock, lockTarget, widthReflow]);

  return { isLocked, lock, unlock };
};

export default useScrollLock;
