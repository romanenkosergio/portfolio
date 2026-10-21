import { SEND_LINE, previewDate, previewLines } from "./preview-lines";

const values = { name: "Ann", email: "ann@b.co", message: 'Hi "there"' };

describe("previewLines", () => {
  const lines = previewLines(values, "Wed 21 Oct");
  const text = (row: number) => lines[row].map(token => token.text).join("");

  it("renders the design snippet with the form's values", () => {
    expect(text(2)).toBe('  name: "Ann",');
    expect(text(3)).toBe('  email: "ann@b.co",');
    expect(text(5)).toBe('  date: "Wed 21 Oct"');
  });

  it("escapes quotes in a value", () => {
    expect(text(4)).toBe('  message: "Hi \\"there\\"",');
  });

  it("marks the quoted value of each form field, and only those", () => {
    const marked = lines.flat().filter(token => token.field);
    expect(marked.map(token => token.field)).toEqual([
      "name",
      "email",
      "message"
    ]);
  });

  it("keeps the send call on SEND_LINE", () => {
    expect(text(SEND_LINE)).toBe("  form.send(message);");
  });
});

describe("previewDate", () => {
  it("formats weekday, day and month in the given language", () => {
    expect(previewDate("en", new Date(2026, 9, 21))).toBe("Wed 21 Oct");
  });
});
