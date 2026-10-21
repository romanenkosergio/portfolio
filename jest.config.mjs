import nextJest from "next/jest.js";

// `next/jest` brings the SWC transform, the .env files and the style/image/font mocks.
const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["<rootDir>/{src,scripts}/**/*.test.{ts,tsx}"],
  moduleNameMapper: {
    "^@/public/(.*)$": "<rootDir>/public/$1",
    "^@/messages/(.*)$": "<rootDir>/messages/$1",
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  coverageProvider: "v8",
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.test.{ts,tsx}",
    "!src/**/*.types.ts",
    "!src/**/index.ts",
    "!src/**/config/**",
    "!src/shared/lib/test/**",
    "!src/app/styles/**"
  ],
  coverageThreshold: {
    global: { statements: 49, branches: 76, functions: 57, lines: 49 }
  }
};

// next/jest does not transform node_modules; next-intl and its helpers ship ESM only.
const ESM_PACKAGES = [
  "next-intl",
  "use-intl",
  "@formatjs",
  "intl-messageformat"
];

export default async () => {
  const resolved = await createJestConfig(config)();
  return {
    ...resolved,
    // First, so it beats next/jest's own `.svg` file stub: SVGR (Turbopack) imports an SVG as a
    // component, and in tests that is a stub component.
    moduleNameMapper: {
      "\\.svg$": "<rootDir>/src/shared/lib/test/svg-mock.tsx",
      ...resolved.moduleNameMapper
    },
    transformIgnorePatterns: [
      `/node_modules/(?!(?:\\.pnpm/)?(?:${ESM_PACKAGES.join("|")}))`,
      "^.+\\.module\\.(css|sass|scss)$"
    ]
  };
};
