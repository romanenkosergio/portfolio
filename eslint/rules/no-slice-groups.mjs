/**
 * A slice group is the one shape that disables the whole ring model in silence.
 *
 * `src/features/employee/employee-record/model/x.ts` makes the boundaries
 * element `src/features/employee`, so `internalPath` becomes
 * `employee-record/model/x.ts` and matches no ring glob. Every ring rule stops
 * applying and **nothing reports**: `boundaries/no-unknown-files` is quiet
 * because the file *is* classified, and `boundaries/dependencies` is quiet
 * because no rule's `from` matches. The rule set forbids the shape and
 * `yarn new:slice` refuses to create one, and until 2026-10-01
 * `steiger.config.mjs` claimed there was a fixture proving it — there was not,
 * and when one was written it reported nothing, which is how this rule came to
 * exist.
 *
 * It is a path rule, not a dependency rule, which is why no published rule can
 * do it: the defect is where the file is, not what it imports.
 */

const SLICED_LAYERS = ["pages", "widgets", "features", "entities"];
const RINGS = ["model", "config", "lib", "api", "ui"];

/** `src/features/auth/model/x.ts` → `{ layer, slice, next }`. */
const partsOf = filename => {
  const match = filename
    .replace(/\\/g, "/")
    .match(/(?:^|\/)src\/([^/]+)\/([^/]+)\/([^/]+)\//);

  return match ? { layer: match[1], slice: match[2], next: match[3] } : null;
};

export const noSliceGroups = {
  meta: {
    type: "problem",
    docs: {
      description: "forbid a slice group between a layer and its rings"
    },
    schema: [
      {
        type: "object",
        properties: {
          layers: { type: "array", items: { type: "string" } },
          rings: { type: "array", items: { type: "string" } }
        },
        additionalProperties: false
      }
    ],
    messages: {
      sliceGroup:
        'A slice group is forbidden: "{{layer}}/{{slice}}/{{next}}/" is neither a ' +
        "ring nor `@x`. Under a group the boundaries element becomes the group " +
        "directory, `internalPath` stops starting with a ring name, and every " +
        "ring rule stops applying without reporting anything. Flatten the slice " +
        "— `employee-record`, not `employee/employee-record` — or use the " +
        "cross-import notation `@x/`."
    }
  },

  create(context) {
    const options = context.options[0] ?? {};
    const layers = new Set(options.layers ?? SLICED_LAYERS);
    const rings = new Set(options.rings ?? RINGS);

    return {
      Program(node) {
        const parts = partsOf(context.filename ?? context.getFilename());
        if (parts === null || !layers.has(parts.layer)) {
          return;
        }
        // `@x` is the documented cross-import public API, not a group.
        if (rings.has(parts.next) || parts.next === "@x") {
          return;
        }

        context.report({ node, messageId: "sliceGroup", data: parts });
      }
    };
  }
};
