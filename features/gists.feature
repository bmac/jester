Feature: Gists
  Jester shows popular gists for a user sorted by stars

  Scenario: Visiting a user's page displays sorted gists
    When I visit octocat's page
    Then I should see .gitignore listed first