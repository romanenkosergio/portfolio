/**
 * Test files. A `describe` is one long function by nature and nests `it` inside `describe` inside
 * helpers, so the size ceilings that guard production code do not apply to it; fixtures are
 * literal strings, not copy. Everything else (types, imports, a11y) stays on.
 */
export const testsConfig = {
  files: [
    "**/*.test.{ts,tsx}",
    "jest.setup.ts",
    "src/shared/lib/test/**/*.{ts,tsx}"
  ],
  rules: {
    "max-lines-per-function": "off",
    "max-nested-callbacks": "off",
    "react/jsx-no-literals": "off",
    "project/no-literal-copy": "off"
  }
};
