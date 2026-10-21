import type { FC } from "react";

import type { IPreviewValueProps } from "./preview-value.types";

const QUOTE = '"';

// The text as it sits between the quotes of a JSON string.
const inner = (text: string) => JSON.stringify(text).slice(1, -1);

// A field's value as a quoted string: the settled part, the freshly typed run (marked for the
// fade-in) and, while the field is focused, the caret before the closing quote.
const PreviewValue: FC<IPreviewValueProps> = ({
  value,
  className,
  from,
  caret
}) => {
  const split = from ?? value.length;

  return (
    <span className={className}>
      {QUOTE}
      {inner(value.slice(0, split))}
      {split < value.length && (
        <span data-fresh="">{inner(value.slice(split))}</span>
      )}
      {caret && (
        <span
          data-caret=""
          className="ml-px inline-block h-[1.1em] w-0.5 bg-white align-text-bottom"
        />
      )}
      {QUOTE}
    </span>
  );
};

export default PreviewValue;
