"use client";

import { useCallback, useRef, useState } from "react";

const SWIPE_THRESHOLD = 50;
const SWIPE_VELOCITY_THRESHOLD = 0.2;

export type SwipeDirection = "up" | "down" | "left" | "right";

interface SwipeHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: (e: React.MouseEvent) => void;
  onMouseLeave: (e: React.MouseEvent) => void;
}

interface UseSwipeGestureOptions {
  onSwipe: (direction: SwipeDirection) => void;
  onMove?: (x: number, y: number) => void;
  threshold?: number;
}

function getPointerCoords(
  e: React.TouchEvent | React.MouseEvent
): { x: number; y: number } {
  if ("touches" in e) {
    return { x: e.touches[0]?.clientX ?? 0, y: e.touches[0]?.clientY ?? 0 };
  }
  return { x: e.clientX, y: e.clientY };
}

function getPointerCoordsEnd(
  e: React.TouchEvent | React.MouseEvent
): { x: number; y: number } {
  if ("changedTouches" in e) {
    return {
      x: e.changedTouches[0]?.clientX ?? 0,
      y: e.changedTouches[0]?.clientY ?? 0,
    };
  }
  return { x: e.clientX, y: e.clientY };
}

export function useSwipeGesture({
  onSwipe,
  onMove,
  threshold = SWIPE_THRESHOLD,
}: UseSwipeGestureOptions): {
  handlers: SwipeHandlers;
  trail: { x: number; y: number }[];
} {
  const startRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const isMouseRef = useRef(false);

  const detectDirection = useCallback(
    (
      startX: number,
      startY: number,
      endX: number,
      endY: number,
      duration: number
    ): SwipeDirection | null => {
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const velocity = duration > 0 ? distance / duration : 0;
      if (distance < threshold || velocity < SWIPE_VELOCITY_THRESHOLD)
        return null;
      const angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
      if (angle >= -45 && angle < 45) return "right";
      if (angle >= 45 && angle < 135) return "down";
      if (angle >= 135 || angle < -135) return "left";
      if (angle >= -135 && angle < -45) return "up";
      return null;
    },
    [threshold]
  );

  const handleStart = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      const { x, y } = getPointerCoords(e);
      startRef.current = { x, y, time: Date.now() };
      setTrail([{ x, y }]);
      if ("button" in e) isMouseRef.current = true;
    },
    []
  );

  const handleMove = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      const coords = getPointerCoords(e);
      onMove?.(coords.x, coords.y);
      setTrail((prev) => [...prev.slice(-15), { x: coords.x, y: coords.y }]);
    },
    [onMove]
  );

  const handleEnd = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      const coords = getPointerCoordsEnd(e);
      const start = startRef.current;
      startRef.current = null;
      setTrail([]);
      if (!start) return;
      const duration = Date.now() - start.time;
      const direction = detectDirection(
        start.x,
        start.y,
        coords.x,
        coords.y,
        duration
      );
      if (direction) onSwipe(direction);
    },
    [onSwipe, detectDirection]
  );

  const handlers: SwipeHandlers = {
    onTouchStart: handleStart,
    onTouchMove: handleMove,
    onTouchEnd: handleEnd,
    onMouseDown: handleStart,
    onMouseMove: handleMove,
    onMouseUp: handleEnd,
    onMouseLeave: handleEnd,
  };

  return { handlers, trail };
}
