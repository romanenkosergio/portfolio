import type { ThemeRegistrationRaw } from "shiki";

// Colours are the palette tokens (`styles.css`), so the code follows the site, not a copy of it.
const COLORS = {
  text: "var(--color-secondary-1)",
  keyword: "var(--color-accent-3)",
  type: "var(--color-accent-1)",
  func: "var(--color-accent-4)",
  value: "var(--color-secondary-3)",
  string: "var(--color-accent-2)"
} as const;

const rule = (scope: string[], foreground: string) => ({
  scope,
  settings: { foreground }
});

export const CODE_THEME: ThemeRegistrationRaw = {
  name: "portfolio",
  type: "dark",
  fg: COLORS.text,
  bg: "transparent",
  // `settings` is the rule list of a raw theme (the TextMate name); `tokenColors` would lose to it.
  settings: [
    rule(["keyword", "storage", "keyword.operator"], COLORS.keyword),
    rule(
      ["entity.name.type", "support.type", "entity.name.class", "meta.type"],
      COLORS.type
    ),
    rule(
      ["entity.name.function", "support.function", "meta.function-call"],
      COLORS.func
    ),
    rule(
      ["variable", "variable.other.property", "constant.numeric", "constant"],
      COLORS.value
    ),
    rule(["string"], COLORS.string),
    rule(["punctuation", "meta.brace"], COLORS.text)
  ]
};
