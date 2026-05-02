# Jester

Jester shows the top-starred [GitHub gists](https://gist.github.com/) for any user, dealt one card at a time. Enter a username and Jester fans out their most popular public gists with a quick preview of the first file.

Live site: [jester.codes](https://jester.codes)

## Stack

- [React Router v7](https://reactrouter.com/) (framework mode) on [Vite](https://vitejs.dev/)
- [Octokit GraphQL](https://github.com/octokit/graphql.js) for the GitHub API
- [Zod](https://zod.dev/) for input parsing
- [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/) + [Cucumber](https://github.com/cucumber/cucumber-js) for tests
- [vcr-test](https://www.npmjs.com/package/vcr-test) to record and replay GitHub API responses

## Getting started

Requires Node 24+ and [pnpm](https://pnpm.io/) (auto-installed via Corepack from the `packageManager` field in `package.json`).

```sh
pnpm install
pnpm dev
```

The dev server runs at `http://localhost:3000`.

Some features of the GitHub GraphQL API require authentication. Set a token before starting the server:

```sh
export GITHUB_TOKEN=ghp_...
```

## Scripts

| Command            | What it does                            |
| ------------------ | --------------------------------------- |
| `pnpm dev`         | Start the Vite dev server               |
| `pnpm build`       | Build for production                    |
| `pnpm start`       | Run the production server from `build/` |
| `pnpm test`        | Run Vitest unit tests                   |
| `pnpm e2e`         | Run the Cucumber end-to-end suite       |
| `pnpm playwright`  | Run Playwright browser tests            |
| `pnpm lint`        | Lint with ESLint                        |
| `pnpm typecheck`   | Type-check with `tsc`                   |
| `pnpm prettier`    | Format the repo with Prettier           |

## Testing

Unit tests live next to the code they cover (`*.spec.ts`/`*.spec.tsx`). HTTP calls to the GitHub API are intercepted with `vcr-test` and replayed from cassettes in `test/__cassettes__/`, so the test suite runs offline. Delete a cassette and re-run the test with a valid `GITHUB_TOKEN` to re-record it.

End-to-end scenarios live in `features/` (Cucumber) and `e2e/` (Playwright).

## Deployment

`pnpm build` emits `build/server` and `build/client`. Any Node host that can run `pnpm start` (`react-router-serve ./build/server/index.js`) will serve the app.
