import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(testimonials);
}

export async function PUT(req: NextRequest) {
  try {
    const items = await req.json();

    // Delete all and recreate for simplicity
    await prisma.testimonial.deleteMany();
    if (items.length > 0) {
      await prisma.testimonial.createMany({
        data: items.map((t: { id: string; author: string; role?: string; company?: string; text: string; textEn?: string; order: number; active: boolean }) => ({
          id: t.id.startsWith("new-") ? undefined : t.id,
          author: t.author,
          role: t.role ?? null,
          company: t.company ?? null,
          text: t.text,
          textEn: t.textEn ?? null,
          order: t.order,
          active: t.active,
        })),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
