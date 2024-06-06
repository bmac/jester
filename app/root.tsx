import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useParams,
} from "@remix-run/react";
import styles from "./root.module.css";

export function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  // const params = {};

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <a href="/" className={styles.logoLink}>🎭 Jester </a>
          <span className={styles.subHeading}>
            {params.username
              ? `gist stars for ${params.username}`
              : `top gist starts`}
          </span>
        </header>
        <div className={styles.content}>{children}</div>
        <div className={styles.background} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
