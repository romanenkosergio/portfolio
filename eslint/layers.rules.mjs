import { FS_LAYERS } from "./fsd-elements.mjs";

/**
 * Layer rules — the FSD half of the architecture.
 *
 * A layer may import strictly lower layers and nothing else. The list in
 * `FS_LAYERS` is written outermost-first and the order is the rule, as in
 * Feature-Sliced Design.
 */

const lowerLayers = layer => FS_LAYERS.slice(FS_LAYERS.indexOf(layer) + 1);
const upperLayers = layer => FS_LAYERS.slice(0, FS_LAYERS.indexOf(layer));
const toAllowList = layers => layers.map(type => ({ to: { type } }));

export const LAYER_MESSAGE =
  'Layer "{{from.type}}" may not import layer "{{to.type}}". ' +
  "A layer depends on the layers below it and on nothing above it. " +
  "See https://feature-sliced.design/docs/reference/layers/overview";

const slicedLayerRules = upperLayers("shared")
  // `app` is handled separately below: it is the composition root and is
  // deliberately more restricted than its position in the list would imply.
  .filter(layer => layer !== "app")
  .map(layer => ({
    from: { type: layer },
    allow: toAllowList(lowerLayers(layer))
  }));

export const layerRules = [
  ...slicedLayerRules,

  // `shared` is the foundation. It sees itself and nothing else — that is what
  // "business-logic agnostic" means operationally.
  { from: { type: "shared" }, allow: [{ to: { type: "shared" } }] },

  // `src/app` holds providers, fonts, global styles and the composition root.
  //
  // FSD would let it reach every layer below, being the outermost. It may not:
  // route files compose the layers; the provider tree does not.
  {
    from: { type: "app" },
    allow: [{ to: { type: "app" } }, { to: { type: "shared" } }]
  },

  // The Next.js route tree. Route files are one-line compositions — they name a
  // page and re-export it. They may reach `pages` and `widgets` (a layout frame
  // is a widget) but never `features` or `entities` directly: a route that
  // renders a feature has become a page without being one.
  {
    from: { type: "next-app" },
    allow: [
      { to: { type: "next-app" } },
      { to: { type: "app" } },
      { to: { type: "pages" } },
      { to: { type: "widgets" } },
      { to: { type: "shared" } }
    ]
  }
];
