"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthUser {
  id: string;
  name: string;
  role: string;
  mobile: string;
  tenantId: string;
  schoolId: string;
  schoolName: string;
}

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const res = await api.get("/auth/me");
      return res.data.user as AuthUser;
    },
    enabled: !!token,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: { schoolId: string; mobile: string; password: string }) => {
      const res = await api.post("/auth/login", credentials);
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("schoolId", data.user.schoolId);
      queryClient.setQueryData(["auth", "me"], data.user);
      router.push(getDashboardRoute(data.user.role));
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/auth/register", data);
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("schoolId", data.user.schoolId);
      queryClient.setQueryData(["auth", "me"], data.user);
      router.push("/admin/dashboard");
    },
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("schoolId");
    queryClient.clear();
    router.push("/login");
  };

  return {
    user: data,
    isLoading,
    isAuthenticated: !!data,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    logout,
  };
}

function getDashboardRoute(role: string): string {
  const routes: Record<string, string> = {
    ADMIN: "/admin/dashboard",
    SUB_ADMIN: "/admin/dashboard",
    TEACHER: "/teacher/dashboard",
    STUDENT: "/student/dashboard",
    PARENT: "/parent/dashboard",
  };
  return routes[role] || "/";
}