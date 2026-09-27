"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent } from "@/components/ui/Card";

const days = ["S","M","T","W","T","F","S"];
const monthData = Array.from({ length: 30 }, (_, i) => {
  const statuses = ["P", "P", "P", "P", "A", "P", "P", "L", "P", "P"];
  return { day: i + 1, status: statuses[i % 10] };
});

export default function ParentAttendancePage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-6">
      <AppHeader title="Attendance" subtitle="Rohan Das - June 2026" showBack />
      <div className="p-4 space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-around">
              <div className="text-center"><p className="text-2xl font-bold text-accent">23</p><p className="text-xs text-slate-500">Present</p></div>
              <div className="w-px h-10 bg-slate-200"/>
              <div className="text-center"><p className="text-2xl font-bold text-danger">2</p><p className="text-xs text-slate-500">Absent</p></div>
              <div className="w-px h-10 bg-slate-200"/>
              <div className="text-center"><p className="text-2xl font-bold text-warning">0</p><p className="text-xs text-slate-500">Late</p></div>
              <div className="w-px h-10 bg-slate-200"/>
              <div className="text-center"><p className="text-2xl font-bold text-primary">92%</p><p className="text-xs text-slate-500">Rate</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {days.map((d, i) => (<div key={i} className="text-center text-xs font-semibold text-slate-400 py-1">{d}</div>))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 2 }).map((_, i) => (<div key={`e${i}`} className="aspect-square"/>))}
              {monthData.map((d) => (
                <div key={d.day} className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold ${
                  d.status === "P" ? "bg-accent-light text-accent" : d.status === "A" ? "bg-danger-light text-danger" : "bg-warning-light text-warning"
                }`}>{d.day}</div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-accent-light"/><span className="text-xs text-slate-500">Present</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-danger-light"/><span className="text-xs text-slate-500">Absent</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-warning-light"/><span className="text-xs text-slate-500">Late</span></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}