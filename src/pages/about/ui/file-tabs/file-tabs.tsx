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
const FileTabs: FC<IFileTabsProps> = ({ current, labels, closeLabels }) => {
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
    <ul className="flex h-10 flex-none border-b border-b-line">
      {shown.map(type => (
        <li
          key={type}
          className="group flex items-center border-r border-r-line text-secondary-1 has-[a[aria-current]]:text-white"
        >
          <Link
            href={ABOUT_TYPE_ROUTES[type]}
            title={labels[type]}
            aria-current={type === current ? "page" : undefined}
            className="py-2.5 pr-3 pl-3.5 text-base hover:text-white"
          >
            {labels[type]}
          </Link>
          <Icon
            name="close"
            onClick={() => handleClose(type)}
            label={closeLabels[type]}
            interactive
            className="mr-3.5 h-3.5 w-3.5"
          />
        </li>
      ))}
    </ul>
  );
};

export default FileTabs;
