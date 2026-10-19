import type { IContentLayoutProps } from "../content-layout.types";

export interface ISidebarProps extends Pick<IContentLayoutProps, "type"> {
  subType: "personal-info" | "professional-info" | "hobbies";
}
