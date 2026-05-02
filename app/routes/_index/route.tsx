import styles from "./route.module.css";
import {
  Form,
  Link,
  redirect,
  useActionData,
  data,
  type ActionFunctionArgs,
  type MetaFunction,
} from "react-router";
import { parseUsername } from "./parseUsername";

export const meta: MetaFunction = () => {
  const title = "Jester — Top starred gists from github";
  const description = `Jester shows you the most popular gists for a github user. Search your favorite developer or checkout out selection of top gisters.`;
  const image = "https://jester.codes/og-screenshot.png";
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
      property: "og:description",
      content: description,
    },
    { property: "og:image", content: image },
    { property: "twitter:url", content: url },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: description },
    { property: "twitter:image", content: image },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const result = await parseUsername(await request.formData());
  if (result.success) {
    return redirect(`/${result.data.username}`);
  }
  const fieldErrors: { username?: string[] } = result.error.flatten()
    .fieldErrors as { username?: string[] };
  return data(fieldErrors, { status: 400 });
};

const POPULAR: { name: string; suit: "♠" | "♥" | "♦" | "♣" }[] = [
  { name: "octocat", suit: "♦" },
  { name: "pamelafox", suit: "♣" },
  { name: "garybernhardt", suit: "♥" },
  { name: "LeaVerou", suit: "♠" },
  { name: "bmac", suit: "♦" },
  { name: "paulirish", suit: "♣" },
  { name: "rwaldron", suit: "♥" },
];

export default function Index() {
  const errors = useActionData<typeof action>();
  return (
    <div className={styles.home}>
      <h1 className={styles.h1}>
        Gists <em>with</em>
        <br />
        Stars.
      </h1>
      <p className={styles.lede}>
        Enter a GitHub username to draw the house&apos;s best hand — their top
        ten starred gists, dealt one card at a time.
      </p>

      <Form method="POST">
        <div className={styles.searchLabel}>
          <label htmlFor="username">GitHub Username</label>
          <span className={styles.req}>Required</span>
        </div>
        <div className={styles.searchField}>
          <span className={styles.at} aria-hidden>
            @
          </span>
          <input
            id="username"
            name="username"
            type="search"
            placeholder="rwaldron"
            // The landing page is a single-purpose search form; focusing the
            // input on load matches the user's intent and avoids an extra tab.
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
        </div>
        {errors?.username?.[0] ? (
          <p className={styles.error}>{errors.username[0]}</p>
        ) : null}
        <button className={styles.searchButton} type="submit">
          <span className={styles.suit} aria-hidden>
            ♠
          </span>
          <span>Deal the hand</span>
          <span
            className={styles.suit}
            aria-hidden
            style={{ transform: "rotate(180deg)" }}
          >
            ♠
          </span>
        </button>
      </Form>

      <div className={styles.popular}>
        <h3 className={styles.popularTitle}>Popular gist players</h3>
        <ul className={styles.popularGrid}>
          {POPULAR.map(({ name, suit }) => {
            const isRed = suit === "♥" || suit === "♦";
            return (
              <li key={name}>
                <Link to={`/${name}`} prefetch="intent">
                  <span
                    className={`${styles.pip} ${isRed ? styles.pipRed : ""}`}
                    aria-hidden
                  >
                    {suit}
                  </span>
                  <span>{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
