"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function StudentProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-6">
      <AppHeader title="My Profile" showBack />
      <div className="p-4 space-y-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-3">RD</div>
            <h2 className="text-xl font-bold text-slate-900">Rohan Das</h2>
            <p className="text-sm text-slate-500">Class 8A &bull; Roll: 01</p>
            <p className="text-xs text-slate-400 mt-1">Admission: A2025001</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 space-y-3">
            {[
              { label: "Father's Name", value: "Mr. Das" },
              { label: "Mother's Name", value: "Mrs. Das" },
              { label: "Date of Birth", value: "15 Jan 2010" },
              { label: "Blood Group", value: "A+" },
              { label: "Mobile", value: "+91 98765 43220" },
              { label: "Address", value: "1 Sample Street, Kolkata" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <span className="text-sm text-slate-500">{item.label}</span>
                <span className="text-sm font-semibold text-slate-900">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Button variant="danger" size="lg" fullWidth>Log Out</Button>
      </div>
    </div>
  );
}