"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

const students = [
  { id: "1", roll: "01", name: "Rohan Das" },
  { id: "2", roll: "02", name: "Sneha Kaur" },
  { id: "3", roll: "03", name: "Arun Pal" },
  { id: "4", roll: "04", name: "Mina Barman" },
  { id: "5", roll: "05", name: "Kunal Roy" },
];

export default function MarksEntryPage() {
  const [marks, setMarks] = useState<Record<string, string>>({});

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <AppHeader title="Enter Marks" subtitle="First Term Exam - Mathematics (8A)" showBack />
      <div className="p-4 space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
              <span>Full Marks: 100</span>
              <span>Pass Marks: 33</span>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-2">
          {students.map((s) => (
            <Card key={s.id} padding="sm">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0">{s.roll}</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">{s.name}</p>
                    <p className="text-xs text-slate-500">Roll: {s.roll}</p>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={marks[s.id] || ""}
                    onChange={(e) => setMarks({ ...marks, [s.id]: e.target.value })}
                    placeholder="0"
                    className="w-20 text-center border border-slate-200 rounded-xl py-2 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button variant="primary" size="lg" fullWidth>Save Marks</Button>
      </div>
    </div>
  );
}