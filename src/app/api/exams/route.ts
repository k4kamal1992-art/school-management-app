import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = verifyToken(token);

    const exams = await prisma.exam.findMany({
      where: { tenantId: payload.tenantId },
      include: {
        examSubjects: {
          include: {
            subject: { select: { name: true } },
          },
        },
        _count: { select: { marks: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      exams.map((e) => ({
        id: e.id,
        name: e.name,
        examType: e.examType,
        startDate: e.startDate,
        endDate: e.endDate,
        isPublished: e.isPublished,
        subjectCount: e.examSubjects.length,
        marksCount: e._count.marks,
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
    const { name, examType, startDate, endDate } = body;

    const exam = await prisma.exam.create({
      data: {
        tenantId: payload.tenantId,
        name,
        examType,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    return NextResponse.json(exam, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}