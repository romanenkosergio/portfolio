import { directivePlacement } from "./rules/directive-placement.mjs";
import { noLiteralCopy } from "./rules/no-literal-copy.mjs";
import { noSliceGroups } from "./rules/no-slice-groups.mjs";
import { requireTitle } from "./rules/require-title.mjs";

/**
 * The project's own rules, each one because no published rule sees what it sees:
 *
 *  - `require-title`: every link and image carries a `title`;
 *  - `directive-placement`: `"use server"` is a string statement every
 *    path-based rule is blind to;
 *  - `no-literal-copy`: `react/jsx-no-literals` cannot police an attribute
 *    without policing `className`;
 *  - `no-slice-groups`: the defect is where a file is, not what it imports.
 */
export const projectPlugin = {
  rules: {
    "require-title": requireTitle,
    "directive-placement": directivePlacement,
    "no-literal-copy": noLiteralCopy,
    "no-slice-groups": noSliceGroups
  }
};
