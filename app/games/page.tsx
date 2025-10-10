"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type ResultRow = {
  id: string;
  strokes: number;
  player_id: string;
  player: { id: string; name: string } | null;
};

type GameRow = {
  id: string;
  date: string; // ISO date
  course: string;
  results: ResultRow[];
};

export default function GamesPage() {
  const [games, setGames] = useState<GameRow[]>([]);

  useEffect(() => {
    async function loadGames() {
      const { data, error } = await supabase
        .from("games")
        .select(
          "id,date,course,results(id,strokes,player_id,player:players(id,name))"
        )
        .order("date", { ascending: false });
      if (!error) setGames((data || []) as GameRow[]);
    }
    loadGames();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Games</h1>
      <Link
        href="/games/new"
        className="inline-block rounded border px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-900"
      >
        New game
      </Link>

      <div className="grid gap-3">
        {games.map((game) => (
          <div
            key={game.id}
            className="rounded border p-3 dark:border-gray-800"
          >
            <div className="flex justify-between">
              <div>
                <div className="font-medium">{game.course}</div>
                <div className="text-sm">
                  {new Date(game.date).toLocaleDateString()}
                </div>
              </div>
              <Link className="underline" href={`/games/${game.id}`}>
                Enter scores
              </Link>
            </div>

            {game.results?.length > 0 && (
              <div className="mt-2 text-sm">
                {game.results
                  .slice()
                  .sort((a, b) => a.strokes - b.strokes)
                  .map((r) => `${r.player?.name ?? "Unknown"}: ${r.strokes}`)
                  .join("  •  ")}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
