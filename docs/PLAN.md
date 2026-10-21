# Portfolio — plan

Open items only, one line each, ≤ 8000 bytes (`pr-handoff-guard`). A finished item is deleted and its
number goes to «Done»; details — DECISIONS and git. Sections in working order; format `- [ ] N.M`
(read by `session-brief.sh`).

Done: 1.1–1.11, 1.14–1.16, 2.0–2.6, 3.1–3.6

## Pages — markup, content, motion (D8; Figma in AGENTS.md)

Each page: markup and content first (2.x), then its motion (3.x). Copy via `copywriter`, en first.

- [ ] 3.7 Motion performance and a11y pass (Lighthouse, reduced motion, keyboard)

## Last — tests

- [ ] 1.12 jest 30 + RTL + jest-axe, coverage floor in `gate` and the deploy (D6)
- [ ] 1.13 Playwright + axe against `out/` (incl. a `/portfolio` basePath build), separate CI job, not blocking the deploy (D6)
