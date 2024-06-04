import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import { chromium } from "playwright";
import { expect } from "@playwright/test";

const baseUrl = process.env.BASE_URL || "http://localhost:5173";

Before(async function () {
  this.browser = await chromium.launch();
  const context = await this.browser.newContext({
    baseUrl,
  });
  const page = await context.newPage();
  this.page = page;
});

After(async function () {
  return this.browser.close();
});

When("I visit octocat's page", async function () {
  await this.page.goto(`${baseUrl}/octocat`);
});

Then("I should see .gitignore listed first", async function () {
  const filename = await this.page.getByTestId("card-filename-0");
  expect(await filename.innerText()).toBe(".gitignore");
});

Given("I'm on the homepage", async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.page.goto(`${baseUrl}/`);
});

When("I search for octocat", async function () {
  await this.page.getByLabel("Username").fill("octocat");
  await this.page.getByLabel("Username").press("Enter");
});

Then("I should be redirected to the username page", async function () {
  await this.page.waitForNavigation();
  await expect(this.page).toHaveURL(`${baseUrl}/octocat`);
});
