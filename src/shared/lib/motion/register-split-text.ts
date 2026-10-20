import { SplitText } from "gsap/SplitText";

import { register, registerMotion } from "./register";

export const registerSplitText = (): void => {
  registerMotion();
  register(SplitText);
};
