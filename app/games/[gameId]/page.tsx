import { prisma } from "@/lib/prisma";
import ScoresForm from "./scores-form";

export default async function GameDetailPage({
  params,
}: {
  params: { gameId: string };
}) {
  const game = await prisma.game.findUnique({
    where: { id: params.gameId },
    include: { results: { include: { player: true } } },
  });
  if (!game) return <div>Not found</div>;

  const players = await prisma.player.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{game.course}</h1>
        <div className="text-sm">
          {new Date(game.date).toLocaleDateString()}
        </div>
      </div>

      <ScoresForm gameId={game.id} players={players} />

      {game.results.length > 0 && (
        <div>
          <h2 className="font-medium mb-2">Results</h2>
          <div className="grid gap-2">
            {game.results
              .sort((a, b) => a.strokes - b.strokes)
              .map((r) => (
                <div
                  key={r.id}
                  className="rounded border p-2 text-sm dark:border-gray-800"
                >
                  {r.player.name}: {r.strokes}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
