import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const date = String(formData.get("date"));
  const course = String(formData.get("course") ?? "").trim();
  if (!date || !course) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  await prisma.game.create({
    data: {
      date: new Date(date + "T00:00:00.000Z"),
      course,
    },
  });
  return NextResponse.json({ ok: true });
}
