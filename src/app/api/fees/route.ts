import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");

    const where: any = { tenantId: user.tenantId };
    if (studentId) where.studentId = studentId;

    const payments = await prisma.feePayment.findMany({
      where,
      include: {
        student: { include: { user: true } },
        feeStructure: true,
      },
      orderBy: { paymentDate: "desc" },
    });

    return NextResponse.json({ payments });
  } catch (error) {
    console.error("GET /api/fees error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { studentId, feeStructureId, amount, month, year, paymentMethod, transactionId } = body;

    if (!studentId || !feeStructureId || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const payment = await prisma.feePayment.create({
      data: {
        tenantId: user.tenantId,
        studentId,
        feeStructureId,
        amount,
        month,
        year,
        paymentMethod: paymentMethod || "CASH",
        transactionId,
        status: "PAID",
      },
    });

    return NextResponse.json({ payment }, { status: 201 });
  } catch (error) {
    console.error("POST /api/fees error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}