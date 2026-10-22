import { render } from "./render.mjs";

describe("CV markdown renderer", () => {
  it("renders bold and both italic forms inline", () => {
    expect(render("A **bold**, *star* and _under_ word")).toBe(
      "<p>A <strong>bold</strong>, <em>star</em> and <em>under</em> word</p>"
    );
  });

  it("keeps underscores inside a word", () => {
    expect(render("snake_case_name")).toBe("<p>snake_case_name</p>");
  });

  it("renders a whole italic line as a note, either form", () => {
    expect(render("*Promoted fast.*")).toContain('<p class="note">');
    expect(render("_Promoted fast._")).toBe(
      '<p class="note"><em>Promoted fast.</em></p>'
    );
  });

  it("links an e-mail, a site and the Telegram handle", () => {
    const html = render(
      "# Name\nRole\na@b.com · Portfolio: site.dev/x · Telegram: @me"
    );
    expect(html).toContain('<a href="mailto:a@b.com">a@b.com</a>');
    expect(html).toContain('<a href="https://site.dev/x">site.dev/x</a>');
    expect(html).toContain('<a href="https://t.me/me">@me</a>');
  });

  it("keeps each header item unbreakable", () => {
    expect(render("# Name\nRole\nGitHub: g.com/a · Remote")).toContain(
      '<span class="item">Remote</span>'
    );
  });

  it("escapes markup in the text", () => {
    expect(render("a <b> & c")).toBe("<p>a &lt;b&gt; &amp; c</p>");
  });

  it("splits a role line into the role and its dates", () => {
    expect(render("**Lead** · Jan 2024 – Jun 2025")).toBe(
      '<p class="role"><strong>Lead</strong><span class="dates">Jan 2024 – Jun 2025</span></p>'
    );
  });

  it("renders the earlier-experience list with bold company names", () => {
    const html = render(
      "## Experience\n\n- **EXSY** · Front-End Developer · Sep 2019 — React\n- **Hexide** · Vue"
    );
    expect(html).toBe(
      "<section>\n<h2>Experience</h2>\n<ul>\n<li><strong>EXSY</strong> · Front-End Developer · Sep 2019 — React</li>\n<li><strong>Hexide</strong> · Vue</li>\n</ul>\n</section>"
    );
  });
});
