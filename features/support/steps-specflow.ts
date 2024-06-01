import TsFlow from "cucumber-tsflow";
import assert from "assert";
import { Browser, Page, chromium } from "playwright";

const { binding, then, when, after, before } = TsFlow;

@binding()
class ArithmeticSteps {
  private browser: Browser = null as unknown as Browser;
  private page: Page = null as unknown as Page;

  @before()
  public async setup() {
    this.browser = await chromium.launch();
    const context = await this.browser.newContext();
    const page = await context.newPage();
    this.page = page;
  }

  @after()
  public async teardown() {
    this.browser.close();
  }

  @when(/I visit octocat's page/)
  public async visitPage() {
    await this.page.goto("http://localhost:5173/octocat");
  }

  @then(/I should see .gitignore listed first/)
  public async assertListedFirst() {
    const titleNode = await this.page.getByTestId("card-filename-0");
    assert.equal(await titleNode.innerText(), ".gitignore");
  }
}

export default ArithmeticSteps;
