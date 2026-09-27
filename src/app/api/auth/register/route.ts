import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, generateToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { schoolId, schoolName, schoolType, address, district, state, adminName, adminMobile, password } = body;

    if (!schoolId || !schoolName || !adminName || !adminMobile || !password) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    const existing = await prisma.tenant.findUnique({
      where: { schoolId },
    });

    if (existing) {
      return NextResponse.json(
        { error: "School ID already taken", available: false },
        { status: 409 }
      );
    }

    const tenant = await prisma.tenant.create({
      data: {
        schoolId,
        name: schoolName,
        type: schoolType,
        address,
        district,
        state,
      },
    });

    const hashedPassword = await hashPassword(password);

    const admin = await prisma.user.create({
      data: {
        tenantId: tenant.id,
        name: adminName,
        mobile: adminMobile,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    await prisma.setting.create({
      data: {
        tenantId: tenant.id,
        attendanceMethod: "DAILY",
        gradingSystem: "GPA",
      },
    });

    const token = generateToken({
      userId: admin.id,
      role: "ADMIN",
      tenantId: tenant.id,
    });

    const response = NextResponse.json({
      token,
      user: {
        id: admin.id,
        name: admin.name,
        role: admin.role,
        mobile: admin.mobile,
        tenantId: tenant.id,
        schoolId: tenant.schoolId,
        schoolName: tenant.name,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}