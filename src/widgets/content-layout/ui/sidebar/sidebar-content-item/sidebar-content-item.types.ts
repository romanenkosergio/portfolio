import { ComponentProps, ComponentPropsWithoutRef } from "react";

export interface ISidebarContentItemProps
  extends ComponentPropsWithoutRef<"div"> {
  title: string;
  blockClass: ComponentProps<"div">["className"];
}
