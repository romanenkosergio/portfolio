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
 * Plugins register per primitive, each in its own module (`register-*.ts`), so
 * a page only ships the plugins of the primitives it uses. Add Flip,
 * ScrollTrigger and the like the same way.
 */
export const registerMotion = (): void => register(useGSAP);
