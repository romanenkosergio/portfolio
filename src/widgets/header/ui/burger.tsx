"use client";

import { useState } from "react";

import Navigation from "@/widgets/header/ui/navigation";

const Burger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className="flex cursor-pointer flex-col gap-1 desktop:hidden"
        onClick={toggleMenu}
      >
        {[
          "translate-y-1.5 rotate-45",
          "opacity-0",
          "-translate-y-1.5 -rotate-45"
        ].map((className, index) => (
          <span
            key={className}
            className={`h-0.5 w-4.5 transform bg-secondary-1 transition-transform duration-300 ease-in-out ${
              isOpen ? className : index === 1 ? "opacity-100" : ""
            }`}
          />
        ))}
      </div>

      <div
        className={`absolute top-15.5 left-0 flex h-[calc(100dvh-62px)] w-full flex-col bg-primary-2 transition-opacity duration-700 ease-in-out ${
          isOpen ? "z-10 opacity-100" : "-z-1 opacity-0"
        }`}
      >
        <Navigation
          className="flex flex-col gap-5 text-white desktop:hidden"
          linkClassName="border-b-line border-b p-4.5"
          onClick={toggleMenu}
          isMobile
        />
      </div>
    </>
  );
};

export default Burger;
