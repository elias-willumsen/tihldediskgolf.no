"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import ScoresForm from "./scores-form";

type Player = { id: string; name: string };
type Result = { id: string; strokes: number; player: Player | null };

export default function GameDetailPage() {
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setGame] = useState<{
    id: string;
    date: string;
    course: string;
  } | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    async function loadAll() {
      const [{ data: gameRows }, { data: playerRows }, { data: resultRows }] =
        await Promise.all([
          supabase
            .from("games")
            .select("id,date,course")
            .eq("id", gameId)
            .single(),
          supabase.from("players").select("id,name").order("name"),
          supabase
            .from("results")
            .select("id,strokes,player:players(id,name)")
            .eq("game_id", gameId),
        ]);
      if (gameRows) setGame(gameRows);
      if (playerRows) setPlayers(playerRows as Player[]);
      if (resultRows) setResults(resultRows as Result[]);
    }
    loadAll();
  }, [gameId]);

  const sortedResults = useMemo(
    () => results.slice().sort((a, b) => a.strokes - b.strokes),
    [results]
  );

  if (!game) return <div>Not found</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{game.course}</h1>
        <div className="text-sm">
          {new Date(game.date).toLocaleDateString()}
        </div>
      </div>

      <ScoresForm
        gameId={game.id}
        players={players}
        onSaved={async () => {
          const { data } = await supabase
            .from("results")
            .select("id,strokes,player:players(id,name)")
            .eq("game_id", game.id);
          setResults((data as Result[]) ?? []);
        }}
      />

      {sortedResults.length > 0 && (
        <div>
          <h2 className="font-medium mb-2">Results</h2>
          <div className="grid gap-2">
            {sortedResults.map((r) => (
              <div
                key={r.id}
                className="rounded border p-2 text-sm dark:border-gray-800"
              >
                {r.player?.name ?? "Unknown"}: {r.strokes}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
