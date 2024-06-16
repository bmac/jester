import { describe, expect, it } from "vitest";
import { createPreviewImage } from "./previewService";
import { stub } from "test/stub";
import { Gist } from "~/clients/githubClient";

describe("previewService", () => {
  it("should generate an image from a gist", () => {
    const image = createPreviewImage(
      "bmac",
      stub<Gist>({
        files: [],
        description: "description",
        stargazerCount: 3,
      }),
    );

    expect(image).toBeInstanceOf(Buffer);
    // ensure image isn't empty
    expect(image.byteLength).toBeGreaterThan(2000);
  });
});
