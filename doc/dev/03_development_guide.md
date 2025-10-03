# 光復 e 互助平台 - 開發指南

**文件版本**: v1.0
**建立日期**: 2025-10-03_00:36:04
**最後更新**: 2025-10-03_00:36:04

---

## 📋 目錄

1. [開發環境設定](#開發環境設定)
2. [開發流程](#開發流程)
3. [程式碼規範](#程式碼規範)
4. [元件開發指南](#元件開發指南)
5. [常見問題](#常見問題)

---

## 開發環境設定

### 系統需求

- **Node.js**: 18.x 或更高版本
- **npm/yarn/pnpm**: 任一套件管理工具
- **Git**: 版本控制
- **VSCode**: 推薦 IDE

### VSCode 推薦擴充套件

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### 環境安裝步驟

#### 1. Clone 專案

```bash
git clone <repository-url>
cd e-cooperative
```

#### 2. 安裝依賴

```bash
# 使用 npm
npm install

# 或使用 pnpm (推薦)
pnpm install

# 或使用 yarn
yarn install
```

#### 3. 設定環境變數

```bash
# 複製環境變數範本
cp .env.example .env.local

# 編輯 .env.local
NEXT_PUBLIC_API_BASE_URL=http://hanservice.synology.me:8923/api/v1
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

#### 4. 生成 API 型別

```bash
npm run api:types
```

#### 5. 啟動開發伺服器

```bash
npm run dev
```

開啟 http://localhost:3000 查看結果。

---

## 開發流程

### Git 工作流程

#### 1. 分支策略

```
main (主分支 - 生產環境)
  ↓
develop (開發分支)
  ↓
feature/* (功能分支)
hotfix/* (緊急修復分支)
```

#### 2. 建立功能分支

```bash
# 從 develop 分支建立新功能分支
git checkout develop
git pull origin develop
git checkout -b feature/task-claim-ui

# 開發...

# 提交變更
git add .
git commit -m "feat: 新增任務認領 UI"

# 推送到遠端
git push origin feature/task-claim-ui
```

#### 3. Commit 訊息規範

使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 類型**:
- `feat`: 新功能
- `fix`: Bug 修復
- `docs`: 文件更新
- `style`: 程式碼格式調整 (不影響功能)
- `refactor`: 重構 (不是新功能也不是修 bug)
- `perf`: 效能優化
- `test`: 測試相關
- `chore`: 建置流程或輔助工具的變動

**範例**:
```bash
feat(task): 新增任務認領功能

- 新增認領按鈕組件
- 實作認領 API 整合
- 新增認領成功提示

Closes #123
```

#### 4. Pull Request 流程

1. 確保程式碼通過 lint 檢查
   ```bash
   npm run lint
   ```

2. 確保程式碼格式化正確
   ```bash
   npm run format
   ```

3. 建立 Pull Request
   - 標題使用 Conventional Commits 格式
   - 描述變更內容與原因
   - 附上相關 issue 編號
   - 請求 code review

4. Code Review 通過後合併

---

## 程式碼規範

### TypeScript 規範

#### 1. 型別定義

```typescript
// ✅ 好的做法 - 使用明確的型別
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

const user: User = {
  id: "1",
  name: "張三",
  email: "user@example.com",
  role: "volunteer",
};

// ❌ 避免使用 any
const user: any = {...}; // 不好

// ✅ 無法確定型別時使用 unknown
const data: unknown = await fetchData();
if (isUser(data)) {
  // type guard
  console.log(data.name);
}
```

#### 2. 函式型別

```typescript
// ✅ 明確的參數和回傳型別
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ✅ 使用 async/await
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

#### 3. 泛型使用

```typescript
// ✅ 使用泛型增加靈活性
function createStore<T>(initialState: T) {
  return {
    state: initialState,
    setState: (newState: Partial<T>) => {
      // ...
    },
  };
}

const userStore = createStore<User>({
  id: "",
  name: "",
  email: "",
});
```

### React 規範

#### 1. 函式組件

```typescript
// ✅ 使用函式組件和 TypeScript
interface TaskCardProps {
  task: Task;
  onClaim?: (taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClaim }) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      {onClaim && (
        <button onClick={() => onClaim(task.id)}>認領</button>
      )}
    </div>
  );
};
```

#### 2. Hooks 使用

```typescript
// ✅ 自定義 Hook
function useTaskList(filters?: TaskFilters) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const data = await apiClient.GET("/api/v1/tasks/", {
        params: { query: filters },
      });
      setTasks(data ?? []);
      setLoading(false);
    };

    fetchTasks();
  }, [filters]);

  return { tasks, loading };
}
```

#### 3. 條件渲染

```typescript
// ✅ 清晰的條件渲染
export const TaskActions: React.FC<{ task: Task }> = ({ task }) => {
  const { data: session } = useSession();

  if (!session) return null;

  const canClaim = task.can_claim && task.status === "available";
  const canEdit = task.can_edit;

  return (
    <div className="flex gap-2">
      {canClaim && <ClaimButton taskId={task.id} />}
      {canEdit && <EditButton taskId={task.id} />}
    </div>
  );
};
```

### CSS / TailwindCSS 規範

#### 1. 使用工具類

```tsx
// ✅ 使用 Tailwind 工具類
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-lg font-semibold text-gray-900">標題</h2>
  <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
    按鈕
  </button>
</div>

// ❌ 避免內聯樣式
<div style={{ display: 'flex', padding: '16px' }}> // 不好
```

#### 2. 使用 cn 工具函式合併類名

```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className // 允許外部覆蓋
)}>
```

#### 3. 響應式設計

```tsx
// ✅ 使用響應式工具類
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Mobile: 1列, Tablet: 2列, Desktop: 3列 */}
</div>

<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  響應式標題
</h1>
```

### 檔案組織規範

#### 1. 檔案命名

- 組件檔案: `kebab-case.tsx` (例: `task-card.tsx`)
- 工具函式: `kebab-case.ts` (例: `api-client.ts`)
- 型別檔案: `kebab-case.ts` (例: `task-types.ts`)
- 常數檔案: `kebab-case.ts` (例: `api-constants.ts`)

#### 2. 匯出規範

```typescript
// ✅ 使用具名匯出
export const TaskCard = () => {...};
export const TaskList = () => {...};

// index.ts 集中匯出
export { TaskCard } from "./task-card";
export { TaskList } from "./task-list";

// ❌ 避免 default export (除非是頁面組件)
export default TaskCard; // 一般組件避免
```

---

## 元件開發指南

### 建立新組件

#### 1. 組件結構範本

```typescript
// src/components/task/task-card.tsx
"use client"; // 如需使用 hooks

import React from "react";
import { Task } from "@/types/task";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TaskCardProps {
  task: Task;
  onClaim?: (taskId: string) => void;
  className?: string;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onClaim,
  className,
}) => {
  const handleClaim = () => {
    onClaim?.(task.id);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <h3 className="text-lg font-semibold">{task.title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{task.description}</p>
        {task.can_claim && (
          <Button onClick={handleClaim}>認領任務</Button>
        )}
      </CardContent>
    </Card>
  );
};
```

#### 2. 使用 shadcn/ui 組件

```bash
# 新增 shadcn/ui 組件
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

#### 3. 表單處理

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const taskSchema = z.object({
  title: z.string().min(1, "標題不能為空"),
  description: z.string().min(10, "描述至少 10 個字"),
  required_volunteers: z.number().min(1).max(100),
});

type TaskFormData = z.infer<typeof taskSchema>;

export const CreateTaskForm = () => {
  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      required_volunteers: 1,
    },
  });

  const onSubmit = (data: TaskFormData) => {
    console.log(data);
    // 呼叫 API
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>任務標題</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">建立任務</Button>
      </form>
    </Form>
  );
};
```

### 效能優化

#### 1. 使用 React.memo

```typescript
// 避免不必要的重渲染
export const TaskCard = React.memo<TaskCardProps>(({ task, onClaim }) => {
  // ...
});
```

#### 2. 使用 useMemo

```typescript
const sortedTasks = useMemo(() => {
  return [...tasks].sort((a, b) => b.priority_level - a.priority_level);
}, [tasks]);
```

#### 3. 使用 useCallback

```typescript
const handleClaim = useCallback((taskId: string) => {
  claimTask(taskId);
}, [claimTask]);
```

#### 4. 動態載入

```typescript
// 動態載入大型組件
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./heavy-component"), {
  loading: () => <p>載入中...</p>,
  ssr: false, // 禁用 SSR
});
```

---

## 常見問題

### Q1: 如何處理 API 錯誤?

```typescript
import { toast } from "sonner";

