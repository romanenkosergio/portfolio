import type { ReactNode } from "react";

// Widgets cannot import each other (FSD), so the composition root passes the landmarks in.
export interface ILayoutShellProps {
  header: ReactNode;
  footer: ReactNode;
}
