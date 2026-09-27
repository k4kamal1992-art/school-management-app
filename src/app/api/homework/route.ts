import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const classId = searchParams.get("classId");
    const studentId = searchParams.get("studentId");

    const where: any = { tenantId: user.tenantId };
    if (classId) where.classId = classId;
    if (studentId) where.studentId = studentId;

    const homework = await prisma.homework.findMany({
      where,
      include: {
        subject: true,
        class: true,
        section: true,
        teacher: { include: { user: true } },
      },
      orderBy: { dueDate: "asc" },
    });

    return NextResponse.json({ homework });
  } catch (error) {
    console.error("GET /api/homework error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user || user.role !== "TEACHER") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { title, description, subjectId, classId, sectionId, dueDate } = body;

    if (!title || !subjectId || !classId || !dueDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const teacher = await prisma.teacher.findFirst({
      where: { userId: user.id },
    });

    const homework = await prisma.homework.create({
      data: {
        tenantId: user.tenantId,
        title,
        description,
        subjectId,
        classId,
        sectionId,
        teacherId: teacher?.id,
        dueDate: new Date(dueDate),
      },
    });

    return NextResponse.json({ homework }, { status: 201 });
  } catch (error) {
    console.error("POST /api/homework error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}