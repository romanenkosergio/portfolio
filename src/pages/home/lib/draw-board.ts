import { CANVAS_HEIGHT, CANVAS_WIDTH, CELL_SIZE } from "../config";
import type { Cell, Direction } from "../model";

const HEAD_RADIUS = 0.4;
// Corner radii [top-left, top-right, bottom-right, bottom-left]: the head is rounded on its leading side.
const HEAD_CORNERS: Record<Direction, number[]> = {
  RIGHT: [0, HEAD_RADIUS, HEAD_RADIUS, 0],
  LEFT: [HEAD_RADIUS, 0, 0, HEAD_RADIUS],
  UP: [HEAD_RADIUS, HEAD_RADIUS, 0, 0],
  DOWN: [0, 0, HEAD_RADIUS, HEAD_RADIUS]
};

interface IBoard {
  snake: readonly Cell[];
  food: Cell;
  direction: Direction;
}

export const drawBoard = (
  ctx: CanvasRenderingContext2D,
  foodImage: CanvasImageSource,
  { snake, food, direction }: IBoard
) => {
  ctx.setTransform(CELL_SIZE, 0, 0, CELL_SIZE, 0, 0);
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const gradient = ctx.createLinearGradient(0, 15, 15, 30);
  gradient.addColorStop(0.5, "#43D9AD");
  gradient.addColorStop(1, "#DEFFFF");
  ctx.fillStyle = gradient;

  snake.forEach(([x, y], index) => {
    ctx.beginPath();
    if (index === 0) ctx.roundRect(x, y, 1, 1, HEAD_CORNERS[direction]);
    else ctx.rect(x, y, 1, 1);
    ctx.closePath();
    ctx.fill();
  });

  ctx.drawImage(foodImage, food[0], food[1], 1.5, 1.5);
};
