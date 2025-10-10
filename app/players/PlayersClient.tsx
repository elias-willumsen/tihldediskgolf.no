"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Player = {
  id: string;
  uuid: string;
  name: string;
  age: number;
  study: string;
};

export default function PlayersClient() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    (async () => {
      const { data } = await supabase.from("players").select("*").order("name");
      if (isActive) {
        setPlayers(data ?? []);
        setLoading(false);
      }
    })();
    return () => {
      isActive = false;
    };
  }, []);

  if (loading) return <div>Loading…</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Players</h1>
      <div className="grid gap-2">
        {players.map((p) => (
          <div key={p.id} className="rounded border p-3 dark:border-gray-800">
            <div className="font-medium">{p.name}</div>
            <div className="text-sm">UUID: {p.uuid}</div>
            <div className="text-sm">Age: {p.age}</div>
            <div className="text-sm">Study: {p.study}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
