import { describe, expect, it, vi } from "vitest";
import z from "zod";
import { action } from "./route";
import * as parseUsernameModule from "./parseUsername";
import { ActionFunctionArgs } from "@remix-run/node";

describe("index action", () => {
  const request = () =>
    new Request("http://example.com", {
      method: "POST",
      body: new FormData(),
    });

  it("should return a redirect when username is valid", async () => {
    vi.spyOn(parseUsernameModule, "parseUsername").mockResolvedValue({
      success: true,
      data: { username: "" },
    });
    const response = await action({
      request: request(),
    } as ActionFunctionArgs);

    expect(response).toMatchObject({
      status: 302,
    });
  });

  it("should return an error message when username is invalid", async () => {
    vi.spyOn(parseUsernameModule, "parseUsername").mockResolvedValue({
      success: false,
      error: new z.ZodError([]),
    });
    const response = await action({
      request: request(),
    } as ActionFunctionArgs);

    expect(response).toMatchObject({
      status: 400,
    });
  });
});
