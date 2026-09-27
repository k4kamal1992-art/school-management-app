"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { ListItem } from "@/components/ui/ListItem";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";

const classes = [
  { className: "8A", subject: "Mathematics", count: 24 },
  { className: "9B", subject: "Mathematics", count: 26 },
  { className: "10A", subject: "Mathematics", count: 22 },
];

export default function MyStudentsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-6">
      <AppHeader title="My Students" showBack />
      <div className="p-4 space-y-4">
        {classes.map((cls) => (
          <Card key={cls.className}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-slate-900">Class {cls.className}</h3>
                  <p className="text-xs text-slate-500">{cls.subject} &bull; {cls.count} students</p>
                </div>
                <Link href={`/teacher/students/${cls.className}`} className="text-primary text-xs font-semibold">View All</Link>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Rohan Das", roll: "01", avatar: "RD" },
                  { name: "Sneha Kaur", roll: "02", avatar: "SK" },
                  { name: "Arun Pal", roll: "03", avatar: "AP" },
                ].map((s) => (
                  <ListItem
                    key={s.roll}
                    avatarName={s.avatar}
                    avatarColor="bg-primary text-white"
                    title={s.name}
                    subtitle={`Roll: ${s.roll}`}
                    href={`/teacher/students/detail/${s.roll}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}