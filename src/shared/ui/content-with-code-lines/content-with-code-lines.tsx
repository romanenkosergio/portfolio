import { FC } from "react";
import { IContentWithCodeLinesProps } from "./content-with-code-lines.types";

const ContentWithCodeLines: FC<IContentWithCodeLinesProps> = ({ content }) => {
  const lines = content.split("\n");

  return (
    <div className="border-t-line flex w-full gap-10 border-t py-3.5 pl-9.5">
      <div className="text-secondary-1 text-right">
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
