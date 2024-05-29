import { getGistsForUser } from "~/clients/githubClient";

const truncateLines = (text: string, lines = 10) => {
  return text.split("\n").slice(0, lines).join("\n");
};

export const topGistForUser = async (username: string) => {
  const gists = await getGistsForUser(username);
  return gists
    .sort((a, b) => {
      return b.stargazerCount - a.stargazerCount;
    })
    .map((gist) => {
      if (gist.files.length) {
        gist.files = [gist.files[0]];
      }
      return gist;
    })
    .map((gist) => {
      if (gist.files[0]) {
        gist.files[0].text = truncateLines(gist.files[0].text);
      }
      return gist;
    });
};
