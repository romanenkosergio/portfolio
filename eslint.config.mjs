import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier/flat";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";

import {
  architectureConfig,
  consoleAllowedConfig,
  forbiddenConfigs,
  javascriptConfig,
  pendingConfigs,
  scriptsConfig,
  shadcnComponentsConfig,
  typescriptConfig
} from "./eslint/index.mjs";

/**
 * A thin composition, and nothing else: every rule body lives in a named export
 * under `eslint/`. There is no warning tier (D5). Rules that still fail on
 * existing code are switched off per file in `eslint/pending.config.mjs`, each
 * entry naming the PLAN item that clears it — it comes last so it can win.
 */

const IGNORE_PATTERNS = [
  "**/node_modules/**",
  "**/.next/**",
  "**/out/**",
  "**/build/**",
  "**/dist/**",
  "**/coverage/**",
  "**/*.config.{js,mjs,ts}",
  "public/scripts/**.js",

  // The root `pages/` directory holds a README and nothing else. It exists so
  // that Next binds the Pages Router beside `app/` instead of mistaking the FSD
  // `src/pages` layer for it.
  "pages/**"
];

export default [
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettierConfig,
  { ignores: IGNORE_PATTERNS },
  // No inline escape hatch: an exception lives in eslint/pending.config.mjs or nowhere (D5).
  {
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: "error"
    }
  },

  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  { plugins: { prettier: prettierPlugin } },

  javascriptConfig,
  typescriptConfig,

  architectureConfig,
  ...forbiddenConfigs,

  consoleAllowedConfig,
  scriptsConfig,

  shadcnComponentsConfig,

  ...pendingConfigs
];
