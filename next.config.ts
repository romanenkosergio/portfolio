import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A static export for GitHub Pages (.github/workflows/pages.yml): no server, no image optimiser.
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  trailingSlash: true,
  images: { unoptimized: true },
  typedRoutes: true,
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

export default nextConfig;
