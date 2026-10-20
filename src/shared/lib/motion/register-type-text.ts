import { SplitText } from "gsap/SplitText";

import { register, registerMotion } from "./register";

export const registerTypeText = (): void => {
  registerMotion();
  register(SplitText);
};
