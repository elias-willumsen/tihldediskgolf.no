"use client";

import { useState } from "react";

type Player = { id: string; name: string };

export default function ScoresForm({
  gameId,
  players,
}: {
  gameId: string;
  players: Player[];
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    const response = await fetch("/api/results", {
      method: "POST",
      body: formData,
    });
    setIsSubmitting(false);
    if (response.ok) location.reload();
    else alert("Failed to save scores");
  }

  return (
    <form
      action={handleSubmit}
      className="rounded border p-4 space-y-3 dark:border-gray-800"
    >
      <input type="hidden" name="gameId" value={gameId} />
      <div className="font-medium">Enter scores</div>
      <div className="grid gap-2">
        {players.map((p) => (
          <label key={p.id} className="flex items-center gap-3">
            <span className="min-w-40">{p.name}</span>
            <input
              name={`score_${p.id}`}
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
