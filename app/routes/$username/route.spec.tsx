import { describe, expect, it, vi } from "vitest";
import { createRemixStub } from "@remix-run/testing";
import type { Gist, GistFile } from "~/clients/githubClient";
import * as gistService from "~/services/gistService";
import UserName, { headers as routeHeaders, loader, meta } from "./route";
import { HeadersArgs, LoaderFunctionArgs, MetaArgs } from "@remix-run/node";
import type { Location } from "@remix-run/router";
import { render, screen } from "@testing-library/react";
import { stub } from "test/stub";

const loaderArgs = stub<LoaderFunctionArgs>({
  params: { username: "octocat" },
  request: new Request("https://www.example.com"),
});

describe("loader", () => {
  it("should return the top gists for the username", async () => {
    const gists = [{ id: "gist" } as Gist];
    vi.spyOn(gistService, "topGistForUser").mockResolvedValue(gists);
    const response = await loader(loaderArgs);

    const data = await response.json();

    expect(data.topGists).toEqual(gists);
  });

  it("should reject with a 404 if the user name is invalid", async () => {
    vi.spyOn(gistService, "topGistForUser").mockRejectedValue(
      new Error("no such user"),
    );

    const response = loader({
      ...loaderArgs,
      params: { username: "no_such_user" },
    });

    expect(response).rejects.toMatchObject({
      status: 404,
    });
  });
});

describe("header", () => {
  it("should cache the response", async () => {
    const headers = new Headers(routeHeaders({} as HeadersArgs));

    expect(headers.get("cache-control")).toEqual(
      "public, max-age=3600, s-maxage=3600",
    );
  });
});

describe("meta", () => {
  it("should render social media meta tags", async () => {
    const metaTags = meta(
      stub<MetaArgs<typeof loader>>({
        params: { username: "bmac" },
        data: {
          topGists: [
            stub<Gist>({
              description: "a gitignore",
              stargazerCount: 3,
              url: "https://example.com",
              files: [
                stub<GistFile>({
                  name: ".gitignore",
                  text: ".DS_Store",
                }),
              ],
            }),
          ],
        },
        location: stub<Location>({ pathname: "/bmac" }),
      }),
    );

    expect(metaTags).toMatchSnapshot();
  });

  it("should render social media meta tags when there are no gists", async () => {
    const metaTags = meta(
      stub<MetaArgs<typeof loader>>({
        params: { username: "bmac" },
        data: { topGists: [] },
        location: stub<Location>({ pathname: "/bmac" }),
      }),
    );

    expect(metaTags).toMatchSnapshot();
  });
});

describe("UserName", () => {
  it("should render the cards from the loader", async () => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: UserName,
        loader() {
          return {
            topGists: [
              {
                id: 1,
                files: [],
                description: "my gist",
              },
            ],
          };
        },
      },
    ]);

    render(<RemixStub />);
    await screen.findByText("my gist");
  });

  it("should display a message when topGists is empty", async () => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: UserName,
        loader() {
          return { topGists: [] };
        },
      },
    ]);

    render(<RemixStub />);
    await screen.findByText("Empty Deck");
  });
});
