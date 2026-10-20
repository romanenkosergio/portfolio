"use client";

import { useId, useState } from "react";
import type { FC } from "react";

import { cn } from "@/shared/lib";
import { Icon } from "@/shared/ui";

import { SnippetAuthor } from "../snippet-author";

import type { ISnippetCardProps } from "./snippet-card.types";

// `children` is the highlighted code, rendered on the server; only the toggle is client state.
const SnippetCard: FC<ISnippetCardProps> = ({
  author,
  path,
  url,
  details,
  detailsLabel,
  closeLabel,
  children
}) => {
  const [open, setOpen] = useState(false);
  const detailsId = useId();

  return (
    <article className="flex flex-col gap-4.5">
      <header className="flex items-center justify-between gap-4">
        <SnippetAuthor author={author} path={path} url={url} />
        <button
          type="button"
          title={detailsLabel}
          aria-expanded={open}
          aria-controls={detailsId}
          onClick={() => setOpen(value => !value)}
          className={cn(
            "flex-none text-sm hover:text-white",
            open ? "text-white" : "text-secondary-1"
          )}
        >
          {detailsLabel}
        </button>
      </header>
      <div className="rounded-[15px] border border-line bg-primary-3 px-7.5 py-6">
        {children}
      </div>
      <div
        id={detailsId}
        hidden={!open}
        className="group flex items-start justify-between gap-4 border-t border-t-line pt-4 text-sm leading-normal text-secondary-1"
      >
        <p>{details}</p>
        <Icon
          name="close"
          onClick={() => setOpen(false)}
          label={closeLabel}
          interactive
          className="mt-0.5 h-3.5 w-3.5 flex-none"
        />
      </div>
    </article>
  );
};

export default SnippetCard;
