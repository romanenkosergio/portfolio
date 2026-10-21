import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { renderWithIntl } from "@/shared/lib/test";

import { useContactStore } from "@/pages/contact/model";

import ContactForm from "./contact-form";

const VALID = {
  name: "Ann",
  email: "ann@example.com",
  message: "A message that is long enough."
};

const fetchMock = jest.fn();
const accepted = () =>
  fetchMock.mockResolvedValue({
    ok: true,
    json: async () => ({ success: true })
  });

const field = (label: RegExp) => screen.getByRole("textbox", { name: label });

const fill = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(field(/_name/), VALID.name);
  await user.type(field(/_email/), VALID.email);
  await user.type(field(/_message/), VALID.message);
};

beforeEach(() => {
  fetchMock.mockReset();
  global.fetch = fetchMock;
  act(() => useContactStore.getState().reset());
});

describe("ContactForm", () => {
  it("has no accessibility violations", async () => {
    const { container } = renderWithIntl(<ContactForm />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("shows errors on an empty submit and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    renderWithIntl(<ContactForm />);
    await user.click(screen.getByRole("button", { name: /submit-message/ }));

    const name = field(/_name/);
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(field(/_email/)).toHaveAttribute("aria-invalid", "true");
    expect(field(/_message/)).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAccessibleDescription(/\S/);
    await waitFor(() => expect(name).toHaveFocus());
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("has no violations while errors show", async () => {
    const user = userEvent.setup();
    const { container } = renderWithIntl(<ContactForm />);
    await user.click(screen.getByRole("button", { name: /submit-message/ }));
    expect(await axe(container)).toHaveNoViolations();
  });

  it("sends a valid form and moves focus to the success heading", async () => {
    accepted();
    const user = userEvent.setup();
    const { container } = renderWithIntl(<ContactForm />);
    await fill(user);
    await user.click(screen.getByRole("button", { name: /submit-message/ }));

    const heading = await screen.findByRole("heading", { level: 2 });
    await waitFor(() => expect(heading).toHaveFocus());
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("starts a new message: empty form, name focused", async () => {
    accepted();
    const user = userEvent.setup();
    renderWithIntl(<ContactForm />);
    await fill(user);
    await user.click(screen.getByRole("button", { name: /submit-message/ }));
    await screen.findByRole("heading", { level: 2 });

    await user.click(screen.getByRole("button"));

    const name = await screen.findByRole("textbox", { name: /_name/ });
    expect(name).toHaveValue("");
    expect(field(/_email/)).toHaveValue("");
    expect(field(/_message/)).toHaveValue("");
    await waitFor(() => expect(name).toHaveFocus());
  });

  it("sends once on a double submit", async () => {
    let finish: (value: unknown) => void = () => undefined;
    fetchMock.mockReturnValue(new Promise(resolve => (finish = resolve)));
    const user = userEvent.setup();
    renderWithIntl(<ContactForm />);
    await fill(user);

    const form = screen.getByRole<HTMLFormElement>("form");
    // A click and an Enter press while the first request is still in flight.
    await user.click(screen.getByRole("button", { name: /submit-message/ }));
    await act(async () => form.requestSubmit());
    await act(async () => form.requestSubmit());
    expect(fetchMock).toHaveBeenCalledTimes(1);

    await act(async () =>
      finish({ ok: true, json: async () => ({ success: true }) })
    );
  });

  it("offers the mail address when sending fails", async () => {
    fetchMock.mockRejectedValue(new TypeError("offline"));
    const user = userEvent.setup();
    renderWithIntl(<ContactForm />);
    await fill(user);
    await user.click(screen.getByRole("button", { name: /submit-message/ }));

    const mail = await screen.findByRole("link");
    expect(mail).toHaveAttribute("href", expect.stringMatching(/^mailto:/));
    expect(mail).toHaveAttribute("title");
  });

  it("counts a filled honeypot as sent without a request", async () => {
    const user = userEvent.setup();
    renderWithIntl(<ContactForm />);
    await fill(user);
    await user.click(screen.getByRole("checkbox", { hidden: true }));
    await user.click(screen.getByRole("button", { name: /submit-message/ }));

    await screen.findByRole("heading", { level: 2 });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
