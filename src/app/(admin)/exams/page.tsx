"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Fab } from "@/components/ui/Fab";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

const exams = [
  { id: "1", name: "First Term Exam 2026", type: "TERM", startDate: "15 Jun", endDate: "25 Jun", subjects: 6, status: "PUBLISHED" },
  { id: "2", name: "Unit Test 2", type: "UNIT", startDate: "05 Jul", endDate: "08 Jul", subjects: 3, status: "DRAFT" },
  { id: "3", name: "Final Exam 2026", type: "FINAL", startDate: "01 Dec", endDate: "15 Dec", subjects: 8, status: "DRAFT" },
];

export default function ExamsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <AppHeader title="Exams" subtitle="All examinations" showBack />

      <div className="p-4 space-y-3">
        {exams.map((exam) => (
          <Link key={exam.id} href={`/admin/exams/${exam.id}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-slate-900">{exam.name}</h3>
                    <p className="text-xs text-slate-500">{exam.startDate} - {exam.endDate}</p>
                  </div>
                  <Badge variant={exam.status === "PUBLISHED" ? "accent" : "warning"} size="sm">{exam.status}</Badge>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">{exam.subjects}</span> Subjects
                  </span>
                  <span className="text-xs text-slate-500">
                    Type: <span className="font-semibold text-slate-700">{exam.type}</span>
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Fab href="/admin/exams/add" />
    </div>
  );
}