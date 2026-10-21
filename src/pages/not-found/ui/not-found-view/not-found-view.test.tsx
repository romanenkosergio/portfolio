import { screen, waitFor } from "@testing-library/react";
import { axe } from "jest-axe";

import { renderWithIntl } from "@/shared/lib/test";

import en from "@/messages/en.json";
import ru from "@/messages/ru.json";
import uk from "@/messages/uk.json";

import NotFoundView from "./not-found-view";

const messages = { en: en.notFound, uk: uk.notFound, ru: ru.notFound };

const visit = (pathname: string) => window.history.pushState({}, "", pathname);

afterEach(() => {
  visit("/");
  document.documentElement.lang = "";
});

describe("NotFoundView", () => {
  it("speaks the language of the address, not the server's", async () => {
    visit("/uk/nope");
    renderWithIntl(<NotFoundView locale="en" messages={messages} />);

    expect(
      await screen.findByRole("heading", { name: uk.notFound.pageTitle })
    ).toBeInTheDocument();
    await waitFor(() => expect(document.documentElement.lang).toBe("uk"));
  });

  it("falls back to the default language and shows the requested path", async () => {
    visit("/nope/deeper");
    renderWithIntl(<NotFoundView locale="en" messages={messages} />);

    expect(
      await screen.findByRole("heading", { name: en.notFound.pageTitle })
    ).toBeInTheDocument();
    await waitFor(() => expect(document.documentElement.lang).toBe("en"));
    expect(document.body).toHaveTextContent("/nope/deeper");
  });

  it("has no accessibility violations", async () => {
    visit("/ru/x");
    const { container } = renderWithIntl(
      <NotFoundView locale="en" messages={messages} />
    );
    await screen.findByRole("heading", { name: ru.notFound.pageTitle });
    expect(await axe(container)).toHaveNoViolations();
  });
});
