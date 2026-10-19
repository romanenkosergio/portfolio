# Decisions

Choices made while building, one row each, newest at the end. Look up by number with
`sh scripts/decision.sh D1` — never read this file whole.

| #   | Date       | Decision | Why |
| --- | ---------- | -------- | --- |
| D1 | 2026-10-19 | Agent tooling follows the party-game repo: hooks for context size and hand-off, subagents per task type with the cheapest fitting model, PLAN/HANDOFF ≤ 8000 bytes, decisions by number. | Most spend is re-reading context; small always-read docs and delegated work keep each chat cheap. |
| D2 | 2026-10-19 | The Next.js rewrite replaces the old CRA project on `main` of github.com/romanenkosergio/portfolio (force-push); old feature branches stay. | Owner: the old code is obsolete. |
| D3 | 2026-10-19 | Hosting: GitHub Pages, static export (`output: "export"`, `images.unoptimized`, `trailingSlash`), `basePath` from `NEXT_PUBLIC_BASE_PATH` set by the Pages workflow; public asset URLs prefixed with `BASE_PATH`. | Owner wants GitHub Pages; Pages serves static files under /portfolio. |
