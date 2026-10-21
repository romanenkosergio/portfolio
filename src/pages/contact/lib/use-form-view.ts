import { useEffect, useState } from "react";
import type { RefObject } from "react";

import { exitOut } from "@/shared/lib/motion";

import type { FormStatus } from "../config";

export type FormView = "form" | "success";

/**
 * Which pane is on screen. The status flips at once, the pane follows after the leaving one has
 * faded out (`exitOut`; instant under reduced motion). `leave` runs the same fade for the
 * success pane, then `done` (reset the form) and the form returns.
 */
export const useFormView = (
  rootRef: RefObject<HTMLElement | null>,
  status: FormStatus
) => {
  const [view, setView] = useState<FormView>("form");

  useEffect(() => {
    if (status !== "success") return;
    return exitOut(rootRef.current?.querySelector("form") ?? null, () =>
      setView("success")
    );
  }, [rootRef, status]);

  const leave = (done: () => void) => {
    exitOut(rootRef.current?.firstElementChild ?? null, () => {
      done();
      setView("form");
    });
  };

  return { view, leave };
};
