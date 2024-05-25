import { describe, expect, it, vi } from 'vitest';
import * as gistService from './gistService';
import * as githubClient from './githubClient';

// const githubClient = {
//     getGistsForUser: (user: string) => {

//     }
// };

describe('gistService', () => {
    it('should return sorted gists', async () => {
        const oneStarGist = { stargazerCount: 1, };
        const threeStarGist = { stargazerCount: 3, };
        const fiveStarGist = { stargazerCount: 5, };
        vi.spyOn(githubClient, 'getGistsForUser').mockResolvedValue([
            threeStarGist,
            fiveStarGist,
            oneStarGist,
        ]);

        const topGists = await gistService.topGistForUser('octocat');

        expect(topGists[0]).toBe(fiveStarGist);
        expect(topGists[1]).toBe(threeStarGist);
        expect(topGists[2]).toBe(oneStarGist);
    });
});
