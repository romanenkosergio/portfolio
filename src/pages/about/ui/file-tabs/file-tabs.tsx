"use client";

import { useRef } from "react";
import type { FC } from "react";

import { Link } from "@/shared/i18n";
import { registerMotion } from "@/shared/lib/motion";
import { Icon } from "@/shared/ui";

import { ABOUT_TYPE_ROUTES } from "@/pages/about/config";

import type { IFileTabsProps } from "./file-tabs.types";
import { useTabMotion } from "./use-tab-motion";
import { useTabs } from "./use-tabs";

registerMotion();

// The files opened during the visit; the one on screen is always among them.
const FileTabs: FC<IFileTabsProps> = ({ labels, closeLabels, navLabel }) => {
  const listRef = useRef<HTMLUListElement>(null);
  const { current, shown, closeTab, abortClose } = useTabs(listRef);
  const barRef = useTabMotion(listRef, current, shown);

  return (
    <nav aria-label={navLabel} className="flex-none">
      <ul ref={listRef} className="relative flex h-10 border-b border-b-line">
        {shown.map(type => (
          <li
            key={type}
            data-tab={type}
            className="group flex items-center border-r border-b-2 border-r-line border-b-transparent text-secondary-1 has-[a[aria-current]]:border-b-accent-1 has-[a[aria-current]]:text-white [[data-ready]_&]:border-b-transparent!"
          >
            <Link
              href={ABOUT_TYPE_ROUTES[type]}
              title={labels[type]}
              aria-current={type === current ? "page" : undefined}
              onClick={abortClose}
              className="py-2.5 pr-3 pl-3.5 text-base hover:text-white aria-[current]:pr-3.5"
            >
              {labels[type]}
            </Link>
            {shown.length > 1 && (
              <Icon
                name="close"
                onClick={() => closeTab(type)}
                label={closeLabels[type]}
                interactive
                className="mr-3.5 h-3.5 w-3.5"
              />
            )}
          </li>
        ))}
        <li
          ref={barRef}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-px bg-accent-1 opacity-0"
        />
      </ul>
    </nav>
  );
};

export default FileTabs;
