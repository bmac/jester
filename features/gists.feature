Feature: Stared Gists
  List the most popular gists

  Scenario: User has popular gists
    When I visit octocat's page
    Then I should see .gitignore listed first