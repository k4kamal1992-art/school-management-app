import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = verifyToken(token);
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    const targetDate = date ? new Date(date) : new Date();
    targetDate.setHours(0, 0, 0, 0);

    const classes = await prisma.class.findMany({
      where: { tenantId: payload.tenantId },
      include: {
        sections: true,
      },
      orderBy: { numericValue: "asc" },
    });

    const overview = await Promise.all(
      classes.map(async (cls) => {
        const sectionData = await Promise.all(
          cls.sections.map(async (section) => {
            const stats = await prisma.attendanceRecord.groupBy({
              by: ["status"],
              where: {
                tenantId: payload.tenantId,
                classId: cls.id,
                sectionId: section.id,
                date: targetDate,
              },
              _count: { status: true },
            });

            const present = stats.find((s) => s.status === "PRESENT")?._count.status || 0;
            const absent = stats.find((s) => s.status === "ABSENT")?._count.status || 0;
            const late = stats.find((s) => s.status === "LATE")?._count.status || 0;
            const total = present + absent + late;

            return {
              sectionId: section.id,
              sectionName: section.name,
              present,
              absent,
              late,
              total,
              percentage: total > 0 ? Math.round((present / total) * 100) : 0,
            };
          })
        );

        return {
          classId: cls.id,
          className: cls.name,
          sections: sectionData,
        };
      })
    );

    return NextResponse.json({ date: targetDate, overview });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}