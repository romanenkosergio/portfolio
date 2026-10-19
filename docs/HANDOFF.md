# Hand-off — where the work is

Read first in a fresh chat; it is re-read at every session start, so its size is part of being
right: ≤ 8000 bytes (`wc -c`; the `pr-handoff-guard` hook denies a PR over it). Only the current:
«Current state» is the last finished theme — replace it at each hand-off, don't append. Anything
durable goes to `docs/DECISIONS.md` or `docs/PLAN.md` first, then is deleted here; git is the history.

## Current state (2026-10-19)

- Repo `git@github.com-personal:romanenkosergio/portfolio.git`, `main` protected (PR required, 0 approvals;
  the agent merges with squash after `code-reviewer`, owner's ruling). Pages deploys on push to `main`:
  https://romanenkosergio.github.io/portfolio/ (static export, D3).
- Aligning with common-next (PLAN 1.x): merged #6 base path, #7 Next 16 / React 19.3, #8 design + GSAP skills
  (phase 3, D8), #9 kit lint toolchain (D5, D9; `eslint/pending.config.mjs` holds the rest), #10 class re-sort,
  #11 `shared` refactor (cn/cva, icon registry D10, NavLink active state).
- Agents: implement with `frontend-implementer`, then `code-reviewer` + `visual-checker` in parallel; they share
  the one checkout — never run two `next dev`/builds on the same port, give each its own port.

## Next

- PLAN 1.9 → 1.10 → 1.15 (shadcn, D7) → 1.11 (next-intl en/uk/ru, D4) → 1.12–1.14 → phase 3 redesign.
  Each PR clears its «PLAN 1.x» entries in `eslint/pending.config.mjs`. Next decision number: D11.

## Environment

- Node 24, yarn; `yarn dev` → http://localhost:3000. `NEXT_PUBLIC_DOMAIN` sets the base URL (staging `web-staging.<domain>`).
