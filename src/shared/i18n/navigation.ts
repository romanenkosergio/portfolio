import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

// Locale-aware Link and router: `next/link` and `next/navigation` drop the
// locale prefix, so internal navigation goes through these.
export const { Link, permanentRedirect, redirect, usePathname, useRouter } =
  createNavigation(routing);
