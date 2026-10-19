import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/shared/i18n/request.ts");

const nextConfig: NextConfig = {
  // A static export for GitHub Pages (.github/workflows/pages.yml): no server, no image optimiser.
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  trailingSlash: true,
  images: { unoptimized: true },
  typedRoutes: true,
  // The 404 for URLs outside every [locale]: there is no single root layout to compose it under.
  experimental: { globalNotFound: true },
  // The React Compiler memoises components itself, so manual useMemo/useCallback are not needed.
  reactCompiler: true,
  // SVGs import as React components (SVGR) under Turbopack, the default bundler since Next 16.
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: "preset-default",
                    params: {
                      overrides: {
                        cleanupIds: false,
                        removeViewBox: false
                      }
                    }
                  },
                  "removeXMLNS"
                ]
              }
            }
          }
        ],
        as: "*.js"
      }
    }
  }
};

export default withNextIntl(nextConfig);
