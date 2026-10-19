import type { FC } from "react";

import type { IContentWithCodeLinesProps } from "./content-with-code-lines.types";

const ContentWithCodeLines: FC<IContentWithCodeLinesProps> = ({ content }) => {
  const lines = content.split("\n");

  return (
    <div className="flex w-full gap-10 border-t border-t-line py-3.5 pl-9.5">
      <div className="text-right text-secondary-1">
        {lines.map((_, index) => (
          <div key={index} className="leading-6">
            {index + 1}
          </div>
        ))}
      </div>

      <div className="text-secondary-1">
        {lines.map((line, index) => (
          <div key={index} className="leading-6">
            {line || "\u00A0"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentWithCodeLines;
