import assert from "assert";
import { When, Then } from "@cucumber/cucumber";
import { topGistForUser } from "../../app/services/gistService.ts";

When("I visit octocat's page", function () {
  this.topGists = topGistForUser("octocat");
});

Then("I should see .gitignore listed first", function () {
  const topGist = this.topGists[0];
  assert.equal(topGist.name, ".gitignore");
});
