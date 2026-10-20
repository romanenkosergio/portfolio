import type { ISnippetCardProps } from "../snippet-card/snippet-card.types";

export type ISnippetAuthorProps = Pick<
  ISnippetCardProps,
  "author" | "path" | "url"
>;
