export const FIELDS = ["name", "email", "message"] as const;
export type FieldName = (typeof FIELDS)[number];

export type IContactValues = Record<FieldName, string>;

export type ErrorKey =
  | "nameRequired"
  | "nameMax"
  | "emailRequired"
  | "emailInvalid"
  | "messageRequired"
  | "messageMin"
  | "messageMax";

export type IContactErrors = Partial<Record<FieldName, ErrorKey>>;

export type FormStatus = "idle" | "sending" | "success" | "error";

export const LIMITS = {
  nameMax: 100,
  messageMin: 10,
  messageMax: 2000
} as const;

export const EMPTY_VALUES: IContactValues = {
  name: "",
  email: "",
  message: ""
};

// The Web3Forms subject line the owner sees in the inbox.
export const MAIL_SUBJECT = "New message from the portfolio";
