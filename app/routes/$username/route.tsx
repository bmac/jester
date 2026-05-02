import {
  useLoaderData,
  useParams,
  type LoaderFunctionArgs,
  type MetaFunction,
  type HeadersFunction,
} from "react-router";
import styles from "./route.module.css";
import { topGistForUser } from "~/services/gistService";
import { Card, CARDS, JOKER } from "./Card";

export const meta: MetaFunction<typeof loader> = ({
  params,
  data,
  location,
}) => {
  const { username } = params;
  const first = data?.topGists[0];
  const filename = first?.files[0].name || "";
  const stars = first?.stargazerCount || 0;
  const firstLine = first?.files[0]?.text?.split("\n")[0].slice(0, 40) || "";
  const title = `Jester — Top gist stars for ${username}`;
  const description = `${username}'s most popular gists: ${filename} (${stars} starts) ${firstLine}`;
  const url = `https://jester.codes${location.pathname}`;
  const image = url + "/preview.png";
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

export const headers: HeadersFunction = () => ({
  "Cache-Control": "public, max-age=3600, s-maxage=3600",
});

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const topGists = topGistForUser(params.username || "");
    return {
      topGists: await topGists,
    };
  } catch {
    throw new Response(null, { status: 404 });
  }
}

const KW =
  /\b(function|const|let|var|if|else|for|while|return|class|new|this|import|export|from|default|async|await|try|catch|throw|of|in|typeof|instanceof)\b/g;

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlight(src: string): string[] {
  return src.split("\n").map((line) => {
    let s = escapeHtml(line);
    s = s.replace(
      /(\/\*[^*]*\*+(?:[^/*][^*]*\*+)*\/|\/\/.*$|^\s*\*.*$)/g,
      `<span class="${styles.tkCom}">$1</span>`,
    );
    s = s.replace(
      /(["'`])(?:\\.|(?!\1)[^\\])*\1/g,
      `<span class="${styles.tkStr}">$&</span>`,
    );
    s = s.replace(
      /\b(\d+(?:\.\d+)?)\b/g,
      `<span class="${styles.tkNum}">$1</span>`,
    );
    s = s.replace(KW, `<span class="${styles.tkKw}">$1</span>`);
    return s;
  });
}

export default function UserName() {
  const { topGists } = useLoaderData<typeof loader>();
  const { username } = useParams();

  if (topGists.length === 0) {
    return (
      <div className={styles.jokerStage}>
        <Card card={JOKER}>
          <h1>Empty Deck</h1>
          <p className={styles.p}>
            Seems <b>{username}</b> hasn&apos;t laid down any public gists yet.
          </p>
          <p className={styles.p}>
            Want to <a href="/">search the pile</a> and draw again?
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.resultsHeader}>
        <div>
          <h1 className={styles.resultsTitle}>
            <em>{username}</em>&apos;s hand
          </h1>
          <div className={styles.resultsMeta}>
            <span>
              The top <b>{topGists.length}</b> gists by star count
            </span>
          </div>
        </div>
      </div>
      <div className={styles.cardGrid}>
        {topGists.map((gist, index) => {
          const lines = highlight(gist.files[0]?.text || "");
          return (
            <Card
              key={gist.id}
              card={CARDS[index % CARDS.length]}
              dealIndex={index}
            >
              <section className={styles.header}>
                <a
                  href={gist.url}
                  className={styles.filename}
                  data-testid={`card-filename-${index}`}
                >
                  {gist.files[0]?.name}
                </a>
                <span className={styles.stars}>★ {gist.stargazerCount}</span>
              </section>
              {gist.description ? (
                <p className={styles.description}>{gist.description}</p>
              ) : null}
              <pre className={styles.code}>
                <span className={styles.lnCol} aria-hidden>
                  {lines.map((_, i) => (
                    <span key={i} className={styles.ln}>
                      {i + 1}
                    </span>
                  ))}
                </span>
                <span
                  className={styles.codeCol}
                  dangerouslySetInnerHTML={{ __html: lines.join("\n") }}
                />
              </pre>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const params = useParams();
  return (
    <div className={styles.jokerStage}>
      <Card card={JOKER}>
        <h1>Four Oh Four</h1>
        <p className={styles.p}>
          Oops — the card for &quot;<b>{params.username}</b>&quot; is missing
          from this deck.
        </p>
        <p className={styles.p}>
          Want to <a href="/">search the pile</a> and draw again?
        </p>
      </Card>
    </div>
  );
}
