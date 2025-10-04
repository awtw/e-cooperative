"use client";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TaskInterface, TaskStatus, TaskType } from "@/types/task";
import { useGetTasks } from "./hooks/useGetTasks";
import { getTaskById } from "@/service/task";

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

export const TasksCards = () => {
  const router = useRouter();
  const qc = useQueryClient();
  const { data: tasks, isFetching } = useGetTasks();

  if (isFetching) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!tasks || tasks.length === 0) {
    return <div className="p-4 text-center">目前沒有任務</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tasks.map((task: TaskInterface) => (
        <Card key={task.id} className="transition-colors">
          <CardHeader className="gap-2">
            <CardTitle className="line-clamp-2 text-base sm:text-lg">
              {task.title}
            </CardTitle>
            <CardDescription className="flex flex-wrap items-center gap-2">
              <span
                className={`px-2 py-0.5 text-xs rounded-full ${getStatusBadge(task.status)}`}
              >
                {task.status === "pending" && "待審核"}
                {task.status === "available" && "可認領"}
                {task.status === "claimed" && "已認領"}
                {task.status === "in_progress" && "進行中"}
                {task.status === "completed" && "已完成"}
                {task.status === "cancelled" && "已取消"}
              </span>
              <span className="text-xs text-muted-foreground">
                {getTaskTypeLabel(task.type)}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {task.description}
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex flex-col">
                <span className="text-muted-foreground">地點</span>
                <span className="line-clamp-1" title={task.work_location}>
                  {task.work_location}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">需要人數</span>
                <span>
                  {task.claimed_count}/{task.required_number_of_people}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">優先級</span>
                <span>{task.danger_level}/5</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">建立者</span>
                <span>{task.creator_name || "光復e互助平台"}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <div className="text-xs text-muted-foreground">
              {(() => {
                const d = new Date(task.created_at);
                return `建立於 ${d.toLocaleDateString("zh-TW", { timeZone: "Asia/Taipei" })}`;
              })()}
            </div>
            <Button
              size="sm"
              aria-label="查看詳情"
              onMouseEnter={() => {
                // prefetch single task on hover to improve UX
                qc.prefetchQuery({
                  queryKey: ["task", task.id],
                  queryFn: () => getTaskById(task.id),
                });
              }}
              onClick={() => {
                // set the single task in cache so detail can read it immediately
                qc.setQueryData(["task", task.id], task);
                router.push(`/tasks/${task.id}`);
              }}
            >
              查看詳情
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
