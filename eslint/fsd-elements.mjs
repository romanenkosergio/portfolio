/**
 * How `eslint-plugin-boundaries` sees this repository: one element per FSD
 * layer, plus one for the Next.js route tree (`app/`).
 */

/** FSD layers, listed outermost-first. The order *is* the dependency rule. */
export const FS_LAYERS = [
  "app",
  "pages",
  "widgets",
  "features",
  "entities",
  "shared"
];

export const boundariesSettings = {
  // `import` alone would leave a barrel `export * from` and a dynamic
  // `import()` as doors past every boundary rule.
  "boundaries/dependency-nodes": [
    "import",
    "export",
    "dynamic-import",
    "require"
  ],

  // Confines analysis to the trees that carry application code, so
  // `boundaries/no-unknown-files` does not trip over `next.config.ts` and co.
  "boundaries/include": ["src/**/*", "app/**/*"],

  "boundaries/elements": [
    { type: "app", pattern: "src/app/*", capture: ["segment"] },
    {
      type: "pages",
      pattern: "src/pages/*",
      capture: ["slice"]
    },
    {
      type: "widgets",
      pattern: "src/widgets/*",
      capture: ["slice"]
    },
    {
      type: "features",
      pattern: "src/features/*",
      capture: ["slice"]
    },
    {
      type: "entities",
      pattern: "src/entities/*",
      capture: ["slice"]
    },
    {
      type: "shared",
      pattern: "src/shared/*",
      capture: ["segment"]
    },

    // The Next.js route tree. Last and anchored (`partialMatch: false`): an unanchored `app`
    // also matches the `app` inside `src/app` and would
    // reclassify the whole composition root as routes.
    { type: "next-app", pattern: "app", partialMatch: false }
  ]
};
