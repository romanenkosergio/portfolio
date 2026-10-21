"use client";

import { useRef, useSyncExternalStore } from "react";
import type { FC } from "react";

import { useLocale } from "next-intl";

import { LinesReveal } from "@/shared/ui/motion";

import {
  SEND_LINE,
  previewDate,
  previewLines,
  usePreviewMotion
} from "@/pages/contact/lib";
import {
  selectEdit,
  selectFocused,
  selectValues,
  useContactStore
} from "@/pages/contact/model";

import { PreviewLine } from "../preview-line";

const noop = () => () => undefined;

// The form as code, updated while the visitor types: the focused field's line is lit and carries
// a caret, the newly typed run fades in. Decorative (the form is the real thing), so hidden from
// assistive tech; React escapes the user's text and JSON.stringify quotes it.
const CodePreview: FC = () => {
  const locale = useLocale();
  const values = useContactStore(selectValues);
  const edit = useContactStore(selectEdit);
  const focused = useContactStore(selectFocused);
  const rootRef = useRef<HTMLDivElement>(null);
  // Empty on the server so the build-time date never meets a different one on hydration.
  const date = useSyncExternalStore(
    noop,
    () => previewDate(locale, new Date()),
    () => ""
  );

  usePreviewMotion(rootRef, edit, focused);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="py-3.5 pr-6 pl-9.5 text-lg leading-normal"
    >
      <LinesReveal eager className="grid grid-cols-[auto_minmax(0,1fr)]">
        {previewLines(values, date).map((line, index) => (
          <PreviewLine
            key={index}
            line={line}
            number={index + 1}
            values={values}
            edit={edit}
            focused={focused}
            send={index === SEND_LINE}
          />
        ))}
      </LinesReveal>
    </div>
  );
};

export default CodePreview;
