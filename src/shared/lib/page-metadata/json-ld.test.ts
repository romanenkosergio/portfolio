import { homeJsonLd } from "./json-ld";

jest.mock("next-intl/server", () => ({
  getTranslations: async () => (key: string) => `t:${key}`
}));

describe("homeJsonLd", () => {
  it("describes the person and the site for the locale", async () => {
    const data = JSON.parse(JSON.stringify(await homeJsonLd("en")));
    const [person, site] = data["@graph"];

    expect(data["@context"]).toBe("https://schema.org");
    expect(person).toMatchObject({
      "@type": "Person",
      name: "t:appName",
      jobTitle: "t:jobTitle",
      description: "t:appDescription"
    });
    expect(person.url).toMatch(/\/en\/$/);
    expect(person.image).toMatch(/meta-picture\.png$/);
    expect(person.sameAs).toHaveLength(2);
    expect(person.knowsAbout.length).toBeGreaterThan(0);
    expect(site).toMatchObject({ "@type": "WebSite", inLanguage: "en" });
  });
});
