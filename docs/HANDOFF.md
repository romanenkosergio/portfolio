# Hand-off — where the work is

Read first in a fresh chat; it is re-read at every session start, so its size is part of being
right: ≤ 8000 bytes (`wc -c`; the `pr-handoff-guard` hook denies a PR over it). Only the current:
«Current state» is the last finished theme — replace it at each hand-off, don't append. Anything
durable goes to `docs/DECISIONS.md` or `docs/PLAN.md` first, then is deleted here; git is the history.

## Current state (2026-10-19)

- PLAN 1.11 done (next-intl 4, en/uk/ru): routes are `app/[locale]/…` (`dynamicParams = false`, `generateStaticParams`
  over `LOCALES`; `[type]` pages locales × types). Every layout/page/`generateMetadata` starts with
  `resolveLocale(params)` (`src/app/lib`: validates, `setRequestLocale`). `src/shared/i18n`: `routing`, `Locale`,
  `isLocale`, `Link/usePathname/useRouter/redirect` (createNavigation), `request.ts` (plugin entry, loads
  `messages/<locale>.json`); `i18n.d.ts` types `AppConfig` so a missing key fails `tsc`. Root `app/page.tsx` is a static
  meta-refresh + canonical stub to `${BASE_PATH}/en/` (the root has no `<html>`, D12); `app/layout.tsx` is a
  pass-through, `app/global-not-found.tsx` (experimental.globalNotFound) is the English 404.html. `pageMetadata({locale,
path, title?})` adds canonical, hreflang + x-default. Header has a shadcn `Select` language switcher (desktop: before
  `_contact-me`; mobile: bottom of the burger menu). Copy lives only in `messages/*.json`; uk/ru are English copies
  until the copywriter translates them. Not checked in a browser: switcher look/focus, dropdown over the burger menu.
- Repo `git@github.com-personal:romanenkosergio/portfolio.git`, `main` protected (PR required, 0 approvals;
  the agent merges with squash after `code-reviewer` once the owner says «да» for that PR — auto mode blocks it otherwise). Pages deploys only when the owner asks (`gh workflow run pages.yml --ref main`, D11):
  https://romanenkosergio.github.io/portfolio/ (static export, D3).
- PLAN 1.10 done: `pages/home/model/snake.ts` is the pure snake engine (`createInitialState`, `startGame`,
  `step(state, random)`, `turn`, `placeFood`); `snake-store.ts` is the Zustand store (game state + `start/tick/steer`)
  with named selectors, components subscribe through them. `lib/use-game.ts` is thin (interval, board keys, canvas
  via `lib/draw-board.ts`). React Compiler is on (`reactCompiler: true` + `babel-plugin-react-compiler`). The board is
  `role="application"` `tabIndex=0` with name, `aria-describedby` instructions, polite live region; arrows/WASD act only
  while it has focus; on-screen arrows are `<button>`s; the start overlay is `inert` during a round. `model/` cannot
  carry `"use client"` (directive-placement), cross-segment imports use `@/pages/home/<segment>`.
- PLAN 1.15 done: shadcn (`components.json`, `yarn shadcn:add`, `@shadcn/lint`, `tw-animate-css`, `lucide-react`); `Separator` added as the proof, unused yet. Existing call sites that restyle Icon/NavLink/Button are in `pending.config.mjs` under PLAN 1.16.
- Snake UI matched to Figma (measured in Figma's Design panel through Chrome, no login): CSS gradient + two blurred
  blobs instead of PNGs (`--color-game-glow`), board inner shadow, snake = 8px round stroke fading tail-ward to the board
  colour (opaque mix, transparent tail end; canvas at devicePixelRatio), skip always visible, game hidden below
  `desktop` (Figma's 375 frame has none). Home section is `desktop:overflow-clip min-h-fit shrink-0` (blobs clipped,
  panel never cut). Win state and hover states were not checked in a browser.
- `next dev` logs a "missing param in generateStaticParams" error for an unknown `[type]` with
  `output: export` — expected; the build gives 404.
- `yarn typecheck` runs `next typegen` first (`next-env.d.ts`, route types are git-ignored).
- Agents: implement with `frontend-implementer`, then `code-reviewer` + `visual-checker` in parallel; they share
  the one checkout — never run two `next dev`/builds on the same port, give each its own port.

## Next

- Translate `messages/uk.json` and `messages/ru.json` (copywriter) → 1.16 → 1.12–1.14 → phase 3 redesign.
  Each PR clears its «PLAN 1.x» entries in `eslint/pending.config.mjs`. Next decision number: D13.

## Environment

- Node 24, yarn; `yarn dev` → http://localhost:3000. `NEXT_PUBLIC_DOMAIN` sets the base URL (staging `web-staging.<domain>`).
