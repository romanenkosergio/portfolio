import { TECHS } from "../config";
import type { Tech } from "../config";

// One badge per icon: Liquid next to Shopify, or GDScript next to Godot, would repeat a glyph.
export const badgeTechs = (stack: readonly Tech[]): Tech[] =>
  stack.filter(
    (tech, index) =>
      stack.findIndex(other => TECHS[other].icon === TECHS[tech].icon) === index
  );
