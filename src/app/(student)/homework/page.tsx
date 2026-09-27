"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const homework = [
  { id: "1", subject: "Mathematics", title: "Algebra Ex 5.2", due: "Today", status: "PENDING", description: "Solve all problems from exercise 5.2" },
  { id: "2", subject: "Science", title: "Physics Lab Report", due: "Tomorrow", status: "PENDING", description: "Write lab report on pendulum experiment" },
  { id: "3", subject: "English", title: "Essay Writing", due: "28 Jun", status: "SUBMITTED", description: "Write an essay on 'My School'" },
];

export default function StudentHomeworkPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-6">
      <AppHeader title="My Homework" showBack />
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
              <p className="text-sm text-slate-600">{hw.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}