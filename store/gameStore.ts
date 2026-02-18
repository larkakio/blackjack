import { create } from "zustand";
import type { Card } from "@/types";
import type { GamePhase, GameResult, Action } from "@/types";
import {
  createDeck,
  shuffle,
  draw,
} from "@/lib/blackjack/deck";
import { calculateHand, isBlackjack, canSplit } from "@/lib/blackjack/hand";
import { shouldDealerHit } from "@/lib/blackjack/dealer";
import { BET_OPTIONS, STARTING_BALANCE } from "@/lib/constants";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

interface GameState {
  phase: GamePhase;
  deck: Card[];
  playerHand: Card[];
  dealerHand: Card[];
  splitHand: Card[] | null;
  playerScore: number;
  dealerScore: number;
  playerSoft: boolean;
  dealerSoft: boolean;
  currentBet: number;
  balance: number;
  lastWin: number;
  availableActions: Action[];
  canDouble: boolean;
  canSplit: boolean;
  hasSplit: boolean;
  result: GameResult;
  payout: number;
  isAnimating: boolean;
  showHints: boolean;
  isDealing: boolean;
  gamesPlayed: number;
  gamesWon: number;
  totalWagered: number;
  totalWon: number;
  placeBet: (amount: number) => void;
  dealCards: () => Promise<void>;
  hit: () => Promise<void>;
  stand: () => Promise<void>;
  double: () => Promise<void>;
  splitHandAction: () => Promise<void>;
  dealerPlay: () => Promise<void>;
  evaluateResult: () => void;
  resetGame: () => void;
  updateBalance: (amount: number) => void;
  toggleHints: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  phase: "betting",
  deck: [],
  playerHand: [],
  dealerHand: [],
  splitHand: null,
  playerScore: 0,
  dealerScore: 0,
  playerSoft: false,
  dealerSoft: false,
  currentBet: 0,
  balance: STARTING_BALANCE,
  lastWin: 0,
  availableActions: [],
  canDouble: false,
  canSplit: false,
  hasSplit: false,
  result: null,
  payout: 0,
  isAnimating: false,
  showHints: true,
  isDealing: false,
  gamesPlayed: 0,
  gamesWon: 0,
  totalWagered: 0,
  totalWon: 0,

  placeBet: (amount) => {
    const { balance } = get();
    if (amount > balance || amount <= 0) return;
    set({
      currentBet: amount,
      phase: "dealing",
    });
    setTimeout(() => get().dealCards(), 300);
  },

  dealCards: async () => {
    set({ isDealing: true, isAnimating: true });
    let deck = shuffle(createDeck());

    const c1 = draw(deck);
    deck = c1.newDeck;
    await delay(250);
    const c2 = draw(deck);
    deck = c2.newDeck;
    await delay(250);
    const c3 = draw(deck);
    deck = c3.newDeck;
    const dealerCard1 = { ...c3.card, isHidden: true };
    await delay(250);
    const c4 = draw(deck);
    deck = c4.newDeck;
    await delay(250);

    const playerHand = [c1.card, c2.card];
    const dealerHand = [dealerCard1, c4.card];
    const playerCalc = calculateHand(playerHand);
    const dealerVisible = [c4.card];
    const dealerCalc = calculateHand(dealerVisible);
    const playerBJ = isBlackjack(playerHand);
    const dealerBJ = isBlackjack([dealerCard1, c4.card]);

    if (playerBJ || dealerBJ) {
      dealerHand[0].isHidden = false;
      await delay(400);
      const fullDealerScore = calculateHand(dealerHand).score;
      set({
        deck,
        playerHand,
        dealerHand,
        playerScore: playerCalc.score,
        dealerScore: fullDealerScore,
        phase: "result",
        isDealing: false,
        isAnimating: false,
      });
      get().evaluateResult();
      return;
    }

    const state = get();
    const canDouble =
      playerHand.length === 2 && state.balance >= state.currentBet * 2;
    const canSplitVal =
      playerHand.length === 2 &&
      canSplit(playerHand) &&
      state.balance >= state.currentBet * 2;

    set({
      deck,
      playerHand,
      dealerHand,
      playerScore: playerCalc.score,
      playerSoft: playerCalc.isSoft,
      dealerScore: dealerCalc.score,
      phase: "player",
      canDouble: canDouble,
      canSplit: canSplitVal,
      availableActions: [
        "hit",
        "stand",
        ...(canDouble ? (["double"] as const) : []),
        ...(canSplitVal ? (["split"] as const) : []),
      ],
      isDealing: false,
      isAnimating: false,
    });
  },

