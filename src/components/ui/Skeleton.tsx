"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  count?: number;
}

export function Skeleton({ className, count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "animate-pulse bg-slate-200 rounded-lg",
            className
          )}
        />
      ))}
    </>
  );
}

export function SkeletonList({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-slate-200 rounded animate-pulse w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}