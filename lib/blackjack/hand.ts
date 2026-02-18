import type { Card } from "@/types";

export interface HandResult {
  score: number;
  isSoft: boolean;
}

export function calculateHand(cards: Card[]): HandResult {
  let score = 0;
  let aces = 0;

  for (const card of cards) {
    if (card.isHidden) continue;
    if (card.rank === "A") {
      aces++;
      score += 11;
    } else {
      score += card.value;
    }
  }

  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }

  const isSoft = aces > 0 && score <= 21;
  return { score, isSoft };
}

export function isBlackjack(cards: Card[]): boolean {
  if (cards.length !== 2) return false;
  const visible = cards.filter((c) => !c.isHidden);
  if (visible.length !== 2) return false;
  return calculateHand(cards).score === 21;
}

export function canSplit(cards: Card[]): boolean {
  if (cards.length !== 2) return false;
  return cards[0].rank === cards[1].rank;
}
