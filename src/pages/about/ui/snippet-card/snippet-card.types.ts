import type { PropsWithChildren } from "react";

export interface ISnippetCardProps extends PropsWithChildren {
  author: string;
  path: string;
  /** Link to the file on GitHub. */
  url: string;
  /** Short explanation shown under the code by the «details» button. */
  details: string;
  detailsLabel: string;
  closeLabel: string;
}
