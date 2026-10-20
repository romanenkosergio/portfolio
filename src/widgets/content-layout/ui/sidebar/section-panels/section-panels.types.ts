import type { ReactNode } from "react";

import type { AboutSection } from "@/widgets/content-layout/lib";

export interface ISectionPanelsProps {
  /** The explorer content of every section, rendered on the server; the path picks one. */
  panels: Record<AboutSection, ReactNode>;
}
