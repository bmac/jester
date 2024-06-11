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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <a href="/" className={styles.logoLink}>
            <span className={styles.logo}>🎭</span> Jester{" "}
          </a>
          <span className={styles.subHeading}>
            {params.username ? `gist stars for ${params.username}` : ``}
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
