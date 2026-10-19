# Portfolio — plan

Open items only, one line each, ≤ 8000 bytes (`pr-handoff-guard`). A finished item is deleted and its
number goes to «Done»; details — DECISIONS and git. Sections in working order; format `- [ ] N.M`
(read by `session-brief.sh`).

Done: 1.1–1.4, 1.6, 1.7

## Phase 1 — tooling

- [ ] 1.8 `shared`: `cn` + `cva` Button, static icon registry, NavLink `aria-current`, delete dead code (modal, unused hooks, consts), fix `BASE_URL`; NavLink: internal `href` typed `Route` (no `as Route` cast), active match ignores the trailing slash (`exact` links are never active now)
- [ ] 1.15 shadcn as in common-next: `components.json` (new-york, rsc, aliases `@/shared/ui`, `@/shared/lib`), `yarn shadcn:add` → `shared/ui/<name>/`, `@shadcn/lint` `no-restyle`, `tw-animate-css`, lucide; shadcn CSS variables mapped to the portfolio palette (D7)
- [ ] 1.9 `widgets/layout-shell` (skip link, landmarks) instead of `src/app/providers`; `lang`, no zoom lock; Burger as a `<button>`; typed `[type]` params + guard; relative intra-slice imports; sidebar dedupe
- [ ] 1.10 Home: pure snake model, store selectors, React Compiler on, focusable game
- [ ] 1.11 next-intl en (default) / uk / ru with static export: `/[locale]/…`, root → `/en/`, copy in `messages/`, `jsx-no-literals` (D4)
- [ ] 1.12 jest 30 + RTL + jest-axe, coverage floor in `gate` and the deploy (D6)
- [ ] 1.13 Playwright + axe against `out/` (incl. a `/portfolio` basePath build), separate CI job, not blocking the deploy (D6)
- [ ] 1.14 size-limit on `out/`, jscpd, egress check, gitleaks, meta referrer/CSP (D6)
- [ ] 1.5 Repository private? GitHub Pages from a private repo needs GitHub Pro (owner)

## Phase 3 — redesign with motion (D8; Figma in AGENTS.md)

- [ ] 3.1 GSAP + `@gsap/react`, motion primitives in `shared` (reveal, stagger, text scramble/split, reduced-motion guard)
- [ ] 3.2 Home: hero (typed/scrambled name, code-style intro), the snake game polished
- [ ] 3.3 About: sidebar/explorer tree transitions, file tabs, code-lines content
- [ ] 3.4 Projects: filter by tech with Flip transitions, project cards
- [ ] 3.5 Contact: form with live code preview, success state
- [ ] 3.6 Mobile (375) for every page, menu animation
- [ ] 3.7 Motion performance and a11y pass (Lighthouse, reduced motion, keyboard)

## Phase 2 — content

- [ ] 2.0 `og:image` absent on pages that override `openGraph`; missing assets: `public/assets/icons/favicons/*`, `public/assets/images/meta-picture.png`

- [ ] 2.1 `/projects`: real page instead of `HomeView`
- [ ] 2.2 `/contact`: real page instead of `HomeView`
