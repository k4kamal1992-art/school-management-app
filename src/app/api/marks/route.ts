import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const examId = searchParams.get("examId");
    const studentId = searchParams.get("studentId");

    const where: any = { tenantId: user.tenantId };
    if (examId) where.examId = examId;
    if (studentId) where.studentId = studentId;

    const marks = await prisma.mark.findMany({
      where,
      include: {
        student: { include: { user: true } },
        examSubject: { include: { subject: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ marks });
  } catch (error) {
    console.error("GET /api/marks error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user || (user.role !== "ADMIN" && user.role !== "TEACHER")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { examSubjectId, studentId, marksObtained, grade, remarks } = body;

    if (!examSubjectId || !studentId || marksObtained === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const mark = await prisma.mark.upsert({
      where: {
        examSubjectId_studentId: { examSubjectId, studentId },
      },
      update: { marksObtained, grade, remarks },
      create: {
        tenantId: user.tenantId,
        examSubjectId,
        studentId,
        marksObtained,
        grade,
        remarks,
      },
    });

    return NextResponse.json({ mark }, { status: 201 });
  } catch (error) {
    console.error("POST /api/marks error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}