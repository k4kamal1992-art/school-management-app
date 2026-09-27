import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = verifyToken(token);

    const classes = await prisma.class.findMany({
      where: { tenantId: payload.tenantId },
      include: {
        _count: { select: { students: true, sections: true } },
      },
      orderBy: { numericValue: "asc" },
    });

    return NextResponse.json(
      classes.map((c) => ({
        id: c.id,
        name: c.name,
        numericValue: c.numericValue,
        studentCount: c._count.students,
        sectionCount: c._count.sections,
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
    const { name, numericValue } = body;

    const existing = await prisma.class.findUnique({
      where: { tenantId_numericValue: { tenantId: payload.tenantId, numericValue: parseInt(numericValue) } },
    });

    if (existing) {
      return NextResponse.json({ error: "Class already exists" }, { status: 409 });
    }

    const newClass = await prisma.class.create({
      data: {
        tenantId: payload.tenantId,
        name,
        numericValue: parseInt(numericValue),
      },
    });

    return NextResponse.json(newClass, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}