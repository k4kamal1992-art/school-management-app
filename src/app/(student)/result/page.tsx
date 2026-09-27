"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent } from "@/components/ui/Card";

const results = [
  { subject: "Bengali", marks: 82, full: 100, grade: "A" },
  { subject: "English", marks: 76, full: 100, grade: "A" },
  { subject: "Mathematics", marks: 91, full: 100, grade: "A+" },
  { subject: "Science", marks: 85, full: 100, grade: "A" },
  { subject: "History", marks: 78, full: 100, grade: "A" },
  { subject: "Geography", marks: 74, full: 100, grade: "B+" },
];

export default function StudentResultPage() {
  const total = results.reduce((s, r) => s + r.marks, 0);
  const fullTotal = results.reduce((s, r) => s + r.full, 0);
  const percentage = Math.round((total / fullTotal) * 100);

  return (
    <div className="min-h-screen bg-slate-50 pb-6">
      <AppHeader title="My Result" subtitle="First Term Exam 2026" showBack />

      <div className="p-4 space-y-4">
        {/* Overall */}
        <Card>
          <CardContent className="p-4 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-light mb-3">
              <div>
                <p className="text-2xl font-bold text-primary">{percentage}%</p>
                <p className="text-xs text-primary-dark">{total}/{fullTotal}</p>
              </div>
            </div>
            <p className="text-sm text-slate-500">Rank: <span className="font-bold text-slate-900">3rd</span> in Class 8A</p>
          </CardContent>
        </Card>

        {/* Subject-wise */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold text-slate-900 mb-3">Subject-wise Marks</h3>
            <div className="space-y-3">
              {results.map((r) => (
                <div key={r.subject}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-900">{r.subject}</span>
                    <span className="text-sm font-bold text-slate-900">{r.marks}/{r.full}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(r.marks / r.full) * 100}%` }}/>
                  </div>
                  <div className="flex justify-end mt-0.5">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      r.grade === "A+" ? "bg-accent-light text-accent" :
                      r.grade === "A" ? "bg-primary-light text-primary" :
                      "bg-warning-light text-warning"
                    }`}>{r.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}