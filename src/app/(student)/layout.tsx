"use client";

import { BottomNav } from "@/components/layout/BottomNav";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { label: "Home", href: "/student/dashboard", icon: "home" },
    { label: "Routine", href: "/student/routine", icon: "calendar" },
    { label: "Attendance", href: "/student/attendance", icon: "clipboard" },
    { label: "Result", href: "/student/result", icon: "book" },
    { label: "Profile", href: "/student/profile", icon: "user" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="pb-20">{children}</main>
      <BottomNav items={navItems} />
    </div>
  );
}