"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "accent" | "danger" | "warning" | "purple" | "pink" | "default";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "default", size = "sm", className }: BadgeProps) {
  const variants = {
    primary: "bg-primary-light text-primary-dark",
    accent: "bg-accent-light text-accent-dark",
    danger: "bg-danger-light text-danger-dark",
    warning: "bg-warning-light text-warning-dark",
    purple: "bg-purple-light text-purple-dark",
    pink: "bg-pink-light text-pink-dark",
    default: "bg-slate-100 text-slate-700",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}