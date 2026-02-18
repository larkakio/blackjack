import { calculateHand } from "./hand";
import type { Card } from "@/types";

export function shouldDealerHit(hand: Card[]): boolean {
  const { score, isSoft } = calculateHand(hand);
  if (score < 17) return true;
  if (score === 17 && isSoft) return false; // stand on soft 17
  return false;
}
