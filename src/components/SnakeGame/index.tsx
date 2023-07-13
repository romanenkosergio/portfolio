import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Game } from "components";

import { ReactComponent as BoltUpLeft } from 'svg/game/bolt-up-left.svg';
import { ReactComponent as BoltUpRight } from 'svg/game/bolt-up-right.svg';
import { ReactComponent as BoltDownLeft } from 'svg/game/bolt-down-left.svg';
import { ReactComponent as BoltDownRight } from 'svg/game/bolt-down-right.svg';

import { ReactComponent as UpArrow } from 'svg/game/up-arrow.svg';
import { ReactComponent as LeftArrow } from 'svg/game/left-arrow.svg';
import { ReactComponent as DownArrow } from 'svg/game/down-arrow.svg';
import { ReactComponent as RightArrow } from 'svg/game/right-arrow.svg';

import { ReactComponent as SnakeFood } from 'svg/game/snake-food.svg';

import { ROUTES } from "utils/enums";

import "./styles.scss";

const SnakeGame: FC = () => {
  const [score, setScore] = useState<number>(10);
  const [arrowName, setArrowName] = useState<string>('ArrowRight');
  const navigate = useNavigate();

  const onSkip = () => {
    navigate(ROUTES.ABOUT)
  };

  return (
    <div className="snake-game">
      <div className="snake-game__bg snake-game-top-bg"/>
      <div className="snake-game__bg snake-game-down-bg"/>
      <div className="snake-game__container">
        <div className="snake-game__content">
          <BoltUpLeft className="bolt bolt-up-left"/>
          <BoltUpRight className="bolt bolt-up-right"/>
          <BoltDownLeft className="bolt bolt-down-left"/>
          <BoltDownRight className="bolt bolt-down-right"/>
          <div className="snake-game__left">
            <Game setScore={setScore} score={score} arrowName={arrowName} setArrowName={setArrowName}/>
          </div>
          <div className="snake-game__right">
            <div className="snake-game-rules">
              <p>{'//'} use keyboard</p>
              <p>{'//'} arrows to play</p>
              <div className="snake-game-rules__keyboard">
                <div className="snake-game-rules__keyboard-row">
                  <UpArrow
                    className={`snake-game-rules__key ${arrowName === 'ArrowUp' ? 'snake-game-rules__key--active' : ''}`}/>
                </div>
                <div className="snake-game-rules__keyboard-row">
                  <LeftArrow
                    className={`snake-game-rules__key ${arrowName === 'ArrowLeft' ? 'snake-game-rules__key--active' : ''}`}/>
                  <DownArrow
                    className={`snake-game-rules__key ${arrowName === 'ArrowDown' ? 'snake-game-rules__key--active' : ''}`}/>
                  <RightArrow
                    className={`snake-game-rules__key ${arrowName === 'ArrowRight' ? 'snake-game-rules__key--active' : ''}`}/>
                </div>
              </div>
            </div>
            <div className="snake-game-food snake-game__food">
              <p>{'//'} Food left</p>
              <div className="snake-game-food__items">
                {
                  Array.from({length: 10}).map((_, idx: number) => (
                    <SnakeFood key={`score-${idx}`}
                               className={`snake-game-food__item ${idx >= score ? 'snake-game-food__item--done' : ''}`}/>
                  ))
                }
              </div>
            </div>
            <Button text="skip" action={onSkip} type="ghost" className="snake-game__button"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
