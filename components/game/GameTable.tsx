"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { CardHand } from "./CardHand";
import { ChipSelector } from "./ChipSelector";
import { ActionHints } from "./ActionHints";
import { ResultBanner } from "./ResultBanner";
import { SwipeDetector } from "./SwipeDetector";

export function GameTable() {
  const {
    phase,
    playerHand,
    dealerHand,
    playerScore,
    dealerScore,
    result,
    availableActions,
    showHints,
    isDealing,
  } = useGameStore();

  return (
    <SwipeDetector>
      <div className="relative min-h-screen w-full bg-gradient-to-b from-space-dark to-space-darker overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,243,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0,243,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-space-darker/80 pointer-events-none" />

        {/* Header */}
        <header className="relative z-10 pt-safe pt-6 pb-2 px-4 text-center">
          <motion.h1
            className="text-xl sm:text-2xl font-orbitron font-bold text-white drop-shadow-[0_0_20px_rgba(0,243,255,0.5)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            BLACKJACK NEO
          </motion.h1>
        </header>

        {/* Dealer section */}
        <motion.section
          className="relative z-10 pt-4 pb-2 px-4 min-h-[140px] flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CardHand
            cards={dealerHand}
            score={dealerScore}
            label="DEALER"
            isDealer
            isDealing={phase === "dealing"}
          />
        </motion.section>

        {/* Middle: hints or empty */}
        <section className="relative flex-1 min-h-[120px] flex items-center justify-center">
          {phase === "player" && showHints && (
            <ActionHints availableActions={availableActions} />
          )}
          {phase === "betting" && (
            <p className="text-white/50 font-exo text-sm text-center px-4">
              Choose your bet below
            </p>
          )}
          {phase === "dealing" && isDealing && (
            <motion.p
              className="text-neon-cyan font-exo animate-pulse"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Dealing...
            </motion.p>
          )}
        </section>

        {/* Player section */}
        <motion.section
          className="relative z-10 pb-32 pt-4 px-4 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <CardHand
            cards={playerHand}
            score={playerScore}
            label="YOU"
            isDealing={phase === "dealing"}
          />
        </motion.section>

        {/* Bottom: Chip selector when betting */}
        <div className="fixed bottom-0 left-0 right-0 z-20 p-4 pb-safe bg-gradient-to-t from-space-darker to-transparent">
          {phase === "betting" && <ChipSelector />}
        </div>

        {/* Result overlay */}
        {result && <ResultBanner />}
      </div>
    </SwipeDetector>
  );
}
