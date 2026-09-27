"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";

export default function ParentDashboardPage() {
  const children = [
    { id: "1", name: "Rohan Das", class: "8A", roll: "01", attendance: 92 },
    { id: "2", name: "Sneha Kaur", class: "10B", roll: "05", attendance: 88 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <AppHeader title="Parent Panel" subtitle="Welcome, Mr. Das" />

      <div className="p-4 space-y-4">
        {/* Children Cards */}
        <div className="space-y-3">
          {children.map((child) => (
            <Link key={child.id} href={`/parent/child/${child.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center text-lg font-bold shrink-0">
                      {child.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900">{child.name}</h3>
                      <p className="text-sm text-slate-500">Class {child.class} &bull; Roll {child.roll}</p>
                    </div>
                    <div className="text-right">
                      <div className="relative w-12 h-12">
                        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                          <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"/>
                          <path className="text-accent" strokeDasharray={`${child.attendance}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-900">{child.attendance}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Attendance", icon: "clipboard", href: "/parent/attendance", color: "bg-primary-light text-primary" },
            { label: "Results", icon: "book", href: "/parent/result", color: "bg-accent-light text-accent" },
            { label: "Homework", icon: "edit", href: "/parent/homework", color: "bg-purple-light text-purple" },
            { label: "Fees", icon: "dollar", href: "/parent/fees", color: "bg-warning-light text-warning" },
          ].map((action) => (
            <Link key={action.label} href={action.href}>
              <div className="bg-white rounded-card p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow cursor-pointer">
                <div className={`w-11 h-11 rounded-xl ${action.color} flex items-center justify-center`}>
                  {action.icon === "clipboard" && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14l2 2 4-4"/></svg>
                  )}
                  {action.icon === "book" && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  )}
                  {action.icon === "edit" && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  )}
                  {action.icon === "dollar" && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  )}
                </div>
                <span className="text-sm font-semibold text-slate-900">{action.label}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Notices */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900">School Notices</h3>
              <Link href="/parent/notices" className="text-primary text-xs font-semibold">View All</Link>
            </div>
            <div className="space-y-2">
              {[
                { title: "Annual Sports Day on July 15", date: "2 days ago", pinned: true },
                { title: "Fee payment deadline extended", date: "5 days ago", pinned: false },
              ].map((notice, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">{notice.title}</p>
                    <p className="text-xs text-slate-500">{notice.date}</p>
                  </div>
                  {notice.pinned && <span className="text-[10px] bg-warning-light text-warning-dark px-1.5 py-0.5 rounded font-bold">PINNED</span>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}