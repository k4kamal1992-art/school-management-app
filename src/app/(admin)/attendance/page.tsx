"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const classes = [
  { name: "8A", total: 24, present: 22, absent: 2, late: 0 },
  { name: "8B", total: 21, present: 20, absent: 1, late: 0 },
  { name: "9A", total: 26, present: 24, absent: 1, late: 1 },
  { name: "9B", total: 26, present: 25, absent: 0, late: 1 },
];

export default function AdminAttendancePage() {
  const [selectedDate, setSelectedDate] = useState("2026-06-27");

  return (
    <div className="min-h-screen bg-slate-50 pb-6">
      <AppHeader title="Attendance Overview" showBack />
      <div className="p-4 space-y-4">
        <Card>
          <CardContent className="p-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-3">
          <Card padding="sm"><CardContent className="p-3 text-center"><p className="text-xl font-bold text-accent">91</p><p className="text-[10px] text-slate-500">Present</p></CardContent></Card>
          <Card padding="sm"><CardContent className="p-3 text-center"><p className="text-xl font-bold text-danger">4</p><p className="text-[10px] text-slate-500">Absent</p></CardContent></Card>
          <Card padding="sm"><CardContent className="p-3 text-center"><p className="text-xl font-bold text-warning">2</p><p className="text-[10px] text-slate-500">Late</p></CardContent></Card>
        </div>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold text-slate-900 mb-3">Class-wise Summary</h3>
            <div className="space-y-2">
              {classes.map((cls) => (
                <div key={cls.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Class {cls.name}</p>
                    <p className="text-xs text-slate-500">Total: {cls.total} students</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="accent" size="sm">{cls.present} P</Badge>
                    <Badge variant="danger" size="sm">{cls.absent} A</Badge>
                    <Badge variant="warning" size="sm">{cls.late} L</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}