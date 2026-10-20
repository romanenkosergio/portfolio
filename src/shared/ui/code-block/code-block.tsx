import { codeToTokens } from "shiki";

import { cn } from "@/shared/lib";

import type { ICodeBlockProps } from "./code-block.types";
import { CODE_TEXT_COLOR, CODE_THEME } from "./code-theme";

const WRAP_INDENT = 2;

// Soft-wrapped lines continue two columns deeper than their own indent (monospace, so `ch`).
const wrapStyle = (indent: number) => ({
  paddingLeft: `${indent + WRAP_INDENT}ch`,
  textIndent: `-${indent + WRAP_INDENT}ch`
});

// Highlighted at build time (static export): spans only, no highlighter in the browser.
const CodeBlock = async ({ code, lang = "ts", className }: ICodeBlockProps) => {
  const { tokens } = await codeToTokens(code, { lang, theme: CODE_THEME });

  return (
    <pre
      className={cn(
        "text-sm leading-[170%] text-secondary-1 [font-variant-ligatures:none]",
        className
      )}
    >
      <code>
        {tokens.map((line, row) => {
          const text = line.map(token => token.content).join("");
          const indent = text.length - text.trimStart().length;
          return (
            <span
              key={row}
              className="block break-words whitespace-pre-wrap"
              style={wrapStyle(indent)}
            >
              {line.map((token, col) => (
                <span
                  key={col}
                  style={
                    token.color === CODE_TEXT_COLOR
                      ? undefined
                      : { color: token.color }
                  }
                >
                  {token.content}
                </span>
              ))}
              {line.length === 0 && " "}
            </span>
          );
        })}
      </code>
    </pre>
  );
};

export default CodeBlock;
