# Hand-off — where the work is

Read first in a fresh chat; it is re-read at every session start, so its size is part of being
right: ≤ 8000 bytes (`wc -c`; the `pr-handoff-guard` hook denies a PR over it). Only the current:
«Current state» is the last finished theme — replace it at each hand-off, don't append. Anything
durable goes to `docs/DECISIONS.md` or `docs/PLAN.md` first, then is deleted here; git is the history.

## Current state (2026-10-20)

- PLAN 2.3 done: About markup per Figma (spec + screenshots were in a session scratchpad; Figma has only the personal-info desktop frame). Explorer in `widgets/content-layout` (rail: terminal/person/gamepad, folder tones rose/mint/indigo, contacts = email only — no phone on the site, owner 2026-10-20). File tabs: `pages/about/model/tabs-store.ts` (in-memory; close → left, else right, else bio; × hidden on the last tab). `ContentWithCodeLines` soft-wraps per logical line. Snippet showcase: `pages/about/config/snippets.ts` = verbatim excerpts of this repo (`// …` cuts), `yarn snippets` (in `gate`) checks them against their files; `shared/ui/code-block` = shiki `codeToTokens` at build, server-only, imported by path, never via the `shared/ui` barrel. CSS is at 9.75/10 kB.
- `gh` for this repo: `GH_TOKEN=$(gh auth token -u romanenkosergio) gh …` (global gh stays the work account).
- PLAN 3.2 done: home hero and snake polish. `TypeText` (`shared/ui/motion/type-text`): `caret`, `keepCaret` (default true; the hero passes false), `speed` in chars/s (default `TYPE.speed` 30), `delay`. Split-based primitives (`SplitReveal`, `ScrambleText`, `TypeText`) use SplitText `smartWrap` (no mid-word breaks, D15).
- Hero sequence: `HERO_DELAY` in `pages/home/config/hero.ts` (greeting 0.1, name 0.5, role 1.1, code 1.7, panel 1.9, bolts 2.3 s; reads in ~2.5 s). `ui/hero-code.tsx` is the code-style intro.
- Snake panel motion: `lib/use-panel-motion.ts` runs on `matchMotion` with `condition: DESKTOP_QUERY` (`(min-width: 1200px)`, `shared/lib/motion/tokens.ts`). Keys: `config/keys.ts` (`KEY_DIRECTIONS`, arrows + WASD) → `lib/key-to-direction.ts`; `lib/key-press.ts` is a Zustand signal `{direction, id}` that flashes the on-screen arrows without re-rendering the board. Food, game-overlay and keyboard-arrow tweens use `revertOnUpdate`. Snake tick: `TICK_START` 200 ms − `TICK_STEP` 5 ms per food eaten (owner OK with the speed).
- Snake UI (1.10, Figma-matched): CSS gradient + blurred blobs (`--color-game-glow`), canvas at devicePixelRatio, skip always visible, game hidden below `desktop`. Not checked in a browser: win and hover states; hero on slow devices.
- Motion toolkit (3.1, still true): `@/shared/lib/motion` is kept out of `shared/lib/index.ts` so server code never pulls GSAP. `registerMotion()` registers useGSAP; each primitive registers its own plugin. `matchMotion(scope, {full, reduced, condition?})` wraps `gsap.matchMedia()`. Tokens: `DURATION`, `EASE`, `STAGGER`, `WAVE`, `SCRAMBLE_CHARS`, `TYPE`. Hiding is `data-motion-pending` (opacity 0 under `@media (scripting: enabled)`, cleared in useGSAP, 3 s CSS fallback); the «already visible → skip» verdict is once per host (D15). ScrambleText is never hidden (h1/LCP). Split/Scramble/Type render an `sr-only` copy plus an `aria-hidden` animated span. Playwright checked reduced motion, JS-off, LCP = FCP, box stability (3.1). JS budget 335 kB gzip (D14).
- Gates (1.14): `gate` = format, lint, typecheck, fsd, `egress` (allow-listed hosts), `dup` (jscpd, threshold 0; route `page.tsx` stubs ignored). `gate:push` adds `size` (JS 335 kB, CSS 10 kB gzip). gitleaks in `ci.yml` `secrets` and before the gate in `pages.yml`. CSP and referrer are `<meta>` tags from `shared/config/csp.ts` (dev adds `unsafe-eval`, `ws:`).
- i18n (1.11): routes `app/[locale]/…` (`dynamicParams = false`, `generateStaticParams` over `LOCALES`); every layout/page starts with `resolveLocale(params)`. `src/shared/i18n` holds routing, `Link`/`useRouter` (createNavigation), `request.ts`. `i18n.d.ts` types `AppConfig`, so a missing key fails `tsc`. Copy lives only in `messages/*.json`; uk/ru are English copies until the copywriter translates. Root `app/page.tsx` is a meta-refresh stub to `${BASE_PATH}/en/` (D12). Not checked in a browser: language switcher look/focus, dropdown over the burger menu.
- Snake engine (1.10): `pages/home/model/snake.ts` is pure; `snake-store.ts` is the Zustand store with named selectors; `lib/use-game.ts` is thin. React Compiler is on. The board is `role="application"`; arrows/WASD act only with focus. `model/` cannot carry `"use client"`.
- shadcn (1.15/1.16): `yarn shadcn:add`; `pending.config.mjs` is empty. Treatments are variants: Icon (`icon-variants.ts`), Button `concealed`, NavLink `variant`. CSS transitions are colour-only; opacity/transform transitions are explicit local classes.
- About content from the owner's CV (en/uk/ru). Years are `{years, plural}` via `yearsSince(CAREER_START)`; never hard-code them. The CV PDF is local only (`docs/serhii-romanenko-cv.pdf`, git-excluded: it has a phone number, never commit it).
- Repo `git@github.com-personal:romanenkosergio/portfolio.git`, `main` protected (PR; squash after `code-reviewer` and the owner's «да»). Pages deploy only on request (D11): `gh workflow run pages.yml --ref main`; https://romanenkosergio.github.io/portfolio/ (static export, D3). Repo stays public (D13).
- `next dev` logs "missing param in generateStaticParams" for an unknown `[type]` with `output: export` — expected.
- Agents: implement with `frontend-implementer`, then `code-reviewer` + `visual-checker` in parallel; one checkout, so each `next dev` gets its own port.

## Next

- Pages in PLAN order, markup + content before motion: About (2.4, 3.3) → Projects (2.1, 3.4) → Contact
  (2.2, 3.5) → 2.5, 2.6, 2.0 → 3.6, 3.7; tests last (1.12, 1.13).
  A new pending entry in `eslint/pending.config.mjs` names its PLAN item. Next decision number: D17.

## Environment

- Node 24, yarn; `yarn dev` → http://localhost:3000. `NEXT_PUBLIC_DOMAIN` sets the base URL (staging `web-staging.<domain>`).
