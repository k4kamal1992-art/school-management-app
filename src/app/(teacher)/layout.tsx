"use client";

import { BottomNav } from "@/components/layout/BottomNav";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { label: "Home", href: "/teacher/dashboard", icon: "home" },
    { label: "Students", href: "/teacher/students", icon: "users" },
    { label: "Attendance", href: "/teacher/attendance", icon: "clipboard" },
    { label: "Marks", href: "/teacher/marks", icon: "book" },
    { label: "Profile", href: "/teacher/profile", icon: "user" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="pb-20">{children}</main>
      <BottomNav items={navItems} />
    </div>
  );
}