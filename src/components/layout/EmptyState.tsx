"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
      {icon && <div className="mb-4 text-slate-300">{icon}</div>}
      <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
      {description && <p className="text-sm text-slate-500 mb-4 max-w-xs">{description}</p>}
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}