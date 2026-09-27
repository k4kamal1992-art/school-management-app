"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useStudents } from "@/hooks/useStudents";

export default function AddStudentPage() {
  const router = useRouter();
  const { createStudent, isCreating } = useStudents();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    parentMobile: "",
    rollNumber: "",
    classId: "",
    sectionId: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    address: "",
    guardianName: "",
  });

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createStudent(form, {
      onSuccess: () => router.push("/admin/students"),
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader title="Add Student" subtitle="New admission" showBack />

      <form onSubmit={handleSubmit} className="p-4 space-y-4 pb-10">
        <div className="bg-white rounded-card p-4 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Student Information</h3>
          <div className="grid grid-cols-2 gap-3">
            <Input label="First Name *" placeholder="First name" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} required />
            <Input label="Last Name" placeholder="Last name" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Roll Number *" placeholder="e.g. 01" value={form.rollNumber} onChange={(e) => update("rollNumber", e.target.value)} required />
            <Input label="Date of Birth" type="date" value={form.dob} onChange={(e) => update("dob", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Gender</label>
            <div className="flex gap-3">
              {["Male", "Female", "Other"].map((g) => (
                <button key={g} type="button" onClick={() => update("gender", g.toUpperCase())}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                    form.gender === g.toUpperCase() ? "border-primary bg-primary-light text-primary" : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}>{g}</button>
              ))}
            </div>
          </div>
          <Input label="Blood Group" placeholder="e.g. A+" value={form.bloodGroup} onChange={(e) => update("bloodGroup", e.target.value)} />
          <Input label="Address" placeholder="Full address" value={form.address} onChange={(e) => update("address", e.target.value)} />
        </div>

        <div className="bg-white rounded-card p-4 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Contact Information</h3>
          <Input label="Student Mobile" placeholder="98XXXXXXXX" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} />
          <Input label="Parent Mobile *" placeholder="98XXXXXXXX" value={form.parentMobile} onChange={(e) => update("parentMobile", e.target.value)} required />
          <Input label="Guardian Name" placeholder="Father/Mother name" value={form.guardianName} onChange={(e) => update("guardianName", e.target.value)} />
        </div>

        <Button variant="primary" size="lg" fullWidth isLoading={isCreating} type="submit">
          Admit Student
        </Button>
      </form>
    </div>
  );
}