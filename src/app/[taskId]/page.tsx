// 公開頁面、提供給志工看的、無法編輯、只能檢視
//

import { mockData } from "@/components/task/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TaskDetailPage({
  params,
}: {
  params: { taskId: string };
}) {
  const task = mockData.find((t) => t.id === params.taskId);

  if (!task) {
    return <div className="p-4">找不到此任務</div>;
  }

  return (
    <div className="container mx-auto px-4 py-4 max-w-3xl space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{task.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{task.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">任務類型</div>
              <div>{task.type}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">狀態</div>
              <div>{task.status}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">地點</div>
              <div>{task.work_location}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">需要人數</div>
              <div>
                {task.claimed_count}/{task.required_number_of_people}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">優先級</div>
              <div>{task.danger_level}/5</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">建立者</div>
              <div>{task.creator_name || "未知"}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">建立時間</div>
              <div>
                {new Date(task.created_at).toLocaleString("zh-TW", { timeZone: "Asia/Taipei" })}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">最後更新</div>
              <div>
                {new Date(task.updated_at).toLocaleString("zh-TW", { timeZone: "Asia/Taipei" })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