const { mutate: claimTask } = useMutation({
  mutationFn: (taskId: string) => apiClient.POST(...),
  onSuccess: () => {
    toast.success("認領成功!");
  },
  onError: (error) => {
    if (error.status === 403) {
      toast.error("您沒有權限執行此操作");
    } else {
      toast.error("認領失敗,請稍後再試");
    }
  },
});
```

### Q2: 如何實作權限控制?

```typescript
// 使用自定義 Hook
export const usePermission = () => {
  const { data: session } = useSession();

  return {
    canCreateTask: ["admin", "victim", "official_org"].includes(
      session?.user?.role
    ),
    canApprove: ["admin", "official_org"].includes(session?.user?.role),
    isAdmin: session?.user?.role === "admin",
  };
};

// 在組件中使用
const { canApprove } = usePermission();

if (!canApprove) return null;
```

### Q3: 如何處理認證狀態?

```typescript
import { useSession } from "next-auth/react";

export const ProtectedPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return <div>受保護的內容</div>;
};
```

### Q4: 如何優化 API 請求?

```typescript
// 使用 React Query 的快取與重新驗證
export const useTaskList = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    staleTime: 30 * 1000, // 30 秒內不重新請求
    gcTime: 5 * 60 * 1000, // 5 分鐘後清除快取
    refetchOnWindowFocus: true, // 視窗焦點時重新驗證
  });
};
```

### Q5: 如何處理表單驗證?

```typescript
// 使用 Zod schema
const loginSchema = z.object({
  email: z.string().email("請輸入有效的 Email"),
  password: z.string().min(6, "密碼至少 6 個字元"),
});

