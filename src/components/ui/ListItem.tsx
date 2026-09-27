"use client";

import { cn } from "@/lib/utils";
import { Avatar } from "./Avatar";

interface ListItemProps {
  title: string;
  subtitle?: string;
  avatar?: string;
  avatarName?: string;
  avatarColor?: string;
  badge?: React.ReactNode;
  rightContent?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function ListItem({
  title,
  subtitle,
  avatar,
  avatarName,
  avatarColor,
  badge,
  rightContent,
  href,
  onClick,
  className,
}: ListItemProps) {
  const content = (
    <div
      className={cn(
        "flex items-center gap-3 p-3 bg-white rounded-card-sm border border-slate-100",
        "hover:bg-slate-50 transition-colors cursor-pointer active:scale-[0.99]",
        className
      )}
      onClick={onClick}
    >
      {(avatar || avatarName) && (
        <Avatar name={avatarName || title} src={avatar} size="md" color={avatarColor} />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-slate-900 truncate">{title}</h4>
          {badge}
        </div>
        {subtitle && <p className="text-sm text-slate-500 truncate">{subtitle}</p>}
      </div>
      {rightContent && <div className="shrink-0">{rightContent}</div>}
    </div>
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