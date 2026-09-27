import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = verifyToken(token);
    const { searchParams } = new URL(req.url);
    const classId = searchParams.get("classId");

    const where: any = { class: { tenantId: payload.tenantId } };
    if (classId) where.classId = classId;

    const sections = await prisma.section.findMany({
      where,
      include: {
        class: { select: { name: true } },
        _count: { select: { students: true } },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(
      sections.map((s) => ({
        id: s.id,
        name: s.name,
        classId: s.classId,
        className: s.class.name,
        studentCount: s._count.students,
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
    const { classId, name } = body;

    const existing = await prisma.section.findUnique({
      where: { classId_name: { classId, name } },
    });

    if (existing) {
      return NextResponse.json({ error: "Section already exists for this class" }, { status: 409 });
    }

    const section = await prisma.section.create({
      data: { classId, name },
    });

    return NextResponse.json(section, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}