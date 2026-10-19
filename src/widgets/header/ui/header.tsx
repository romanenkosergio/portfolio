import type { FC } from "react";

import Link from "next/link";

import { E_ROUTES } from "@/shared/config";

import Navigation from "@/widgets/header/ui/navigation";

import Burger from "./burger";

const Header: FC = () => {
  return (
    <header className="border-line desktop:justify-start tablet:px-5.5 desktop:py-0 flex items-center justify-between border p-4.5">
      <Link
        title="Go to Home"
        href={E_ROUTES.HOME}
        className="text-secondary-1 text-md desktop:w-38.5 desktop:mr-38.5 desktop:hover:text-white desktop:py-4.5 flex-none"
      >
        serhii-romanenko
      </Link>
      <Navigation
        className="desktop:flex hidden w-full"
        linkClassName="px-6 last:ml-auto border-l border-l-line desktop:py-4.5 nth-3:border-r nth-3:border-r-line hover:not-[&.active]:text-white"
      />
      <Burger />
    </header>
  );
};

export default Header;
