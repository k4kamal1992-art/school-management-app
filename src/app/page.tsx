"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/welcome");
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-primary-dark flex flex-col items-center justify-center">
      {/* School Building SVG Illustration */}
      <div className="mb-8 animate-pulse">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="40" width="80" height="70" rx="8" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="2.5"/>
          <path d="M10 40L60 10L110 40" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="white" fillOpacity="0.1"/>
          <rect x="35" y="55" width="18" height="22" rx="2" fill="white" fillOpacity="0.25"/>
          <rect x="67" y="55" width="18" height="22" rx="2" fill="white" fillOpacity="0.25"/>
          <rect x="48" y="85" width="24" height="25" rx="2" fill="white" fillOpacity="0.3"/>
          <circle cx="60" cy="28" r="6" fill="white" fillOpacity="0.4"/>
          <path d="M56 32L60 24L64 32" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <h1 className="text-white text-2xl font-bold mb-2 tracking-wide">School Manager</h1>
      <p className="text-blue-100 text-sm mb-8">Smart School Management</p>

      {/* Loading dots */}
      <div className="flex gap-2">
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}/>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms"}}/>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms"}}/>
      </div>

      <p className="absolute bottom-8 text-blue-200 text-xs">v1.0.0</p>
    </div>
  );
}