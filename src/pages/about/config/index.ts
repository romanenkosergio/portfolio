// The text of each section is the `about.content.<type>` message.
export const PERSONAL_INFO_TYPES = ["bio", "interests"] as const;
export const PROFESSIONAL_INFO_TYPES = ["skills", "experience"] as const;

export type PersonalInfoType = (typeof PERSONAL_INFO_TYPES)[number];
export type ProfessionalInfoType = (typeof PROFESSIONAL_INFO_TYPES)[number];
export type AboutType = PersonalInfoType | ProfessionalInfoType;
