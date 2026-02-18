"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import type { GameResult } from "@/types";

const RESULT_CONFIG: Record<
  NonNullable<GameResult>,
  { title: string; emoji: string; color: string; bg: string }
> = {
  win: { title: "YOU WIN!", emoji: "🎉", color: "#39ff14", bg: "rgba(57,255,20,0.15)" },
  blackjack: {
    title: "BLACKJACK!",
    emoji: "⭐",
    color: "#ffd700",
    bg: "rgba(255,215,0,0.15)",
  },
  lose: { title: "Dealer wins", emoji: "😔", color: "#ff073a", bg: "rgba(255,7,58,0.1)" },
  bust: { title: "BUST!", emoji: "💥", color: "#ff073a", bg: "rgba(255,7,58,0.15)" },
  push: { title: "PUSH", emoji: "🤝", color: "#00f3ff", bg: "rgba(0,243,255,0.1)" },
};

export function ResultBanner() {
  const { result, lastWin, currentBet, payout, resetGame } = useGameStore();

  if (!result) return null;

  const config = RESULT_CONFIG[result];
  const showWin = result === "win" || result === "blackjack";
  const winAmount = showWin ? payout - currentBet : 0;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={resetGame}
      >
        <motion.div
          className="rounded-2xl border-2 p-6 max-w-sm w-full text-center shadow-2xl"
          style={{
            background: config.bg,
            borderColor: config.color,
            boxShadow: `0 0 40px ${config.color}40`,
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-4xl mb-2">{config.emoji}</div>
          <h2
            className="text-2xl font-orbitron font-bold mb-2"
            style={{ color: config.color }}
          >
            {config.title}
          </h2>
          {showWin && winAmount > 0 && (
            <p className="text-neon-green font-rajdhani text-xl mb-4">
              +{winAmount.toFixed(3)} Ξ
            </p>
          )}
          <motion.button
            type="button"
            onClick={resetGame}
            className="min-h-[44px] px-6 py-3 rounded-xl font-exo font-bold bg-white/10 border-2 border-white/30 text-white touch-manipulation"
            whileTap={{ scale: 0.96 }}
          >
            Play again
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
