"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { ListItem } from "@/components/ui/ListItem";
import { Fab } from "@/components/ui/Fab";
import { SkeletonList } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/layout/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { useStudents } from "@/hooks/useStudents";

export default function StudentsPage() {
  const { students, isLoading } = useStudents();

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <AppHeader title="Students" subtitle="Manage all students" showBack />

      <div className="p-4 space-y-3">
        {isLoading ? (
          <SkeletonList count={6} />
        ) : students.length === 0 ? (
          <EmptyState
            title="No Students Yet"
            description="Add your first student to get started."
            actionLabel="Add Student"
            onAction={() => window.location.href = "/admin/students/add"}
          />
        ) : (
          students.map((student: any) => (
            <ListItem
              key={student.id}
              avatarName={student.name}
              title={student.name}
              subtitle={`Roll: ${student.rollNumber} • ${student.className}${student.sectionName ? ` ${student.sectionName}` : ""}`}
              href={`/admin/students/${student.id}`}
              badge={
                student.isActive ? (
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

      <Fab href="/admin/students/add" />
    </div>
  );
}