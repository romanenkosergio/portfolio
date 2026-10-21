import type { ReactElement } from "react";

import { render } from "@testing-library/react";
import type { RenderOptions, RenderResult } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import messages from "@/messages/en.json";

/** Renders under the real English messages, as the layout does. */
export const renderWithIntl = (
  ui: ReactElement,
  options?: RenderOptions
): RenderResult =>
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>,
    options
  );
