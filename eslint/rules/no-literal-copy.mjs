/**
 * No user-visible copy as a literal in a JSX attribute.
 *
 * `react/jsx-no-literals` covers element *children*, and that is where most copy
 * lives. It cannot help with attributes: its `noAttributeStrings` option flags
 * every string-valued attribute, `className="flex gap-2"` included, so switching
 * it on means switching it off again within a day.
 *
 * The attributes that carry copy are a short, closed list — the accessible name,
 * the alternative text, the tooltip, the placeholder. This rule watches exactly
 * those, which is why it can stay at `error` without a single justified
 * exception.
 *
 * Why it matters more than it looks: an `aria-label` is the *only* text a screen
 * reader user gets for an icon button. A hard-coded one is a control that is
 * unlabelled in every language but the developer's, and no visual review catches
 * it because nothing on screen changed.
 */

const DEFAULT_ATTRIBUTES = [
  "title",
  "alt",
  "placeholder",
  "label",
  "aria-label",
  "aria-placeholder",
  "aria-valuetext",
  "aria-roledescription",
  "aria-description"
];

const attributeName = attribute => {
  if (attribute.type !== "JSXAttribute") {
    return null;
  }
  if (attribute.name.type === "JSXNamespacedName") {
    return `${attribute.name.namespace.name}:${attribute.name.name.name}`;
  }
  return attribute.name.name;
};

/** The literal string this attribute value resolves to, if it is one. */
const literalValueOf = attribute => {
  const value = attribute.value;
  if (!value) {
    return null;
  }
  if (value.type === "Literal" && typeof value.value === "string") {
    return value.value;
  }
  // `title={"Close"}` — the same defect wearing braces.
  if (
    value.type === "JSXExpressionContainer" &&
    value.expression.type === "Literal" &&
    typeof value.expression.value === "string"
  ) {
    return value.expression.value;
  }
  // A template literal with no interpolation is a literal too.
  if (
    value.type === "JSXExpressionContainer" &&
    value.expression.type === "TemplateLiteral" &&
    value.expression.expressions.length === 0
  ) {
    return value.expression.quasis[0].value.cooked;
  }
  return null;
};

export const noLiteralCopy = {
  meta: {
    type: "problem",
    docs: {
      description:
        "require user-visible attribute copy to come from a message key"
    },
    schema: [
      {
        type: "object",
        properties: {
          attributes: { type: "array", items: { type: "string" } },
          allowedStrings: { type: "array", items: { type: "string" } }
        },
        additionalProperties: false
      }
    ],
    messages: {
      literalCopy:
        'The "{{attribute}}" attribute is user-visible copy. Resolve it from a message key (useTranslations), not a literal.'
    }
  },

  create(context) {
    const options = context.options[0] ?? {};
    const attributes = new Set(options.attributes ?? DEFAULT_ATTRIBUTES);
    const allowed = new Set(options.allowedStrings ?? [""]);

    return {
      JSXAttribute(node) {
        const name = attributeName(node);
        if (name === null || !attributes.has(name)) {
          return;
        }

        const value = literalValueOf(node);
        if (value === null || allowed.has(value.trim())) {
          return;
        }

        context.report({
          node,
          messageId: "literalCopy",
          data: { attribute: name }
        });
      }
    };
  }
};
