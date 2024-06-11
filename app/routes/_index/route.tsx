import type { ActionFunction, MetaFunction } from "@remix-run/node";
import styles from "./route.module.css";
import { Form, Link, json, redirect, useActionData } from "@remix-run/react";
import { parseUsername } from "./parseUsername";

export const meta: MetaFunction = () => {
  return [
    { title: "Jester" },
    {
      name: "description",
      content: `Top starred gists from github.`,
    },
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
          <Link to="/octocat" prefetch="intent">octocat</Link>
        </li>
        <li>
          <Link to="/garybernhardt" prefetch="intent">garybernhardt</Link>
        </li>
        <li>
          <Link to="/bmac" prefetch="intent">bmac</Link>
        </li>

        <li>
          <Link to="/paulirish" prefetch="intent">paulirish</Link>
        </li>

        <li>
          <Link to="/rwaldron" prefetch="intent">rwaldron</Link>
        </li>
      </ul>
    </div>
  );
}
