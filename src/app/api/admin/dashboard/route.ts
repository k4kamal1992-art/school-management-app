import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = verifyToken(token);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalTeachers, totalStudents, totalClasses, todayAttendance] = await Promise.all([
      prisma.teacher.count({ where: { tenantId: payload.tenantId } }),
      prisma.student.count({ where: { tenantId: payload.tenantId, isActive: true } }),
      prisma.class.count({ where: { tenantId: payload.tenantId } }),
      prisma.attendanceRecord.groupBy({
        by: ["status"],
        where: { tenantId: payload.tenantId, date: today },
        _count: { status: true },
      }),
    ]);

    const attendanceStats = { present: 0, absent: 0, late: 0 };
    todayAttendance.forEach((a) => {
      if (a.status === "PRESENT") attendanceStats.present = a._count.status;
      if (a.status === "ABSENT") attendanceStats.absent = a._count.status;
      if (a.status === "LATE") attendanceStats.late = a._count.status;
    });

    const totalAtt = attendanceStats.present + attendanceStats.absent + attendanceStats.late;
    const attendancePercentage = totalAtt > 0 ? Math.round((attendanceStats.present / totalAtt) * 100) : 0;

    const recentNotices = await prisma.notice.findMany({
      where: { tenantId: payload.tenantId },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        targetRole: true,
        isPinned: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      totalTeachers,
      totalStudents,
      totalClasses,
      todayAttendance: {
        ...attendanceStats,
        percentage: attendancePercentage,
      },
      recentNotices,
    });
  } catch (error) {
    console.error("GET /api/admin/dashboard error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}