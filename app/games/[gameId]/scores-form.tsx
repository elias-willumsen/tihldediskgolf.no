"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Player = { id: string; name: string };

export default function ScoresForm({
  gameId,
  players,
  onSaved,
}: {
  gameId: string;
  players: Player[];
  onSaved?: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);

    const upserts: Array<{
      player_id: string;
      game_id: string;
      strokes: number;
    }> = [];
    for (const player of players) {
      const value = formData.get(`score_${player.id}`);
      if (value) {
        const strokes = Number(value);
        if (Number.isInteger(strokes) && strokes > 0) {
          upserts.push({ player_id: player.id, game_id: gameId, strokes });
        }
      }
    }

    if (upserts.length > 0) {
      const { error } = await supabase
        .from("results")
        .upsert(upserts, { onConflict: "player_id,game_id" });
      if (error) alert(error.message);
    }

    setIsSubmitting(false);
    onSaved?.();
  }

  return (
    <form
      action={handleSubmit}
      className="rounded border p-4 space-y-3 dark:border-gray-800"
    >
      <div className="font-medium">Enter scores</div>
      <div className="grid gap-2">
        {players.map((player) => (
          <label key={player.id} className="flex items-center gap-3">
            <span className="min-w-40">{player.name}</span>
            <input
              name={`score_${player.id}`}
              type="number"
              min={1}
              placeholder="strokes"
              className="w-32 rounded border px-2 py-1 bg-transparent dark:border-gray-800"
            />
          </label>
        ))}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-gray-900 px-3 py-1 text-white dark:bg-gray-100 dark:text-gray-900"
      >
        {isSubmitting ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
