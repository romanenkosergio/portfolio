import { LIMITS } from "../config";

import { validateAll, validateField } from "./validate";

describe("validateField", () => {
  it("requires a name and caps its length", () => {
    expect(validateField("name", "   ")).toBe("nameRequired");
    expect(validateField("name", "a".repeat(LIMITS.nameMax + 1))).toBe(
      "nameMax"
    );
    expect(validateField("name", "Ann")).toBeUndefined();
  });

  it("checks the shape of an email", () => {
    expect(validateField("email", "")).toBe("emailRequired");
    expect(validateField("email", "ann@example")).toBe("emailInvalid");
    expect(validateField("email", "a nn@example.com")).toBe("emailInvalid");
    expect(validateField("email", " ann@example.com ")).toBeUndefined();
  });

  it("bounds the message", () => {
    expect(validateField("message", "")).toBe("messageRequired");
    expect(validateField("message", "short")).toBe("messageMin");
    expect(
      validateField("message", "x".repeat(LIMITS.messageMin))
    ).toBeUndefined();
    expect(validateField("message", "x".repeat(LIMITS.messageMax + 1))).toBe(
      "messageMax"
    );
  });
});

describe("validateAll", () => {
  it("lists only the failing fields", () => {
    expect(
      validateAll({ name: "Ann", email: "bad", message: "long enough text" })
    ).toEqual({ email: "emailInvalid" });
    expect(
      validateAll({ name: "Ann", email: "a@b.co", message: "long enough text" })
    ).toEqual({});
  });
});
