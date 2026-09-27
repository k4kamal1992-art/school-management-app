"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { ListItem } from "@/components/ui/ListItem";
import { Fab } from "@/components/ui/Fab";
import { Badge } from "@/components/ui/Badge";

const subjects = [
  { id: "1", name: "Bengali", code: "BEN", classCount: 5 },
  { id: "2", name: "English", code: "ENG", classCount: 5 },
  { id: "3", name: "Mathematics", code: "MATH", classCount: 5 },
  { id: "4", name: "Science", code: "SCI", classCount: 5 },
  { id: "5", name: "History", code: "HIS", classCount: 3 },
  { id: "6", name: "Geography", code: "GEO", classCount: 3 },
];

export default function SubjectsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <AppHeader title="Subjects" subtitle="All subjects" showBack />

      <div className="p-4 space-y-3">
        {subjects.map((sub) => (
          <ListItem
            key={sub.id}
            avatarName={sub.code}
            avatarColor="bg-purple text-white"
            title={sub.name}
            subtitle={`Code: ${sub.code}`}
            badge={<Badge variant="primary" size="sm">{sub.classCount} Classes</Badge>}
            rightContent={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            }
            href={`/admin/subjects/${sub.id}`}
          />
        ))}
      </div>

      <Fab href="/admin/subjects/add" />
    </div>
  );
}