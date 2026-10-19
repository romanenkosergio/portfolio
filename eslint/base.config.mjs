import { plugin as shadcnLint } from "@shadcn/lint";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";

import { projectPlugin } from "./plugin.mjs";

/**
 * The baseline rule set.
 *
 * There is no warning tier (D5): every rule is `error` or `off`. A rule that is
 * wrong for this codebase is turned off here with a reason; a violation that
 * existing code still has is switched off per file in `pending.config.mjs`,
 * naming the PLAN item that clears it. Never a call-site disable.
 */

const IMPORT_ORDER = [
  "error",
  {
    groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
    "newlines-between": "always",
    alphabetize: { order: "asc", caseInsensitive: true },
    // Ordered outermost-first, matching the layer table: an import block read
    // top to bottom walks inward, so a misplaced dependency is visible before
    // any lint rule reports it.
    pathGroups: [
      { pattern: "react", group: "external", position: "before" },
      { pattern: "next/**", group: "external", position: "before" },
      { pattern: "@/shared/**", group: "internal", position: "before" },
      { pattern: "@/entities/**", group: "internal", position: "before" },
      { pattern: "@/features/**", group: "internal", position: "before" },
      { pattern: "@/widgets/**", group: "internal", position: "before" },
      { pattern: "@/pages/**", group: "internal", position: "before" },
      { pattern: "@/app/**", group: "internal", position: "before" }
    ],
    pathGroupsExcludedImportTypes: ["react", "next"]
  }
];

const PRETTIER = [
  "error",
  {
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: false,
    trailingComma: "none",
    bracketSpacing: true,
    arrowParens: "avoid",
    endOfLine: "lf"
  }
];

const UNUSED_VARS = [
  "error",
  {
    vars: "all",
    varsIgnorePattern: "^_",
    args: "after-used",
    argsIgnorePattern: "^_"
  }
];

export const baseRules = {
  // A consumer of `shared/ui` may position a component (layout) but not
  // restyle it; `shadcnComponentsConfig` turns this off inside `shared/ui`.
  "shadcn/no-restyle": ["error", { allow: ["layout"] }],
  "prettier/prettier": PRETTIER,
  "comma-dangle": [
    "error",
    {
      arrays: "never",
      objects: "never",
      imports: "never",
      exports: "never",
      functions: "never"
    }
  ],

  "import/order": IMPORT_ORDER,
  "import/extensions": "off",
  // Off: the public-API rule in `forbidden.config.mjs` answers the same question.
  "import/no-internal-modules": "off",

  "project/require-title": "error",
  "project/directive-placement": "error",
  "project/no-slice-groups": "error",

  "react/react-in-jsx-scope": "off",
  "react/jsx-uses-react": "off",
  "react/prop-types": "off",
  "react/jsx-no-useless-fragment": "error",
  "react/jsx-key": "error",
  "react/jsx-no-duplicate-props": "error",
  "react/jsx-no-undef": "error",
  "react/jsx-uses-vars": "error",
  "react/no-unescaped-entities": "error",
  "react/jsx-curly-brace-presence": [
    "error",
    { props: "never", children: "ignore" }
  ],

  "react-hooks/rules-of-hooks": "error",
  "react-hooks/exhaustive-deps": "error",

  // Accessibility is a gate, not a polish pass. `EN 301 549` makes it a legal
  // obligation wherever the product's jurisdictions say so, and that does not
  // soften for an experiment — an experiment's users are real users, and no
  // regulator is told it was a test.
  //
  // This list was eleven hand-picked rules, so the gate reported green on every
  // class of defect it did not happen to name — and one of the missing ones,
  // `interactive-supports-focus`, is exactly the rule that would have caught the
  // clickable `<div>` in `src/shared/ui/icon`. The ten added below close that
  // list against `jsx-a11y`'s own recommended set.
  //
  // Written out rather than spread from `jsx-a11y.flatConfigs.recommended`, for
  // the same reason this file has no warning tier: that preset sets some rules to
  // `warn`, and a rule nobody has to obey is not a rule. Every id here is at
  // `error`.
  "jsx-a11y/alt-text": "error",
  "jsx-a11y/anchor-has-content": "error",
  "jsx-a11y/aria-role": "error",
  "jsx-a11y/heading-has-content": "error",
  "jsx-a11y/html-has-lang": "error",
  "jsx-a11y/img-redundant-alt": "error",
  "jsx-a11y/interactive-supports-focus": "error",
  "jsx-a11y/no-noninteractive-element-to-interactive-role": "error",
  "jsx-a11y/no-redundant-roles": "error",
  "jsx-a11y/tabindex-no-positive": "error",
  "jsx-a11y/anchor-is-valid": "error",
  "jsx-a11y/aria-props": "error",
  "jsx-a11y/aria-proptypes": "error",
  "jsx-a11y/aria-unsupported-elements": "error",
  "jsx-a11y/role-has-required-aria-props": "error",
  "jsx-a11y/role-supports-aria-props": "error",
  "jsx-a11y/click-events-have-key-events": "error",
  "jsx-a11y/no-static-element-interactions": "error",
  "jsx-a11y/label-has-associated-control": "error",
  "jsx-a11y/no-autofocus": "error",

  camelcase: "off",
  "no-unused-vars": "off",
  "unused-imports/no-unused-imports": "error",
  "unused-imports/no-unused-vars": UNUSED_VARS,

  // `avoidEscape` is not a style preference here. Without it this rule and
  // Prettier disagree about a string that contains a double quote — ESLint
  // rewrites it one way, Prettier rewrites it back, and `--fix` reports
  // "circular fixes detected" and silently leaves the file unfixed.
  quotes: ["error", "double", { avoidEscape: true }],
  "no-console": "error",
  "no-debugger": "error",
  "prefer-const": "error",
  "no-var": "error",
  eqeqeq: ["error", "smart"],

  // Clean-code ceilings, each one a number the rule set names and this file
  // enforces. The same numbers as the reference kit (D5).
  complexity: ["error", 15],
  "max-depth": ["error", 4],
  "max-lines-per-function": [
    "error",
    { max: 60, skipBlankLines: true, skipComments: true }
  ],
  "max-params": ["error", 6],
  "max-nested-callbacks": ["error", 4]
};

