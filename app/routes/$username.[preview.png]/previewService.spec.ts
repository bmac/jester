import { describe, expect, it } from "vitest";
import { createPreviewImage } from "./previewService";

describe("previewService", () => {
  it("should generate an image from a gist", () => {
    const image = createPreviewImage("bmac", {
      files: [],
      description: "",
      stargazerCount: 3,
      id: "id",
      url: "url",
    });

    expect(image).toBeInstanceOf(Buffer);
    // ensure image isn't empty
    expect(image.byteLength).toBeGreaterThan(2000);
  });
});
