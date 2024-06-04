import { test, expect } from "@playwright/test";

test("User's gist are sorted by stars", async ({ page }) => {
  await page.goto("http://localhost:5173/octocat");
  const titleNode = page.getByTestId("card-filename-0");
  expect(await titleNode.innerText()).toBe(".gitignore");
});
