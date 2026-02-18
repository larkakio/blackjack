export type GamePhase =
  | "betting"
  | "dealing"
  | "player"
  | "dealer"
  | "result";

export type GameResult =
  | "win"
  | "lose"
  | "push"
  | "blackjack"
  | "bust"
  | null;

export type Action = "hit" | "stand" | "double" | "split";
