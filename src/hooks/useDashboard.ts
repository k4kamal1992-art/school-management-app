"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export function useAdminDashboard() {
  return useQuery({
    queryKey: ["dashboard", "admin"],
    queryFn: async () => {
      const res = await api.get("/admin/dashboard");
      return res.data;
    },
  });
}