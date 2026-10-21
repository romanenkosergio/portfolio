import { register, registerMotion } from "./register";

/**
 * Plugins are fetched on demand with `import()`, so they stay out of the
 * first-load bundle (they are not needed to paint). Each loader registers
 * its plugins once and hands back the one the caller calls; the promise is
 * shared, so concurrent callers fetch once.
 */
/** Shares one promise per loader; a failed import is forgotten so a later call retries. */
const once = <T>(load: () => Promise<T>): (() => Promise<T>) => {
  let pending: Promise<T> | undefined;
  return () =>
    (pending ??= load().catch((error: unknown) => {
      pending = undefined;
      throw error;
    }));
};

export const loadSplitText = once(() =>
  import("gsap/SplitText").then(({ SplitText: plugin }) => {
    registerMotion();
    register(plugin);
    return plugin;
  })
);

/** SplitText and the scramble plugin; resolves with SplitText. The hero's text primitives all load this, so they start together. */
export const loadScrambleText = once(() =>
  Promise.all([loadSplitText(), import("gsap/ScrambleTextPlugin")]).then(
    ([plugin, { ScrambleTextPlugin }]) => {
      register(ScrambleTextPlugin);
      return plugin;
    }
  )
);

export const loadFlip = once(() =>
  import("gsap/Flip").then(({ Flip: plugin }) => {
    registerMotion();
    register(plugin);
    return plugin;
  })
);

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
  // A failed import leaves the text plain; the failsafe CSS shows anything still pending.
  load().then(
    plugin => {
      if (!live) return;
      contextSafe(() => {
        cleanup = play(plugin);
      })();
    },
    () => undefined
  );
  return () => {
    live = false;
    if (cleanup) cleanup();
  };
};
