import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = verifyToken(token);
    const { searchParams } = new URL(req.url);
    const targetRole = searchParams.get("targetRole");

    const where: any = { tenantId: payload.tenantId };
    if (targetRole) {
      where.OR = [{ targetRole: "ALL" }, { targetRole }];
    }

    const notices = await prisma.notice.findMany({
      where,
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
      take: 50,
    });

    return NextResponse.json(notices);
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
    const { title, content, targetRole, classId, isPinned } = body;

    const notice = await prisma.notice.create({
      data: {
        tenantId: payload.tenantId,
        title,
        content,
        targetRole,
        classId: classId || null,
        isPinned: isPinned || false,
        createdBy: payload.userId,
      },
    });

    return NextResponse.json(notice, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}