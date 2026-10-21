import { sendMessage } from "./send-message";

const values = { name: " Ann ", email: " a@b.co ", message: " Hello there " };

const respond = (init: { ok: boolean; body: () => Promise<unknown> }) =>
  jest.fn().mockResolvedValue({ ok: init.ok, json: init.body });

describe("sendMessage", () => {
  afterEach(() => jest.restoreAllMocks());

  it("posts the trimmed values and resolves true on success", async () => {
    const fetchMock = respond({
      ok: true,
      body: async () => ({ success: true })
    });
    global.fetch = fetchMock;
    await expect(sendMessage(values)).resolves.toBe(true);

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.web3forms.com/submit");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body)).toMatchObject({
      name: "Ann",
      email: "a@b.co",
      message: "Hello there",
      botcheck: ""
    });
  });

  it("resolves false when the service refuses", async () => {
    global.fetch = respond({
      ok: true,
      body: async () => ({ success: false })
    });
    await expect(sendMessage(values)).resolves.toBe(false);
  });

  it("resolves false on a 500, even with success in the body", async () => {
    global.fetch = respond({
      ok: false,
      body: async () => ({ success: true })
    });
    await expect(sendMessage(values)).resolves.toBe(false);
  });

  it("resolves false on a network error", async () => {
    global.fetch = jest.fn().mockRejectedValue(new TypeError("offline"));
    await expect(sendMessage(values)).resolves.toBe(false);
  });

  it("resolves false when the body is not JSON", async () => {
    global.fetch = respond({
      ok: true,
      body: async () => {
        throw new SyntaxError("Unexpected token <");
      }
    });
    await expect(sendMessage(values)).resolves.toBe(false);
  });
});
