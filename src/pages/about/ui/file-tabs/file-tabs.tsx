"use client";

import { useEffect } from "react";
import type { FC } from "react";

import { Link, useRouter } from "@/shared/i18n";
import { Icon } from "@/shared/ui";

import {
  ABOUT_TYPE_ROUTES,
  DEFAULT_ABOUT_TYPE,
  type AboutType
} from "@/pages/about/config";
import {
  openTab,
  selectClose,
  selectOpen,
  selectTabs,
  useTabsStore
} from "@/pages/about/model";

import type { IFileTabsProps } from "./file-tabs.types";

// The files opened during the visit; the one on screen is always among them.
const FileTabs: FC<IFileTabsProps> = ({
  current,
  labels,
  closeLabels,
  navLabel
}) => {
  const router = useRouter();
  const tabs = useTabsStore(selectTabs);
  const open = useTabsStore(selectOpen);
  const close = useTabsStore(selectClose);

  useEffect(() => {
    open(current);
  }, [current, open]);

  const shown = openTab(tabs, current);

  const handleClose = (type: AboutType) => {
    const next = close(type);
    if (type === current) {
      router.push(ABOUT_TYPE_ROUTES[next ?? DEFAULT_ABOUT_TYPE]);
    }
  };

  return (
    <nav aria-label={navLabel} className="flex-none">
      <ul className="flex h-10 border-b border-b-line">
        {shown.map(type => (
          <li
            key={type}
            className="group flex items-center border-r border-b-2 border-r-line border-b-transparent text-secondary-1 has-[a[aria-current]]:border-b-accent-1 has-[a[aria-current]]:text-white"
          >
            <Link
              href={ABOUT_TYPE_ROUTES[type]}
              title={labels[type]}
              aria-current={type === current ? "page" : undefined}
              className="py-2.5 pr-3 pl-3.5 text-base hover:text-white aria-[current]:pr-3.5"
            >
              {labels[type]}
            </Link>
            {shown.length > 1 && (
              <Icon
                name="close"
                onClick={() => handleClose(type)}
                label={closeLabels[type]}
                interactive
                className="mr-3.5 h-3.5 w-3.5"
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FileTabs;
