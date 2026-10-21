import { Flip } from "gsap/Flip";

import { register, registerMotion } from "./register";

export const registerFlip = (): void => {
  registerMotion();
  register(Flip);
};
