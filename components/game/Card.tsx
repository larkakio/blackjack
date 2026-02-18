"use client";

import { motion } from "framer-motion";
import type { Card as CardType } from "@/types";

interface CardProps {
  card: CardType;
  index: number;
  isDealing?: boolean;
  isDealer?: boolean;
}

const suitColor = (suit: string) =>
  ["♥", "♦"].includes(suit) ? "#ff073a" : "#00f3ff";

export function Card({ card, index, isDealing, isDealer }: CardProps) {
  return (
    <motion.div
      className="relative flex-shrink-0 w-[72px] h-[100px] sm:w-[80px] sm:h-[120px] perspective-[1000px]"
      initial={
        isDealing
          ? { x: 120, y: isDealer ? -80 : 80, opacity: 0, rotateY: 180 }
          : false
      }
      animate={{
        x: 0,
        y: 0,
        opacity: 1,
        rotateY: card.isHidden ? 180 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 18,
        delay: index * 0.12,
      }}
      style={{ transformStyle: "preserve-3d", zIndex: index }}
    >
      {/* Front */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 backdrop-blur-xl flex flex-col items-center justify-center p-1 shadow-lg"
        style={{
          backfaceVisibility: "hidden",
          transform: card.isHidden ? "rotateY(180deg)" : "rotateY(0deg)",
          background: "rgba(20, 25, 40, 0.95)",
          borderColor: isDealer
            ? "rgba(181, 55, 255, 0.5)"
            : "rgba(0, 243, 255, 0.5)",
          boxShadow: isDealer
            ? "0 0 16px rgba(181, 55, 255, 0.3)"
            : "0 0 16px rgba(0, 243, 255, 0.3)",
        }}
      >
        {!card.isHidden && (
          <>
            <span
              className="text-2xl sm:text-3xl font-bold font-rajdhani drop-shadow-[0_0_8px_currentColor]"
              style={{ color: suitColor(card.suit) }}
            >
              {card.rank}
            </span>
            <span
              className="text-xl sm:text-2xl"
              style={{ color: suitColor(card.suit) }}
            >
              {card.suit}
            </span>
          </>
        )}
      </motion.div>
      {/* Back */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 overflow-hidden"
        style={{
          backfaceVisibility: "hidden",
          transform: card.isHidden ? "rotateY(0deg)" : "rotateY(180deg)",
          borderColor: "rgba(181, 55, 255, 0.5)",
          background:
            "linear-gradient(135deg, rgba(181,55,255,0.2), rgba(0,243,255,0.2))",
          boxShadow: "0 0 12px rgba(181, 55, 255, 0.4)",
        }}
      >
        <div
          className="w-full h-full opacity-80"
          style={{
            background:
              "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.03) 8px, rgba(255,255,255,0.03) 16px)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
