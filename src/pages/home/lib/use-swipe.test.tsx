import type { PointerEvent } from "react";

import { act, renderHook } from "@testing-library/react";

import { useSwipe } from "./use-swipe";

const pointer = (
  pointerId: number,
  x: number,
  y: number,
  pointerType = "touch"
) => ({ pointerId, clientX: x, clientY: y, pointerType }) as PointerEvent;

const setup = () => {
  const onSwipe = jest.fn();
  const { result } = renderHook(() => useSwipe(onSwipe));
  return { onSwipe, handlers: result.current };
};

describe("useSwipe", () => {
  it("turns once per swipe", () => {
    const { onSwipe, handlers } = setup();
    act(() => handlers.onPointerDown(pointer(1, 0, 0)));
    act(() => handlers.onPointerMove(pointer(1, 30, 0)));
    act(() => handlers.onPointerMove(pointer(1, 80, 0)));
    expect(onSwipe).toHaveBeenCalledTimes(1);
    expect(onSwipe).toHaveBeenCalledWith("RIGHT");
  });

  it("clears the swipe on pointercancel", () => {
    const { onSwipe, handlers } = setup();
    act(() => handlers.onPointerDown(pointer(1, 0, 0)));
    act(() => handlers.onPointerCancel(pointer(1, 0, 0)));
    act(() => handlers.onPointerMove(pointer(1, 40, 0)));
    expect(onSwipe).not.toHaveBeenCalled();
  });

  it("ignores mouse drags", () => {
    const { onSwipe, handlers } = setup();
    act(() => handlers.onPointerDown(pointer(1, 0, 0, "mouse")));
    act(() => handlers.onPointerMove(pointer(1, 40, 0, "mouse")));
    expect(onSwipe).not.toHaveBeenCalled();
  });

  it("ignores a second pointer", () => {
    const { onSwipe, handlers } = setup();
    act(() => handlers.onPointerDown(pointer(1, 0, 0)));
    act(() => handlers.onPointerDown(pointer(2, 200, 200)));
    act(() => handlers.onPointerMove(pointer(2, 200, 300)));
    act(() => handlers.onPointerUp(pointer(2, 200, 300)));
    act(() => handlers.onPointerMove(pointer(1, 0, 40)));
    expect(onSwipe).toHaveBeenCalledTimes(1);
    expect(onSwipe).toHaveBeenCalledWith("DOWN");
  });
});
