import { E_ROUTES } from "@/shared/config";

// The text of each section is the `about.content.<type>` message.
export const PERSONAL_INFO_TYPES = ["bio", "interests"] as const;
export const PROFESSIONAL_INFO_TYPES = ["skills", "experience"] as const;

export type PersonalInfoType = (typeof PERSONAL_INFO_TYPES)[number];
export type ProfessionalInfoType = (typeof PROFESSIONAL_INFO_TYPES)[number];
export type AboutType = PersonalInfoType | ProfessionalInfoType;

export const ABOUT_TYPE_ROUTES = {
  bio: E_ROUTES.ABOUT_PERSONAL_BIO,
  interests: E_ROUTES.ABOUT_PERSONAL_INTERESTS,
  skills: E_ROUTES.ABOUT_PROFESSIONAL_SKILLS,
  experience: E_ROUTES.ABOUT_PROFESSIONAL_EXPERIENCE
} as const satisfies Record<AboutType, E_ROUTES>;

/** The file the tab bar falls back to when the last tab is closed. */
export const DEFAULT_ABOUT_TYPE: AboutType = "bio";
export * from "./snippets";
