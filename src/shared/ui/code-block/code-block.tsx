import { codeToTokens } from "shiki";

import { cn } from "@/shared/lib";

import type { ICodeBlockProps } from "./code-block.types";
import { CODE_THEME } from "./code-theme";

// Highlighted at build time (static export): spans only, no highlighter in the browser.
const CodeBlock = async ({ code, lang = "ts", className }: ICodeBlockProps) => {
  const { tokens } = await codeToTokens(code, { lang, theme: CODE_THEME });

  return (
    <pre
      className={cn(
        "overflow-x-auto text-sm leading-[170%] text-secondary-1 [font-variant-ligatures:none]",
        className
      )}
    >
      <code>
        {tokens.map((line, row) => (
          <span key={row} className="block whitespace-pre">
            {line.map((token, col) => (
              <span key={col} style={{ color: token.color }}>
                {token.content}
              </span>
            ))}
            {line.length === 0 && " "}
          </span>
        ))}
      </code>
    </pre>
  );
};

export default CodeBlock;
