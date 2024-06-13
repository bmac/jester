import type { ActionFunction, MetaFunction } from "@remix-run/node";
import styles from "./route.module.css";
import { Form, Link, json, redirect, useActionData } from "@remix-run/react";
import { parseUsername } from "./parseUsername";

// <!-- Primary Meta Tags -->
// <title>Jester — Top starred gists from github</title>
// <meta name="title" content="Jester — Top starred gists from github" />
// <meta name="description" content="Jester shows you the most popular gists for a github user. Search your favorite developer or checkout out selection of top gisters." />

// <!-- Open Graph / Facebook -->
// <meta property="og:type" content="website" />
// <meta property="og:url" content="https://metatags.io/" />
// <meta property="og:title" content="Jester — Top starred gists from github" />
// <meta property="og:description" content="Jester shows you the most popular gists for a github user. Search your favorite developer or checkout out selection of top gisters." />
// <meta property="og:image" content="https://metatags.io/images/meta-tags.png" />

// <!-- Twitter -->
// <meta property="twitter:card" content="summary_large_image" />
// <meta property="twitter:url" content="https://metatags.io/" />
// <meta property="twitter:title" content="Jester — Top starred gists from github" />
// <meta property="twitter:description" content="Jester shows you the most popular gists for a github user. Search your favorite developer or checkout out selection of top gisters." />
// <meta property="twitter:image" content="https://metatags.io/images/meta-tags.png" />

// <!-- Meta Tags Generated with https://metatags.io -->

export const meta: MetaFunction = () => {
  const title = "Jester — Top starred gists from github";
  const description = `Jester shows you the most popular gists for a github user. Search your favorite developer or checkout out selection of top gisters.`;
  const image = "/og-screenshot.png";
  const url = "https://jester.codes";
  return [
    { title },
    { name: "title", content: title },
    {
      name: "description",
      content: description,
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    {
      name: "og:description",
      content: description,
    },
    { property: "og:image", content: image },
    // { property: 'twitter:card', content: image },
    { property: "twitter:url", content: url },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: description },
    { property: "twitter:image", content: image },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const result = await parseUsername(await request.formData());
  if (result.success) {
    return redirect(`/${result.data.username}`);
  }
  return json(result.error.flatten().fieldErrors, 400);
};

export default function Index() {
  const errors = useActionData<typeof action>();
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.h1}>Gists with Stars</h1>
      <p className={styles.instructions}>
        Enter a github username to find the user&apos;s most starred gists.
      </p>
      <p>{errors?.username[0]}</p>
      <Form method="POST" target="/">
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <input
          id="username"
          name="username"
          type="search"
          className={styles.username}
        />
        <button className={styles.searchButton}>
          <span>♠</span>
          <span>Search</span>
          <span className={styles.flip}>♠</span>
        </button>
      </Form>

      <h3 className={styles.popularGists}>Popular Gist Users</h3>
      <ul className={styles.userList}>
        <li>
          <Link to="/octocat" prefetch="intent">
            octocat
          </Link>
        </li>
        <li>
          <Link to="/garybernhardt" prefetch="intent">
            garybernhardt
          </Link>
        </li>
        <li>
          <Link to="/bmac" prefetch="intent">
            bmac
          </Link>
        </li>

        <li>
          <Link to="/paulirish" prefetch="intent">
            paulirish
          </Link>
        </li>

        <li>
          <Link to="/rwaldron" prefetch="intent">
            rwaldron
          </Link>
        </li>
      </ul>
    </div>
  );
}
