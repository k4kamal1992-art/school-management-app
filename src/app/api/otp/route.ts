import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mobile, tenantId, purpose } = body;

    if (!mobile || !tenantId) {
      return NextResponse.json({ error: "Missing mobile or tenantId" }, { status: 400 });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.oTPVerification.create({
      data: {
        tenantId,
        mobile,
        otp,
        purpose: purpose || "LOGIN",
        expiresAt,
      },
    });

    console.log(`OTP for ${mobile}: ${otp}`);

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("POST /api/otp/send error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { mobile, tenantId, otp, purpose } = body;

    if (!mobile || !tenantId || !otp) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const record = await prisma.oTPVerification.findFirst({
      where: {
        tenantId,
        mobile,
        otp,
        purpose: purpose || "LOGIN",
        expiresAt: { gt: new Date() },
        isUsed: false,
      },
      orderBy: { createdAt: "desc" },
    });

    if (!record) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }

    await prisma.oTPVerification.update({
      where: { id: record.id },
      data: { isUsed: true },
    });

    return NextResponse.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("PUT /api/otp/verify error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}