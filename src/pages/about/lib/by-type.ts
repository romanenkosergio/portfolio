import type { AboutType } from "../config";

/** One value per about file, built without a cast so a new type fails typecheck here. */
export const byType = <T>(
  make: (type: AboutType) => T
): Record<AboutType, T> => ({
  bio: make("bio"),
  interests: make("interests"),
  skills: make("skills"),
  experience: make("experience")
});
