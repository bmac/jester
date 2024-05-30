import TsFlow from "cucumber-tsflow";
import assert from "assert";
import { Gist } from "~/clients/githubClient";
import { topGistForUser } from "~/services/gistService";

const { binding, then, when } = TsFlow;

@binding()
class ArithmeticSteps {
  private topGists: Gist[] = [];

  @when(/I visit octocat's page/)
  public async visitPage() {
    this.topGists = await topGistForUser("octocat");
  }

  @then(/I should see .gitignore listed first/)
  public assertListedFirst() {
    const topGist = this.topGists[0];
    assert.equal(topGist.description, "Some common .gitignore configurations");
  }
}

export default ArithmeticSteps;
