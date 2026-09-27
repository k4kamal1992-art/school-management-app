"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Fab } from "@/components/ui/Fab";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/layout/EmptyState";
import Link from "next/link";

export default function ClassesPage() {
  // Mock data - replace with useClasses hook
  const classes = [
    { id: "1", name: "Class 8", numericValue: 8, studentCount: 45, sectionCount: 2 },
    { id: "2", name: "Class 9", numericValue: 9, studentCount: 52, sectionCount: 2 },
    { id: "3", name: "Class 10", numericValue: 10, studentCount: 48, sectionCount: 2 },
  ];
  const isLoading = false;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <AppHeader title="Classes" subtitle="All classes" showBack />

      <div className="p-4 space-y-3">
        {isLoading ? (
          <Skeleton count={4} className="h-24" />
        ) : classes.length === 0 ? (
          <EmptyState title="No Classes" description="Add your first class." actionLabel="Add Class" onAction={() => {}} />
        ) : (
          classes.map((cls) => (
            <Link key={cls.id} href={`/admin/classes/${cls.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center">
                      <span className="text-xl font-bold text-primary">{cls.numericValue}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{cls.name}</h3>
                      <p className="text-sm text-slate-500">{cls.studentCount} Students &bull; {cls.sectionCount} Sections</p>
                    </div>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>

      <Fab href="/admin/classes/add" />
    </div>
  );
}