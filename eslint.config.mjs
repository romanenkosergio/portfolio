import path from "node:path";
import { fileURLToPath } from "node:url";
import { fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import localRules from "eslint-plugin-local-rules";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";

// Constants
const currentFileName = fileURLToPath(import.meta.url);
const currentDirName = path.dirname(currentFileName);

const IGNORE_PATTERNS = [
  ".next/**",
  "out/**",
  "public/scripts/**.js",
  "**/*.spec.ts",
  "**/react-email-starter",
  "src/shared/api/*.ts",
  "**/locales"
];

const pluginsConfig = {
  "local-rules": localRules,
  react,
  "jsx-a11y": jsxA11Y,
  "react-hooks": fixupPluginRules(reactHooks),
  "unused-imports": unusedImports
};

const prettierConfig = {
  "prettier/prettier": ["error", { tabWidth: 2, useTabs: false }],
  "comma-dangle": [
    "warn",
    {
      arrays: "never",
      objects: "never",
      imports: "never",
      exports: "never",
      functions: "never"
    }
  ]
};

const eslintCompatibility = new FlatCompat({
  baseDirectory: currentDirName,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

// ESLint Configuration
export default [
  { ignores: IGNORE_PATTERNS },
  { files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"] },
  ...eslintCompatibility.extends(
    "plugin:react/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:@next/next/recommended",
    "plugin:local-rules/all",
    "@feature-sliced"
  ),
  {
    plugins: pluginsConfig,
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser
      },
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } }
    },
    settings: {
      "import/resolver": {
        typescript: { alwaysTryTypes: true }
      }
    },
    rules: {
      ...prettierConfig,
      "import/no-internal-modules": "off",
      "local-rules/require-title": "error",
      "import/extensions": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-no-useless-fragment": "warn",
      camelcase: "off",
      "no-unused-vars": "off",
      quotes: ["error", "double"],
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "ignore" }
      ]
    }
  }
];
