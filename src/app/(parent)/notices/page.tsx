"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const notices = [
  { id: "1", title: "Annual Sports Day on July 15", content: "All students are requested to participate in the Annual Sports Day event.", date: "2 days ago", pinned: true },
  { id: "2", title: "Fee Payment Deadline Extended", content: "The last date for fee payment has been extended to June 20.", date: "5 days ago", pinned: false },
  { id: "3", title: "Parent-Teacher Meeting", content: "PTM will be held on July 5, 2026. All parents are requested to attend.", date: "1 week ago", pinned: false },
];

export default function ParentNoticesPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-6">
      <AppHeader title="Notices" showBack />
      <div className="p-4 space-y-3">
        {notices.map((notice) => (
          <Card key={notice.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-slate-900">{notice.title}</h3>
                {notice.pinned && <Badge variant="warning" size="sm">PINNED</Badge>}
              </div>
              <p className="text-sm text-slate-600 mb-2">{notice.content}</p>
              <p className="text-xs text-slate-400">{notice.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}