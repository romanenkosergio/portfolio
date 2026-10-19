import type { MetadataRoute } from "next";

import { APP_CONFIG } from "@/shared/config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${APP_CONFIG.BASE_URL}/sitemap.xml`
  };
}
