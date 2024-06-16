import { graphql } from "@octokit/graphql";

export type GistFile = {
  name: string;
  text: string;
  language: {
    name: string;
  };
};

export type Gist = {
  description: string;
  stargazerCount: number;
  id: string;
  url: string;
  files: GistFile[];
};

export const getGistsForUser = async (username: string) => {
  const response = await graphql<{
    user: {
      gists: {
        nodes: Gist[];
      };
    };
  }>(
    `
{
  user(login: "${username}") {
    gists(first: 100) {
      nodes {
        id
        name
        description
        stargazerCount
        url
        createdAt
        updatedAt
        files {
          name
          text(truncate: 1000)
          language {
            name
          }
        }
      }
    }
  }
}
`,
    {
      headers: {
        authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    },
  );

  return response.user.gists.nodes;
};
