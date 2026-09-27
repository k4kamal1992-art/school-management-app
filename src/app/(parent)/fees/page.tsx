"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const feeData = [
  { child: "Rohan Das", class: "8A", totalDue: 2400, items: [
    { name: "Tuition Fee - Jun", amount: 1200, dueDate: "2026-06-15", status: "DUE" },
    { name: "Exam Fee", amount: 500, dueDate: "2026-06-20", status: "DUE" },
  ]},
  { child: "Sneha Kaur", class: "10B", totalDue: 1200, items: [
    { name: "Tuition Fee - Jun", amount: 1200, dueDate: "2026-06-15", status: "DUE" },
  ]},
];

export default function ParentFeesPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-6">
      <AppHeader title="Fees & Dues" showBack />

      <div className="p-4 space-y-4">
        {feeData.map((data) => (
          <Card key={data.child}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-slate-900">{data.child}</h3>
                  <p className="text-xs text-slate-500">Class {data.class}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-danger">Rs. {data.totalDue}</p>
                  <p className="text-xs text-slate-500">Total Due</p>
                </div>
              </div>

              <div className="space-y-2">
                {data.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-500">Due: {item.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">Rs. {item.amount}</p>
                      <Badge variant="danger" size="sm">{item.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}