"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-primary-dark flex flex-col">
      {/* Hero Illustration */}
      <div className="flex-1 flex items-center justify-center pt-12">
        <svg width="280" height="220" viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* School Building */}
          <rect x="60" y="60" width="160" height="140" rx="12" fill="white" fillOpacity="0.12" stroke="white" strokeWidth="2"/>
          <path d="M40 60L140 10L240 60" stroke="white" strokeWidth="2.5" strokeLinejoin="round" fill="white" fillOpacity="0.08"/>
          {/* Windows */}
          <rect x="80" y="85" width="32" height="40" rx="4" fill="white" fillOpacity="0.25"/>
          <rect x="124" y="85" width="32" height="40" rx="4" fill="white" fillOpacity="0.25"/>
          <rect x="168" y="85" width="32" height="40" rx="4" fill="white" fillOpacity="0.25"/>
          {/* Door */}
          <rect x="116" y="140" width="48" height="60" rx="4" fill="white" fillOpacity="0.35"/>
          {/* Flag */}
          <line x1="200" y1="25" x2="200" y2="55" stroke="white" strokeWidth="2"/>
          <path d="M200 28L225 38L200 48" fill="white" fillOpacity="0.4"/>
          {/* Students */}
          <circle cx="75" cy="185" r="10" fill="white" fillOpacity="0.3"/>
          <rect x="68" y="195" width="14" height="18" rx="3" fill="white" fillOpacity="0.25"/>
          <circle cx="205" cy="185" r="10" fill="white" fillOpacity="0.3"/>
          <rect x="198" y="195" width="14" height="18" rx="3" fill="white" fillOpacity="0.25"/>
          {/* Stars */}
          <circle cx="30" cy="40" r="3" fill="white" fillOpacity="0.5"/>
          <circle cx="250" cy="50" r="2.5" fill="white" fillOpacity="0.4"/>
          <circle cx="220" cy="20" r="2" fill="white" fillOpacity="0.3"/>
        </svg>
      </div>

      {/* Bottom Card */}
      <div className="bg-white rounded-t-[32px] px-6 pt-8 pb-10">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">
          School Management
        </h2>
        <p className="text-slate-500 text-center text-sm mb-8 leading-relaxed">
          Manage your school efficiently with our all-in-one platform for admin, teachers, students, and parents.
        </p>

        <div className="space-y-3">
          <Button variant="primary" size="lg" fullWidth onClick={() => router.push("/login")}>
            Login
          </Button>
          <Button variant="outline" size="lg" fullWidth onClick={() => router.push("/create-school")}>
            Create New School
          </Button>
        </div>
      </div>
    </div>
  );
}