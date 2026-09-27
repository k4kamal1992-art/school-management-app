"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export function useTeachers(filters?: { classId?: string; subject?: string }) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["teachers", filters],
    queryFn: async () => {
      const res = await api.get("/teachers", { params: filters });
      return res.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (teacherData: any) => {
      const res = await api.post("/teachers", teacherData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });

  return {
    teachers: data || [],
    isLoading,
    error,
    createTeacher: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
}