"use client";

import { useState } from "react";
import Explorer from "@/components/Explorer";
import Player from "@/components/Player";
import type { Station } from "@/lib/types";

export default function Home() {
  const [currentStation, setCurrentStation] = useState<Station | null>(null);

  return (
    <div className="flex h-screen overflow-hidden">
      <Explorer onSelectStation={setCurrentStation} />
      <Player station={currentStation} />
    </div>
  );
}
