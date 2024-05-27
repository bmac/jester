import { describe, expect, it } from "vitest";
import { getGistsForUser } from "./githubClient";
import { vcr } from "test/vcr";

describe("githubClient", () => {
  it("it should fetch gits from the github api", async () => {
    await vcr.useCassette("fetch_gists", async () => {
      const gists = await getGistsForUser("octocat");
      expect(gists).toHaveLength(8);
      expect(gists[4].description).toBe(
        "Some common .gitignore configurations",
      );
    });
  });
});
