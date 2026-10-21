import { EMPTY_VALUES } from "../config";

import { useContactStore } from "./contact-store";

const { getState } = useContactStore;

beforeEach(() => getState().reset());

describe("contact store", () => {
  it("writes a value and records where the new run starts", () => {
    getState().setValue("name", "Ann");
    expect(getState().values.name).toBe("Ann");
    expect(getState().edit).toEqual({ field: "name", from: 0 });

    getState().setValue("name", "Anna");
    expect(getState().edit).toEqual({ field: "name", from: 3 });
  });

  it("starts the run at the first difference when text is cut", () => {
    getState().setValue("message", "hello world");
    getState().setValue("message", "hello");
    expect(getState().edit?.from).toBe(5);
  });

  it("never splits a surrogate pair", () => {
    // "😀" and "😁" share their high surrogate; the run starts before the pair.
    getState().setValue("message", "a😀");
    getState().setValue("message", "a😁");
    expect(getState().edit?.from).toBe(1);
  });

  it("keeps a shared emoji whole", () => {
    getState().setValue("message", "a😀");
    getState().setValue("message", "a😀b");
    expect(getState().edit?.from).toBe(3);
  });

  it("resets values, edit and focus", () => {
    getState().setValue("email", "x");
    getState().setFocused("email");
    getState().reset();
    expect(getState().values).toEqual(EMPTY_VALUES);
    expect(getState().edit).toBeNull();
    expect(getState().focused).toBeNull();
  });
});
