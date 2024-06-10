import {
  type LoaderFunctionArgs,
  json,
  MetaFunction,
  HeadersFunction,
} from "@remix-run/node";
import styles from "./route.module.css";
import { topGistForUser } from "~/services/gistService";
import { useLoaderData, useParams } from "@remix-run/react";
import { Card, CARDS, JOKER } from "./Card";

export const meta: MetaFunction = ({ params }) => {
  return [
    { title: `Jester: Gist Stars for ${params.username}` },
    {
      name: "description",
      content: `Top starred gists from github for ${params.username}.`,
    },
  ];
};

export const headers: HeadersFunction = () => ({
  "Cache-Control": "public, max-age=3600, s-maxage=3600", // cache for 3 hours
});

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const topGists = topGistForUser(params.username || "");
    return json({
      topGists: await topGists,
    });
  } catch (error) {
    throw json({}, 404);
  }
}

export default function UserName() {
  const { topGists } = useLoaderData<typeof loader>();
  return (
    <div className={styles.cards}>
      {topGists.map((gist, index) => (
        <Card key={gist.id} card={CARDS[index % CARDS.length]}>
          <section className={styles.header}>
            <a
              href={gist.url}
              className={styles.filename}
              data-testid={`card-filename-${index}`}
            >
              {gist.files[0]?.name}
            </a>
            <span className={styles.stars}>★ {gist.stargazerCount} stars</span>
          </section>
          <p className={styles.description}>{gist.description}</p>
          <pre className={styles.code}>{gist.files[0]?.text}</pre>
        </Card>
      ))}
    </div>
  );
}

export function ErrorBoundary() {
  const params = useParams();
  return (
    <div className={styles.cards}>
      <Card card={JOKER}>
        <h1>Four Oh Four</h1>
        <p className={styles.p}>
          Oops the card for &quot;{params.username}&quot; is missing from this
          deck.
        </p>
        <p className={styles.p}>
          Want to <a href="/">search the pile</a> and draw again?
        </p>
      </Card>
    </div>
  );
}
