import type { FC } from "react";

import type { ISnippetAuthorProps } from "./snippet-author.types";

// Abstract avatar (no photo) with the handle and the file the snippet comes from.
const SnippetAuthor: FC<ISnippetAuthorProps> = ({ author, path, url }) => (
  <div className="flex min-w-0 items-center gap-3">
    <span
      aria-hidden="true"
      className="size-9 flex-none rounded-full bg-linear-to-br from-accent-3 via-accent-4 to-secondary-3"
    />
    <div className="flex min-w-0 flex-col">
      <p className="text-sm font-bold text-secondary-3">{author}</p>
      <a
        href={url}
        title={path}
        target="_blank"
        rel="noopener noreferrer"
        className="-my-2.5 truncate py-2.5 text-xs text-secondary-1 hover:text-white"
      >
        {path}
      </a>
    </div>
  </div>
);

export default SnippetAuthor;
