import ArrowDown from "@/public/assets/icons/arrow-down.svg";
import BoltsBoltDownLeft from "@/public/assets/icons/bolts/bolt-down-left.svg";
import BoltsBoltDownRight from "@/public/assets/icons/bolts/bolt-down-right.svg";
import BoltsBoltUpLeft from "@/public/assets/icons/bolts/bolt-up-left.svg";
import BoltsBoltUpRight from "@/public/assets/icons/bolts/bolt-up-right.svg";
import Close from "@/public/assets/icons/close.svg";
import Folder from "@/public/assets/icons/folder.svg";
import FooterGithub from "@/public/assets/icons/footer/github.svg";
import FooterLinkedin from "@/public/assets/icons/footer/linkedin.svg";
import FooterMedium from "@/public/assets/icons/footer/medium.svg";
import FooterTwitter from "@/public/assets/icons/footer/twitter.svg";
import GameFood from "@/public/assets/icons/game/food.svg";
import KeyboardArrow from "@/public/assets/icons/keyboard-arrow.svg";
import Mail from "@/public/assets/icons/mail.svg";
import Markdown from "@/public/assets/icons/markdown.svg";
import Phone from "@/public/assets/icons/phone.svg";
import SidebarHobbies from "@/public/assets/icons/sidebar/hobbies.svg";
import SidebarPersonalInfo from "@/public/assets/icons/sidebar/personal-info.svg";
import SidebarProfessionalInfo from "@/public/assets/icons/sidebar/professional-info.svg";

import type { SVGComponent } from "./icon.types";

// Every icon the site renders; a name outside this list fails typecheck.
export const ICONS = {
  "arrow-down": ArrowDown,
  "close": Close,
  "folder": Folder,
  "keyboard-arrow": KeyboardArrow,
  "mail": Mail,
  "markdown": Markdown,
  "phone": Phone,
  "bolts/bolt-down-left": BoltsBoltDownLeft,
  "bolts/bolt-down-right": BoltsBoltDownRight,
  "bolts/bolt-up-left": BoltsBoltUpLeft,
  "bolts/bolt-up-right": BoltsBoltUpRight,
  "footer/github": FooterGithub,
  "footer/linkedin": FooterLinkedin,
  "footer/medium": FooterMedium,
  "footer/twitter": FooterTwitter,
  "game/food": GameFood,
  "sidebar/hobbies": SidebarHobbies,
  "sidebar/personal-info": SidebarPersonalInfo,
  "sidebar/professional-info": SidebarProfessionalInfo
} satisfies Record<string, SVGComponent>;
