"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { BET_OPTIONS } from "@/lib/constants";

export function ChipSelector() {
  const { balance, currentBet, placeBet } = useGameStore();

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <p className="text-sm font-exo text-white/70">
        Balance: <span className="text-neon-cyan font-rajdhani">{balance.toFixed(3)} Ξ</span>
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {BET_OPTIONS.map((amount) => {
          const isActive = currentBet === amount;
          const disabled = amount > balance;
          return (
            <motion.button
              key={amount}
              type="button"
              disabled={disabled}
              onClick={() => placeBet(amount)}
              className="min-w-[44px] min-h-[44px] rounded-full px-4 py-2 font-rajdhani font-bold text-sm border-2 transition-all touch-manipulation"
              style={{
                background: isActive
                  ? "rgba(0, 243, 255, 0.2)"
                  : "rgba(255, 255, 255, 0.06)",
                borderColor: isActive ? "#00f3ff" : "rgba(255,255,255,0.2)",
                color: disabled ? "#666" : isActive ? "#00f3ff" : "#fff",
                boxShadow: isActive ? "0 0 20px rgba(0,243,255,0.4)" : "none",
              }}
              whileTap={{ scale: 0.95 }}
              whileHover={!disabled ? { scale: 1.05 } : {}}
            >
              {amount}Ξ
            </motion.button>
          );
        })}
        <motion.button
          type="button"
          disabled={balance <= 0}
          onClick={() => placeBet(balance)}
          className="min-w-[44px] min-h-[44px] rounded-full px-4 py-2 font-rajdhani font-bold text-sm border-2 border-neon-purple/50 bg-neon-purple/10 text-white touch-manipulation"
          whileTap={{ scale: 0.95 }}
        >
          MAX
        </motion.button>
      </div>
      <p className="text-xs text-white/50 font-exo">
        Swipe ↑ Hit · ↓ Stand · → Double · ← Split
      </p>
    </div>
  );
}
