"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";

export default function StudentDashboardPage() {
  const attendance = { percentage: 92, present: 23, absent: 2, late: 0 };
  const homework = [
    { id: "1", subject: "Mathematics", title: "Algebra Ex 5.2", due: "Today", status: "pending" },
    { id: "2", subject: "Science", title: "Physics Lab Report", due: "Tomorrow", status: "pending" },
  ];
  const exams = [
    { id: "1", subject: "Mathematics", date: "28 Jun", time: "10:00 AM" },
    { id: "2", subject: "English", date: "30 Jun", time: "10:00 AM" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <AppHeader title="My Dashboard" subtitle="Rohan Das - Class 8A" />

      <div className="p-4 space-y-4">
        {/* Attendance Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900">My Attendance</h3>
              <Link href="/student/attendance" className="text-primary text-xs font-semibold">Details</Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"/>
                  <path className="text-accent" strokeDasharray={`${attendance.percentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-slate-900">{attendance.percentage}%</span>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-3 gap-2 text-center">
                <div className="bg-accent-light rounded-xl p-2">
                  <p className="text-lg font-bold text-accent">{attendance.present}</p>
                  <p className="text-[10px] text-slate-600">Present</p>
                </div>
                <div className="bg-danger-light rounded-xl p-2">
                  <p className="text-lg font-bold text-danger">{attendance.absent}</p>
                  <p className="text-[10px] text-slate-600">Absent</p>
                </div>
                <div className="bg-warning-light rounded-xl p-2">
                  <p className="text-lg font-bold text-warning">{attendance.late}</p>
                  <p className="text-[10px] text-slate-600">Late</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Homework */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900">Homework</h3>
              <Link href="/student/homework" className="text-primary text-xs font-semibold">View All</Link>
            </div>
            <div className="space-y-2">
              {homework.map((hw) => (
                <div key={hw.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-purple-light flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">{hw.title}</p>
                    <p className="text-xs text-slate-500">{hw.subject} &bull; Due: {hw.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Exams */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900">Upcoming Exams</h3>
              <Link href="/student/exams" className="text-primary text-xs font-semibold">Schedule</Link>
            </div>
            <div className="space-y-2">
              {exams.map((exam) => (
                <div key={exam.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className="w-12 h-12 rounded-xl bg-primary-light flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary">{exam.date.split(" ")[0]}</span>
                    <span className="text-[10px] text-primary">{exam.date.split(" ")[1]}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">{exam.subject}</p>
                    <p className="text-xs text-slate-500">{exam.time}</p>
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