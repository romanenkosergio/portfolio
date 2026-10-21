import type { FieldName, IContactValues } from "../config";

export type TokenKind = "text" | "keyword" | "value" | "func" | "string";

export interface IToken {
  text: string;
  kind: TokenKind;
  /** Set on the quoted value of a form field: the preview marks it and puts the caret in it. */
  field?: FieldName;
}

const tk = (text: string, kind: TokenKind = "text"): IToken => ({ text, kind });
const str = (value: string, field?: FieldName): IToken => ({
  ...tk(JSON.stringify(value), "string"),
  field
});

/** The row of `form.send(message);`, which glows while the message is on its way. */
export const SEND_LINE = 8;

// The snippet from the design, with the form's values (and today's date) in the object.
export const previewLines = (
  values: IContactValues,
  date: string
): IToken[][] => [
  [
    tk("const", "keyword"),
    tk(" "),
    tk("button", "value"),
    tk(" = "),
    tk("document", "value"),
    tk("."),
    tk("querySelector", "func"),
    tk("("),
    tk("'#sendBtn'", "string"),
    tk(");")
  ],
  [tk("const", "keyword"), tk(" "), tk("message", "value"), tk(" = {")],
  [tk("  name", "value"), tk(": "), str(values.name, "name"), tk(",")],
  [tk("  email", "value"), tk(": "), str(values.email, "email"), tk(",")],
  [tk("  message", "value"), tk(": "), str(values.message, "message"), tk(",")],
  [tk("  date", "value"), tk(": "), str(date)],
  [tk("}")],
  [
    tk("button", "value"),
    tk("."),
    tk("addEventListener", "func"),
    tk("("),
    tk("'click'", "string"),
    tk(", () => {")
  ],
  [
    tk("  form", "value"),
    tk("."),
    tk("send", "func"),
    tk("("),
    tk("message", "value"),
    tk(");")
  ],
  [tk("})")]
];

// «Wed 21 Oct» in the page's language.
export const previewDate = (locale: string, date: Date): string => {
  const parts = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "short"
  }).formatToParts(date);
  const part = (type: string) =>
    parts.find(item => item.type === type)?.value ?? "";
  return `${part("weekday")} ${part("day")} ${part("month")}`;
};
