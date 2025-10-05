"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TaskInterface, TaskType } from "@/types/task";
import StatusBadge from "./status-badge";
import { useGetTasks } from "./hooks/useGetTasks";

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

// use StatusBadge component

export const TasksCards = () => {
  const { data: tasks, isFetching, isError, error, refetch } = useGetTasks();

  if (isFetching) {
    return (
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="gap-2">
                <div className="h-4 w-1/2 rounded bg-muted" />
                <div className="h-3 w-1/3 rounded bg-muted" />
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="h-3 w-full rounded bg-muted" />
                <div className="h-3 w-5/6 rounded bg-muted" />
                <div className="h-3 w-4/6 rounded bg-muted" />
              </CardContent>
              <CardFooter className="justify-between">
                <div className="h-3 w-24 rounded bg-muted" />
                <div className="h-8 w-20 rounded bg-muted" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 sm:p-8">
        <div className="mx-auto max-w-md rounded-md border bg-card p-4 text-card-foreground">
          <div className="mb-2 text-base font-medium">載入失敗</div>
          <div className="mb-4 text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "請稍後再試"}
          </div>
          <Button onClick={() => refetch()} variant="outline">
            重新整理
          </Button>
        </div>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="p-6 sm:p-12">
        <div className="mx-auto max-w-md text-center">
          <div className="text-2xl font-semibold">目前沒有任務</div>
          <div className="mt-2 text-muted-foreground">
            稍後再回來看看，或前往建立新的任務。
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:p-4">
      {tasks.map((task: TaskInterface) => (
        <Card key={task.id} className="transition-colors">
          <CardHeader className="gap-2">
            <CardTitle className="line-clamp-1 text-base sm:text-lg">
              {task.title}
            </CardTitle>
            <CardDescription className="flex flex-wrap items-center gap-2">
              <StatusBadge
                status={task.status}
                className="px-2 py-0.5 text-xs rounded-full"
              />
              <span className="text-xs text-muted-foreground">
                {getTaskTypeLabel(task.type)}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground line-clamp-2">
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
                  {task.maximum_number_of_people === 0 &&
                  task.required_number_of_people === 0
                    ? "無設定"
                    : `${task.claimed_count}/${task.required_number_of_people}`}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">優先級</span>
                <span>{task.danger_level}/5</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">建立者</span>
                <span>{task.creator_name || "未知"}</span>
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
            <Link href={`/tasks/${task.id}`}>
              <Button size="sm" aria-label="查看詳情">
                查看詳情
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
