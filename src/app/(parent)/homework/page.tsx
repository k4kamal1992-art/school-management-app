"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const homework = [
  { id: "1", subject: "Mathematics", title: "Algebra Ex 5.2", due: "Today", status: "PENDING", child: "Rohan Das" },
  { id: "2", subject: "Science", title: "Physics Lab Report", due: "Tomorrow", status: "PENDING", child: "Rohan Das" },
  { id: "3", subject: "English", title: "Essay Writing", due: "28 Jun", status: "SUBMITTED", child: "Sneha Kaur" },
];

export default function ParentHomeworkPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-6">
      <AppHeader title="Homework" showBack />
      <div className="p-4 space-y-3">
        {homework.map((hw) => (
          <Card key={hw.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-slate-900">{hw.title}</h3>
                  <p className="text-xs text-slate-500">{hw.subject} &bull; Due: {hw.due}</p>
                </div>
                <Badge variant={hw.status === "SUBMITTED" ? "accent" : "warning"} size="sm">{hw.status}</Badge>
              </div>
              <p className="text-xs text-primary font-medium">{hw.child}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}