import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();
  const age = Number(formData.get("age"));
  const study = String(formData.get("study"));
  if (!name || !Number.isInteger(age)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const uuid = crypto.randomUUID();

  await prisma.player.create({
    data: { name, age, study: study as any, uuid },
  });

  return NextResponse.json({ ok: true });
}
