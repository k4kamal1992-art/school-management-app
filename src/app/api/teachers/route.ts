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
    const subject = searchParams.get("subject");

    const where: any = { tenantId: payload.tenantId };
    if (classId) where.assignments = { some: { classId } };

    const teachers = await prisma.teacher.findMany({
      where,
      include: {
        user: { select: { name: true, mobile: true, email: true, isActive: true } },
        assignments: {
          include: {
            subject: { select: { name: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = teachers.map((t) => ({
      id: t.id,
      teacherId: t.teacherId,
      name: t.user.name,
      mobile: t.user.mobile,
      email: t.user.email,
      qualification: t.qualification,
      specialization: t.specialization,
      isActive: t.user.isActive,
      subjects: t.assignments.map((a) => a.subject.name).filter((v, i, a) => a.indexOf(v) === i),
    }));

    if (subject) {
      return NextResponse.json(formatted.filter((t) => t.subjects.includes(subject)));
    }

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("GET /api/teachers error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = verifyToken(token);
    const body = await req.json();
    const { name, mobile, email, password, qualification, specialization, gender, teacherId } = body;

    const hashedPassword = await import("@/lib/auth").then((m) => m.hashPassword(password || "teacher123"));

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          tenantId: payload.tenantId,
          name,
          mobile,
          email,
          password: hashedPassword,
          role: "TEACHER",
        },
      });

      const teacher = await tx.teacher.create({
        data: {
          tenantId: payload.tenantId,
          userId: user.id,
          teacherId: teacherId || `T${Date.now().toString(36).toUpperCase()}`,
          qualification,
          specialization,
          gender,
        },
      });

      return { user, teacher };
    });

    return NextResponse.json({
      id: result.teacher.id,
      teacherId: result.teacher.teacherId,
      name: result.user.name,
      mobile: result.user.mobile,
    }, { status: 201 });
  } catch (error) {
    console.error("POST /api/teachers error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}