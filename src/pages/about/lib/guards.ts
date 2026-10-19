import {
  PERSONAL_INFO_TYPES,
  PROFESSIONAL_INFO_TYPES,
  type PersonalInfoType,
  type ProfessionalInfoType
} from "../config";

export const isPersonalInfoType = (value: string): value is PersonalInfoType =>
  PERSONAL_INFO_TYPES.some(type => type === value);

export const isProfessionalInfoType = (
  value: string
): value is ProfessionalInfoType =>
  PROFESSIONAL_INFO_TYPES.some(type => type === value);
