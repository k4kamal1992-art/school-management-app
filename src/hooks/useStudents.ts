"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export function useStudents(filters?: { classId?: string; sectionId?: string; status?: string }) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["students", filters],
    queryFn: async () => {
      const res = await api.get("/students", { params: filters });
      return res.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (studentData: any) => {
      const res = await api.post("/students", studentData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  return {
    students: data || [],
    isLoading,
    error,
    createStudent: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
}