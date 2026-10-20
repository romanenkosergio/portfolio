import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";

import { register, registerMotion } from "./register";

export const registerScrambleText = (): void => {
  registerMotion();
  register(SplitText, ScrambleTextPlugin);
};
