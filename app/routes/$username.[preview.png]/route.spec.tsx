import { describe, expect, it, vi } from "vitest";
import { LoaderFunctionArgs } from "@remix-run/node";
import { loader } from "./route";
import * as previewService from "./previewService";
import * as gistService from "~/services/gistService";
import { stub } from "test/stub";
import { Gist } from "~/clients/githubClient";

describe("loader", () => {
  it("should respond with a cached image", async () => {
    vi.spyOn(gistService, "topGistForUser").mockResolvedValue([
      stub<Gist>({
        description: "description",
        stargazerCount: 3,
        files: [
          {
            name: "filename",
            text: "content",
            language: { name: "language" },
          },
        ],
      }),
    ]);
    vi.spyOn(previewService, "createPreviewImage").mockReturnValue(
      new Buffer(""),
    );
    const response = await loader(
      stub<LoaderFunctionArgs>({
        params: { username: "bmac" },
      }),
    );

    expect(response.headers.get("cache-control")).toContain("max-age=3600");
    expect(response.headers.get("content-type")).toBe("image/png");
  });

  it("should 404 if the user is not found", async () => {
    vi.spyOn(gistService, "topGistForUser").mockRejectedValue(null);
    const response = await loader(
      stub<LoaderFunctionArgs>({
        params: { username: "bmac" },
      }),
    );

    expect(response.status).toBe(404);
  });

  it("should 404 if the user has no gists", async () => {
    vi.spyOn(gistService, "topGistForUser").mockResolvedValue([]);
    const response = await loader(
      stub<LoaderFunctionArgs>({
        params: { username: "bmac" },
      }),
    );

    expect(response.status).toBe(404);
  });
});
