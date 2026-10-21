import type {
  Icon,
  Icons,
  IconURL
} from "next/dist/lib/metadata/types/metadata-types";

import { BASE_PATH } from "@/shared/config";

const FAVICONS = `${BASE_PATH}/assets/icons/favicons`;

export const MANIFEST_URL = `${FAVICONS}/site.webmanifest`;

export const generateIcons = ():
  IconURL | Icon[] | Icons | null | undefined => [
  { rel: "icon", url: `${FAVICONS}/favicon.ico`, sizes: "48x48" },
  {
    rel: "icon",
    type: "image/svg+xml",
    sizes: "any",
    url: `${FAVICONS}/favicon.svg`
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "192x192",
    url: `${FAVICONS}/icon-192.png`
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "512x512",
    url: `${FAVICONS}/icon-512.png`
  },
  {
    rel: "apple-touch-icon",
    type: "image/png",
    sizes: "180x180",
    url: `${FAVICONS}/apple-touch-icon.png`
  }
];
