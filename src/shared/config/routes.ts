// A const object (not an enum) so each value stays a string literal and satisfies next's typed `Route`.
export const E_ROUTES = {
  HOME: "/",
  ABOUT_ME: "/about-me",
  ABOUT_PERSONAL: "/about-me/personal-info",
  ABOUT_PERSONAL_BIO: "/about-me/personal-info/bio",
  ABOUT_PERSONAL_INTERESTS: "/about-me/personal-info/interests",
  ABOUT_PROFESSIONAL: "/about-me/professional-info",
  ABOUT_PROFESSIONAL_SKILLS: "/about-me/professional-info/skills",
  ABOUT_PROFESSIONAL_EXPERIENCE: "/about-me/professional-info/experience",
  ABOUT_HOBBIES: "/about-me/hobbies",
  PROJECTS: "/projects",
  CONTACT: "/contact"
} as const;

export type E_ROUTES = (typeof E_ROUTES)[keyof typeof E_ROUTES];
