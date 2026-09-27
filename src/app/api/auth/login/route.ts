import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, generateToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { schoolId, mobile, password } = body;

    if (!schoolId || !mobile || !password) {
      return NextResponse.json(
        { error: "School ID, mobile, and password are required" },
        { status: 400 }
      );
    }

    const tenant = await prisma.tenant.findUnique({
      where: { schoolId },
    });

    if (!tenant) {
      return NextResponse.json(
        { error: "Invalid school ID" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: { tenantId: tenant.id, mobile },
      include: {
        teacher: true,
        student: true,
        parent: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { error: "Account is deactivated" },
        { status: 403 }
      );
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const token = generateToken({
      userId: user.id,
      role: user.role as any,
      tenantId: tenant.id,
    });

    const response = NextResponse.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        mobile: user.mobile,
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
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}