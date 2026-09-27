"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useAdminDashboard } from "@/hooks/useDashboard";
import { Skeleton } from "@/components/ui/Skeleton";
import Link from "next/link";

export default function AdminDashboardPage() {
  const { data, isLoading } = useAdminDashboard();

  const stats = [
    {
      label: "Teachers",
      value: data?.totalTeachers || 0,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      ),
      color: "bg-primary-light",
      href: "/admin/teachers",
    },
    {
      label: "Students",
      value: data?.totalStudents || 0,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      color: "bg-accent-light",
      href: "/admin/students",
    },
    {
      label: "Classes",
      value: data?.totalClasses || 0,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      ),
      color: "bg-purple-light",
      href: "/admin/classes",
    },
    {
      label: "Attendance",
      value: data?.todayAttendance?.percentage !== undefined ? `${data.todayAttendance.percentage}%` : "--",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14l2 2 4-4"/>
        </svg>
      ),
      color: "bg-warning-light",
      href: "/admin/attendance",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <AppHeader title="Dashboard" subtitle="ABC High School" />

      <div className="p-4 space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-card p-4 h-24">
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-8 w-12" />
                </div>
              ))
            : stats.map((stat) => (
                <Link key={stat.label} href={stat.href}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-9 h-9 rounded-xl ${stat.color} flex items-center justify-center`}>
                          {stat.icon}
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                      <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
        </div>

        {/* Attendance Summary */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Today&apos;s Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-20 w-full" />
            ) : (
              <div className="flex items-center justify-around py-2">
                <div className="text-center">
                  <p className="text-xl font-bold text-accent">{data?.todayAttendance?.present || 0}</p>
                  <p className="text-xs text-slate-500">Present</p>
                </div>
                <div className="w-px h-10 bg-slate-200"/>
                <div className="text-center">
                  <p className="text-xl font-bold text-danger">{data?.todayAttendance?.absent || 0}</p>
                  <p className="text-xs text-slate-500">Absent</p>
                </div>
                <div className="w-px h-10 bg-slate-200"/>
                <div className="text-center">
                  <p className="text-xl font-bold text-warning">{data?.todayAttendance?.late || 0}</p>
                  <p className="text-xs text-slate-500">Late</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Notices */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Recent Notices</CardTitle>
              <Link href="/admin/notices" className="text-primary text-sm font-medium">View All</Link>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton count={3} className="h-12 mb-2" />
            ) : data?.recentNotices?.length > 0 ? (
              <div className="space-y-2">
                {data.recentNotices.map((notice: any) => (
                  <div key={notice.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{notice.title}</p>
                      <p className="text-xs text-slate-500">{notice.targetRole} &bull; {new Date(notice.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400 text-center py-4">No notices yet</p>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/admin/teachers/add">
            <div className="bg-white rounded-card p-4 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Add Teacher</p>
                <p className="text-xs text-slate-500">New staff</p>
              </div>
            </div>
          </Link>
          <Link href="/admin/students/add">
            <div className="bg-white rounded-card p-4 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Add Student</p>
                <p className="text-xs text-slate-500">Admission</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}