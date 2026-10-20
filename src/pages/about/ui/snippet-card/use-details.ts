import { useRef, useState } from "react";

import {
  SHIFT,
  prefersReducedMotion,
  registerMotion,
  useFold
} from "@/shared/lib/motion";

registerMotion();

/**
 * Open state of a snippet's note: it folds in (opacity + y), is scrolled into
 * the snippet column and, on close, fades out first; focus returns to the toggle.
 */
export const useDetails = () => {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useFold(cardRef, open, { y: -SHIFT.note });

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (!next) return;
    // The fold effect unhides the note after this handler; scroll once it is laid out.
    requestAnimationFrame(() =>
      noteRef.current?.scrollIntoView({
        block: "nearest",
        behavior: prefersReducedMotion() ? "auto" : "smooth"
      })
    );
  };

  // Closing from the note hides the focused ×, so focus goes back to the toggle.
  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  return { open, toggle, close, cardRef, noteRef, toggleRef };
};
