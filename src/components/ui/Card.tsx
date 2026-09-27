"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "card";
}

function Card({ className, padding = "md", shadow = "card", children, ...props }: CardProps) {
  const paddings = { none: "", sm: "p-3", md: "p-4", lg: "p-5" };
  const shadows = { none: "", sm: "shadow-sm", md: "shadow-md", card: "shadow-card" };

  return (
    <div
      className={cn(
        "bg-white rounded-card border border-slate-100",
        paddings[padding],
        shadows[shadow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center justify-between mb-3", className)} {...props}>
      {children}
    </div>
  );
}

function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-base font-bold text-slate-900", className)} {...props}>
      {children}
    </h3>
  );
}

function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

export { Card, CardHeader, CardTitle, CardContent };