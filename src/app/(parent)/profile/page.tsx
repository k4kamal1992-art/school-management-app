"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function ParentProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-6">
      <AppHeader title="My Profile" showBack />
      <div className="p-4 space-y-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-3">MD</div>
            <h2 className="text-xl font-bold text-slate-900">Mr. Das</h2>
            <p className="text-sm text-slate-500">Father of Rohan Das & Sneha Kaur</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 space-y-3">
            {[
              { label: "Mobile", value: "+91 98765 43230" },
              { label: "Email", value: "mr.das@email.com" },
              { label: "Address", value: "123 School Road, Kolkata" },
              { label: "Occupation", value: "Business" },
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