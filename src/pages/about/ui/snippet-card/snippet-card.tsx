"use client";

import { useId } from "react";
import type { FC } from "react";

import { cn } from "@/shared/lib";
import { FOLD_PANEL } from "@/shared/lib/motion";
import { Icon } from "@/shared/ui";

import { SnippetAuthor } from "../snippet-author";

import type { ISnippetCardProps } from "./snippet-card.types";
import { useDetails } from "./use-details";

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
  const detailsId = useId();
  const { open, toggle, close, cardRef, noteRef, toggleRef } = useDetails();

  return (
    <article ref={cardRef} className="flex flex-col gap-4.5">
      <header className="flex items-center justify-between gap-4">
        <SnippetAuthor author={author} path={path} url={url} />
        <button
          ref={toggleRef}
          type="button"
          title={detailsLabel}
          aria-expanded={open}
          aria-controls={detailsId}
          onClick={toggle}
          className={cn(
            "min-h-11 flex-none rounded-md border border-line px-3 text-sm hover:border-secondary-1 hover:text-white desktop:min-h-0 desktop:py-1",
            open ? "text-white" : "text-secondary-1"
          )}
        >
          {detailsLabel}
        </button>
      </header>
      <div className="rounded-[15px] border border-line bg-primary-3 px-5 py-5">
        {children}
      </div>
      <div
        ref={noteRef}
        id={detailsId}
        hidden
        {...{ [FOLD_PANEL]: "" }}
        className="group flex items-start justify-between gap-4 border-t border-t-line pt-4 text-sm leading-normal text-secondary-1"
      >
        <p>{details}</p>
        <Icon
          name="close"
          onClick={close}
          label={closeLabel}
          interactive
          className="mt-0.5 h-3.5 w-3.5 flex-none"
        />
      </div>
    </article>
  );
};

export default SnippetCard;
