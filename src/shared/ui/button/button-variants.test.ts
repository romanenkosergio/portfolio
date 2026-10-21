import { buttonVariants } from "./button-variants";

// GSAP entrances own opacity: a CSS opacity transition on the same element restarts on every
// frame of the tween and keeps it at its start value (the hero CTAs stayed invisible).
describe("buttonVariants", () => {
  it("does not transition opacity unless the button can conceal itself", () => {
    expect(buttonVariants()).not.toMatch(/opacity/);
    expect(buttonVariants({ variant: "primary" })).not.toMatch(/opacity/);
  });

  it("fades only when concealed is set explicitly", () => {
    expect(buttonVariants({ concealed: false })).toMatch(/opacity/);
    expect(buttonVariants({ concealed: true })).toMatch(/opacity/);
  });
});
