"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { ListItem } from "@/components/ui/ListItem";
import { Fab } from "@/components/ui/Fab";
import { SkeletonList } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/layout/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { useTeachers } from "@/hooks/useTeachers";

export default function TeachersPage() {
  const { teachers, isLoading } = useTeachers();

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <AppHeader title="Teachers" subtitle="Manage all teachers" showBack />

      <div className="p-4 space-y-3">
        {isLoading ? (
          <SkeletonList count={6} />
        ) : teachers.length === 0 ? (
          <EmptyState
            title="No Teachers Yet"
            description="Add your first teacher to get started."
            actionLabel="Add Teacher"
            onAction={() => window.location.href = "/admin/teachers/add"}
          />
        ) : (
          teachers.map((teacher: any) => (
            <ListItem
              key={teacher.id}
              avatarName={teacher.name}
              title={teacher.name}
              subtitle={`${teacher.teacherId}${teacher.subjects?.length ? ` • ${teacher.subjects.join(", ")}` : ""}`}
              href={`/admin/teachers/${teacher.id}`}
              badge={
                teacher.isActive ? (
                  <Badge variant="accent" size="sm">Active</Badge>
                ) : (
                  <Badge variant="danger" size="sm">Inactive</Badge>
                )
              }
              rightContent={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              }
            />
          ))
        )}
      </div>

      <Fab href="/admin/teachers/add" />
    </div>
  );
}