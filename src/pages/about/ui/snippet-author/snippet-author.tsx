import type { FC } from "react";

import { Icon } from "@/shared/ui";

import type { ISnippetAuthorProps } from "./snippet-author.types";

// Neutral placeholder (the person icon) until there is a photo, with the handle and the file the snippet comes from.
const SnippetAuthor: FC<ISnippetAuthorProps> = ({ author, path, url }) => (
  <div className="flex min-w-0 items-center gap-3">
    <span className="flex size-9 flex-none items-center justify-center rounded-full border border-line bg-primary-3">
      <Icon name="sidebar/personal-info" className="size-4" />
    </span>
    <div className="flex min-w-0 flex-col">
      <p className="text-sm font-bold text-secondary-3">{author}</p>
      <a
        href={url}
        title={path}
        target="_blank"
        rel="noopener noreferrer"
        className="-my-2.5 py-2.5 text-xs break-all text-secondary-1 hover:text-white"
      >
        {path}
      </a>
    </div>
  </div>
);

export default SnippetAuthor;
