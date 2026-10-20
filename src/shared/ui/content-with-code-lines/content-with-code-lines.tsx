import type { FC } from "react";

import type { IContentWithCodeLinesProps } from "./content-with-code-lines.types";

const ContentWithCodeLines: FC<IContentWithCodeLinesProps> = ({ content }) => {
  const lines = content.split("\n");

  return (
    <div className="flex w-max min-w-full gap-10 py-3.5 pl-9.5 text-lg leading-normal">
      <div className="text-right text-secondary-1">
        {lines.map((_, index) => (
          <div key={index}>{index + 1}</div>
        ))}
      </div>

      <div className="text-secondary-1">
        {lines.map((line, index) => (
          <div key={index} className="whitespace-pre">
            {line || "\u00A0"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentWithCodeLines;
