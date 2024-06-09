import { describe, expect, it, vi } from "vitest";
import type { Gist } from "~/clients/githubClient";
import * as gistService from "~/services/gistService";
import { loader } from "./route";

describe("loader", () => {
  it("should return the top gists for the username", async () => {
    const gists = [] as Gist[];
    vi.spyOn(gistService, "topGistForUser").mockResolvedValue(gists);

    const response = await loader({
      params: { username: "octocat" },
      request: new Request("https://www.example.com"),
      context: {},
    });

    expect(response.topGists).toBe(gists);
  });

  it("should reject with a 404 if the user name is invalid", async () => {
    vi.spyOn(gistService, "topGistForUser").mockRejectedValue(
      new Error("no such user"),
    );

    const response = loader({
      params: { username: "hello" },
      request: new Request("https://www.example.com"),
      context: {},
    });

    expect(response).rejects.toMatchObject({
      status: 404,
    });
  });
});
