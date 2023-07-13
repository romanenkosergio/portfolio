import React, { FC, KeyboardEvent, useEffect, useRef, useState } from "react";

import { Button } from "components";

import { IGameProps } from "./types";
import { useInterval } from "hooks";

import food_src from 'svg/game/snake-food.svg';

import "./styles.scss";

const Game: FC<IGameProps> = ({setScore, score, setArrowName, arrowName}) => {
  const canvasX = 240;
  const canvasY = 405;
  const initialSnake: number[][] = [
    [10, 10],
    [10, 10],
  ];
  const initialApple: number[] = [14, 10];
  const scale: number = 15;
  const timeDelay: number = 150;


  const canvasRef = useRef<HTMLCanvasElement|null>(null);
  const [snake, setSnake] = useState(initialSnake);
  const [apple, setApple] = useState(initialApple);
  const [direction, setDirection] = useState([0, -1]);
  const [delay, setDelay] = useState<number|null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameStatus, setGameStatus] = useState<'win'|'lose'|null>(null);
  const [start, setStart] = useState<boolean>(false);


  useInterval(() => runGame(), delay);

  useEffect(() => {
    let food = document.getElementById('food') as HTMLCanvasElement;
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        const gradient = ctx.createLinearGradient(0, 15, 15, 30);
        gradient.addColorStop(.5, "#43D9AD");
        gradient.addColorStop(1, "#DEFFFF");
        ctx.fillStyle = gradient;
        snake.forEach(([x, y]) => ctx.fillRect(x, y, 1, 1));
        ctx.drawImage(food, apple[0], apple[1], 1, 1);
      }
    }
  }, [snake, apple, gameOver]);

  function handleSetScore() {
    if (score < Number(localStorage.getItem('snakeScore'))) {
      localStorage.setItem('snakeScore', JSON.stringify(score));
    }
  }

  function play() {
    setGameStatus(null);
    setSnake(initialSnake);
    setApple(initialApple);
    setDirection([1, 0]);
    setDelay(timeDelay);
    setArrowName('ArrowRight');
    setScore(10);
    setGameOver(false);
    setStart(true);
  }

  function checkCollision(head: number[]) {
    if ((arrowName === 'ArrowUp' || arrowName === 'ArrowDown') && (head[1] < 0 || (head[1] * scale >= canvasY))) return true;
    if ((arrowName === 'ArrowLeft' || arrowName === 'ArrowRight') && (head[0] < 0 || (head[0] * scale >= canvasX))) return true;
    for (const s of snake) {
      if (head[0] === s[0] && head[1] === s[1]) return true;
    }
    return false;
  }

  function appleAte(newSnake: number[][]) {
    let coord = apple.map(() => Math.floor((Math.random() * canvasX) / scale));
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = coord;
      setScore((prevState: number) => prevState - 1);
      setApple(newApple);
      return true;
    }
    return false;
  }

  function runGame() {
    const newSnake = [...snake];
    const newSnakeHead = [
      newSnake[0][0] + direction[0],
      newSnake[0][1] + direction[1],
    ];
    newSnake.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead) || score === 0) {
      setDelay(null);
      setGameOver(true);
      handleSetScore();
      setStart(false);
      if (score === 0) {
        setGameStatus('win');
      } else {
        setGameStatus('lose')
      }
    }
    if (!appleAte(newSnake)) {
      newSnake.pop();
    }
    setSnake(newSnake);
  }

  function changeDirection(e: KeyboardEvent<HTMLDivElement>) {
    e.preventDefault();
    switch (e.key) {
      case 'ArrowLeft':
        setDirection([-1, 0]);
        setArrowName(e.key);
        break;
      case 'ArrowUp':
        setDirection([0, -1]);
        setArrowName(e.key);
        break;
      case 'ArrowRight':
        setDirection([1, 0]);
        setArrowName(e.key);
        break;
      case 'ArrowDown':
        setDirection([0, 1]);
        setArrowName(e.key);
        break;
    }
  }


  return (
    <div onKeyDown={e => changeDirection(e)}>
      <img src={food_src} id="food" width={20} height={20} alt={'food'}/>
      <canvas
        ref={canvasRef}
        width={`${canvasX}px`}
        height={`${canvasY}px`}
      />

      <div className="game-over">
        {gameOver && <p>{gameStatus === 'win' ? 'well done!' : 'Game over !'}</p>}
        <Button className={`game-button ${start ? 'game-button--hidden' : ''}`}
                text={gameStatus === null ? 'start-game' : gameStatus === 'win' ? 'play-again' : 'start-again'}
                action={play} type={gameOver ? 'ghost' : 'primary'}/>
      </div>
    </div>
  );
};

export default Game;
