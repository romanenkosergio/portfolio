import gsap from "gsap";

import { DIM, DURATION, EASE } from "@/shared/lib/motion";

/** A «working» pulse: `target` dims and returns, looping until the surrounding context reverts. */
export const pulse = (target: gsap.TweenTarget): gsap.core.Tween =>
  gsap.to(target, {
    opacity: DIM,
    duration: DURATION.base,
    repeat: -1,
    yoyo: true,
    ease: EASE.loop
  });
