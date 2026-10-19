import { permanentRedirect } from "next/navigation";
import { FC } from "react";
import { E_ROUTES } from "@/shared/config";

const About: FC = () => {
  permanentRedirect(E_ROUTES.ABOUT_PERSONAL_BIO);
};

export default About;
