import {
  loadFlip,
  loadScrambleText,
  loadSplitText,
  playAfterLoad
} from "./load-plugins";

const now = (run: () => void): (() => void) => run;

describe("plugin loaders", () => {
  it("fetch each plugin once and share the promise", async () => {
    expect(loadSplitText()).toBe(loadSplitText());
    expect(loadFlip()).toBe(loadFlip());
    expect(loadScrambleText()).toBe(loadScrambleText());
    expect(typeof (await loadSplitText()).create).toBe("function");
    expect(typeof (await loadFlip()).getState).toBe("function");
  });

  it("scramble loads SplitText too", async () => {
    expect(await loadScrambleText()).toBe(await loadSplitText());
  });
});

describe("playAfterLoad", () => {
  it("plays once loaded and cleans up on cancel", async () => {
    const cleanup = jest.fn();
    const play = jest.fn(() => cleanup);
    const cancel = playAfterLoad(() => Promise.resolve("plugin"), play, now);
    expect(play).not.toHaveBeenCalled();
    await Promise.resolve();
    expect(play).toHaveBeenCalledWith("plugin");
    cancel();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  it("never plays when cancelled before the load ends", async () => {
    const play = jest.fn();
    const cancel = playAfterLoad(() => Promise.resolve(1), play, now);
    cancel();
    await Promise.resolve();
    expect(play).not.toHaveBeenCalled();
  });

  it("runs play through contextSafe", async () => {
    const safe = jest.fn(now);
    playAfterLoad(
      () => Promise.resolve(1),
      () => undefined,
      safe
    );
    await Promise.resolve();
    expect(safe).toHaveBeenCalledTimes(1);
  });
});
