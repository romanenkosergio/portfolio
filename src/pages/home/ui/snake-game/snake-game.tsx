import type { CSSProperties, FC } from "react";

import Image from "next/image";

import { BASE_PATH } from "@/shared/config";
import { Icon } from "@/shared/ui";

import { BOLTS } from "@/pages/home/config";

import Food from "./food";
import Game from "./game";
import KeyboardArrow from "./keyboard-arrow";
import WinButton from "./win-button";

// The URL carries the GitHub Pages base path, so it is passed in as a CSS variable.
const GAME_BG = {
  "--game-bg": `url(${BASE_PATH}/assets/images/game-block-bg.png)`
} as CSSProperties;

const SnakeGame: FC = () => {
  return (
    <div
      style={GAME_BG}
      className="relative h-118.75 w-127.5 rounded-lg border border-primary-4 shadow-[inset_0px_2px_0px_rgba(255,255,255,0.3)] backdrop-blur-[32px] desktop:bg-(image:--game-bg)"
    >
      <div className="relative z-10 flex h-full gap-6 px-7.5 py-8.5">
        <Game />
        <div className="flex flex-col">
          <div className="w-45 rounded-lg bg-primary-5/19 px-3 py-4">
            <p className="text-sm text-white">{"//"} use keyboard</p>
            <p className="text-sm text-white">{"//"} arrows to play</p>
            <div className="mt-4 flex flex-col gap-1">
              <div className="flex w-full items-center justify-center">
                <KeyboardArrow direction="UP" />
              </div>
              <div className="flex w-full items-center gap-1">
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
      <div className="absolute -top-31 -left-12.5 z-1 h-185.5 max-h-[calc(100dvh-111px)] w-195">
        <Image
          src={`${BASE_PATH}/assets/images/snake_bg.png`}
          alt="game background"
          title="game background"
          fill
        />
      </div>
      {BOLTS.map(item => (
        <Icon
          key={item.icon}
          className={`absolute z-12 h-3.25 w-3.25 ${item.className} `}
          folder="bolts"
          name={item.icon}
        />
      ))}
    </div>
  );
};

export default SnakeGame;
