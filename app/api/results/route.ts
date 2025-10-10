import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const gameId = String(formData.get("gameId") ?? "");
  if (!gameId)
    return NextResponse.json({ error: "Missing gameId" }, { status: 400 });

  const entries: Array<{ playerId: string; strokes: number }> = [];
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("score_") && value) {
      const playerId = key.replace("score_", "");
      const strokes = Number(value);
      if (Number.isInteger(strokes)) entries.push({ playerId, strokes });
    }
  }

  const operations = entries.map((e) =>
    prisma.result.upsert({
      where: { playerId_gameId: { playerId: e.playerId, gameId } },
      update: { strokes: e.strokes },
      create: { playerId: e.playerId, gameId, strokes: e.strokes },
    })
  );

  await prisma.$transaction(operations);

  return NextResponse.json({ ok: true });
}
