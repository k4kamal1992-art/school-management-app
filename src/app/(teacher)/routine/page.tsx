"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent } from "@/components/ui/Card";

const routine = [
  { day: "Monday", periods: [
    { time: "09:00 - 09:45", subject: "Mathematics", class: "8A", room: "101" },
    { time: "10:00 - 10:45", subject: "Mathematics", class: "9B", room: "203" },
    { time: "11:30 - 12:15", subject: "Science", class: "8A", room: "Lab 1" },
    { time: "12:30 - 01:15", subject: "Mathematics", class: "10A", room: "301" },
  ]},
  { day: "Tuesday", periods: [
    { time: "09:00 - 09:45", subject: "Mathematics", class: "9A", room: "201" },
    { time: "10:00 - 10:45", subject: "Science", class: "8B", room: "Lab 2" },
    { time: "11:30 - 12:15", subject: "Mathematics", class: "8A", room: "101" },
  ]},
];

export default function TeacherRoutinePage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-6">
      <AppHeader title="My Routine" showBack />
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
                      <p className="text-xs text-slate-500">Class {p.class} &bull; Room {p.room}</p>
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