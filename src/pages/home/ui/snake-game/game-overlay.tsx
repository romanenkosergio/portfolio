"use client";

import { useRef } from "react";
import type { FC } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslations } from "next-intl";

import { cn } from "@/shared/lib";
import {
  DISTANCE,
  DURATION,
  EASE,
  STAGGER,
  matchMotion,
  registerMotion
} from "@/shared/lib/motion";
import { Button } from "@/shared/ui";

import type { GameStatus } from "@/pages/home/model";

registerMotion();

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
  const ref = useRef<HTMLDivElement>(null);
  const previous = useRef(status);

  // The message and the button fade in with a short lift whenever the overlay comes back.
  useGSAP(
    () => {
      const overlay = ref.current;
      const wasPlaying = previous.current === "playing";
      previous.current = status;
      if (!overlay || isPlaying || !wasPlaying) return;
      const mm = matchMotion(overlay, {
        full: () => {
          gsap.from(overlay.children, {
            opacity: 0,
            y: DISTANCE.small,
            duration: DURATION.base,
            stagger: STAGGER.children,
            ease: EASE.out,
            clearProps: "opacity,transform"
          });
        }
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [status], revertOnUpdate: true }
  );

  return (
    <div
      ref={ref}
      inert={isPlaying}
      className={cn(
        "absolute bottom-13.5 left-1/2 flex w-full -translate-x-1/2 flex-col items-center transition-opacity duration-300 ease-in-out",
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
        concealed={isPlaying}
        text={t(startLabels[status])}
        onClick={onStart}
        variant={isOver ? "ghost" : "primary"}
      />
    </div>
  );
};

export default GameOverlay;
