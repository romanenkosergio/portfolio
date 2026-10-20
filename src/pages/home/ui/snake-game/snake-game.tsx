"use client";

import { useRef } from "react";
import type { FC } from "react";

import { cn } from "@/shared/lib";
import { PENDING_ATTR } from "@/shared/lib/motion";
import { Icon } from "@/shared/ui";

import { BOLTS } from "@/pages/home/config";
import { usePanelMotion } from "@/pages/home/lib";

import Food from "./food";
import Game from "./game";
import KeyboardHelp from "./keyboard-help";
import WinButton from "./win-button";

// Figma has no game on the 375 frame, so the whole block (glows included) exists from `desktop` up.
// The glows sit behind the panel so its backdrop blur frosts them.
const BLOB =
  "pointer-events-none absolute h-123 w-113.5 rounded-full opacity-40 blur-[87px]";

const SnakeGame: FC = () => {
  const scopeRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  usePanelMotion(scopeRef, panelRef);
  return (
    <div ref={scopeRef} className="relative hidden desktop:block">
      <div
        aria-hidden="true"
        data-blob=""
        className={cn(BLOB, "-top-32 -left-12.5 rotate-94 bg-accent-2")}
      />
      <div
        aria-hidden="true"
        data-blob=""
        className={cn(BLOB, "top-30.5 left-69 -rotate-13 bg-secondary-3")}
      />
      <div
        ref={panelRef}
        {...{ [PENDING_ATTR]: "" }}
        className="relative h-118.75 w-127.5 rounded-lg shadow-[inset_0px_2px_0px_rgba(255,255,255,0.3)] outline-1 outline-primary-4 backdrop-blur-[32px]"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-lg bg-linear-to-br from-game-glow to-accent-2/13 opacity-70"
        />
        <div className="relative z-10 flex h-full gap-6 px-7.5 py-8.5">
          <Game />
          <div className="flex flex-col">
            <KeyboardHelp />
            <Food />
            <WinButton />
          </div>
        </div>
        {BOLTS.map(item => (
          <Icon
            key={item.icon}
            data-bolt=""
            className={cn("absolute z-12 h-3.25 w-3.25", item.className)}
            name={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default SnakeGame;
