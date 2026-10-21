import type { Flip } from "gsap/Flip";
import type { SplitText } from "gsap/SplitText";

import { register, registerMotion } from "./register";

/**
 * Plugins are fetched on demand with `import()`, so they stay out of the
 * first-load bundle (they are not needed to paint). Each loader registers
 * its plugins once and hands back the one the caller calls; the promise is
 * shared, so concurrent callers fetch once.
 */
let splitText: Promise<typeof SplitText> | undefined;
let scrambleText: Promise<typeof SplitText> | undefined;
let flip: Promise<typeof Flip> | undefined;

export const loadSplitText = (): Promise<typeof SplitText> =>
  (splitText ??= import("gsap/SplitText").then(({ SplitText: plugin }) => {
    registerMotion();
    register(plugin);
    return plugin;
  }));

/** SplitText and the scramble plugin; resolves with SplitText. */
export const loadScrambleText = (): Promise<typeof SplitText> =>
  (scrambleText ??= Promise.all([
    loadSplitText(),
    import("gsap/ScrambleTextPlugin")
  ]).then(([plugin, { ScrambleTextPlugin }]) => {
    register(ScrambleTextPlugin);
    return plugin;
  }));

export const loadFlip = (): Promise<typeof Flip> =>
  (flip ??= import("gsap/Flip").then(({ Flip: plugin }) => {
    registerMotion();
    register(plugin);
    return plugin;
  }));

/**
 * Runs `play` once `load` resolves, if the setup was not reverted meanwhile.
 * `play` returns its own cleanup; the returned function cancels a pending run
 * and calls that cleanup. Pass the `contextSafe` that `matchMotion` hands to
 * `full`, so what `play` animates is reverted with the context.
 */
export const playAfterLoad = <T>(
  load: () => Promise<T>,
  play: (plugin: T) => void | (() => void),
  contextSafe: (run: () => void) => () => void
): (() => void) => {
  let live = true;
  let cleanup: void | (() => void);
  void load().then(plugin => {
    if (!live) return;
    contextSafe(() => {
      cleanup = play(plugin);
    })();
  });
  return () => {
    live = false;
    if (cleanup) cleanup();
  };
};
