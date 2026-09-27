"use client";

import { BottomNav } from "@/components/layout/BottomNav";

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { label: "Home", href: "/parent/dashboard", icon: "home" },
    { label: "Routine", href: "/parent/routine", icon: "calendar" },
    { label: "Attendance", href: "/parent/attendance", icon: "clipboard" },
    { label: "Result", href: "/parent/result", icon: "book" },
    { label: "Profile", href: "/parent/profile", icon: "user" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="pb-20">{children}</main>
      <BottomNav items={navItems} />
    </div>
  );
}