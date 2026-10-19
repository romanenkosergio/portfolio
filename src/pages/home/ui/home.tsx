import type { FC } from "react";

import { Container } from "@/shared/ui";

import { SnakeGame } from "./snake-game";

const HomeView: FC = () => {
  return (
    <section className="desktop:flex desktop:items-center">
      <Container>
        <div className="desktop:flex desktop:items-center desktop:justify-between">
          <div className="text-white">
            <span className="text-light text-lg">Hi all. I am</span>
            <h1 className="text-light desktop:mt-0 mt-2.5 text-6xl">
              Serhii Romanenko
            </h1>
            <h2 className="text-secondary-3 mt-1 text-3xl">
              {">"} Front-end developer
            </h2>
            <p className="text-secondary-1 text-md mt-20">
              {"//"} complete the game to continue
            </p>
            <p className="mt-2.5">
              <span className="text-secondary-3">const</span>
              <span className="text-accent-2"> githubLink</span> ={" "}
              <a
                title="LinkedIn"
                rel="nofollow noreferrer"
                target="_blank"
                className="text-accent-1 desktop:before:left-0 desktop:before:bg-accent-1 desktop:hover:before:opacity-90 desktop:before:content-[''] desktop:before:w-full desktop:before:absolute desktop:before:bottom-0 desktop:before:block desktop:before:h-0.25 desktop:before:opacity-0 relative mt-2.5 underline-offset-4"
                href="https://github.com/romanenkosergio"
              >
                &#34;https://github.com/romanenkosergio&#34;
              </a>
            </p>
          </div>
          <SnakeGame />
        </div>
      </Container>
    </section>
  );
};

export default HomeView;
