import boundaries from "eslint-plugin-boundaries";

import { boundariesSettings } from "./fsd-elements.mjs";
import { LAYER_MESSAGE, layerRules } from "./layers.rules.mjs";

/**
 * The architecture gate: FSD layers, in one `boundaries/dependencies` rule.
 *
 * `eslint-plugin-boundaries` v6 deprecates `entry-point` and `external`; the
 * public-API rule lives in `forbidden.config.mjs` as `no-restricted-imports`.
 */
export const architectureConfig = {
  files: ["src/**/*.{ts,tsx}", "app/**/*.{ts,tsx}"],
  plugins: { boundaries },
  settings: boundariesSettings,
  rules: {
    "boundaries/element-types": "off",
    "boundaries/entry-point": "off",
    "boundaries/external": "off",

    "boundaries/dependencies": [
      "error",
      {
        default: "disallow",
        message: LAYER_MESSAGE,

        // An import the resolver cannot place is otherwise skipped in silence,
        // turning a typo in a path into an exemption from the architecture.
        checkUnknownLocals: true,

        // Required for the `origin: "external"` baseline below to be evaluated.
        checkAllOrigins: true,

        rules: [
          // A package is a decision made in package.json, not per import.
          { allow: [{ to: { origin: ["external", "core"] } }] },
          ...layerRules
        ]
      }
    ],

    // Every file under `src/` and `app/` must classify, every import resolve.
    "boundaries/no-unknown-files": "error",
    "boundaries/no-unknown": "error",
    "boundaries/no-ignored": "off"
  }
};
