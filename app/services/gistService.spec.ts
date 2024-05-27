import { describe, expect, it, vi } from "vitest";
import * as gistService from "./gistService";
import * as githubClient from "./githubClient";
import type { Gist } from "./githubClient";

describe("gistService", () => {
  it("should return sorted gists", async () => {
    const oneStarGist = { stargazerCount: 1 } as Gist;
    const threeStarGist = { stargazerCount: 3 } as Gist;
    const fiveStarGist = { stargazerCount: 5 } as Gist;
    vi.spyOn(githubClient, "getGistsForUser").mockResolvedValue([
      threeStarGist,
      fiveStarGist,
      oneStarGist,
    ]);

    const topGists = await gistService.topGistForUser("octocat");

    expect(topGists[0]).toBe(fiveStarGist);
    expect(topGists[1]).toBe(threeStarGist);
    expect(topGists[2]).toBe(oneStarGist);
  });
});
