"use client";

import { FarcasterReady } from "@/components/FarcasterReady";
import { GameTable } from "@/components/game/GameTable";

export default function Home() {
  return (
    <>
      <FarcasterReady />
      <main className="min-h-screen">
        <GameTable />
      </main>
    </>
  );
}
