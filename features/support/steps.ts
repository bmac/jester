import { When, Then, Before, After } from "@cucumber/cucumber";
import { chromium } from "playwright";
import { expect } from '@playwright/test';

Before(async function () {
  this.browser = await chromium.launch();
  const context = await this.browser.newContext();
  const page = await context.newPage();
  this.page = page;
});

After(async function () {
  return this.browser.close();
});

When("I visit octocat's page", async function () {
  await this.page.goto("http://localhost:5173/octocat");
});

Then("I should see .gitignore listed first", async function () {
  const filename = await this.page.getByTestId("card-filename-0");
  expect(await filename.innerText()).toBe(".gitignore");
});
