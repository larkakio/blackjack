"use client";

import { motion } from "framer-motion";
import type { Action } from "@/types";

interface ActionHintsProps {
  availableActions: Action[];
}

const HINTS: { action: Action; dir: string; label: string; color: string }[] = [
  { action: "hit", dir: "↑", label: "HIT", color: "#39ff14" },
  { action: "stand", dir: "↓", label: "STAND", color: "#00f3ff" },
  { action: "double", dir: "→", label: "DOUBLE", color: "#ffd700" },
  { action: "split", dir: "←", label: "SPLIT", color: "#b537ff" },
];

export function ActionHints({ availableActions }: ActionHintsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      <div className="absolute top-[18%] left-1/2 -translate-x-1/2">
        <HintArrow
          dir="↑"
          label="HIT"
          active={availableActions.includes("hit")}
          color="#39ff14"
        />
      </div>
      <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2">
        <HintArrow
          dir="↓"
          label="STAND"
          active={availableActions.includes("stand")}
          color="#00f3ff"
        />
      </div>
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <HintArrow
          dir="←"
          label="SPLIT"
          active={availableActions.includes("split")}
          color="#b537ff"
        />
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <HintArrow
          dir="→"
          label="DOUBLE"
          active={availableActions.includes("double")}
          color="#ffd700"
        />
      </div>
    </div>
  );
}

function HintArrow({
  dir,
  label,
  active,
  color,
}: {
  dir: string;
  label: string;
  active: boolean;
  color: string;
}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-0.5 opacity-40"
      animate={{
        opacity: active ? 0.9 : 0.25,
        scale: active ? 1.1 : 1,
      }}
      transition={{ duration: 0.3 }}
      style={{ color }}
    >
      <span className="text-2xl font-bold drop-shadow-[0_0_8px_currentColor]">
        {dir}
      </span>
      <span className="text-[10px] font-exo uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  );
}