const languageOptions = {
  globals: { ...globals.node, ...globals.browser, ...globals.es2021 },
  ecmaVersion: "latest",
  sourceType: "module",
  parserOptions: { ecmaFeatures: { jsx: true } }
};

const plugins = {
  project: projectPlugin,
  "unused-imports": unusedImports,
  import: importPlugin,
  shadcn: shadcnLint
};

const settings = { react: { version: "detect" } };

export const javascriptConfig = {
  files: ["**/*.{js,jsx,mjs,cjs}"],
  plugins,
  languageOptions,
  settings,
  rules: baseRules
};

export const typescriptConfig = {
  files: ["**/*.{ts,tsx}"],
  plugins,
  languageOptions: {
    ...languageOptions,
    parser: tsParser,
    parserOptions: {
      ...languageOptions.parserOptions,
      projectService: true
    }
  },
  settings: {
    ...settings,
    // Boundaries resolves through this. Without it every `@/…` import is
    // unresolvable, and an unresolvable import is one the architecture rules
    // skip in silence.
    "import/resolver": {
      typescript: { alwaysTryTypes: true, project: "./tsconfig.json" }
    }
  },
  rules: {
    ...baseRules,
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_"
      }
    ],
    // TypeScript already proves a function's parameters are used correctly, and
    // the base rule miscounts overloads and type-only parameters.
    "unused-imports/no-unused-vars": "off"
  }
};

/** Node scripts read the environment and print to a terminal by definition. */
export const scriptsConfig = {
  files: ["scripts/**/*.{js,mjs,ts}", "eslint/**/*.mjs", "next.config.ts"],
  rules: {
    "no-console": "off",
    "no-restricted-syntax": "off",
    "no-restricted-globals": "off",
    "max-lines-per-function": "off",
    // Node tooling that runs outside the bundler is CommonJS by necessity.
    "@typescript-eslint/no-require-imports": "off"
  }
};

/**
 * `src/shared/config` runs while the module graph is still being evaluated,
 * before any logger could exist, so it may use `console`.
 */
export const consoleAllowedConfig = {
  files: ["src/shared/config/**/*.ts"],
  rules: {
    "no-console": "off"
  }
};

/** `yarn shadcn:add` drops component source into `shared/ui`; a component may restyle itself. */
export const shadcnComponentsConfig = {
  files: ["src/shared/ui/**/*.{ts,tsx}"],
  rules: { "shadcn/no-restyle": "off" }
};
