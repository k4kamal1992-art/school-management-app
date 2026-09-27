"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const students = [
  { id: "1", roll: "01", name: "Rohan Das", avatar: "RD" },
  { id: "2", roll: "02", name: "Sneha Kaur", avatar: "SK" },
  { id: "3", roll: "03", name: "Arun Pal", avatar: "AP" },
  { id: "4", roll: "04", name: "Mina Barman", avatar: "MB" },
  { id: "5", roll: "05", name: "Kunal Roy", avatar: "KR" },
  { id: "6", roll: "06", name: "Tina Saha", avatar: "TS" },
];

type Status = "PRESENT" | "ABSENT" | "LATE" | null;

export default function MarkAttendancePage() {
  const [attendance, setAttendance] = useState<Record<string, Status>>({});
  const [selectedClass, setSelectedClass] = useState("8A");
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" });

  const setStatus = (studentId: string, status: Status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const presentCount = Object.values(attendance).filter((s) => s === "PRESENT").length;
  const absentCount = Object.values(attendance).filter((s) => s === "ABSENT").length;
  const lateCount = Object.values(attendance).filter((s) => s === "LATE").length;

  const markAll = (status: Status) => {
    const all: Record<string, Status> = {};
    students.forEach((s) => { all[s.id] = status; });
    setAttendance(all);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <AppHeader title="Mark Attendance" subtitle={today} showBack />

      <div className="p-4 space-y-4">
        {/* Class selector + Stats */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option>8A</option>
                <option>8B</option>
                <option>9A</option>
                <option>9B</option>
              </select>
              <div className="flex-1 flex justify-end gap-4 text-xs">
                <span className="text-accent font-semibold">{presentCount} Present</span>
                <span className="text-danger font-semibold">{absentCount} Absent</span>
                <span className="text-warning font-semibold">{lateCount} Late</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="success" size="sm" className="flex-1 text-xs" onClick={() => markAll("PRESENT")}>All Present</Button>
              <Button variant="danger" size="sm" className="flex-1 text-xs" onClick={() => markAll("ABSENT")}>All Absent</Button>
            </div>
          </CardContent>
        </Card>

        {/* Student List */}
        <div className="space-y-2">
          {students.map((student) => {
            const status = attendance[student.id];
            return (
              <Card key={student.id} padding="sm">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {student.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">{student.name}</p>
                      <p className="text-xs text-slate-500">Roll: {student.roll}</p>
                    </div>
                    {status && (
                      <Badge variant={status === "PRESENT" ? "accent" : status === "ABSENT" ? "danger" : "warning"} size="sm">
                        {status}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {(["PRESENT", "ABSENT", "LATE"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setStatus(student.id, s)}
                        className={`flex-1 py-2 rounded-lg text-xs font-semibold border-2 transition-all ${
                          status === s
                            ? s === "PRESENT" ? "bg-accent-light border-accent text-accent-dark"
                            : s === "ABSENT" ? "bg-danger-light border-danger text-danger-dark"
                            : "bg-warning-light border-warning text-warning-dark"
                            : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Button variant="primary" size="lg" fullWidth>
          Save Attendance
        </Button>
      </div>
    </div>
  );
}