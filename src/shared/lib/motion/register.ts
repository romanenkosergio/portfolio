import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";

const done = new Set<object>();

const register = (...plugins: object[]): void => {
  if (typeof window === "undefined") return;
  const fresh = plugins.filter(plugin => !done.has(plugin));
  if (fresh.length === 0) return;
  fresh.forEach(plugin => done.add(plugin));
  gsap.registerPlugin(...fresh);
};

/**
 * Plugins register per primitive, at module scope of the client component that
 * needs them, so a page only ships the plugins of the primitives it uses.
 * Add Flip, ScrollTrigger and the like the same way. Idempotent, no-op on the
 * server.
 */
export const registerMotion = (): void => register(useGSAP);
export const registerSplitText = (): void => register(useGSAP, SplitText);
export const registerScrambleText = (): void =>
  register(useGSAP, SplitText, ScrambleTextPlugin);
