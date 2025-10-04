// 單筆案件詳細頁面
import { mockData } from "@/components/task/data";
import { TaskStatus, TaskType } from "@/types/task";

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
      <p className="text-muted-foreground whitespace-pre-wrap">
        {task.description}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-muted-foreground">任務類型</div>
          <div>{getTaskTypeLabel(task.task_type)}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">狀態</div>
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
