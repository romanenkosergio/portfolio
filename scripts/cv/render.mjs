// Markdown -> HTML for the CV: only the constructs cv-en.md uses (headings, bold role lines, italic notes, bullets, paragraphs).

export const escapeHtml = text =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Bare e-mails, domain/path tokens and the Telegram handle become real links.
const autolink = html =>
  html
    .replace(
      /(^|[\s(])([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g,
      '$1<a href="mailto:$2">$2</a>'
    )
    .replace(
      /(^|[\s(])((?:[a-z0-9-]+\.)+[a-z]{2,}\/[^\s·,;)<]*)/gi,
      '$1<a href="https://$2">$2</a>'
    )
    .replace(/(Telegram: )@(\w+)/, '$1<a href="https://t.me/$2">@$2</a>');

// Italics are `*x*` or `_x_` (Prettier rewrites the first to the second); `_` inside a word stays.
export const inline = text =>
  autolink(
    escapeHtml(text)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/(^|[\s(])_(.+?)_(?=$|[\s).,;:])/g, "$1<em>$2</em>")
  );

// A header line (contact, links) wraps only between its " · " items, never inside one.
const itemsHtml = text =>
  text
    .split(" · ")
    .map(item => `<span class="item">${inline(item)}</span>`)
    .join(" · ");

const lineHtml = (text, inHeader) => {
  if (/^\*\*[^*]+\*\* · [^·]+$/.test(text)) {
    const [role, dates] = text.split(" · ");
    return `<p class="role">${inline(role)}<span class="dates">${inline(dates)}</span></p>`;
  }
  if (/^([*_])[^*_].*\1$/.test(text)) {
    return `<p class="note">${inline(text)}</p>`;
  }
  return `<p>${inHeader ? itemsHtml(text) : inline(text)}</p>`;
};

export const render = markdown => {
  const out = [];
  let inList = false;
  let inSection = false;
  let inHeader = false;
  const closeList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };
  const closeSection = () => {
    closeList();
    if (inSection) {
      out.push("</section>");
      inSection = false;
    }
  };

  for (const line of markdown.split("\n")) {
    const text = line.trim();
    const heading = /^(#{1,3}) (.+)$/.exec(text);
    if (!text) {
      closeList();
    } else if (heading) {
      const level = heading[1].length;
      inHeader = level === 1;
      if (level === 2) {
        closeSection();
        out.push("<section>");
        inSection = true;
      } else {
        closeList();
      }
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
    } else if (text.startsWith("- ")) {
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push(`<li>${inline(text.slice(2))}</li>`);
    } else {
      closeList();
      out.push(lineHtml(text, inHeader));
    }
  }
  closeSection();
  return out.join("\n");
};
