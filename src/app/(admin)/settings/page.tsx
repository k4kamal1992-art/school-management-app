"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-6">
      <AppHeader title="Settings" showBack />
      <div className="p-4 space-y-4">
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-bold text-slate-900">School Information</h3>
            <Input label="School Name" value="Demo High School" onChange={() => {}} />
            <Input label="Address" value="123 School Road, Kolkata" onChange={() => {}} />
            <Input label="Phone" value="+91 3312345678" onChange={() => {}} />
            <Input label="Email" value="admin@demoschool.edu" onChange={() => {}} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-bold text-slate-900">Academic Settings</h3>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Current Academic Year</label>
              <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option>2025-2026</option>
                <option>2024-2025</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Grading System</label>
              <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option>GPA</option>
                <option>Percentage</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Attendance Method</label>
              <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option>Daily</option>
                <option>Subject-wise</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Button variant="primary" size="lg" fullWidth>Save Changes</Button>
      </div>
    </div>
  );
}