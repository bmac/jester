import styles from "./Card.module.css";

type CardProps = {
  card: string;
  dealIndex?: number;
  children: React.ReactNode;
};

export const JOKER = "JOKER";
export const CARDS = [
  "A♦",
  "K♣",
  "Q♥",
  "J♠",
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

function suitOf(card: string): string {
  if (card.includes("♦")) return "♦";
  if (card.includes("♥")) return "♥";
  if (card.includes("♣")) return "♣";
  if (card.includes("♠")) return "♠";
  return "";
}

function rankOf(card: string): string {
  const suit = suitOf(card);
  const rank = card.replace(suit, "");
  return rank === "十" ? "10" : rank;
}

export const Card = ({ card, children, dealIndex }: CardProps) => {
  const isDiamonds = card.includes("♦");
  const isHearts = card.includes("♥");
  const isTen = card.includes("十");
  const isJoker = card.includes("JOKER");
  const isRed = isDiamonds || isHearts;

  if (isJoker) {
    return (
      <div
        data-testid="card"
        className={`${styles.card} ${styles.joker}`}
      >
        <div className={`${styles.corner} ${styles.cornerTopLeft}`}>
          <span className={styles.jokerLabel}>JOKER</span>
        </div>
        <div className={styles.jokerHat} aria-hidden>
          J
        </div>
        <article className={styles.content}>{children}</article>
        <div className={`${styles.corner} ${styles.cornerBottomRight}`}>
          <span className={styles.jokerLabel}>JOKER</span>
        </div>
      </div>
    );
  }

  const rank = rankOf(card);
  const suit = suitOf(card);

  const animationDelay =
    typeof dealIndex === "number" ? `${dealIndex * 0.09}s` : undefined;

  return (
    <div
      data-testid="card"
      className={`${styles.card} ${isRed ? styles.red : styles.black} ${
        isHearts ? styles.hearts : ""
      } ${isDiamonds ? styles.diamonds : ""} ${isTen ? styles.ten : ""} ${
        styles.dealing
      }`}
      style={animationDelay ? { animationDelay } : undefined}
    >
      <div className={`${styles.corner} ${styles.cornerTopLeft}`}>
        <span className={styles.rank}>{rank}</span>
        <span className={styles.suitGlyph}>{suit}</span>
      </div>
      <div className={styles.watermark} aria-hidden>
        {suit}
      </div>
      <article className={styles.content}>{children}</article>
      <div className={`${styles.corner} ${styles.cornerBottomRight}`}>
        <span className={styles.rank}>{rank}</span>
        <span className={styles.suitGlyph}>{suit}</span>
      </div>
    </div>
  );
};
