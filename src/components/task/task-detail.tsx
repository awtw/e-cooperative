"use client";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTaskById } from "@/service/task";
import { TaskInterface, TaskType, TaskStatus } from "@/types/task";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { EmptyState } from "@/components/ui/empty-state";

const getTaskTypeLabel = (type: TaskType) => {
  switch (type) {
    case "cleanup":
      return "環境清理";
    case "rescue":
      return "緊急救援";
    case "supply_delivery":
      return "物資配送";
    case "medical_aid":
      return "醫療支援";
    case "shelter_support":
      return "收容支援";
    default:
      return type;
  }
};

const getStatusBadge = (status: TaskStatus) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "available":
      return "bg-green-100 text-green-800";
    case "claimed":
      return "bg-blue-100 text-blue-800";
    case "in_progress":
      return "bg-purple-100 text-purple-800";
    case "completed":
      return "bg-gray-100 text-gray-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function TaskDetail({ taskId }: { taskId: string }) {
  const qc = useQueryClient();

  const {
    data: task,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<TaskInterface | undefined, Error>({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById(taskId),
    initialData: () => {
      const list = qc.getQueryData<TaskInterface[]>(["tasks"]);
      return list?.find((t) => String(t.id) === String(taskId));
    },
    staleTime: 1000 * 60, // 1 minute
    retry: 3, // 重試 3 次
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // 指數退避
  });

  // 載入狀態
  if (isLoading) {
    return <LoadingState message="載入任務詳情中..." variant="spinner" />;
  }

  // 錯誤狀態
  if (isError) {
    return (
      <ErrorState
        error={error}
        onRetry={() => refetch()}
        title="無法載入任務詳情"
        description="無法從伺服器取得任務資料，請檢查網路連線或稍後再試"
      />
    );
  }

  // 找不到任務
  if (!task) {
    return (
      <EmptyState
        title="找不到此任務"
        description="此任務可能已被刪除或不存在"
        actionLabel="返回任務列表"
        actionHref="/list"
      />
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8">
      <div className="bg-white/60 shadow-sm rounded-lg border border-gray-100 overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold leading-tight mb-6">
                {task.title}
              </h1>
              <div className="mt-2 text-lg text-muted-foreground max-w-xl whitespace-pre-wrap">
                {task.description}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-lg font-medium ${getStatusBadge(task.status)}`}
              >
                {task.status === "pending" && "待審核"}
                {task.status === "available" && "可認領"}
                {task.status === "claimed" && "已認領"}
                {task.status === "in_progress" && "進行中"}
                {task.status === "completed" && "已完成"}
                {task.status === "cancelled" && "已取消"}
              </span>
            </div>
          </div>

          <div className="mt-6 border-t pt-6">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <div className="sm:col-span-1">
                <dt className="text-muted-foreground">任務類型</dt>
                <dd className="mt-1 text-base font-medium">
                  {getTaskTypeLabel(task.type)}
                </dd>
              </div>

              <div>
                <dt className="text-muted-foreground">地點</dt>
                <dd className="mt-1 text-base">{task.work_location || "無"}</dd>
              </div>

              <div>
                <dt className="text-muted-foreground">開始時間</dt>
                <dd className="mt-1 text-base">
                  {task.start_at
                    ? new Date(task.start_at).toLocaleString("zh-TW", {
                        timeZone: "Asia/Taipei",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "無"}
                </dd>
              </div>

              <div>
                <dt className="text-muted-foreground">截止時間</dt>
                <dd className="mt-1 text-base">
                  {task.deadline
                    ? new Date(task.deadline).toLocaleString("zh-TW", {
                        timeZone: "Asia/Taipei",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "無"}
                </dd>
              </div>

              <div>
                <dt className="text-muted-foreground">需要人數</dt>
                <dd className="mt-1 text-base">
                  {task.maximum_number_of_people === 0 && task.required_number_of_people === 0
                    ? "無設定"
                    : `${task.claimed_count}/${task.required_number_of_people}`}
                </dd>
              </div>

              <div>
                <dt className="text-muted-foreground">優先級</dt>
                <dd className="mt-1 text-base">{task.danger_level}/5</dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-muted-foreground">建立者</dt>
                <dd className="mt-1 text-base">
                  {task.creator_name || "光復e互助平台"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
