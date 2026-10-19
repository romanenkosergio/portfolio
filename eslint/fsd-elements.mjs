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
    { type: "app", pattern: "src/app/*", mode: "folder", capture: ["segment"] },
    {
      type: "pages",
      pattern: "src/pages/*",
      mode: "folder",
      capture: ["slice"]
    },
    {
      type: "widgets",
      pattern: "src/widgets/*",
      mode: "folder",
      capture: ["slice"]
    },
    {
      type: "features",
      pattern: "src/features/*",
      mode: "folder",
      capture: ["slice"]
    },
    {
      type: "entities",
      pattern: "src/entities/*",
      mode: "folder",
      capture: ["slice"]
    },
    {
      type: "shared",
      pattern: "src/shared/*",
      mode: "folder",
      capture: ["segment"]
    },

    // The Next.js route tree. Last, anchored, and `full`: an unanchored `app`
    // in folder mode also matches the `app` inside `src/app` and would
    // reclassify the whole composition root as routes.
    { type: "next-app", pattern: "app/**/*", mode: "full" }
  ]
};
