"use client";

import { cn } from "@/lib/utils";

interface FabProps {
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function Fab({ href, onClick, className }: FabProps) {
  const content = (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full",
        "flex items-center justify-center shadow-fab",
        "hover:bg-primary-dark active:scale-95 transition-all z-50",
        className
      )}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </button>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
}