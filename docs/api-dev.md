## API 串接與開發規格（React Query + OpenAPI）

### 1. 總覽
- 以 `openapi-typescript` 自遠端 OpenAPI Schema 產出型別檔 `src/lib/api/types.ts`
- 以 `openapi-fetch` 建立通用型別安全客戶端，並自動掛載 Authorization header（整合 NextAuth session `accessToken`）
- 以 React Query 包裝常用任務（task）功能 hooks

Schema 來源：`https://hualien_guangfu_backend.m9h8.com/api/v1/openapi.json`
<!-- 舊的 http://hanservice.synology.me:8923/api/v1/openapi.json -->

環境變數（可選）：
```
NEXT_PUBLIC_API_BASE_URL=https://hopenet.m9h8.com
```

### 2. 型別生成
- 生成指令
```
pnpm run api:types
```

- `package.json` 腳本
```
"api:types": "openapi-typescript https://hualien_guangfu_backend.m9h8.com/api/v1/openapi.json -o src/lib/api/types.ts"
```

輸出檔案：`src/lib/api/types.ts`

### 3. 通用 API 客戶端
檔案：`src/lib/api/client.ts`

設計重點：
- 預設 Base URL 取自 `NEXT_PUBLIC_API_BASE_URL`，預設值 `https://hopenet.m9h8.com`
- 以 Middleware 方式於每次請求加上 `Content-Type: application/json` 與可選 `Authorization: Bearer <token>`

使用：
```tsx
import { apiClient, createApiClient } from "@/lib/api";

// 直接使用預設客戶端
const res = await apiClient.GET("/api/v1/tasks/");

// 或在元件端根據 session 建立客製客戶端（已封裝成 hook）
```

### 4. 取用客戶端的 Hook
檔案：`src/lib/api/hooks.ts`

說明：
- `useApiClient()` 會透過 `useSession()` 取得 `accessToken` 並建立帶權限的客戶端

使用：
```tsx
import { useApiClient } from "@/lib/api";

const api = useApiClient();
const { data, error } = await api.GET("/api/v1/tasks/");
```

### 5. Task 模組 Hooks
檔案：`src/lib/api/tasks.ts`

提供的 hooks（主要路由節錄自 OpenAPI）：
- 列表：`useTasks()` → GET `/api/v1/tasks/`
- 單筆：`useTask(taskId)` → GET `/api/v1/tasks/{task_id}`
- 建立：`useCreateTask()` → POST `/api/v1/tasks/`
- 更新：`useUpdateTask(taskId)` → PUT `/api/v1/tasks/{task_id}`
- 刪除：`useDeleteTask(taskId)` → DELETE `/api/v1/tasks/{task_id}`
- 審核：`useApproveTask(taskId)` → POST `/api/v1/tasks/{task_id}/approve`
- 認領（兩種入口）：`useClaimTask(taskId?)` → POST `/api/v1/tasks/{task_id}/claim` 或 `/api/v1/tasks/claim`
- 我的認領：`useMyClaims()` → GET `/api/v1/tasks/claims/my`
- 任務認領列表：`useTaskClaims(taskId)` → GET `/api/v1/tasks/{task_id}/claims`
- 認領狀態：`useUpdateClaimStatus(claimId)` → PUT `/api/v1/tasks/claims/{claim_id}/status`
- 統計：`useTaskStatistics()` → GET `/api/v1/tasks/statistics`
- 待審核：`usePendingApprovalTasks()` → GET `/api/v1/tasks/pending-approval`
- 可認領：`useAvailableTasks()` → GET `/api/v1/tasks/available`
- 我的歷史：`useMyTaskHistory()` → GET `/api/v1/tasks/history/my`
- 活動紀錄：`useTaskActivityLog(taskId)` → GET `/api/v1/tasks/{task_id}/activity-log`
- 衝突檢查：`useTaskConflicts(taskId)` → GET `/api/v1/tasks/{task_id}/conflicts`

使用範例：
```tsx
import { useTasks, useCreateTask } from "@/lib/api";

export function TaskList() {
  const { data, isLoading, error } = useTasks();
  const createTask = useCreateTask();

  if (isLoading) return <div className="p-4">載入中...</div>;
  if (error) return <div className="p-4 text-red-500">發生錯誤</div>;

  return (
    <div className="p-4 space-y-4">
      <ul className="space-y-2">
        {data?.map((t: any) => (
          <li key={t.id} className="rounded border p-3">{t.title}</li>
        ))}
      </ul>
      <button
        className="rounded bg-black px-3 py-2 text-white"
        onClick={() => createTask.mutate({ title: "Demo" })}
      >
        新增任務
      </button>
    </div>
  );
}
```

### 6. 注意事項
- 若 NextAuth 尚未將 `accessToken` 放入 `session`，請在 `callbacks.session` 中注入以啟用帶權限請求
- `API_BASE_URL` 已避免重複 `/api/v1`，路由請傳入完整路徑（例：`/api/v1/tasks/...`）
- Hooks 已設定對應的 `queryKey` 與基本快取失效策略，若 UI 有特別需求可另行擴充


