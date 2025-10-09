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
import { TaskInterface } from "@/types/task";
import StatusBadge from "./status-badge";
import { parseContactNumbers, formatDisplayNumber } from "@/lib/phone";
import { useGetTasks } from "./hooks/useGetTasks";
import { sendEvent } from "@/lib/ga";

import { getTaskTypeLabel } from "@/lib/task";

export const TasksCards = () => {
  const { data: tasks, isFetching, isError, error, refetch } = useGetTasks();
  // tasks 依 created_at 由新到舊排序
  const sortedTasks = [...(tasks ?? [])].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  if (isFetching) {
    return (
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="animate-pulse flex flex-col h-full">
              <CardHeader className="gap-2">
                <div className="h-4 w-1/2 rounded bg-muted" />
                <div className="h-3 w-1/3 rounded bg-muted" />
              </CardHeader>
              <CardContent className="flex flex-col space-y-2 flex-1">
                <div className="h-3 w-full rounded bg-muted" />
                <div className="h-3 w-5/6 rounded bg-muted" />
                <div className="h-3 w-4/6 rounded bg-muted" />
              </CardContent>
              <CardFooter className="mt-auto flex justify-between items-center">
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
    <div className="grid grid-cols-1 gap-4 p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:p-4 items-stretch">
      {sortedTasks.map((task: TaskInterface) => (
        <Card key={task.id} className="transition-colors flex flex-col h-full">
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
          <CardContent className="flex flex-col space-y-2 flex-1">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {task.description}
            </p>
            <div className="mt-auto grid grid-cols-2 gap-2 text-sm">
              <div className="flex flex-col">
                <span className="text-muted-foreground">地點</span>
                <span className="line-clamp-1" title={task.work_location}>
                  {task.work_location}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">需要人數</span>
                <span>{task.weight === 0 ? "無設定" : task.weight}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">聯絡電話</span>
                <span>
                  {(() => {
                    const nums = parseContactNumbers(task.contact_number);
                    if (nums.length === 0) return "無";
                    return (
                      <div className="flex flex-col">
                        {nums.map((n) => (
                          <a
                            key={n}
                            href={`tel:${n}`}
                            className="text-primary underline"
                            aria-label={`撥打聯絡電話 ${formatDisplayNumber(n)}`}
                          >
                            {formatDisplayNumber(n)}
                          </a>
                        ))}
                      </div>
                    );
                  })()}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">建立者</span>
                <span>{task.creator_name || "光復e互助平台"}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="mt-auto flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              {(() => {
                const d = new Date(task.created_at);
                return `建立於 ${d.toLocaleDateString("zh-TW", { timeZone: "Asia/Taipei" })}`;
              })()}
            </div>
            <Link href={`/tasks/${task.id}`}>
              <Button
                size="sm"
                aria-label="查看詳情"
                onClick={() =>
                  sendEvent("cta_task_view_detail", { task_id: task.id })
                }
              >
                查看詳情
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
