import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const done = new Set<object>();

/** Registers each plugin once; no-op on the server. */
export const register = (...plugins: object[]): void => {
  if (typeof window === "undefined") return;
  const fresh = plugins.filter(plugin => !done.has(plugin));
  if (fresh.length === 0) return;
  fresh.forEach(plugin => done.add(plugin));
  gsap.registerPlugin(...fresh);
};

/**
 * Plugins are not registered here: `load-plugins.ts` fetches them with
 * `import()` when a primitive first needs them, so they stay out of the
 * first-load bundle. Add ScrollTrigger and the like the same way.
 */
export const registerMotion = (): void => register(useGSAP);
