import type { ComponentPropsWithoutRef } from "react";

export interface IContentWithCodeLinesProps extends ComponentPropsWithoutRef<"div"> {
  content: string;
}
