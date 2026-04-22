import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.siteContent.findMany();
  const map: Record<string, string> = {};
  for (const item of items) map[item.key] = item.value;
  return NextResponse.json(map);
}

export async function PUT(req: NextRequest) {
  try {
    const body: Record<string, string> = await req.json();
    const ops = Object.entries(body).map(([key, value]) =>
      prisma.siteContent.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    );
    await Promise.all(ops);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
