import type { FC } from "react";

import type { IJsonLdProps } from "./json-ld.types";

// Inline data block, never executed (CSP `script-src` does not apply to it); "<" is escaped so no value can close the tag.
const JsonLd: FC<IJsonLdProps> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, "\\u003c")
    }}
  />
);

export default JsonLd;
