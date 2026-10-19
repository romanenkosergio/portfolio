import type { Metadata } from "next";

import { E_ROUTES } from "@/shared/config";
import { pageMetadata } from "@/shared/lib";

export const generateMetadata = (): Metadata =>
  pageMetadata(E_ROUTES.ABOUT_HOBBIES);

const AboutMeHobbies = () => {
  return <div>AboutMeHobbies</div>;
};

export default AboutMeHobbies;
