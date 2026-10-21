import { Fragment } from "react";
import type { FC } from "react";

import type { IHighlightedProps } from "./highlighted.types";

// The metric of an entry (set per locale) stands out from its bullet.
const Highlighted: FC<IHighlightedProps> = ({ text, highlight }) => {
  const [before, ...rest] = text.split(highlight);
  if (!highlight || rest.length === 0) return text;
  return (
    <>
      {before}
      {rest.map((part, index) => (
        <Fragment key={index}>
          <mark className="bg-transparent font-bold text-accent-2">
            {highlight}
          </mark>
          {part}
        </Fragment>
      ))}
    </>
  );
};

export default Highlighted;
