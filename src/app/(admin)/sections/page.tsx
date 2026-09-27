"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Fab } from "@/components/ui/Fab";
import Link from "next/link";

const classes = [
  { id: "1", name: "Class 8", sections: [
    { id: "s1", name: "A", studentCount: 24, classTeacher: "Priya Sharma" },
    { id: "s2", name: "B", studentCount: 21, classTeacher: "Rahul Kumar" },
  ]},
  { id: "2", name: "Class 9", sections: [
    { id: "s3", name: "A", studentCount: 26, classTeacher: "Anita Das" },
    { id: "s4", name: "B", studentCount: 26, classTeacher: "Sunil Pal" },
  ]},
];

export default function SectionsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <AppHeader title="Sections" subtitle="Class-wise sections" showBack />

      <div className="p-4 space-y-4">
        {classes.map((cls) => (
          <Card key={cls.id}>
            <CardContent className="p-4">
              <h3 className="font-bold text-slate-900 mb-3">{cls.name}</h3>
              <div className="grid grid-cols-2 gap-3">
                {cls.sections.map((sec) => (
                  <Link key={sec.id} href={`/admin/sections/${sec.id}`}>
                    <div className="bg-slate-50 rounded-xl p-3 hover:bg-slate-100 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold text-primary">{sec.name}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                      <p className="text-xs text-slate-500">{sec.studentCount} Students</p>
                      <p className="text-xs text-slate-400">{sec.classTeacher}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Fab href="/admin/sections/add" />
    </div>
  );
}