// 在表單中使用
const form = useForm({
  resolver: zodResolver(loginSchema),
});
```

### Q6: 如何實作無限滾動?

```typescript
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteTaskList = () => {
  return useInfiniteQuery({
    queryKey: ["tasks", "infinite"],
    queryFn: ({ pageParam = 0 }) =>
      apiClient.GET("/api/v1/tasks/", {
        params: { query: { skip: pageParam, limit: 20 } },
      }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === 20 ? pages.length * 20 : undefined;
    },
  });
};
```

### Q7: 如何處理檔案上傳?

```typescript
const handleFileUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  return response.json();
};
```

---

## 除錯技巧

### 1. React Query DevTools

```typescript
// src/app/layout.tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
```

### 2. 使用 console.log 與斷點

```typescript
// 使用 debugger
const handleClick = () => {
  debugger; // 瀏覽器會在此暫停
  console.log("資料:", data);
};

// 使用 console.table 顯示陣列
console.table(tasks);
```

### 3. VSCode 除錯設定

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Next.js: debug client-side",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

---

## 部署檢查清單

### 部署前檢查

- [ ] 所有測試通過
- [ ] 程式碼通過 lint 檢查
- [ ] 移除所有 console.log
- [ ] 更新環境變數
- [ ] 確認 API 端點正確
- [ ] 檢查 SEO meta tags
- [ ] 測試生產建置

### 建置指令

```bash
# 生產建置
npm run build

# 本地測試生產版本
npm start

# 檢查建置大小
npm run build -- --analyze
```

---

**文件結束**
