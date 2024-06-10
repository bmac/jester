import styles from "./Card.module.css";

type CardProps = {
  card: string;
  children: React.ReactNode;
};

export const JOKER = "JOKER";
export const CARDS = [
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

export const Card = ({ card, children }: CardProps) => {
  const isDiamonds = card.includes("♦");
  const isHearts = card.includes("♥");
  const isTen = card.includes("十");
  const isJoker = card.includes("JOKER");
  return (
    <div
      className={`${styles.card} ${isHearts ? styles.hearts : ""} ${isDiamonds ? styles.diamonds : ""} ${isTen ? styles.ten : ""} ${isJoker ? styles.joker : ""}`}
    >
      <div className={`${styles.corner} ${styles.cornerTopLeft}`}>{card}</div>
      <article className={styles.content}>{children}</article>
      <div className={`${styles.corner} ${styles.cornerBottomRight}`}>
        {card}
      </div>
    </div>
  );
};
