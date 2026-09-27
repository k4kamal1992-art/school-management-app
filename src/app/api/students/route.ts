import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, hashPassword } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = verifyToken(token);
    const { searchParams } = new URL(req.url);
    const classId = searchParams.get("classId");
    const sectionId = searchParams.get("sectionId");
    const status = searchParams.get("status");

    const where: any = { tenantId: payload.tenantId };
    if (classId) where.classId = classId;
    if (sectionId) where.sectionId = sectionId;
    if (status === "active") where.isActive = true;
    if (status === "inactive") where.isActive = false;

    const students = await prisma.student.findMany({
      where,
      include: {
        user: { select: { name: true, mobile: true, isActive: true } },
        class: { select: { name: true } },
        section: { select: { name: true } },
      },
      orderBy: { rollNumber: "asc" },
    });

    const formatted = students.map((s) => ({
      id: s.id,
      admissionNo: s.admissionNo,
      rollNumber: s.rollNumber,
      name: s.user.name,
      mobile: s.user.mobile,
      classId: s.classId,
      className: s.class.name,
      sectionId: s.sectionId,
      sectionName: s.section.name,
      dob: s.dob,
      bloodGroup: s.bloodGroup,
      address: s.address,
      guardianName: s.guardianName,
      isActive: s.isActive,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("GET /api/students error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = verifyToken(token);
    const body = await req.json();
    const { firstName, lastName, mobile, parentMobile, classId, sectionId, rollNumber, dob, gender, bloodGroup, address, guardianName } = body;

    const name = `${firstName} ${lastName || ""}`.trim();
    const password = await hashPassword("student123");

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          tenantId: payload.tenantId,
          name,
          mobile: mobile || parentMobile,
          password,
          role: "STUDENT",
        },
      });

      const admissionNo = `A${Date.now().toString(36).toUpperCase()}`;

      const student = await tx.student.create({
        data: {
          tenantId: payload.tenantId,
          userId: user.id,
          admissionNo,
          rollNumber,
          classId,
          sectionId,
          dob: dob ? new Date(dob) : null,
          bloodGroup,
          address,
          guardianName,
        },
      });

      return { user, student };
    });

    return NextResponse.json({
      id: result.student.id,
      admissionNo: result.student.admissionNo,
      name: result.user.name,
    }, { status: 201 });
  } catch (error) {
    console.error("POST /api/students error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}