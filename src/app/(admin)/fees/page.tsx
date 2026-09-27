"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Fab } from "@/components/ui/Fab";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

const feeStructures = [
  { id: "1", name: "Tuition Fee", amount: 1200, frequency: "MONTHLY", className: "All Classes", dueDay: 10 },
  { id: "2", name: "Exam Fee", amount: 500, frequency: "ONETIME", className: "All Classes", dueDay: null },
  { id: "3", name: "Library Fee", amount: 300, frequency: "YEARLY", className: "All Classes", dueDay: null },
];

const dueList = [
  { student: "Rohan Das", className: "8A", roll: "01", amount: 2400, months: "May, Jun" },
  { student: "Arun Pal", className: "8A", roll: "03", amount: 1200, months: "Jun" },
];

export default function FeesPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <AppHeader title="Fees" subtitle="Fee management" showBack />

      <div className="p-4 space-y-4">
        {/* Fee Structure */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900">Fee Structure</h3>
              <Link href="/admin/fees/structure" className="text-primary text-xs font-semibold">Manage</Link>
            </div>
            <div className="space-y-2">
              {feeStructures.map((fee) => (
                <div key={fee.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{fee.name}</p>
                    <p className="text-xs text-slate-500">{fee.className} &bull; {fee.frequency}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">Rs. {fee.amount}</p>
                    {fee.dueDay && <p className="text-xs text-slate-400">Due: {fee.dueDay}th</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Due List */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900">Fee Due</h3>
              <Badge variant="danger" size="sm">{dueList.length} Students</Badge>
            </div>
            <div className="space-y-2">
              {dueList.map((due, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-danger-light flex items-center justify-center text-danger font-bold text-sm">{due.student.charAt(0)}</div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{due.student}</p>
                      <p className="text-xs text-slate-500">Class {due.className} &bull; Roll {due.roll}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-danger">Rs. {due.amount}</p>
                    <p className="text-xs text-slate-400">{due.months}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Fab href="/admin/fees/add" />
    </div>
  );
}