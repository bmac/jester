import { describe, expect, it, vi } from "vitest";
import * as gistService from "./gistService";
import * as githubClient from "~/clients/githubClient";
import type { Gist } from "~/clients/githubClient";

describe("gistService", () => {
  it("should return sorted gists", async () => {
    const oneStarGist = { stargazerCount: 1, files: [{ text: "" }] } as Gist;
    const threeStarGist = { stargazerCount: 3, files: [{ text: "" }] } as Gist;
    const fiveStarGist = { stargazerCount: 5, files: [{ text: "" }] } as Gist;
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

  it("should only return the first file", async () => {
    const gist = {
      files: [
        {
          name: ".gitignore",
          text: "",
        },
        {
          name: ".gitconfig",
          text: "",
        },
      ],
    } as Gist;
    vi.spyOn(githubClient, "getGistsForUser").mockResolvedValue([gist]);

    const topGists = await gistService.topGistForUser("octocat");

    expect(topGists[0].files).toEqual([{ name: ".gitignore", text: "" }]);
  });

  it("should only return the first 10 lines of a file", async () => {
    const gist = {
      files: [
        {
          name: ".gitignore",
          text: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13",
        },
      ],
    } as Gist;
    vi.spyOn(githubClient, "getGistsForUser").mockResolvedValue([gist]);

    const topGists = await gistService.topGistForUser("octocat");

    expect(topGists[0].files[0].text).toBe("1\n2\n3\n4\n5\n6\n7\n8\n9\n10");
  });
});
