import type { Metadata } from "next";

import { OPEN_GRAPH } from "@/shared/config";

// `trailingSlash: true` serves every page under a path ending in "/".
const withTrailingSlash = (path: string): string =>
  path.endsWith("/") ? path : `${path}/`;

// Sets the page's own canonical and og:url; everything else in `metadata` is kept.
export const pageMetadata = (
  path: string,
  metadata: Metadata = {}
): Metadata => {
  const url = withTrailingSlash(path);
  return {
    ...metadata,
    alternates: { ...metadata.alternates, canonical: url },
    openGraph: { ...OPEN_GRAPH, ...metadata.openGraph, url }
  };
};
