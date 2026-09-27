"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoggingIn, loginError } = useAuth();
  const [schoolId, setSchoolId] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"school" | "credentials">("school");
  const [schoolName, setSchoolName] = useState("");

  const checkSchool = async () => {
    if (!schoolId.trim()) return;
    try {
      const res = await fetch(`/api/school/check-id?schoolId=${schoolId}`);
      const data = await res.json();
      if (data.available) {
        alert("School ID not found!");
      } else {
        setSchoolName(data.name || schoolId);
        setStep("credentials");
      }
    } catch {
      setStep("credentials");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ schoolId, mobile, password });
  };

  if (step === "school") {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <div className="bg-primary px-6 pt-12 pb-8 rounded-b-[32px]">
          <button onClick={() => router.push("/welcome")} className="text-white/80 text-sm mb-4 flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back
          </button>
          <h1 className="text-2xl font-bold text-white">Enter School ID</h1>
          <p className="text-blue-100 text-sm mt-1">Enter your school ID to continue</p>
        </div>

        <div className="flex-1 px-6 pt-8">
          <Input
            label="School ID"
            placeholder="e.g. ABCHS001"
            value={schoolId}
            onChange={(e) => setSchoolId(e.target.value.toUpperCase())}
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
          />
          <Button variant="primary" size="lg" fullWidth className="mt-6" onClick={checkSchool}>
            Continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="bg-primary px-6 pt-12 pb-8 rounded-b-[32px]">
        <button onClick={() => setStep("school")} className="text-white/80 text-sm mb-4 flex items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back
        </button>
        <h1 className="text-2xl font-bold text-white">Login</h1>
        <p className="text-blue-100 text-sm mt-1">{schoolId}</p>
      </div>

      <form onSubmit={handleLogin} className="flex-1 px-6 pt-8">
        <Input
          label="Mobile Number"
          placeholder="98XXXXXXXX"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>}
          className="mb-4"
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
        />

        {loginError && (
          <p className="text-danger text-sm mt-2">{(loginError as any)?.response?.data?.error || "Login failed"}</p>
        )}

        <div className="flex justify-end mt-2 mb-6">
          <Link href="/forgot-password" className="text-primary text-sm font-medium">
            Forgot Password?
          </Link>
        </div>

        <Button variant="primary" size="lg" fullWidth isLoading={isLoggingIn} type="submit">
          Login
        </Button>

        <p className="text-center text-slate-500 text-sm mt-6">
          Are you a parent?{" "}
          <Link href="/parent-login" className="text-primary font-semibold">
            Login with OTP
          </Link>
        </p>
      </form>
    </div>
  );
}