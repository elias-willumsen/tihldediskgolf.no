import { prisma } from "@/lib/prisma";
import Link from "next/link";
import GameForm from "./games-form";

export default async function GamesPage() {
  const games = await prisma.game.findMany({
    orderBy: { date: "desc" },
    include: { results: { include: { player: true } } },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Games</h1>
      <GameForm />
      <div className="grid gap-3">
        {games.map((g) => (
          <div key={g.id} className="rounded border p-3 dark:border-gray-800">
            <div className="flex justify-between">
              <div>
                <div className="font-medium">{g.course}</div>
                <div className="text-sm">
                  {new Date(g.date).toLocaleDateString()}
                </div>
              </div>
              <Link className="underline" href={`/games/${g.id}`}>
                Enter scores
              </Link>
            </div>
            {g.results.length > 0 && (
              <div className="mt-2 text-sm">
                {g.results
                  .sort((a, b) => a.strokes - b.strokes)
                  .map((r) => `${r.player.name}: ${r.strokes}`)
                  .join("  •  ")}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
