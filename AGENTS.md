Portfolio — Serhii Romanenko's personal site: Next.js 15 (App Router), React 19, Tailwind 4, Zustand,
Feature-Sliced Design. One package, yarn.

## Layout

- `app/` — Next.js routes only: thin `page.tsx` files with `generateMetadata`, each renders a view from `src/pages`.
- `src/` — FSD layers, top to bottom: `app` (providers, fonts, global styles) → `pages` → `widgets` →
  `features` → `entities` → `shared` (ui kit, hooks in `lib`, `config`). A layer imports only from layers
  below; a slice is reached through its `index.ts` (public API; `shared` is exempt). Segments: `ui`,
  `model`, `lib`, `config`, `api`. Checked by ESLint (`@feature-sliced`) and steiger (`yarn fsd`).
- `pages/` (root) — an empty Pages Router folder that stops Next from reading `src/pages` as routes; keep it.
- `eslint-local-rules/` — `require-title`: every `<a>`/`<Link>` needs `title` and content, every `<img>`/`<Image>` a `title`.
- Static export only (GitHub Pages): no server code, API routes or `next/image` optimisation; a dynamic
  route needs `generateStaticParams`; a public asset URL is `${BASE_PATH}/assets/...`.
- `public/assets/` — images and SVG icons (SVGs import as React components through SVGR; `?url` for a URL).
- `docs/` — `PLAN.md` (open items), `HANDOFF.md` (where the work is), `DECISIONS.md` (`D###` rows).

Imports: `@/*` → `src/*`, `@/public/*` → `public/*`. Files and folders kebab-case; a component is
`name/name.tsx` + `name.types.ts` + `index.ts`. Double quotes, no trailing commas (Prettier + ESLint).

## Commands

Node 24 (`nvm use`; the git hooks switch to it themselves), yarn only.

```bash
yarn dev            # steiger --watch + next dev
yarn lint | lint:fix | format | format:check | typecheck | fsd
yarn gate           # format:check + lint + typecheck + fsd
yarn gate:push      # gate + next build (pre-push)
```

Run `yarn gate` before calling a task done. Never `--no-verify`.

## Git

- Author `sergromanenko97@gmail.com` (pre-commit guard, `scripts/commit-address.sh`).
- Husky hooks. pre-commit: address, `lint:fix`, `format`, `typecheck`, `fsd`, re-stage.
  pre-push: `yarn gate:push`, or for text-only pushes (`docs/**`, root `*.md`) Prettier only
  (`scripts/pre-push-scope.sh`).
- Remote `git@github.com-personal:romanenkosergio/portfolio.git` (personal SSH alias), default branch `main`.
  A push to `main` deploys GitHub Pages (`.github/workflows/pages.yml`, static export, D3).
- Branch from a fresh `origin/main`, never from an unmerged branch; open the PR right after the push.

## Context economy

- **One theme, one chat**; continue in a fresh chat from [`docs/HANDOFF.md`](docs/HANDOFF.md). The
  session's last PR carries the hand-off update. Hooks: `context-guard.py` warns at ~280k tokens,
  asks for the hand-off past ~350k; `pr-handoff-guard.py` then denies `gh pr create` without a
  `docs/HANDOFF.md` change; `session-brief.sh` prints branch, PRs and next PLAN items.
- **Delegate** to `.claude/agents/*` by task type, cheapest model that fits: `frontend-implementer`
  (sonnet) writes code, `copywriter` (sonnet) texts, `visual-checker` (sonnet) looks at the running site,
  `gate-runner` and `docs-keeper` (haiku) check, push and keep docs, `code-reviewer` (opus) on every PR.
  The main chat plans, briefs and decides; `/sud` puts a decision on trial, the owner decides.
- **PLAN and HANDOFF ≤ 8000 bytes** each (`wc -c`). PLAN: `- [ ] N.M` one line per open item; a
  finished item is deleted and its number goes to «Done» in the same PR. HANDOFF: current state
  (replaced, not appended); durable notes go to DECISIONS or PLAN.
- **Decisions by number:** `sh scripts/decision.sh D3 D7` (`CAP=0` for a whole row) — never read the
  decisions file whole. New rows go to the end of `docs/DECISIONS.md`.
- **Read narrowly** (grep, then the range), edit in place, **report short** (outcome first, ≤ 15 lines; the rest to a scratch file).
- **Quiet output:** `git commit -q`, `git push -q`; hook, gate and build output to a log file, only its
  tail into context (the hooks print one line, the log tail on failure); PR bodies via
  `gh pr create --body-file`.
