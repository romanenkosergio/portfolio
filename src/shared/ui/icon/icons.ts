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
import SidebarHobbies from "@/public/assets/icons/sidebar/hobbies.svg";
import SidebarPersonalInfo from "@/public/assets/icons/sidebar/personal-info.svg";
import SidebarProfessionalInfo from "@/public/assets/icons/sidebar/professional-info.svg";
import TechAstro from "@/public/assets/icons/tech/astro.svg";
import TechDjango from "@/public/assets/icons/tech/django.svg";
import TechExpo from "@/public/assets/icons/tech/expo.svg";
import TechGodot from "@/public/assets/icons/tech/godot.svg";
import TechGulp from "@/public/assets/icons/tech/gulp.svg";
import TechJavascript from "@/public/assets/icons/tech/javascript.svg";
import TechNestjs from "@/public/assets/icons/tech/nestjs.svg";
import TechNextjs from "@/public/assets/icons/tech/nextjs.svg";
import TechReact from "@/public/assets/icons/tech/react.svg";
import TechSass from "@/public/assets/icons/tech/sass.svg";
import TechShopify from "@/public/assets/icons/tech/shopify.svg";
import TechTelegram from "@/public/assets/icons/tech/telegram.svg";
import TechTypescript from "@/public/assets/icons/tech/typescript.svg";
import TechVue from "@/public/assets/icons/tech/vue.svg";
import TechWebpack from "@/public/assets/icons/tech/webpack.svg";

import type { SVGComponent } from "./icon.types";

// Every icon the site renders; a name outside this list fails typecheck.
export const ICONS = {
  "arrow-down": ArrowDown,
  "close": Close,
  "folder": Folder,
  "keyboard-arrow": KeyboardArrow,
  "mail": Mail,
  "markdown": Markdown,
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
  "sidebar/professional-info": SidebarProfessionalInfo,
  "tech/astro": TechAstro,
  "tech/django": TechDjango,
  "tech/godot": TechGodot,
  "tech/gulp": TechGulp,
  "tech/javascript": TechJavascript,
  "tech/nestjs": TechNestjs,
  "tech/nextjs": TechNextjs,
  "tech/react": TechReact,
  "tech/sass": TechSass,
  "tech/shopify": TechShopify,
  "tech/telegram": TechTelegram,
  "tech/typescript": TechTypescript,
  "tech/vue": TechVue,
  "tech/webpack": TechWebpack,
  "tech/expo": TechExpo
} satisfies Record<string, SVGComponent>;
