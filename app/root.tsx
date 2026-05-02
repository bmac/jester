import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useParams,
} from "react-router";
import styles from "./root.module.css";

export function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();

  return (
    <html lang="en" data-theme="parlor">
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <div className={styles.stageBg} aria-hidden />
        <div className={styles.grain} aria-hidden />
        <header className={styles.topbar}>
          <a href="/" className={styles.wordmark}>
            <span className={styles.wordmarkMark} aria-hidden>
              <span>♠</span>
              <span>♥</span>
              <span>♦</span>
              <span>♣</span>
            </span>
            <span className={styles.wordmarkType}>Jester</span>
          </a>
          <div className={styles.topbarRight}>
            {params.username ? (
              <>
                <span>House of</span> <b>{params.username}</b>
              </>
            ) : (
              <span>Top Gists · Hand of ten</span>
            )}
          </div>
        </header>
        <main className={styles.stage}>{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
