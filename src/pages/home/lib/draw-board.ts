import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  BOARD_COLOR,
  CELL_SIZE,
  SNAKE_COLOR,
  SNAKE_WIDTH
} from "../config";
import type { Cell, Direction } from "../model";

const channels = (hex: string) =>
  [1, 3, 5].map(i => Number.parseInt(hex.slice(i, i + 2), 16));

// Opaque colour `amount` of the way from the snake colour to the board colour: a fade without
// alpha, so the round caps at the joins overlap invisibly.
const fade = (amount: number) => {
  const [from, to] = [channels(SNAKE_COLOR), channels(BOARD_COLOR)];
  const mixed = from.map((value, i) =>
    Math.round(value + (to[i] - value) * Math.min(Math.max(amount, 0), 1))
  );
  return `rgb(${mixed.join(",")})`;
};

// The board is translucent over the panel, so an opaque board colour would show as a dark blot:
// the tail's own end fades out to transparent instead.
const TAIL_END = `rgb(${channels(BOARD_COLOR).join(" ")} / 0)`;

interface IBoard {
  snake: readonly Cell[];
  food: Cell;
  direction: Direction;
}

export const drawBoard = (
  ctx: CanvasRenderingContext2D,
  foodImage: CanvasImageSource,
  { snake, food }: IBoard
) => {
  const dpr = window.devicePixelRatio || 1;
  const { canvas } = ctx;
  // Backing store at device pixels, CSS size unchanged; resizing also clears the canvas.
  if (canvas.width !== Math.round(CANVAS_WIDTH * dpr)) {
    canvas.width = Math.round(CANVAS_WIDTH * dpr);
    canvas.height = Math.round(CANVAS_HEIGHT * dpr);
    canvas.style.width = `${CANVAS_WIDTH}px`;
    canvas.style.height = `${CANVAS_HEIGHT}px`;
  }
  const scale = CELL_SIZE * dpr;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, CANVAS_WIDTH / CELL_SIZE, CANVAS_HEIGHT / CELL_SIZE);

  // Tail to head, so each head-side segment's cap covers the join; the head stays the pure colour.
  ctx.lineWidth = SNAKE_WIDTH / CELL_SIZE;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const last = Math.max(snake.length - 1, 1);

  // A longer snake starts at its tail segment, so no dot is drawn on the tail point itself.
  for (
    let index = snake.length - (snake.length > 1 ? 2 : 1);
    index >= 0;
    index--
  ) {
    const [x, y] = snake[index];
    const [px, py] = snake[index + 1] ?? [x, y];
    const gradient = ctx.createLinearGradient(
      px + 0.5,
      py + 0.5,
      x + 0.5,
      y + 0.5
    );
    const isTail = index === snake.length - 2;
    gradient.addColorStop(0, isTail ? TAIL_END : fade((index + 1) / last));
    gradient.addColorStop(1, fade(index / last));
    ctx.strokeStyle = gradient;
    ctx.fillStyle = fade(index / last);
    ctx.beginPath();
    if (px === x && py === y) {
      ctx.arc(x + 0.5, y + 0.5, ctx.lineWidth / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.moveTo(px + 0.5, py + 0.5);
      ctx.lineTo(x + 0.5, y + 0.5);
      ctx.stroke();
    }
  }

  ctx.drawImage(foodImage, food[0], food[1], 1.5, 1.5);
};
