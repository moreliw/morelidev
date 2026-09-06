import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }
  const fields = body as Record<string, unknown>;
  if (fields.website) return NextResponse.json({ ok: true });
  if (
    typeof fields.name !== "string" ||
    typeof fields.email !== "string" ||
    typeof fields.message !== "string" ||
    (fields.phone != null && typeof fields.phone !== "string")
  ) {
    return NextResponse.json(
      { error: "Name, email and message must be text" },
      { status: 400 },
    );
  }
  const name = fields.name.trim();
  const email = fields.email.trim();
  const message = fields.message.trim();
  const phone = typeof fields.phone === "string" ? fields.phone.trim() : null;
  if (
    !name ||
    name.length > 120 ||
    !EMAIL.test(email) ||
    email.length > 254 ||
    !message ||
    message.length > 5200 ||
    (phone && phone.length > 40)
  ) {
    return NextResponse.json(
      { error: "Check message fields" },
      { status: 400 },
    );
  }
  try {
    await prisma.contactMessage.create({
      data: { name, email, phone: phone || null, message },
    });
    return NextResponse.json({ ok: true });
  } catch {
    console.error("Contact message could not be saved");
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
