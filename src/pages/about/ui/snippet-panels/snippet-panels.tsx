"use client";

import { useRef } from "react";
import type { FC } from "react";

import { usePathname } from "@/shared/i18n";

import { aboutTypeOf } from "@/pages/about/lib";

import type { ISnippetPanelsProps } from "./snippet-panels.types";
import { usePanelFade } from "./use-panel-fade";

// Every file's snippets arrive highlighted from the server; only the one of the open file is
// visible (the rest are `hidden`) and the swap cross-fades.
const SnippetPanels: FC<ISnippetPanelsProps> = ({ panels }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const shown = usePanelFade(hostRef, aboutTypeOf(usePathname()));

  return (
    <div ref={hostRef}>
      {Object.entries(panels).map(([type, panel]) => (
        <div
          key={type}
          data-panel={type}
          hidden={type !== shown}
          className="flex flex-col gap-6"
        >
          {panel}
        </div>
      ))}
    </div>
  );
};

export default SnippetPanels;
