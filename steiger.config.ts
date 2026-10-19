import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // Routes live in the root app/, outside steiger's view: a slice used only by a route reads as unused.
    rules: {
      "fsd/insignificant-slice": "off"
    }
  },
  {
    files: ["./src/shared/**"],
    rules: {
      "fsd/public-api": "off"
    }
  }
]);
