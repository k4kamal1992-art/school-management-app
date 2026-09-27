"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
}

interface BottomNavProps {
  items: NavItem[];
  className?: string;
}

export function BottomNav({ items, className }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 pt-1 pb-safe z-50",
        className
      )}
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl transition-all duration-200",
                isActive
                  ? "text-primary"
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              <div className={cn("w-6 h-6", isActive && "scale-110 transition-transform")}>
                {isActive && item.activeIcon ? item.activeIcon : item.icon}
              </div>
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}