"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

interface SidebarProps {
  items: SidebarItem[];
  userName: string;
  userRole: string;
  schoolName: string;
  className?: string;
}

export function Sidebar({ items, userName, userRole, schoolName, className }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 bg-white border-r border-slate-200 z-50 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="h-full flex flex-col">
        {/* School Header */}
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg shrink-0">
              {schoolName.charAt(0)}
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="font-bold text-slate-900 text-sm truncate">{schoolName}</p>
                <p className="text-xs text-slate-500">{userRole}</p>
              </div>
            )}
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-primary-light text-primary font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <div className="w-5 h-5 shrink-0">{item.icon}</div>
                {!collapsed && (
                  <>
                    <span className="flex-1 text-sm">{item.label}</span>
                    {item.badge && (
                      <span className="bg-danger text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="p-3 border-t border-slate-100">
          <div className="flex items-center gap-2 px-2 py-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold shrink-0">
              {userName.slice(0, 2).toUpperCase()}
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{userName}</p>
                <p className="text-xs text-slate-500">View Profile</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}