  hit: async () => {
    set({ isAnimating: true });
    const state = get();
    const { card, newDeck } = draw(state.deck);
    await delay(280);
    const newHand = [...state.playerHand, card];
    const calc = calculateHand(newHand);

    if (calc.score > 21) {
      set({
        deck: newDeck,
        playerHand: newHand,
        playerScore: calc.score,
        phase: "result",
        result: "bust",
        payout: 0,
        isAnimating: false,
      });
      get().evaluateResult();
      return;
    }

    set({
      deck: newDeck,
      playerHand: newHand,
      playerScore: calc.score,
      playerSoft: calc.isSoft,
      canDouble: false,
      availableActions: ["hit", "stand"],
      isAnimating: false,
    });
  },

  stand: async () => {
    set({
      phase: "dealer",
      availableActions: [],
      isAnimating: true,
    });
    await delay(400);
    await get().dealerPlay();
  },

  double: async () => {
    const state = get();
    const newBet = state.currentBet * 2;
    if (newBet > state.balance || state.playerHand.length !== 2) return;
    set({
      currentBet: newBet,
      balance: state.balance - state.currentBet,
      isAnimating: true,
    });
    await get().hit();
    if (get().phase !== "result") {
      await get().stand();
    }
  },

  splitHandAction: async () => {
    // Simplified: for MVP we don't implement full split; just no-op or could reset
    const state = get();
    if (!state.canSplit || state.playerHand.length !== 2) return;
    // Placeholder: in full implementation would create two hands
    set({ canSplit: false, availableActions: ["hit", "stand"] });
  },

  dealerPlay: async () => {
    const state = get();
    let deck = state.deck;
    let hand = [...state.dealerHand];
    hand[0].isHidden = false;
    set({ dealerHand: hand });
    await delay(500);
    let calc = calculateHand(hand);
    set({ dealerScore: calc.score });

    while (shouldDealerHit(hand)) {
      await delay(600);
      const { card, newDeck: d } = draw(deck);
      deck = d;
      hand = [...hand, card];
      calc = calculateHand(hand);
      set({
        deck,
        dealerHand: hand,
        dealerScore: calc.score,
        dealerSoft: calc.isSoft,
      });
    }

    set({ phase: "result", isAnimating: false });
    get().evaluateResult();
  },

  evaluateResult: () => {
    const state = get();
    const { playerScore, dealerScore, currentBet, balance } = state;
    let result: GameResult;
    let payout = 0;
    const playerBJ =
      state.playerHand.length === 2 && playerScore === 21;
    const dealerBJ =
      state.dealerHand.length === 2 && dealerScore === 21;

    if (playerScore > 21) {
      result = "bust";
      payout = 0;
    } else if (playerBJ && !dealerBJ) {
      result = "blackjack";
      payout = currentBet * 2.5;
    } else if (dealerScore > 21) {
      result = "win";
      payout = currentBet * 2;
    } else if (playerScore > dealerScore) {
      result = "win";
      payout = currentBet * 2;
    } else if (playerScore === dealerScore) {
      result = "push";
      payout = currentBet;
    } else {
      result = "lose";
      payout = 0;
    }

    const won = result === "win" || result === "blackjack";
    set({
      result,
      payout,
      balance: balance + payout,
      lastWin: payout - currentBet,
      gamesPlayed: state.gamesPlayed + 1,
      gamesWon: won ? state.gamesWon + 1 : state.gamesWon,
      totalWagered: state.totalWagered + currentBet,
      totalWon: state.totalWon + (payout - currentBet),
    });
  },

  resetGame: () => {
    set({
      phase: "betting",
      deck: [],
      playerHand: [],
      dealerHand: [],
      splitHand: null,
      playerScore: 0,
      dealerScore: 0,
      playerSoft: false,
      dealerSoft: false,
      currentBet: 0,
      lastWin: 0,
      availableActions: [],
      canDouble: false,
      canSplit: false,
      hasSplit: false,
      result: null,
      payout: 0,
      isAnimating: false,
      isDealing: false,
    });
  },

  updateBalance: (amount) => {
    set({ balance: get().balance + amount });
  },

  toggleHints: () => {
    set({ showHints: !get().showHints });
  },
}));
