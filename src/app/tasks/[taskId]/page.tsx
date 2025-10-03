// 單筆案件詳細頁面
import { mockData } from "@/components/task/data";

export default async function TaskDetailRoute({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;
  const task = mockData.find((t) => t.id === taskId);

  if (!task) {
    return <div className="p-4">找不到此任務</div>;
  }

  return (
    <div className="container mx-auto px-4 py-4 max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <p className="text-muted-foreground">{task.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-muted-foreground">任務類型</div>
          <div>{task.task_type}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">狀態</div>
          <div>{task.status}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">地點</div>
          <div>{task.location_data.address}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">需要人數</div>
          <div>
            {task.claimed_count}/{task.required_volunteers}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">優先級</div>
          <div>{task.priority_level}/5</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">建立者</div>
          <div>{task.creator_name || "未知"}</div>
        </div>
      </div>
    </div>
  );
}


