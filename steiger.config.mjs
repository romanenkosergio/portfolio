import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

/**
 * Steiger checks the shape of the FSD tree — absences ESLint cannot see: a
 * slice with no segments, a segment named after a technical concern. It runs in
 * the gate (`yarn fsd`).
 */
export default defineConfig([
  ...fsd.configs.recommended,

  {
    ignores: [
      "**/*.test.*",
      "**/*.spec.*",
      "**/*.config.*",
      "**/README.md",
      "**/.next/**",
      "**/node_modules/**",
      // Not the FSD layer: the root Pages Router stopper, see `pages/README.md`.
      "pages/**"
    ]
  },

  {
    // `shared` and `src/app` are segmented, not sliced: modules are imported
    // directly (`@/shared/ui/button`), not through one root barrel.
    files: ["./src/shared/**", "./src/app/**"],
    rules: {
      "fsd/public-api": "off"
    }
  },

  {
    // Routes live in the root app/, outside steiger's view (it scans ./src), so
    // a slice used only by a route reads as unused; and one consumer is the
    // normal case for a vertical slice.
    files: ["./src/**"],
    rules: {
      "fsd/insignificant-slice": "off"
    }
  },

  {
    // As in common-next: it would forbid the segment barrels ESLint's public-API pattern allows;
    // one rule answers that question, and it is the ESLint one (eslint/forbidden.config.mjs).
    rules: {
      "fsd/no-public-api-sidestep": "off"
    }
  }
]);
