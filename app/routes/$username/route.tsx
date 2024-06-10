import { type LoaderFunctionArgs, json } from "@remix-run/node";
import styles from "./route.module.css";
import { topGistForUser } from "~/services/gistService";
import { useLoaderData, useParams } from "@remix-run/react";
import { Card, CARDS, JOKER } from "./Card";

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const topGists = topGistForUser(params.username || "");
    return {
      topGists: await topGists,
    };
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
