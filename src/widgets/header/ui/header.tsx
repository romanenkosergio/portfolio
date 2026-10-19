import type { FC } from "react";

import Link from "next/link";

import { E_ROUTES } from "@/shared/config";

import Navigation from "@/widgets/header/ui/navigation";

import Burger from "./burger";

const Header: FC = () => {
  return (
    <header className="flex items-center justify-between border border-line p-4.5 tablet:px-5.5 desktop:justify-start desktop:py-0">
      <Link
        title="Go to Home"
        href={E_ROUTES.HOME}
        className="text-md flex-none text-secondary-1 desktop:mr-38.5 desktop:w-38.5 desktop:py-4.5 desktop:hover:text-white"
      >
        serhii-romanenko
      </Link>
      <Navigation
        className="hidden w-full desktop:flex"
        linkClassName="px-6 last:ml-auto border-l border-l-line desktop:py-4.5 nth-3:border-r nth-3:border-r-line hover:not-aria-[current=page]:text-white"
      />
      <Burger />
    </header>
  );
};

export default Header;
