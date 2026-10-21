import type {
  ErrorKey,
  FieldName,
  IContactErrors,
  IContactValues
} from "../config";
import { LIMITS } from "../config";
import { FIELDS } from "../config";

// Deliberately loose (one @, a dot in the domain, no spaces): the mail provider is the real check.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CHECKS: Record<FieldName, (value: string) => ErrorKey | undefined> = {
  name: value => {
    if (!value) return "nameRequired";
    return value.length > LIMITS.nameMax ? "nameMax" : undefined;
  },
  email: value => {
    if (!value) return "emailRequired";
    return EMAIL.test(value) ? undefined : "emailInvalid";
  },
  message: value => {
    if (!value) return "messageRequired";
    if (value.length < LIMITS.messageMin) return "messageMin";
    return value.length > LIMITS.messageMax ? "messageMax" : undefined;
  }
};

export const validateField = (
  field: FieldName,
  value: string
): ErrorKey | undefined => CHECKS[field](value.trim());

export const validateAll = (values: IContactValues): IContactErrors =>
  Object.fromEntries(
    FIELDS.flatMap(field => {
      const error = validateField(field, values[field]);
      return error ? [[field, error]] : [];
    })
  );
