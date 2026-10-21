import type { FC } from "react";

import { cn } from "@/shared/lib";

import { FRESH_MAX } from "@/pages/contact/config";
import type { TokenKind } from "@/pages/contact/lib";

import { PreviewValue } from "../preview-value";

import type { IPreviewLineProps } from "./preview-line.types";

const KIND_CLASS: Record<TokenKind, string> = {
  text: "text-secondary-1",
  keyword: "text-accent-3",
  value: "text-secondary-3",
  func: "text-accent-4",
  string: "text-accent-2"
};

// One row of the snippet: gutter number and tokens. The row of the focused field is lit (colour
// only); a typed run is marked fresh unless it is a paste.
const PreviewLine: FC<IPreviewLineProps> = ({
  line,
  number,
  values,
  edit,
  focused,
  send
}) => {
  const lit = line.some(token => token.field && token.field === focused);
  const fresh = (field: keyof typeof values) =>
    edit?.field === field && values[field].length - edit.from <= FRESH_MAX
      ? edit.from
      : undefined;

  return (
    <div className="contents">
      <div
        data-line-number=""
        className={cn(
          "pr-10 text-right text-secondary-1 transition-colors duration-300",
          lit && "text-white"
        )}
      >
        {number}
      </div>
      <div
        data-line-text=""
        data-preview-send={send ? "" : undefined}
        className={cn(
          "wrap-break-word whitespace-pre-wrap transition-colors duration-300",
          lit && "bg-white/2"
        )}
      >
        {line.map((token, at) =>
          token.field ? (
            <PreviewValue
              key={at}
              value={values[token.field]}
              className={KIND_CLASS[token.kind]}
              from={fresh(token.field)}
              caret={focused === token.field}
            />
          ) : (
            <span key={at} className={KIND_CLASS[token.kind]}>
              {token.text}
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default PreviewLine;
