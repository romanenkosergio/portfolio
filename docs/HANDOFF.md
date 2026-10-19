# Hand-off — where the work is

Read first in a fresh chat; it is re-read at every session start, so its size is part of being
right: ≤ 8000 bytes (`wc -c`; the `pr-handoff-guard` hook denies a PR over it). Only the current:
«Current state» is the last finished theme — replace it at each hand-off, don't append. Anything
durable goes to `docs/DECISIONS.md` or `docs/PLAN.md` first, then is deleted here; git is the history.

## Current state (2026-10-19)

- Agent tooling modelled on the party-game repo: `AGENTS.md`, `.claude/` (hooks, agents, `/sud`), Husky
  hooks, `scripts/`, `yarn gate` (green).
- Repo `git@github.com-personal:romanenkosergio/portfolio.git`, local author sergromanenko97@gmail.com.
  The old CRA project on `main` was replaced by this one (owner, D2).
- Static export for GitHub Pages (D3): `.github/workflows/pages.yml` on push to `main` →
  https://romanenkosergio.github.io/portfolio/. Assets go through `BASE_PATH` (`@/shared/config`).

## Next

- PLAN 1.4 (deps + common-next), 1.5, then phase 2. Next decision number: D4.

## Environment

- Node 24, yarn; `yarn dev` → http://localhost:3000. `NEXT_PUBLIC_DOMAIN` sets the base URL (staging `web-staging.<domain>`).
