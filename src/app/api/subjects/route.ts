import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = verifyToken(token);

    const subjects = await prisma.subject.findMany({
      where: { tenantId: payload.tenantId },
      include: {
        classSubjects: { include: { class: { select: { name: true } } } },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(
      subjects.map((s) => ({
        id: s.id,
        name: s.name,
        code: s.code,
        classCount: s.classSubjects.length,
        classes: s.classSubjects.map((cs) => cs.class.name),
      }))
    );
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = verifyToken(token);
    const body = await req.json();
    const { name, code } = body;

    const existing = await prisma.subject.findUnique({
      where: { tenantId_name: { tenantId: payload.tenantId, name } },
    });

    if (existing) {
      return NextResponse.json({ error: "Subject already exists" }, { status: 409 });
    }

    const subject = await prisma.subject.create({
      data: { tenantId: payload.tenantId, name, code },
    });

    return NextResponse.json(subject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}