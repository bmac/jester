import { describe, expect, it, vi } from "vitest";
import type { Gist } from "~/clients/githubClient";
import * as gistService from "~/services/gistService";
import { headers as routeHeaders, loader } from "./route";
import { HeadersArgs } from "@remix-run/node";

const loaderArgs = {
  params: { username: "octocat" },
  request: new Request("https://www.example.com"),
  context: {},
};

describe("loader", () => {
  it("should return the top gists for the username", async () => {
    const gists = [{ id: "gist" } as Gist];
    vi.spyOn(gistService, "topGistForUser").mockResolvedValue(gists);
    const response = await loader(loaderArgs);

    const data = await response.json();

    expect(data.topGists).toEqual(gists);
  });

  it("should reject with a 404 if the user name is invalid", async () => {
    vi.spyOn(gistService, "topGistForUser").mockRejectedValue(
      new Error("no such user"),
    );

    const response = loader({
      ...loaderArgs,
      params: { username: "no_such_user" },
    });

    expect(response).rejects.toMatchObject({
      status: 404,
    });
  });
});

describe("header", () => {
  it("should cache the response", async () => {
    const headers = new Headers(routeHeaders({} as HeadersArgs));

    expect(headers.get("cache-control")).toEqual(
      "public, max-age=3600, s-maxage=3600",
    );
  });
});
