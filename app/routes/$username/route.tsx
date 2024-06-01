import { type LoaderFunctionArgs, json } from "@remix-run/node";
import styles from "./route.module.css";
import { topGistForUser } from "~/services/gistService";
import { useLoaderData } from "@remix-run/react";
import { Card, CARDS } from "./Card";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.username) {
    throw json({}, 404);
  }
  const topGists = topGistForUser(params.username);
  return {
    topGists: await topGists,
  };
}

export default function UserName() {
  const { topGists } = useLoaderData<typeof loader>();
  return (
    <div className={styles.cards}>
      {topGists.map((gist, index) => (
        <Card
          key={gist.id}
          filename={gist.files[0]?.name || ""}
          url={gist.url}
          stars={gist.stargazerCount}
          description={gist.description}
          code={gist.files[0]?.text || ""}
          card={CARDS[index % CARDS.length]}
          index={index}
        />
      ))}
    </div>
  );
}
