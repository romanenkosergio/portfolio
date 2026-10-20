# Portfolio — plan

Open items only, one line each, ≤ 8000 bytes (`pr-handoff-guard`). A finished item is deleted and its
number goes to «Done»; details — DECISIONS and git. Sections in working order; format `- [ ] N.M`
(read by `session-brief.sh`).

Done: 1.1–1.11, 1.14–1.16, 3.1, 3.2

## Pages — markup, content, motion (D8; Figma in AGENTS.md)

Each page: markup and content first (2.x), then its motion (3.x). Copy via `copywriter`, en first.

- [ ] 2.3 About: markup per Figma — explorer tree (personal/professional/hobbies folders + contacts), file tabs, code-lines text with a line gutter, the right «code snippet showcase» column
- [ ] 2.4 About content: `interests` rewritten (still the template's), `/about-me/hobbies` real page instead of the `placeholder`
- [ ] 3.3 About motion: explorer tree expand/collapse, file tab switch, code lines reveal
- [ ] 2.1 `/projects` markup + content: tech filter sidebar, card grid (image, `// _name`, text, view button); `project` entity; commercial projects from the CV only, NDA-safe per D16 (no client names, logos, screenshots, metrics; owner approves each card); neutral images
- [ ] 3.4 Projects motion: filter with Flip transitions, card hover/entrance
- [ ] 2.2 `/contact` markup + content: contacts sidebar (email, LinkedIn, GitHub; no phone), form name/email/message with validation, live code preview, success/error states; sends via Formspree or Web3Forms (owner, 2026-10-20; pick → D17, endpoint in `shared/config`, host in egress allow-list + CSP `connect-src`)
- [ ] 3.5 Contact motion: preview typing in sync with the form, submit/success transitions
- [ ] 2.5 uk/ru: translate every `messages/*.json` key (now English copies)
- [ ] 2.6 404 page: designed markup in the site's style, all locales (`global-not-found` + `[locale]` not-found)
- [ ] 2.0 `og:image` absent on pages that override `openGraph`; missing assets: `public/assets/icons/favicons/*`, `public/assets/images/meta-picture.png`
- [ ] 3.6 Mobile (375) for every page, menu animation; about sidebar unreachable at 375; the shell is fixed-height (`h-[calc(100dvh-90px)]` main), so below ~540 px tall the footer overlaps the content — let it grow (`min-h`); the GitHub link string `"https://github.com/…"` is clipped at 375 in the hero code block; uk role at 375 breaks after `>` alone; hero text ~4 px under the header
- [ ] 3.7 Motion performance and a11y pass (Lighthouse, reduced motion, keyboard)

## Last — tests

- [ ] 1.12 jest 30 + RTL + jest-axe, coverage floor in `gate` and the deploy (D6)
- [ ] 1.13 Playwright + axe against `out/` (incl. a `/portfolio` basePath build), separate CI job, not blocking the deploy (D6)
