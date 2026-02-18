"use client";

const PATTERNS: Record<string, number | number[]> = {
  hit: 10,
  stand: [10, 50, 10],
  double: [15, 30, 15],
  split: [20, 50, 20],
  win: [30, 100, 30, 100, 30],
  bust: 100,
  error: [10, 30, 10],
  tap: 5,
};

export type HapticPattern = keyof typeof PATTERNS;

export function useHaptics() {
  const vibrate = (pattern: HapticPattern | "up" | "down" | "left" | "right") => {
    if (typeof navigator === "undefined" || !("vibrate" in navigator)) return;
    const key =
      pattern === "up"
        ? "hit"
        : pattern === "down"
          ? "stand"
          : pattern === "right"
            ? "double"
            : pattern === "left"
              ? "split"
              : pattern;
    const val = PATTERNS[key as HapticPattern];
    if (val !== undefined) {
      navigator.vibrate(val);
    }
  };
  return { vibrate };
}
