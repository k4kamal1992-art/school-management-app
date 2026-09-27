"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  className?: string;
  transparent?: boolean;
}

export function AppHeader({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightAction,
  className,
  transparent = false,
}: AppHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 px-4 py-3 flex items-center gap-3",
        transparent ? "bg-transparent" : "bg-primary text-white shadow-md",
        className
      )}
    >
      {showBack && (
        <button
          onClick={onBack || (() => window.history.back())}
          className="p-1 -ml-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      <div className="flex-1 min-w-0">
        <h1 className={cn("font-bold text-lg truncate", transparent && "text-slate-900")}>
          {title}
        </h1>
        {subtitle && (
          <p className={cn("text-xs truncate", transparent ? "text-slate-500" : "text-blue-100")}>
            {subtitle}
          </p>
        )}
      </div>

      {rightAction && <div className="shrink-0">{rightAction}</div>}

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="p-1 rounded-lg hover:bg-white/10 transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="1" fill="currentColor" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
          <circle cx="12" cy="19" r="1" fill="currentColor" />
        </svg>
      </button>
    </header>
  );
}