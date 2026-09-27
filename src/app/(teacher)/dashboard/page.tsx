"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";

export default function TeacherDashboardPage() {
  const quickActions = [
    { label: "Mark Attendance", href: "/teacher/attendance", icon: "clipboard", color: "bg-primary-light text-primary" },
    { label: "Enter Marks", href: "/teacher/marks", icon: "book", color: "bg-accent-light text-accent" },
    { label: "Give Homework", href: "/teacher/homework/add", icon: "edit", color: "bg-purple-light text-purple" },
    { label: "My Routine", href: "/teacher/routine", icon: "calendar", color: "bg-warning-light text-warning" },
  ];

  const stats = [
    { label: "Today's Classes", value: "4", sub: "2 remaining" },
    { label: "Total Students", value: "48", sub: "Class 8A, 9B" },
    { label: "Pending Homework", value: "3", sub: "Due this week" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <AppHeader title="Teacher Panel" subtitle="Welcome back, Priya Sharma" />

      <div className="p-4 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <Card key={s.label} padding="sm">
              <CardContent className="p-3 text-center">
                <p className="text-xl font-bold text-slate-900">{s.value}</p>
                <p className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">{s.label}</p>
                <p className="text-[10px] text-slate-400">{s.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <Link key={action.label} href={action.href}>
              <div className="bg-white rounded-card p-4 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer">
                <div className={`w-11 h-11 rounded-xl ${action.color} flex items-center justify-center shrink-0`}>
                  {action.icon === "clipboard" && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14l2 2 4-4"/></svg>
                  )}
                  {action.icon === "book" && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  )}
                  {action.icon === "edit" && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  )}
                  {action.icon === "calendar" && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  )}
                </div>
                <span className="text-sm font-semibold text-slate-900">{action.label}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Today's Schedule */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900">Today&apos;s Schedule</h3>
              <Link href="/teacher/routine" className="text-primary text-xs font-semibold">View Full</Link>
            </div>
            <div className="space-y-2">
              {[
                { time: "09:00 - 09:45", subject: "Mathematics", class: "8A", room: "101", status: "done" },
                { time: "10:00 - 10:45", subject: "Mathematics", class: "9B", room: "203", status: "current" },
                { time: "11:30 - 12:15", subject: "Science", class: "8A", room: "Lab 1", status: "upcoming" },
                { time: "12:30 - 01:15", subject: "Mathematics", class: "10A", room: "301", status: "upcoming" },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${item.status === "current" ? "bg-primary-light border border-primary/20" : "bg-slate-50"}`}>
                  <div className="text-xs font-semibold text-slate-500 w-20 shrink-0">{item.time}</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">{item.subject}</p>
                    <p className="text-xs text-slate-500">Class {item.class} &bull; Room {item.room}</p>
                  </div>
                  {item.status === "done" && <div className="w-6 h-6 rounded-full bg-accent-light flex items-center justify-center"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg></div>}
                  {item.status === "current" && <div className="w-2 h-2 rounded-full bg-primary animate-pulse"/>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}