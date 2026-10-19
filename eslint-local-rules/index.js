module.exports = {
  "require-title": {
    meta: {
      docs: {
        description: "require link title and non-empty content",
        category: "Best Practices"
      },
      schema: []
    },
    create(context) {
      return {
        JSXElement(node) {
          const isAnchor = node.openingElement.name.name === "a";
          const isNextLink = node.openingElement.name.name === "Link";
          const hasChildren = node.children && node.children.length > 0;

          if ((isAnchor || isNextLink) && !hasChildren) {
            context.report({
              node,
              message: "Links must have non-empty content."
            });
          }
        },
        JSXOpeningElement(node) {
          const isAnchor = node.name.name === "a";
          const isNextLink = node.name.name === "Link";
          const isImage =
            node.name.name === "img" || node.name.name === "Image";

          const hasTitle = node.attributes.some(
            attr => attr.name && attr.name.name === "title"
          );

          if ((isAnchor || isNextLink) && !hasTitle) {
            context.report({
              node,
              message: "Links must have a title attribute."
            });
          }
          if (isImage && !hasTitle) {
            context.report({
              node,
              message: "Image must have a title attribute."
            });
          }
        }
      };
    }
  }
};
