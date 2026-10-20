Portfolio — Serhii Romanenko's personal site: Next.js 16 (App Router, Turbopack), React 19.3, Tailwind 4, Zustand,
Feature-Sliced Design. One package, yarn.

## Layout

- `app/` — Next.js routes only: thin `page.tsx` files with `generateMetadata`, each renders a view from `src/pages`. Every route is under `app/[locale]/` (en/uk/ru, D4); copy
  never goes in JSX — it lives in `messages/<locale>.json` (`useTranslations` / `getTranslations`), typed by `i18n.d.ts`;
  routing, `Link` and the router come from `shared/i18n`, never `next/link` / `next/navigation`.
- `src/` — FSD layers, top to bottom: `app` (providers, fonts, global styles) → `pages` → `widgets` →
  `features` → `entities` → `shared` (ui kit, hooks in `lib`, `config`). A layer imports only from layers
  below; a slice is reached through its `index.ts` (public API; `shared` is exempt). Segments: `ui`,
  `model`, `lib`, `config`, `api`. Checked by ESLint (`boundaries/dependencies`) and steiger (`yarn fsd`).
- `pages/` (root) — an empty Pages Router folder that stops Next from reading `src/pages` as routes; keep it.
- `eslint/` — the lint rule set; `eslint.config.mjs` only composes it. No warn tier (D5): every rule is error or off.
  `base.config.mjs` (clean-code ceilings: 60 lines/function, complexity 15, depth 4, 6 params; import order; a11y),
  `architecture.config.mjs` + `layers.rules.mjs` (layers; `src/app` may import only `shared`),
  `forbidden.config.mjs` (`process.env` only in `src/shared/config`, public-API imports, copy literals, type safety),
  `rules/` (in-repo `project/*` rules; `require-title`: every `<a>`/`<Link>` needs `title` and content, every `<img>`/`<Image>` a `title`).
  `pending.config.mjs` switches off, per file, the rules existing code still fails; each entry names the PLAN item
  that deletes it (the list is empty now). Never an `eslint-disable`; `lint:fix` handles import order, type imports, Prettier.
- Static export only (GitHub Pages): no server code, API routes or `next/image` optimisation; a dynamic
  route needs `generateStaticParams`; a public asset URL is `${BASE_PATH}/assets/...`.
- `shared`: `cn()` (`shared/lib/cn`, clsx + tailwind-merge) joins every class list; component variants are `cva` (`buttonVariants`, `VariantProps`); icons come from the typed registry `shared/ui/icon/icons.ts` (add an SVG there, `IconName` follows), D10; call sites style shared/shadcn components through variants, only layout classes allowed (`shadcn/no-restyle`); shadcn components: `yarn shadcn:add <name>` (CLI + `scripts/shadcn-add.mjs` moves it to `shared/ui/<name>/` with `index.ts`; `shadcn/no-restyle` is off inside `shared/ui`; icons in them come from `lucide-react`, `--background`/`--primary`… map to palette tokens in `styles.css`), D7.
- `public/assets/` — images and SVG icons (SVGs import as React components through SVGR, configured in `turbopack.rules`).
- `docs/` — `PLAN.md` (open items), `HANDOFF.md` (where the work is), `DECISIONS.md` (`D###` rows).

Imports: `@/*` → `src/*`, `@/public/*` → `public/*`. Files and folders kebab-case; a component is
`name/name.tsx` + `name.types.ts` + `index.ts`. Double quotes, no trailing commas (Prettier + ESLint).

## Design

- Reference, not a spec: Figma «Portfolio for Developers Concept V.2» — style guide
  https://www.figma.com/design/JLXgoRLVLyZR49dIH5ABc1/?node-id=68-901, screens (desktop 1920, mobile 375)
  https://www.figma.com/design/JLXgoRLVLyZR49dIH5ABc1/?node-id=0-1. The owner wants it better than the
  reference, with far more motion (D8). Tokens live in `src/app/styles/styles.css` and match the style guide's colours (checked against node 68-901).
- Motion: GSAP + `@gsap/react` (`useGSAP`, cleanup on unmount); transforms and opacity only; every animation
  honours `prefers-reduced-motion` (`gsap.matchMedia()`); client components only where motion needs them.
  CSS transitions only on colour properties; transform/opacity belong to GSAP (or an explicit local transition).
  Toolkit: tokens, plugin registration and the reduced-motion guard in `shared/lib/motion`, primitives (`Reveal`, `Stagger`, `SplitReveal`, `ScrambleText`) in `shared/ui/motion`; new animations use them.
- Skills in `.claude/skills`: official GreenSock `gsap-*` (core, timeline, scrolltrigger, plugins, react,
  performance, utils; MIT), and from common-next `frontend-design`, `scroll-experience`,
  `fixing-motion-performance`, `baseline-ui`, `fixing-accessibility`. Their install commands say `npm` — use `yarn add`.
- Where a skill disagrees, this file wins: GSAP is the only animation library (not `motion/react`, Framer Motion,
  Lenis or Locomotive — use ScrollTrigger / ScrollSmoother); phase 3 counts as an explicit request for motion,
  custom eases included; UI primitives come from shadcn (D7), not Base UI.

## Commands

Node 24 (`nvm use`; the git hooks switch to it themselves), yarn only.

```bash
yarn dev            # next dev
yarn lint | lint:fix | format | format:check | typecheck | fsd
yarn gate           # format:check + lint + typecheck + fsd + egress (allow-listed hosts) + dup (jscpd; route page.tsx stubs ignored)
yarn gate:push      # gate + next build + size (size-limit on out/; pre-push)
```

Run `yarn gate` before calling a task done. Never `--no-verify`.

## Git

- Author `sergromanenko97@gmail.com` (pre-commit guard, `scripts/commit-address.sh`).
- Husky hooks. pre-commit: address, `lint:fix`, `format`, `typecheck`, `fsd`, re-stage.
  pre-push: `yarn gate:push`, or for text-only pushes (`docs/**`, root `*.md`) Prettier only
  (`scripts/pre-push-scope.sh`).
- Remote `git@github.com-personal:romanenkosergio/portfolio.git` (personal SSH alias), default branch `main`.
  GitHub Pages deploys only on the owner's request: `gh workflow run pages.yml --ref main` (manual trigger, D11; static export, D3).
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

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
