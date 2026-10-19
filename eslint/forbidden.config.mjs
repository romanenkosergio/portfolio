import { COMPONENTS, SRC, SRC_AND_ROUTES } from "./globs.mjs";

/**
 * Rules that close routes *around* the architecture rather than through it.
 * `eslint-plugin-boundaries` reasons about resolved module paths; it cannot see
 * `process.env`, a `require()` call or a path that is too deep.
 *
 * Flat config does not merge two blocks that set the same rule id (the later
 * one replaces the earlier), so each rule id is assembled from named fragments
 * and set once per file set: `no-restricted-syntax` in two disjoint blocks.
 */

/**
 * The environment is read once, in `src/shared/config`, and re-exported as a
 * typed constant. A value read in three places is configured in none.
 */
const ENV_SYNTAX = [
  {
    selector: "MemberExpression[object.name='process'][property.name='env']",
    message:
      "Read the environment in src/shared/config and export a typed constant. " +
      "Anything under NEXT_PUBLIC_ is shipped to the browser and must never be " +
      "a secret."
  }
];

/**
 * The public API rule, for the two node kinds `no-restricted-imports` cannot
 * see (`require()` and `await import()`).
 */
const PUBLIC_API_SOURCE_REGEX =
  "^@/(features|entities|widgets|pages)/[^/]+/(?!(model|api|ui|lib|config)$)(?!@x/[^/]+$).+";

// esquery delimits an attribute regex with `/`, so every slash inside the
// pattern has to be escaped or the selector fails to parse.
const PUBLIC_API_SELECTOR_REGEX = PUBLIC_API_SOURCE_REGEX.replace(/\//g, "\\/");

const PUBLIC_API_MESSAGE =
  "Import a slice through its public API: @/widgets/header, or a segment " +
  "barrel such as @/widgets/header/ui. A file inside a segment is an " +
  "implementation detail, and a dynamic import of one is still an import of one.";

const PUBLIC_API_SYNTAX = [
  {
    selector: `ImportExpression[source.value=/${PUBLIC_API_SELECTOR_REGEX}/]`,
    message: PUBLIC_API_MESSAGE
  },
  {
    selector: `CallExpression[callee.name='require'][arguments.0.value=/${PUBLIC_API_SELECTOR_REGEX}/]`,
    message: PUBLIC_API_MESSAGE
  }
];

/**
 * A slice is entered through its own barrel (`@/widgets/header`) or a segment's
 * barrel (`@/widgets/header/ui`) — nothing deeper. `shared` and `src/app` are
 * segmented, not sliced, and exempt.
 */
const IMPORT_SHAPE_PATTERNS = [
  {
    group: ["../../*", "../../../*", "../../../../*"],
    message:
      "Leaving your own slice by a relative path bypasses the public API. Use " +
      "the @/ alias and import the slice, not a file inside it."
  },
  {
    regex: "^@/(features|entities|widgets|pages)/[^/]+/index(\\.tsx?)?$",
    message: "Import the slice itself (@/widgets/header), not its index file."
  },
  {
    regex: PUBLIC_API_SOURCE_REGEX,
    message: PUBLIC_API_MESSAGE
  }
];

/** Everywhere except `src/shared/config`, which reads the environment by design. */
export const envBoundaryConfig = {
  files: SRC_AND_ROUTES,
  ignores: ["src/shared/config/**"],
  rules: {
    "no-restricted-syntax": ["error", ...ENV_SYNTAX, ...PUBLIC_API_SYNTAX]
  }
};

export const configSyntaxConfig = {
  files: ["src/shared/config/**"],
  rules: {
    "no-restricted-syntax": ["error", ...PUBLIC_API_SYNTAX]
  }
};

export const importShapeConfig = {
  files: SRC,
  rules: {
    "no-restricted-imports": ["error", { patterns: IMPORT_SHAPE_PATTERNS }],
    // Boundaries skips a dependency it cannot resolve, which would turn a typo
    // in a path into an exemption from the architecture.
    "import/no-unresolved": [
      "error",
      { commonjs: true, caseSensitiveStrict: true }
    ]
  }
};

/**
 * No user-visible string literal in a component. `jsx-no-literals` covers
 * children; `project/no-literal-copy` the attributes that carry copy.
 */
export const copyConfig = {
  files: COMPONENTS,
  rules: {
    "react/jsx-no-literals": [
      "error",
      {
        noStrings: true,
        allowedStrings: [
          "·",
          "—",
          "–",
          "/",
          "|",
          "•",
          ":",
          ",",
          ".",
          "%",
          "+",
          "-"
        ],
        ignoreProps: true
      }
    ],
    "project/no-literal-copy": "error"
  }
};

/**
 * Type-level rules the architecture leans on: `consistent-type-imports` makes
 * `dependency.kind` reliable, `no-floating-promises` catches a dropped promise,
 * `no-generated-empty-object-type` a type that has collapsed to `{}`.
 */
export const typeSafetyConfig = {
  files: SRC_AND_ROUTES,
  rules: {
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports", fixStyle: "separate-type-imports" }
    ],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-generated-empty-object-type": "error"
  }
};

export const forbiddenConfigs = [
  envBoundaryConfig,
  configSyntaxConfig,
  importShapeConfig,
  copyConfig,
  typeSafetyConfig
];
