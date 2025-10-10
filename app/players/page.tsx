import { prisma } from "@/lib/prisma";
import PlayerForm from "./players-form";

export default async function PlayersPage() {
  const players = await prisma.player.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Players</h1>
      <PlayerForm />
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
