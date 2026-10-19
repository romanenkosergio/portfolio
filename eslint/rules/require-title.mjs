/**
 * Links carry visible content; links and images carry a `title`.
 *
 * The repository rule (AGENTS.md) is stricter than the kit's: every link has a
 * `title`, visible text or not, so the kit's exemption for links with text is
 * not taken. Element names resolve through member expressions (`<Foo.Bar>`),
 * which the original silently skipped.
 */

const DEFAULT_LINKS = ["a", "Link", "NavLink"];
const DEFAULT_IMAGES = ["img", "Image"];

/** `<a>` → "a", `<Foo.Bar>` → "Foo.Bar", `<Foo>` → "Foo". */
const elementName = node => {
  if (node.type === "JSXIdentifier") {
    return node.name;
  }
  if (node.type === "JSXMemberExpression") {
    return `${elementName(node.object)}.${elementName(node.property)}`;
  }
  if (node.type === "JSXNamespacedName") {
    return `${node.namespace.name}:${node.name.name}`;
  }
  return null;
};

const hasNonEmptyChildren = node =>
  (node.children ?? []).some(child => {
    if (child.type === "JSXText") {
      return child.value.trim().length > 0;
    }
    // An expression container holding only a comment renders nothing.
    return child.type !== "JSXEmptyExpression";
  });

const hasAttribute = (openingElement, name) =>
  openingElement.attributes.some(attribute => {
    if (attribute.type === "JSXSpreadAttribute") {
      // Props may arrive through a spread; the rule cannot see inside one and
      // reporting anyway would train people to add `title` twice.
      return true;
    }
    return attribute.name?.name === name;
  });

export const requireTitle = {
  meta: {
    type: "problem",
    docs: {
      description:
        "require a title attribute on links and images, and content in links"
    },
    schema: [
      {
        type: "object",
        properties: {
          links: { type: "array", items: { type: "string" } },
          images: { type: "array", items: { type: "string" } }
        },
        additionalProperties: false
      }
    ],
    messages: {
      emptyLink: "A link must have visible content.",
      linkTitle: "A link must have a title attribute.",
      imageTitle: "An image must have a title attribute."
    }
  },

  create(context) {
    const options = context.options[0] ?? {};
    const links = new Set(options.links ?? DEFAULT_LINKS);
    const images = new Set(options.images ?? DEFAULT_IMAGES);

    return {
      JSXElement(node) {
        const name = elementName(node.openingElement.name);
        if (name !== null && links.has(name) && !hasNonEmptyChildren(node)) {
          context.report({ node, messageId: "emptyLink" });
        }
      },

      JSXOpeningElement(node) {
        const name = elementName(node.name);
        if (name === null || hasAttribute(node, "title")) {
          return;
        }
        if (links.has(name)) {
          context.report({ node, messageId: "linkTitle" });
        } else if (images.has(name)) {
          context.report({ node, messageId: "imageTitle" });
        }
      }
    };
  }
};
