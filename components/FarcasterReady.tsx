"use client";

import { useEffect } from "react";

export function FarcasterReady() {
  useEffect(() => {
    import("@farcaster/miniapp-sdk")
      .then((mod) => {
        const sdk = mod.default ?? (mod as { sdk?: unknown }).sdk;
        if (sdk && typeof sdk === "object" && "actions" in sdk) {
          const actions = (sdk as { actions?: { ready?: () => Promise<void> } }).actions;
          actions?.ready?.();
        }
      })
      .catch(() => {});
  }, []);
  return null;
}
