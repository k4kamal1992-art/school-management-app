import type { Metadata, Viewport } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const hindSiliguri = Hind_Siliguri({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  title: "School Management App",
  description: "Multi-tenant school management system for Admin, Teacher, Student & Parent",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#2563eb",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={hindSiliguri.variable}>
      <body className="min-h-screen bg-slate-100">{/* mobile-first responsive */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}