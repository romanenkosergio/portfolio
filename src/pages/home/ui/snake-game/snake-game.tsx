import type { FC } from "react";

import { cn } from "@/shared/lib";
import { Icon } from "@/shared/ui";

import { BOLTS } from "@/pages/home/config";

import Food from "./food";
import Game from "./game";
import KeyboardArrow from "./keyboard-arrow";
import WinButton from "./win-button";

// Figma has no game on the 375 frame, so the whole block (glows included) exists from `desktop` up.
// The glows sit behind the panel so its backdrop blur frosts them.
const BLOB =
  "pointer-events-none absolute h-123 w-113.5 rounded-full opacity-40 blur-[87px]";

const SnakeGame: FC = () => {
  return (
    <div className="relative hidden desktop:block">
      <div
        aria-hidden="true"
        className={cn(BLOB, "-top-32 -left-12.5 rotate-94 bg-accent-2")}
      />
      <div
        aria-hidden="true"
        className={cn(BLOB, "top-30.5 left-69 -rotate-13 bg-secondary-3")}
      />
      <div className="relative h-118.75 w-127.5 rounded-lg shadow-[inset_0px_2px_0px_rgba(255,255,255,0.3)] outline-1 outline-primary-4 backdrop-blur-[32px]">
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-lg bg-linear-to-br from-game-glow to-accent-2/13 opacity-70"
        />
        <div className="relative z-10 flex h-full gap-6 px-7.5 py-8.5">
          <Game />
          <div className="flex flex-col">
            <div className="h-35.5 w-45.25 rounded-lg bg-primary-5/19 px-3 py-4">
              <p className="text-sm leading-4.5 text-white">
                {"//"} use keyboard
              </p>
              <p className="text-sm leading-4.5 text-white">
                {"//"} arrows to play
              </p>
              <div className="mt-4 flex flex-col gap-1.25">
                <div className="flex w-full items-center justify-center">
                  <KeyboardArrow direction="UP" />
                </div>
                <div className="flex w-full items-center gap-1.25">
                  <KeyboardArrow direction="LEFT" />
                  <KeyboardArrow direction="DOWN" />
                  <KeyboardArrow direction="RIGHT" />
                </div>
              </div>
            </div>
            <Food />
            <WinButton />
          </div>
        </div>
        {BOLTS.map(item => (
          <Icon
            key={item.icon}
            className={cn("absolute z-12 h-3.25 w-3.25", item.className)}
            name={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default SnakeGame;
