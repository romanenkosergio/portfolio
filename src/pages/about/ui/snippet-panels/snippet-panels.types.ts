import type { ReactNode } from "react";

import type { AboutType } from "@/pages/about/config";

export interface ISnippetPanelsProps {
  /** The highlighted snippets of each file, rendered on the server. */
  panels: Record<AboutType, ReactNode>;
}
