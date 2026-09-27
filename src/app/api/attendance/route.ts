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
    const sectionId = searchParams.get("sectionId");
    const date = searchParams.get("date");

    if (!classId || !sectionId || !date) {
      return NextResponse.json({ error: "classId, sectionId, and date are required" }, { status: 400 });
    }

    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    const records = await prisma.attendanceRecord.findMany({
      where: {
        tenantId: payload.tenantId,
        classId,
        sectionId,
        date: attendanceDate,
      },
      include: {
        student: {
          include: {
            user: { select: { name: true } },
          },
        },
      },
      orderBy: { student: { rollNumber: "asc" } },
    });

    return NextResponse.json(
      records.map((r) => ({
        id: r.id,
        studentId: r.studentId,
        studentName: r.student.user.name,
        rollNumber: r.student.rollNumber,
        status: r.status,
        remark: r.remark,
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
    const { records } = body; // Array of { studentId, status, remark }
    const { classId, sectionId, date, teacherId } = body;

    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    // Upsert attendance records
    const results = await prisma.$transaction(
      records.map((record: any) =>
        prisma.attendanceRecord.upsert({
          where: {
            studentId_date: {
              studentId: record.studentId,
              date: attendanceDate,
            },
          },
          update: {
            status: record.status,
            remark: record.remark,
            teacherId,
          },
          create: {
            tenantId: payload.tenantId,
            studentId: record.studentId,
            teacherId,
            classId,
            sectionId,
            date: attendanceDate,
            status: record.status,
            remark: record.remark,
          },
        })
      )
    );

    return NextResponse.json({ count: results.length }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}