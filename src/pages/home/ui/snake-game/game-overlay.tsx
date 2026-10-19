import type { FC } from "react";

import { useTranslations } from "next-intl";

import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";

import type { GameStatus } from "@/pages/home/model";

const startLabels = {
  idle: "startGame",
  playing: "startGame",
  win: "playAgain",
  lose: "startAgain"
} as const;

interface IGameOverlayProps {
  status: GameStatus;
  onStart: () => void;
}

/** Start button and round result; inert (out of the tab order) while a round runs. */
const GameOverlay: FC<IGameOverlayProps> = ({ status, onStart }) => {
  const t = useTranslations("game");
  const isPlaying = status === "playing";
  const isOver = status === "win" || status === "lose";

  return (
    <div
      inert={isPlaying}
      className={cn(
        "absolute bottom-13.5 left-1/2 flex w-full -translate-x-1/2 flex-col items-center",
        isPlaying && "-z-1 opacity-0"
      )}
    >
      {isOver && (
        <p
          className={cn(
            "mb-5 w-full rounded-lg bg-primary-2/90 py-3 text-center text-2xl uppercase",
            status === "win" ? "text-accent-2" : "text-accent-1"
          )}
        >
          {status === "win" ? t("wellDone") : t("gameOver")}
        </p>
      )}
      <Button
        className={cn(isPlaying && "-z-1 opacity-0")}
        text={t(startLabels[status])}
        onClick={onStart}
        variant={isOver ? "ghost" : "primary"}
      />
    </div>
  );
};

export default GameOverlay;
