export const ABOUT_SECTIONS = [
  "personal-info",
  "professional-info",
  "hobbies"
] as const;

export type AboutSection = (typeof ABOUT_SECTIONS)[number];

/** The explorer section of a locale-less pathname such as `/about-me/hobbies/games`. */
export const aboutSectionOf = (pathname: string | null): AboutSection => {
  const segment = (pathname ?? "").split("/")[2];
  return (
    ABOUT_SECTIONS.find(section => section === segment) ?? ABOUT_SECTIONS[0]
  );
};
