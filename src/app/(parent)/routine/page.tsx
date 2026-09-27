"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent } from "@/components/ui/Card";

const routine = [
  { day: "Monday", periods: [
    { time: "09:00 - 09:45", subject: "Bengali", teacher: "Anita Das" },
    { time: "10:00 - 10:45", subject: "Mathematics", teacher: "Priya Sharma" },
    { time: "11:00 - 11:45", subject: "Science", teacher: "Rahul Kumar" },
    { time: "12:00 - 12:45", subject: "English", teacher: "Sunita Pal" },
  ]},
  { day: "Tuesday", periods: [
    { time: "09:00 - 09:45", subject: "English", teacher: "Sunita Pal" },
    { time: "10:00 - 10:45", subject: "History", teacher: "Arun Barman" },
    { time: "11:00 - 11:45", subject: "Mathematics", teacher: "Priya Sharma" },
    { time: "12:00 - 12:45", subject: "Geography", teacher: "Mina Roy" },
  ]},
];

export default function ParentRoutinePage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-6">
      <AppHeader title="Class Routine" subtitle="Rohan Das - Class 8A" showBack />
      <div className="p-4 space-y-4">
        {routine.map((day) => (
          <Card key={day.day}>
            <CardContent className="p-4">
              <h3 className="font-bold text-slate-900 mb-3">{day.day}</h3>
              <div className="space-y-2">
                {day.periods.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <div className="text-xs font-semibold text-slate-500 w-20 shrink-0">{p.time}</div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">{p.subject}</p>
                      <p className="text-xs text-slate-500">{p.teacher}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}