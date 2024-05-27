import assert from "assert";
import { When, Then } from "@cucumber/cucumber";
import { topGistForUser } from "../../app/services/gistService";

When("I visit octocat's page", async function () {
  this.topGists = await topGistForUser("octocat");
});

Then("I should see .gitignore listed first", function () {
  const topGist = this.topGists[0];
  assert.equal(topGist.description, "Some common .gitignore configurations");
});
