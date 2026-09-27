"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";

export default function AddHomeworkPage() {
  const [form, setForm] = useState({ title: "", subject: "", class: "", dueDate: "", description: "" });

  return (
    <div className="min-h-screen bg-slate-50 pb-6">
      <AppHeader title="Give Homework" showBack />
      <div className="p-4">
        <Card>
          <CardContent className="p-4 space-y-4">
            <Input label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} placeholder="e.g. Algebra Exercise 5.2" />
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subject</label>
              <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option>Select Subject</option>
                <option>Mathematics</option>
                <option>Science</option>
                <option>English</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Class & Section</label>
              <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option>Select Class</option>
                <option>8A</option>
                <option>8B</option>
                <option>9A</option>
              </select>
            </div>
            <Input label="Due Date" type="date" value={form.dueDate} onChange={(v) => setForm({ ...form, dueDate: v })} />
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Add details about the homework..."
                rows={4}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>
            <Button variant="primary" size="lg" fullWidth>Assign Homework</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}