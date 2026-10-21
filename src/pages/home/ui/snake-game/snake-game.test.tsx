import { act, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { renderWithIntl } from "@/shared/lib/test";

import { useSnakeStore } from "@/pages/home/model";

import SnakeGame from "./snake-game";

// jsdom has no PointerEvent: without it the pointer init (coordinates, type) is dropped.
class TestPointerEvent extends MouseEvent {
  pointerType: string;
  constructor(type: string, init: PointerEventInit = {}) {
    super(type, init);
    this.pointerType = init.pointerType ?? "";
  }
}
window.PointerEvent = TestPointerEvent as unknown as typeof PointerEvent;

const swipe = (board: HTMLElement, dx: number, dy: number) => {
  fireEvent.pointerDown(board, {
    pointerType: "touch",
    clientX: 100,
    clientY: 100
  });
  fireEvent.pointerMove(board, {
    pointerType: "touch",
    clientX: 100 + dx,
    clientY: 100 + dy
  });
  fireEvent.pointerUp(board, { pointerType: "touch" });
};

beforeEach(() => act(() => useSnakeStore.getState().reset()));

describe("SnakeGame", () => {
  it("renders the board, the four arrow buttons and the skip link at any width", () => {
    renderWithIntl(<SnakeGame />);
    expect(screen.getByRole("application")).toBeInTheDocument();
    ["Move up", "Move down", "Move left", "Move right"].forEach(name =>
      expect(screen.getByRole("button", { name })).toBeInTheDocument()
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = renderWithIntl(<SnakeGame />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("turns the snake when an arrow button is tapped", async () => {
    renderWithIntl(<SnakeGame />);
    act(() => useSnakeStore.getState().start());
    await userEvent.click(screen.getByRole("button", { name: "Move down" }));
    expect(useSnakeStore.getState().direction).toBe("DOWN");
  });

  it("turns the snake on a swipe, once per swipe", () => {
    renderWithIntl(<SnakeGame />);
    act(() => useSnakeStore.getState().start());
    const board = screen.getByRole("application");
    swipe(board, 0, 40);
    expect(useSnakeStore.getState().direction).toBe("DOWN");
    swipe(board, 0, -40);
    expect(useSnakeStore.getState().direction).toBe("UP");
    // Heading is still RIGHT until a tick: a swipe back into it is ignored.
    swipe(board, -40, 0);
    expect(useSnakeStore.getState().direction).toBe("UP");
  });

  it("ignores a swipe before the game starts", () => {
    renderWithIntl(<SnakeGame />);
    swipe(screen.getByRole("application"), 0, 40);
    expect(useSnakeStore.getState().steered).toBe(false);
  });
});
