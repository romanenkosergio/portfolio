import type { ComponentProps, ComponentPropsWithoutRef } from "react";

import type { AboutSection } from "@/widgets/content-layout/lib";

export interface ISidebarContentItemProps extends ComponentPropsWithoutRef<"div"> {
  title: string;
  blockClass: ComponentProps<"div">["className"];
  /**
   * Which About section opens this group on mount (the explorer on a small screen); `null` keeps
   * it closed. Without it the group starts open.
   */
  openOn?: AboutSection | null;
}
