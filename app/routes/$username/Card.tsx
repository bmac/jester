import styles from "./Card.module.css";

type CardProps = {
  filename: string;
  url: string;
  stars: number;
  description: string;
  code: string;
  card: string;
  index: number;
};

export const CARDS = [
  "JOKER",
  "A♦",
  "K♣",
  "Q♥",
  "J♠",
  // '10♦',
  "十♦",
  "9♣",
  "8♥",
  "7♠",
  "6♦",
  "5♣",
  "4♥",
  "3♠",
  "2♦",
];

export const Card = ({
  filename,
  url,
  stars,
  description,
  code,
  card,
  index,
}: CardProps) => {
  const isDiamonds = card.includes("♦");
  const isHearts = card.includes("♥");
  const isTen = card.includes("十");
  const isJoker = card.includes("JOKER");
  return (
    <div
      className={`${styles.card} ${isHearts ? styles.hearts : ""} ${isDiamonds ? styles.diamonds : ""} ${isTen ? styles.ten : ""} ${isJoker ? styles.joker : ""}`}
    >
      <div className={`${styles.corner} ${styles.cornerTopLeft}`}>{card}</div>
      <article className={styles.content}>
        <section className={styles.header}>
          <a
            href={url}
            className={styles.filename}
            data-testid={`card-filename-${index}`}
          >
            {filename}
          </a>
          <span className={styles.stars}>★ {stars} stars</span>
        </section>
        <p className={styles.description}>{description}</p>
        <pre className={styles.code}>{code}</pre>
      </article>
      <div className={`${styles.corner} ${styles.cornerBottomRight}`}>
        {card}
      </div>
    </div>
  );
};
