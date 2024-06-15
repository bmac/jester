import { describe, expect, it, vi } from "vitest";
import { createRemixStub } from "@remix-run/testing";
import type { Gist } from "~/clients/githubClient";
import * as gistService from "~/services/gistService";
import UserName, { headers as routeHeaders, loader, meta } from "./route";
import { HeadersArgs, MetaArgs } from "@remix-run/node";
import { render, screen } from "@testing-library/react";
import { Location } from "@remix-run/react";

const loaderArgs = {
  params: { username: "octocat" },
  request: new Request("https://www.example.com"),
  context: {},
};

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
    const metaTags = meta({
        params: { username: 'bmac' },
        data: { topGists: [{
            description: 'a gitignore',
            stargazerCount: 3,
            id: '',
            url: 'https://example.com',
            files: [{
                name: '.gitignore',
                text: '.DS_Store',
            }]
        }] },
        location: { pathname: '/bmac'} as Location,
    } as MetaArgs);

    expect(metaTags).toMatchSnapshot();
  });



  it("should render social media meta tags when there are no gists", async () => {
    const metaTags = meta({
        params: { username: 'bmac' },
        data: { topGists: [] },
        location: { pathname: '/bmac'} as Location,
    } as MetaArgs);

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
