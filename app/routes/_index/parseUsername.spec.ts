import { describe, expect, it } from "vitest";
import { parseUsername } from "./parseUsername";

describe("parseUsername", () => {
  it("should parse the username from formData", async () => {
    const formData = new FormData();
    formData.append("username", "octocat");
    const result = await parseUsername(formData);
    expect(result.success).toBeTruthy();
    expect(result.data).toEqual({
      username: "octocat",
    });
  });

  it("should trim the username", async () => {
    const formData = new FormData();
    formData.append("username", " octocat ");
    const result = await parseUsername(formData);
    expect(result.data).toEqual({
      username: "octocat",
    });
  });

  it("should lowercase the username", async () => {
    const formData = new FormData();
    formData.append("username", "OCTOCAT");
    const result = await parseUsername(formData);
    expect(result.data).toEqual({
      username: "octocat",
    });
  });

  it("should allow dash in the username", async () => {
    const formData = new FormData();
    formData.append("username", "octo-cat");
    const result = await parseUsername(formData);
    expect(result.data).toEqual({
      username: "octo-cat",
    });
  });

  it("should error if the username is empty", async () => {
    const formData = new FormData();
    expect(await parseUsername(formData)).toMatchObject({
      success: false,
    });
  });

  it("should include a user friendly error message", async () => {
    const formData = new FormData();
    formData.append("username", "");
    const error = await parseUsername(formData);
    expect(error.error?.issues[0].message).toBe(
      "username must contain a least 1 character",
    );
  });

  it("should error if the username contains is the empty string", async () => {
    const formData = new FormData();
    formData.append("username", "");
    expect(await parseUsername(formData)).toMatchObject({
      success: false,
    });
  });

  it("should error if the username contains a slash", async () => {
    const formData = new FormData();
    formData.append("username", "octo/cat");
    expect(await parseUsername(formData)).toMatchObject({
      success: false,
    });
  });

  it("should error if the username contains an underscore", async () => {
    const formData = new FormData();
    formData.append("username", "octo_cat");
    expect(await parseUsername(formData)).toMatchObject({
      success: false,
    });
  });
});
