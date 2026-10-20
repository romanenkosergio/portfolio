import { Fragment } from "react";
import type { FC } from "react";

import { LinesReveal } from "../motion";

import type { IContentWithCodeLinesProps } from "./content-with-code-lines.types";

// Soft-wrapped like an editor: one grid row per logical line; a wrapped line continues in the
// text cell without a number, hung under the comment's ` * ` prefix.
const ContentWithCodeLines: FC<IContentWithCodeLinesProps> = ({ content }) => {
  const lines = content.split("\n");

  return (
    <LinesReveal className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-10 py-3.5 pr-6 pl-9.5 text-lg leading-normal text-secondary-1">
      {lines.map((line, index) => (
        <Fragment key={index}>
          <div data-line-number="" className="text-right">
            {index + 1}
          </div>
          <div
            data-line-text=""
            className="pl-[3ch] -indent-[3ch] break-words whitespace-pre-wrap"
          >
            {line || " "}
          </div>
        </Fragment>
      ))}
    </LinesReveal>
  );
};

export default ContentWithCodeLines;
