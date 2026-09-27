"use client";

import { cn, getInitials } from "@/lib/utils";

interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  color?: string;
}

const sizes = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-base",
  xl: "w-20 h-20 text-xl",
};

const colors = [
  "bg-primary text-white",
  "bg-accent text-white",
  "bg-purple text-white",
  "bg-pink text-white",
  "bg-warning text-white",
  "bg-danger text-white",
];

function getColorIndex(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash) % colors.length;
}

export function Avatar({ name, src, size = "md", className, color }: AvatarProps) {
  const colorClass = color || colors[getColorIndex(name)];

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn("rounded-full object-cover", sizes[size], className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-bold shrink-0",
        colorClass,
        sizes[size],
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
}