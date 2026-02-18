"use client";

import { useSwipeGesture, type SwipeDirection } from "@/hooks/useSwipeGesture";
import { useHaptics } from "@/hooks/useHaptics";
import { useGameStore } from "@/store/gameStore";

interface SwipeDetectorProps {
  children: React.ReactNode;
}

export function SwipeDetector({ children }: SwipeDetectorProps) {
  const { vibrate } = useHaptics();
  const {
    phase,
    availableActions,
    canDouble,
    canSplit,
    isAnimating,
    hit,
    stand,
    double,
    splitHandAction,
  } = useGameStore();

  const handleSwipe = (direction: SwipeDirection) => {
    if (phase !== "player" || isAnimating) return;
    switch (direction) {
      case "up":
        if (availableActions.includes("hit")) {
          vibrate("hit");
          hit();
        }
        break;
      case "down":
        if (availableActions.includes("stand")) {
          vibrate("stand");
          stand();
        }
        break;
      case "right":
        if (canDouble && availableActions.includes("double")) {
          vibrate("double");
          double();
        }
        break;
      case "left":
        if (canSplit && availableActions.includes("split")) {
          vibrate("split");
          splitHandAction();
        }
        break;
    }
  };

  const { handlers } = useSwipeGesture({
    onSwipe: handleSwipe,
    threshold: 50,
  });

  return (
    <div
      {...handlers}
      className="touch-none select-none w-full h-full min-h-screen"
      style={{ touchAction: "none" }}
    >
      {children}
    </div>
  );
}
