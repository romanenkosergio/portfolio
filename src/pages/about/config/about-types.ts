import { E_ROUTES } from "@/shared/config";

// The text of each section is the `about.content.<type>` message; `experience` is the exception:
// a timeline built from the `about.timeline` messages.
export const PERSONAL_INFO_TYPES = ["bio", "interests"] as const;
export const PROFESSIONAL_INFO_TYPES = ["skills", "experience"] as const;
export const HOBBIES_TYPES = ["games", "learning"] as const;

/** Entries of the experience timeline, newest first: the `about.timeline.entries.<id>` messages. */
export const EXPERIENCE_IDS = [
  "lead",
  "teamLead",
  "dev2023",
  "lecturer",
  "dev2022",
  "ecomLead",
  "dev2019b",
  "dev2019a",
  "dev2017"
] as const;

export type PersonalInfoType = (typeof PERSONAL_INFO_TYPES)[number];
export type ProfessionalInfoType = (typeof PROFESSIONAL_INFO_TYPES)[number];
export type HobbiesType = (typeof HOBBIES_TYPES)[number];
export type AboutType = PersonalInfoType | ProfessionalInfoType | HobbiesType;

export const ABOUT_TYPE_ROUTES = {
  bio: E_ROUTES.ABOUT_PERSONAL_BIO,
  interests: E_ROUTES.ABOUT_PERSONAL_INTERESTS,
  skills: E_ROUTES.ABOUT_PROFESSIONAL_SKILLS,
  experience: E_ROUTES.ABOUT_PROFESSIONAL_EXPERIENCE,
  games: E_ROUTES.ABOUT_HOBBIES_GAMES,
  learning: E_ROUTES.ABOUT_HOBBIES_LEARNING
} as const satisfies Record<AboutType, E_ROUTES>;

/** The file the tab bar falls back to when the last tab is closed. */
export const DEFAULT_ABOUT_TYPE: AboutType = "bio";
