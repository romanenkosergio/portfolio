# Portfolio — plan

Open items only, one line each, ≤ 8000 bytes (`pr-handoff-guard`). A finished item is deleted and its
number goes to «Done»; details — DECISIONS and git. Sections in working order; format `- [ ] N.M`
(read by `session-brief.sh`).

Done: 1.1–1.3

## Phase 1 — tooling

- [ ] 1.4 Next 16, React 19.3, tailwind-merge 3, Tailwind 4.x; SVGR → `turbopack.rules`; `typedRoutes`; tsconfig per the kit (common-next)
- [ ] 1.6 Kit ESLint/Prettier/steiger toolchain (`eslint/` composition, boundaries 6, react-hooks 7); `eslint/pending.config.mjs` names the PR that clears each entry (D5); drop FlatCompat, `@feature-sliced/eslint-config`, local-rules, ts-node
- [ ] 1.7 Re-sort Tailwind classes (prettier-plugin-tailwindcss 0.8, `tailwindStylesheet`) — formatting only
- [ ] 1.8 `shared`: `cn` + `cva` Button, static icon registry, NavLink `aria-current`, delete dead code (modal, unused hooks, consts), fix `BASE_URL`
- [ ] 1.9 `widgets/layout-shell` (skip link, landmarks) instead of `src/app/providers`; `lang`, no zoom lock; Burger as a `<button>`; typed `[type]` params + guard; relative intra-slice imports; sidebar dedupe
- [ ] 1.10 Home: pure snake model, store selectors, React Compiler on, focusable game
- [ ] 1.11 next-intl en (default) / uk / ru with static export: `/[locale]/…`, root → `/en/`, copy in `messages/`, `jsx-no-literals` (D4)
- [ ] 1.12 jest 30 + RTL + jest-axe, coverage floor in `gate` and the deploy (D6)
- [ ] 1.13 Playwright + axe against `out/` (incl. a `/portfolio` basePath build), separate CI job, not blocking the deploy (D6)
- [ ] 1.14 size-limit on `out/`, jscpd, egress check, gitleaks, meta referrer/CSP (D6)
- [ ] 1.5 Repository private? GitHub Pages from a private repo needs GitHub Pro (owner)

## Phase 2 — content

- [ ] 2.0 `og:image` absent on pages that override `openGraph`; missing assets: `public/assets/icons/favicons/*`, `public/assets/images/meta-picture.png`

- [ ] 2.1 `/projects`: real page instead of `HomeView`
- [ ] 2.2 `/contact`: real page instead of `HomeView`
