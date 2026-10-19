/**
 * `"use server"` and `"use client"` are ring decisions, and boundaries cannot see
 * them.
 *
 * A directive is a string expression statement, not an import, so every
 * path-based rule in this repository is blind to it. That matters because both
 * directives change what a file *is*:
 *
 *  - `"use server"` turns a module into a network endpoint. In `model/` that
 *    makes the domain remotely callable, which is not a layering opinion — it is
 *    an attack surface the architecture never declared.
 *  - `"use client"` in `model/` or `api/` pins the domain or the data ring to the
 *    browser bundle. The symptom shows up much later, as an opaque bundler error
 *    in whichever server component first imports it.
 *
 * The rule is deliberately narrow: it checks where a directive may appear, not
 * whether it should be there at all. Whether a component genuinely needs
 * interactivity is a review question.
 */

const SERVER_ALLOWED = [/(^|\/)api\//, /\/src\/shared\/api\//];

const CLIENT_FORBIDDEN = [/(^|\/)model\//, /(^|\/)api\//];

// `src/shared/api` is exempt from the client rule: it holds *both* transports —
// a browser client marked `"use client"` and a server client marked
// `"use server"` — and that pairing is the whole point of the segment. The rule
// still applies to a slice's own `api/` ring, where a `"use client"` directive
// would pin that slice's data layer to the browser bundle.
const CLIENT_EXEMPT = [/\/src\/shared\/api\//];

const toPosix = filename => filename.replace(/\\/g, "/");

/** The leading string-literal directives of a Program, in order. */
const directivesOf = program => {
  const directives = [];
  for (const statement of program.body) {
    if (
      statement.type !== "ExpressionStatement" ||
      statement.expression.type !== "Literal" ||
      typeof statement.expression.value !== "string"
    ) {
      break;
    }
    directives.push(statement);
  }
  return directives;
};

export const directivePlacement = {
  meta: {
    type: "problem",
    docs: {
      description:
        'restrict where "use server" and "use client" directives may appear'
    },
    schema: [],
    messages: {
      serverOutsideData:
        'A "use server" module is a network endpoint, so it belongs in the data ring (api/). Placing it here exposes {{ring}} directly.',
      clientInDomain:
        'A "use client" directive here pins {{ring}} to the browser bundle. Move the interactivity into ui/ and keep this ring isomorphic.'
    }
  },

  create(context) {
    const filename = toPosix(context.filename ?? context.getFilename());

    // Only files inside the application tree carry rings.
    if (!filename.includes("/src/")) {
      return {};
    }

    const ringOf = () => {
      const match = filename.match(/\/(model|api|ui|lib|config)\//);
      return match ? `${match[1]}/` : "this segment";
    };

    return {
      Program(node) {
        for (const statement of directivesOf(node)) {
          const value = statement.expression.value;

          if (
            value === "use server" &&
            !SERVER_ALLOWED.some(pattern => pattern.test(filename))
          ) {
            context.report({
              node: statement,
              messageId: "serverOutsideData",
              data: { ring: ringOf() }
            });
          }

          if (
            value === "use client" &&
            CLIENT_FORBIDDEN.some(pattern => pattern.test(filename)) &&
            !CLIENT_EXEMPT.some(pattern => pattern.test(filename))
          ) {
            context.report({
              node: statement,
              messageId: "clientInDomain",
              data: { ring: ringOf() }
            });
          }
        }
      }
    };
  }
};
