import { getGistsForUser } from "~/clients/githubClient";

export const topGistForUser = async (username: string) => {
  const gists = await getGistsForUser(username);
  return gists.sort((a, b) => {
    return b.stargazerCount - a.stargazerCount;
  });
};
