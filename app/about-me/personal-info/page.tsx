import type { FC } from "react";

import { permanentRedirect } from "next/navigation";

import { E_ROUTES } from "@/shared/config";

const About: FC = () => {
  permanentRedirect(E_ROUTES.ABOUT_PERSONAL_BIO);
};

export default About;
