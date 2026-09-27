"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function CreateSchoolPage() {
  const router = useRouter();
  const { register, isRegistering, registerError } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    schoolId: "",
    schoolName: "",
    schoolType: "",
    address: "",
    district: "",
    state: "",
    adminName: "",
    adminMobile: "",
    password: "",
    confirmPassword: "",
  });
  const [idAvailable, setIdAvailable] = useState<boolean | null>(null);

  const checkId = async () => {
    if (!form.schoolId) return;
    const res = await fetch(`/api/school/check-id?schoolId=${form.schoolId}`);
    const data = await res.json();
    setIdAvailable(data.available);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    register({
      schoolId: form.schoolId,
      schoolName: form.schoolName,
      schoolType: form.schoolType,
      address: form.address,
      district: form.district,
      state: form.state,
      adminName: form.adminName,
      adminMobile: form.adminMobile,
      password: form.password,
    });
  };

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="bg-primary px-6 pt-12 pb-8 rounded-b-[32px]">
        <button onClick={() => router.push("/welcome")} className="text-white/80 text-sm mb-4 flex items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back
        </button>
        <h1 className="text-2xl font-bold text-white">Create School</h1>
        <p className="text-blue-100 text-sm mt-1">Step {step} of 2</p>

        {/* Progress bar */}
        <div className="flex gap-2 mt-4">
          <div className={`h-1 flex-1 rounded-full ${step >= 1 ? "bg-white" : "bg-white/30"}`}/>
          <div className={`h-1 flex-1 rounded-full ${step >= 2 ? "bg-white" : "bg-white/30"}`}/>
        </div>
      </div>

      <form onSubmit={handleRegister} className="flex-1 px-6 pt-6 pb-10">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Input
                label="School ID *"
                placeholder="e.g. ABCHS001"
                value={form.schoolId}
                onChange={(e) => { update("schoolId", e.target.value.toUpperCase()); setIdAvailable(null); }}
                onBlur={checkId}
              />
              {idAvailable === false && <p className="text-danger text-xs mt-1">School ID already taken</p>}
              {idAvailable === true && <p className="text-accent text-xs mt-1">Available!</p>}
            </div>
            <Input label="School Name *" placeholder="ABC High School" value={form.schoolName} onChange={(e) => update("schoolName", e.target.value)} />
            <Input label="School Type" placeholder="High School / Primary / etc." value={form.schoolType} onChange={(e) => update("schoolType", e.target.value)} />
            <Input label="Address" placeholder="Full address" value={form.address} onChange={(e) => update("address", e.target.value)} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="District" placeholder="District" value={form.district} onChange={(e) => update("district", e.target.value)} />
              <Input label="State" placeholder="State" value={form.state} onChange={(e) => update("state", e.target.value)} />
            </div>
            <Button variant="primary" size="lg" fullWidth onClick={() => setStep(2)} type="button">
              Next
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <Input label="Admin Name *" placeholder="Full name" value={form.adminName} onChange={(e) => update("adminName", e.target.value)} />
            <Input label="Admin Mobile *" placeholder="98XXXXXXXX" value={form.adminMobile} onChange={(e) => update("adminMobile", e.target.value)} />
            <Input label="Password *" type="password" placeholder="Min 6 characters" value={form.password} onChange={(e) => update("password", e.target.value)} />
            <Input label="Confirm Password *" type="password" placeholder="Re-enter password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} />

            {registerError && (
              <p className="text-danger text-sm">{(registerError as any)?.response?.data?.error || "Registration failed"}</p>
            )}

            <div className="flex gap-3 pt-2">
              <Button variant="outline" size="lg" fullWidth onClick={() => setStep(1)} type="button">
                Back
              </Button>
              <Button variant="primary" size="lg" fullWidth isLoading={isRegistering} type="submit">
                Create School
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}