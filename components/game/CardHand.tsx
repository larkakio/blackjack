"use client";

import { motion } from "framer-motion";
import { Card } from "./Card";
import type { Card as CardType } from "@/types";

interface CardHandProps {
  cards: CardType[];
  score: number;
  label: string;
  isDealer?: boolean;
  isDealing?: boolean;
}

function scoreColor(score: number): string {
  if (score > 21) return "#ff073a";
  if (score === 21) return "#ffd700";
  if (score >= 17) return "#00f3ff";
  return "#e2e8f0";
}

export function CardHand({
  cards,
  score,
  label,
  isDealer,
  isDealing,
}: CardHandProps) {
  const displayScore =
    isDealer && cards.some((c) => c.isHidden)
      ? score > 0
        ? `${cards.find((c) => !c.isHidden)?.value ?? 0}+`
        : "?"
      : score;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-1 text-sm font-exo text-white/80 uppercase tracking-wider">
        {label}
      </div>
      <div className="flex items-center justify-center gap-[-8px] flex-wrap max-w-[90vw]">
        {cards.map((card, i) => (
          <Card
            key={`${card.rank}-${card.suit}-${i}`}
            card={card}
            index={i}
            isDealing={isDealing}
            isDealer={isDealer}
          />
        ))}
      </div>
      <motion.div
        className="px-4 py-2 rounded-lg font-rajdhani text-xl font-bold min-w-[64px] text-center"
        style={{
          color: scoreColor(score),
          background: "rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 0 12px rgba(0,243,255,0.2)",
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 0.2 }}
      >
        {displayScore}
      </motion.div>
    </div>
  );
}
