"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "./hooks";

// Query Keys
const taskKeys = {
  all: ["tasks"] as const,
  list: (filters?: unknown) => ["tasks", "list", filters ?? "all"] as const,
  detail: (taskId: string) => ["tasks", "detail", taskId] as const,
  claims: (taskId: string) => ["tasks", "claims", taskId] as const,
  myClaims: ["tasks", "my-claims"] as const,
  stats: ["tasks", "stats"] as const,
  pending: ["tasks", "pending"] as const,
  available: ["tasks", "available"] as const,
  history: ["tasks", "history", "my"] as const,
  activity: (taskId: string) => ["tasks", "activity", taskId] as const,
  conflicts: (taskId: string) => ["tasks", "conflicts", taskId] as const,
};

export const useTasks = (params?: { query?: Record<string, string | number | boolean> }) => {
  const api = useApiClient();
  return useQuery({
    queryKey: taskKeys.list(params?.query),
    queryFn: async () => {
      const res = await api.GET("/api/v1/tasks/");
      if (res.error) throw new Error(res.error.message || "Failed to fetch tasks");
      return res.data;
    },
  });
};

export const useTask = (taskId?: string) => {
  const api = useApiClient();
  return useQuery({
    queryKey: taskKeys.detail(taskId ?? ""),
    queryFn: async () => {
      if (!taskId) return undefined;
      const res = await api.GET("/api/v1/tasks/{task_id}", { params: { path: { task_id: taskId } } });
      if (res.error) throw new Error(res.error.message || "Failed to fetch task");
      return res.data;
    },
    enabled: !!taskId,
  });
};

export const useCreateTask = () => {
  const api = useApiClient();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: unknown) => {
      const res = await api.POST("/api/v1/tasks/", { body });
      if (res.error) throw new Error(res.error.message || "Failed to create task");
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
};

export const useUpdateTask = (taskId: string) => {
  const api = useApiClient();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: unknown) => {
      const res = await api.PUT("/api/v1/tasks/{task_id}", { params: { path: { task_id: taskId } }, body });
      if (res.error) throw new Error(res.error.message || "Failed to update task");
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: taskKeys.detail(taskId) });
      qc.invalidateQueries({ queryKey: taskKeys.list() });
    },
  });
};

export const useDeleteTask = (taskId: string) => {
  const api = useApiClient();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await api.DELETE("/api/v1/tasks/{task_id}", { params: { path: { task_id: taskId } } });
      if (res.error) throw new Error(res.error.message || "Failed to delete task");
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: taskKeys.list() });
    },
  });
};

export const useApproveTask = (taskId: string) => {
  const api = useApiClient();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await api.POST("/api/v1/tasks/{task_id}/approve", { params: { path: { task_id: taskId } } });
      if (res.error) throw new Error(res.error.message || "Failed to approve task");
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: taskKeys.detail(taskId) });
      qc.invalidateQueries({ queryKey: taskKeys.pending });
    },
  });
};

export const useClaimTask = (taskId?: string) => {
  const api = useApiClient();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload?: unknown) => {
      if (taskId) {
        const res = await api.POST("/api/v1/tasks/{task_id}/claim", { params: { path: { task_id: taskId } } });
        if (res.error) throw new Error(res.error.message || "Failed to claim task");
        return res.data;
      }
      const res = await api.POST("/api/v1/tasks/claim", { body: payload });
      if (res.error) throw new Error(res.error.message || "Failed to claim task");
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: taskKeys.myClaims });
      if (taskId) qc.invalidateQueries({ queryKey: taskKeys.detail(taskId) });
    },
  });
};

export const useMyClaims = () => {
  const api = useApiClient();
  return useQuery({
    queryKey: taskKeys.myClaims,
    queryFn: async () => {
      const res = await api.GET("/api/v1/tasks/claims/my");
      if (res.error) throw new Error(res.error.message || "Failed to fetch my claims");
      return res.data;
    },
  });
};

export const useTaskClaims = (taskId: string) => {
  const api = useApiClient();
  return useQuery({
    queryKey: taskKeys.claims(taskId),
    queryFn: async () => {
      const res = await api.GET("/api/v1/tasks/{task_id}/claims", { params: { path: { task_id: taskId } } });
      if (res.error) throw new Error(res.error.message || "Failed to fetch claims");
      return res.data;
    },
    enabled: !!taskId,
  });
};

export const useUpdateClaimStatus = (claimId: string) => {
  const api = useApiClient();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: unknown) => {
      const res = await api.PUT("/api/v1/tasks/claims/{claim_id}/status", {
        params: { path: { claim_id: claimId } },
        body,
      });
      if (res.error) throw new Error(res.error.message || "Failed to update claim status");
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useTaskStatistics = () => {
  const api = useApiClient();
  return useQuery({
    queryKey: taskKeys.stats,
    queryFn: async () => {
      const res = await api.GET("/api/v1/tasks/statistics");
      if (res.error) throw new Error(res.error.message || "Failed to fetch statistics");
      return res.data;
    },
  });
};

export const usePendingApprovalTasks = () => {
  const api = useApiClient();
  return useQuery({
    queryKey: taskKeys.pending,
    queryFn: async () => {
      const res = await api.GET("/api/v1/tasks/pending-approval");
      if (res.error) throw new Error(res.error.message || "Failed to fetch pending approval tasks");
      return res.data;
    },
  });
};

export const useAvailableTasks = () => {
  const api = useApiClient();
  return useQuery({
    queryKey: taskKeys.available,
    queryFn: async () => {
      const res = await api.GET("/api/v1/tasks/available");
      if (res.error) throw new Error(res.error.message || "Failed to fetch available tasks");
      return res.data;
    },
  });
};

export const useMyTaskHistory = () => {
  const api = useApiClient();
  return useQuery({
    queryKey: taskKeys.history,
    queryFn: async () => {
      const res = await api.GET("/api/v1/tasks/history/my");
      if (res.error) throw new Error(res.error.message || "Failed to fetch my task history");
      return res.data;
    },
  });
};

export const useTaskActivityLog = (taskId: string) => {
  const api = useApiClient();
  return useQuery({
    queryKey: taskKeys.activity(taskId),
    queryFn: async () => {
      const res = await api.GET("/api/v1/tasks/{task_id}/activity-log", {
        params: { path: { task_id: taskId } },
      });
      if (res.error) throw new Error(res.error.message || "Failed to fetch activity log");
      return res.data;
    },
    enabled: !!taskId,
  });
};

export const useTaskConflicts = (taskId: string) => {
  const api = useApiClient();
  return useQuery({
    queryKey: taskKeys.conflicts(taskId),
    queryFn: async () => {
      const res = await api.GET("/api/v1/tasks/{task_id}/conflicts", {
        params: { path: { task_id: taskId } },
      });
      if (res.error) throw new Error(res.error.message || "Failed to fetch conflicts");
      return res.data;
    },
    enabled: !!taskId,
  });
};


