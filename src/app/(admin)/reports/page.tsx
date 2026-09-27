"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";

const reports = [
  { id: "1", name: "Student Admission Report", icon: "users", color: "bg-primary-light text-primary" },
  { id: "2", name: "Attendance Report", icon: "clipboard", color: "bg-accent-light text-accent" },
  { id: "3", name: "Exam Result Report", icon: "book", color: "bg-purple-light text-purple" },
  { id: "4", name: "Fee Collection Report", icon: "dollar", color: "bg-warning-light text-warning" },
  { id: "5", name: "Teacher List Report", icon: "user", color: "bg-pink-light text-pink" },
  { id: "6", name: "Class Routine Report", icon: "calendar", color: "bg-primary-light text-primary" },
];

export default function AdminReportsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-6">
      <AppHeader title="Reports" showBack />
      <div className="p-4 grid grid-cols-2 gap-3">
        {reports.map((report) => (
          <Link key={report.id} href={`/admin/reports/${report.id}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${report.color} flex items-center justify-center`}>
                  {report.icon === "users" && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
                  {report.icon === "clipboard" && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14l2 2 4-4"/></svg>}
                  {report.icon === "book" && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>}
                  {report.icon === "dollar" && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
                  {report.icon === "user" && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                  {report.icon === "calendar" && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
                </div>
                <span className="text-sm font-semibold text-slate-900">{report.name}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}