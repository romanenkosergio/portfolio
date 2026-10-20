import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;

/**
 * Registers every GSAP plugin the site uses, once. Called from the motion
 * primitives (client components) before their first `useGSAP`; add Flip and the
 * like here. Idempotent and a no-op on the server.
 */
export const registerMotion = (): void => {
  if (registered || typeof window === "undefined") return;
  registered = true;
  gsap.registerPlugin(useGSAP, SplitText, ScrambleTextPlugin, ScrollTrigger);
};
