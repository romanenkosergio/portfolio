import { FC } from "react";

import { SOCIALS } from "@/widgets/footer/config";
import { Icon } from "@/shared/ui";

const Footer: FC = () => {
  return (
    <footer className="border-t-line max-tablet:justify-between flex h-12.25 items-center border-t">
      <span className="text-secondary-1 desktop:border-r-line desktop:pr-12.75 desktop:border-r flex-none pl-4.5">
        Find me in:
      </span>
      <div className="desktop:w-full flex h-full items-center">
        {SOCIALS.map(item => (
          <a
            className="group desktop:last:w-auto desktop:last:border-l desktop:last:border-l-line border-r-line desktop:last:ml-auto max-tablet:last:border-r-0 max-tablet:first:border-l-line max-tablet:first:border-l flex h-full w-13 items-center justify-start border-r px-3.5"
            key={item.title}
            title={item.title}
            href={item.href}
            target="_blank"
            rel="nofollow noreferrer"
          >
            <span className="desktop:inline-block text-secondary-1 desktop:mr-1 desktop:group-hover:text-white hidden">
              {item.label}
            </span>
            <Icon
              name={item.icon}
              folder="footer"
              className="text-secondary-1 desktop:group-hover:text-white h-6 w-6"
            />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
