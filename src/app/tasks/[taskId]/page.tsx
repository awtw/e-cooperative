// 單筆案件詳細頁面
import TaskDetail from "@/components/task/task-detail";

export default async function TaskDetailRoute({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;
  return <TaskDetail taskId={taskId} />;
}
