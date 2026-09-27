"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useTeachers } from "@/hooks/useTeachers";

export default function AddTeacherPage() {
  const router = useRouter();
  const { createTeacher, isCreating } = useTeachers();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    teacherId: "",
    qualification: "",
    specialization: "",
    gender: "",
    password: "teacher123",
  });

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTeacher(form, {
      onSuccess: () => router.push("/admin/teachers"),
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader title="Add Teacher" subtitle="Create new teacher account" showBack />

      <form onSubmit={handleSubmit} className="p-4 space-y-4 pb-10">
        <div className="bg-white rounded-card p-4 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Basic Information</h3>
          <Input label="Full Name *" placeholder="Enter teacher name" value={form.name} onChange={(e) => update("name", e.target.value)} required />
          <Input label="Teacher ID" placeholder="e.g. T001 (auto-generated if empty)" value={form.teacherId} onChange={(e) => update("teacherId", e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Mobile *" placeholder="98XXXXXXXX" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} required />
            <Input label="Email" type="email" placeholder="email@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Gender</label>
            <div className="flex gap-3">
              {["Male", "Female", "Other"].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => update("gender", g.toUpperCase())}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                    form.gender === g.toUpperCase()
                      ? "border-primary bg-primary-light text-primary"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-card p-4 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Professional Details</h3>
          <Input label="Qualification" placeholder="e.g. M.A., B.Ed." value={form.qualification} onChange={(e) => update("qualification", e.target.value)} />
          <Input label="Specialization" placeholder="e.g. Mathematics, Science" value={form.specialization} onChange={(e) => update("specialization", e.target.value)} />
        </div>

        <div className="bg-white rounded-card p-4 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Account</h3>
          <Input label="Initial Password" type="text" value={form.password} onChange={(e) => update("password", e.target.value)} />
          <p className="text-xs text-slate-400">Default password is &quot;teacher123&quot;. Teacher can change it later.</p>
        </div>

        <Button variant="primary" size="lg" fullWidth isLoading={isCreating} type="submit">
          Create Teacher
        </Button>
      </form>
    </div>
  );
}