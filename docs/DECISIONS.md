# Decisions

Choices made while building, one row each, newest at the end. Look up by number with
`sh scripts/decision.sh D1` — never read this file whole.

| #   | Date       | Decision | Why |
| --- | ---------- | -------- | --- |
| D1 | 2026-10-19 | Agent tooling follows the party-game repo: hooks for context size and hand-off, subagents per task type with the cheapest fitting model, PLAN/HANDOFF ≤ 8000 bytes, decisions by number. | Most spend is re-reading context; small always-read docs and delegated work keep each chat cheap. |
| D2 | 2026-10-19 | The Next.js rewrite replaces the old CRA project on `main` of github.com/romanenkosergio/portfolio (force-push); old feature branches stay. | Owner: the old code is obsolete. |
| D3 | 2026-10-19 | Hosting: GitHub Pages, static export (`output: "export"`, `images.unoptimized`, `trailingSlash`), `basePath` from `NEXT_PUBLIC_BASE_PATH` set by the Pages workflow; public asset URLs prefixed with `BASE_PATH`. | Owner wants GitHub Pages; Pages serves static files under /portfolio. |
| D4 | 2026-10-19 | i18n with next-intl, locales en (default), uk, ru; static export, so every route is under `/[locale]` and `/` redirects to `/en/`. | Owner: three languages; GitHub Pages has no middleware for unprefixed default locale. |
| D5 | 2026-10-19 | Lint strictness as in common-next: no warn tier, ≤ 60 lines per function, complexity ≤ 15; existing violations sit in one `eslint/pending.config.mjs`, each entry naming the PR that removes it — never call-site disables. | Owner; keeps the gate honest while the code catches up. |
| D6 | 2026-10-19 | From the kit's gates: jest + coverage floor (gate and deploy), Playwright + axe as a separate non-blocking CI job, size-limit, jscpd, egress check, gitleaks. Not taken: gate self-test/integrity/trace, red-zone, handover, stryker, OWASP headers check (no headers on Pages). | Owner; the meta-gates cost more than the site. |
| D7 | 2026-10-19 | shadcn/ui as in common-next for new components, landing in `shared/ui` through `yarn shadcn:add`; its CSS variables map to the portfolio palette; added after `cn`/`cva` (PLAN 1.8). | Owner: build components on shadcn. |
| D8 | 2026-10-19 | Redesign from the Figma «Portfolio for Developers Concept V.2» as a reference, improved and with rich motion; motion stack GSAP + `@gsap/react` (all plugins free: SplitText, ScrambleText, Flip, ScrollTrigger) with the official GreenSock agent skills; reduced motion respected everywhere. | Owner: better than the reference, many animations; GSAP's text and layout plugins suit the code-editor look; official skills over unvetted registries. |
| D9 | 2026-10-19 | From the kit's lint set, not taken: Clean Architecture ring rules, HTTP/wire-type rules and ports (no backend, no I/O); purity is taken for the snake model in PLAN 1.10; the test config arrives with PLAN 1.12. | A static site with one stateful slice; rings would police structure that does not exist. |
| D10 | 2026-10-19 | Icons come from a static registry (`shared/ui/icon/icons.ts`, SVGR imports keyed by `file` or `folder/file`) instead of a dynamic `require()`; `IconName` is the key type, so a typo fails typecheck. | Typed names, no try/catch or console, works under Jest (PLAN 1.12) and Turbopack. |
