"use client";

import { useSyncExternalStore } from "react";
import type { FC } from "react";

import { useLocale } from "next-intl";

import { previewDate, previewLines } from "@/pages/contact/lib";
import type { TokenKind } from "@/pages/contact/lib";
import { selectValues, useContactStore } from "@/pages/contact/model";

const KIND_CLASS: Record<TokenKind, string> = {
  text: "text-secondary-1",
  keyword: "text-accent-3",
  value: "text-secondary-3",
  func: "text-accent-4",
  string: "text-accent-2"
};

const noop = () => () => undefined;

// The form as code, updated while the visitor types. Decorative (the form is the real thing), so
// hidden from assistive tech; React escapes the user's text and JSON.stringify quotes it.
const CodePreview: FC = () => {
  const locale = useLocale();
  const values = useContactStore(selectValues);
  // Empty on the server so the build-time date never meets a different one on hydration.
  const date = useSyncExternalStore(
    noop,
    () => previewDate(locale, new Date()),
    () => ""
  );

  return (
    <div
      aria-hidden="true"
      className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-10 py-3.5 pr-6 pl-9.5 text-lg leading-normal"
    >
      {previewLines(values, date).map((line, index) => (
        <div key={index} className="contents">
          <div className="text-right text-secondary-1">{index + 1}</div>
          <div className="break-all whitespace-pre-wrap">
            {line.map((token, at) => (
              <span key={at} className={KIND_CLASS[token.kind]}>
                {token.text}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CodePreview;
