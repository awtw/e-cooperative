# 光復 e 互助平台 - API 整合指南

**文件版本**: v1.0
**建立日期**: 2025-10-03_00:36:04
**最後更新**: 2025-10-03_00:36:04

---

## 📋 目錄

1. [API 基礎設定](#api-基礎設定)
2. [認證流程](#認證流程)
3. [資料模型](#資料模型)
4. [常用 API 範例](#常用-api-範例)
5. [錯誤處理](#錯誤處理)
6. [測試策略](#測試策略)

---

## API 基礎設定

### API 基本資訊

- **Base URL**: `http://hanservice.synology.me:8923/api/v1`
- **OpenAPI 文件**: `http://hanservice.synology.me:8923/api/v1/openapi.json`
- **認證方式**: JWT Bearer Token
- **內容類型**: `application/json`

### 環境配置

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://hanservice.synology.me:8923/api/v1
```

### 型別生成

```bash
# 從 OpenAPI 規範生成 TypeScript 型別
npm run api:types
```

這會執行:
```bash
openapi-typescript http://hanservice.synology.me:8923/api/v1/openapi.json \
  -o src/lib/api/types.ts
```

---

## 認證流程

### 1. 使用者註冊

```typescript
import { apiClient } from "@/lib/api/client";

// 註冊使用者
const registerUser = async (data: {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role: "victim" | "volunteer" | "official_org" | "unofficial_org";
  organization_name?: string; // 組織角色必填
}) => {
  const { data: response, error } = await apiClient.POST(
    "/api/v1/auth/register",
    {
      body: data,
    }
  );

  if (error) throw error;
  return response;
};

// 使用範例
const result = await registerUser({
  email: "user@example.com",
  password: "secure_password",
  name: "張三",
  phone: "0912345678",
  role: "volunteer",
});

// 回傳格式
{
  user: {
    id: "uuid",
    email: "user@example.com",
    name: "張三",
    role: "volunteer"
  },
  access_token: "eyJ...",
  message: "註冊成功"
}
```

### 2. 使用者登入

```typescript
// 登入
const loginUser = async (email: string, password: string) => {
  const { data, error } = await apiClient.POST("/api/v1/auth/login", {
    body: { email, password },
  });

  if (error) throw error;
  return data;
};

// 使用範例
const { user, access_token } = await loginUser(
  "user@example.com",
  "password"
);

// 儲存 token
localStorage.setItem("access_token", access_token);
```

### 3. 取得當前使用者資訊

```typescript
// 需要帶 Authorization header
const getCurrentUser = async () => {
  const { data, error } = await apiClient.GET("/api/v1/auth/me");

  if (error) throw error;
  return data;
};

// 回傳格式
{
  id: "uuid",
  email: "user@example.com",
  name: "張三",
  role: "volunteer",
  phone: "0912345678",
  created_at: "2025-10-03T00:00:00",
  is_active: true
}
```

### 4. 更新個人資料

```typescript
const updateProfile = async (data: { name?: string; phone?: string }) => {
  const { data: response, error } = await apiClient.PUT("/api/v1/auth/me", {
    body: data,
  });

  if (error) throw error;
  return response;
};
```

### 5. 修改密碼

```typescript
const changePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  const { data, error } = await apiClient.POST(
    "/api/v1/auth/change-password",
    {
      body: {
        old_password: oldPassword,
        new_password: newPassword,
      },
    }
  );

  if (error) throw error;
  return data;
};
```

---

## 資料模型

### 使用者角色 (UserRole)

```typescript
type UserRole =
  | "admin"           // 系統管理員
  | "victim"          // 受災戶
  | "official_org"    // 官方組織
  | "unofficial_org"  // 非官方組織
  | "supply_manager"  // 物資管理員
  | "volunteer";      // 志工
```

### 任務類型 (TaskType)

```typescript
type TaskType =
  | "cleanup"           // 環境清理
  | "rescue"            // 緊急救援
  | "supply_delivery"   // 物資配送
  | "medical_aid"       // 醫療支援
  | "shelter_support";  // 收容支援
```

### 任務狀態 (TaskStatus)

```typescript
type TaskStatus =
  | "pending"      // 待審核
  | "available"    // 可認領
  | "claimed"      // 已認領
  | "in_progress"  // 進行中
  | "completed"    // 已完成
  | "cancelled";   // 已取消
```

### 任務資料結構 (Task)

```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  task_type: TaskType;
  location_data: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    details?: string | null;
  };
  required_volunteers: number;
  required_skills?: string[] | null;
  deadline?: string | null; // ISO 8601 格式
  priority_level: number; // 1-5
  creator_id: string;
  status: TaskStatus;
  approval_status: string;
  approved_by?: string | null;
  approved_at?: string | null;
  created_at: string;
  updated_at: string;
  creator_name?: string | null;
  creator_role?: string | null;
  approver_name?: string | null;
  claimed_count: number;
  can_claim: boolean;
  can_edit: boolean;
}
```

### 組織資料結構

```typescript
interface Organization {
  id: string;
  name: string;
  type: "official" | "unofficial";
  contact_person?: string;
  contact_phone?: string;
  address?: string;
  description?: string;
  is_approved: boolean;
  approved_by?: string;
  approved_at?: string;
  created_at: string;
}
```

---

## 常用 API 範例

### 任務管理

#### 1. 取得任務列表

```typescript
const getTaskList = async (params?: {
  task_type?: TaskType;
  status?: TaskStatus;
  skip?: number;
  limit?: number;
}) => {
  const { data, error } = await apiClient.GET("/api/v1/tasks/", {
    params: {
      query: params,
    },
  });

  if (error) throw error;
  return data;
};

// 使用範例
const tasks = await getTaskList({
  task_type: "rescue",
  status: "available",
  limit: 20,
});
```

#### 2. 建立新任務

```typescript
const createTask = async (taskData: {
  title: string;
  description: string;
  task_type: TaskType;
  location_data: {
    address: string;
    coordinates: { lat: number; lng: number };
    details?: string;
  };
  required_volunteers: number;
  required_skills?: string[];
  deadline?: string;
  priority_level: number; // 1-5
}) => {
  const { data, error } = await apiClient.POST("/api/v1/tasks/", {
    body: taskData,
  });

  if (error) throw error;
  return data;
};

// 使用範例
const newTask = await createTask({
  title: "清理倒塌房屋瓦礫",
  description: "房屋因地震倒塌，需要志工協助清理瓦礫...",
  task_type: "cleanup",
  location_data: {
    address: "花蓮縣光復鄉大全街123號",
    coordinates: { lat: 23.6654, lng: 121.4229 },
    details: "位於大全街與中正路口",
  },
  required_volunteers: 5,
  required_skills: ["體力勞動", "基礎工具使用"],
  deadline: "2025-10-05T17:00:00Z",
  priority_level: 5,
});
```

#### 3. 取得任務詳情

```typescript
const getTaskDetail = async (taskId: string) => {
  const { data, error } = await apiClient.GET("/api/v1/tasks/{task_id}", {
    params: {
      path: { task_id: taskId },
    },
  });

  if (error) throw error;
  return data;
};
```

#### 4. 認領任務

```typescript
const claimTask = async (taskId: string) => {
  const { data, error } = await apiClient.POST(
    "/api/v1/tasks/{task_id}/claim",
    {
      params: {
        path: { task_id: taskId },
      },
    }
  );

  if (error) throw error;
  return data;
};

// 使用範例
await claimTask("task-uuid-123");
// 回傳: { message: "任務認領成功" }
```

#### 5. 更新任務狀態

```typescript
const updateTaskStatus = async (
  taskId: string,
  status: TaskStatus,
  notes?: string
) => {
  const { data, error } = await apiClient.PUT(
    "/api/v1/tasks/{task_id}/status",
    {
      params: {
        path: { task_id: taskId },
      },
      body: {
        status,
        notes,
      },
    }
  );

  if (error) throw error;
  return data;
};

// 使用範例
await updateTaskStatus("task-uuid-123", "completed", "任務已完成");
```

#### 6. 審核任務 (管理員/官方組織)

```typescript
const approveTask = async (taskId: string) => {
  const { data, error } = await apiClient.POST(
    "/api/v1/tasks/{task_id}/approve",
    {
      params: {
        path: { task_id: taskId },
      },
    }
  );

  if (error) throw error;
  return data;
};
```

#### 7. 取得待審核任務 (管理員)

```typescript
const getPendingTasks = async () => {
  const { data, error } = await apiClient.GET(
    "/api/v1/tasks/pending-approval"
  );

  if (error) throw error;
  return data;
};
```

### 組織管理

#### 1. 提交組織申請

```typescript
const submitOrganization = async (orgData: {
  organization_name: string;
  organization_type: "official" | "unofficial";
  contact_person?: string;
  contact_phone?: string;
  address?: string;
  description?: string;
}) => {
  const { data, error } = await apiClient.POST(
    "/api/v1/organization-approval/submit",
    {
      body: orgData,
    }
  );

  if (error) throw error;
  return data;
};
```

#### 2. 審核組織 (管理員)

```typescript
const approveOrganization = async (
  organizationId: string,
  approved: boolean,
  reason?: string
) => {
  const { data, error } = await apiClient.POST(
    "/api/v1/organization-approval/{organization_id}/approve",
    {
      params: {
        path: { organization_id: organizationId },
      },
      body: {
        approved,
        reason,
      },
    }
  );

  if (error) throw error;
  return data;
};
```

### 使用者管理 (管理員)

#### 1. 取得使用者列表

```typescript
const getUserList = async (params?: {
  role?: UserRole;
  is_active?: boolean;
  skip?: number;
  limit?: number;
}) => {
  const { data, error } = await apiClient.GET("/api/v1/users/", {
    params: {
      query: params,
    },
  });

  if (error) throw error;
  return data;
};
```

#### 2. 更新使用者角色

```typescript
const updateUserRole = async (userId: string, role: UserRole) => {
  const { data, error } = await apiClient.PUT(
    "/api/v1/users/{user_id}/role",
    {
      params: {
        path: { user_id: userId },
      },
      body: { role },
    }
  );

  if (error) throw error;
  return data;
};
```

---

## 錯誤處理

### 常見錯誤碼

| 狀態碼 | 說明 | 處理方式 |
|-------|------|---------|
| 400 | 請求參數錯誤 | 檢查請求參數格式 |
| 401 | 未認證 | 重新導向登入頁面 |
| 403 | 無權限 | 顯示權限不足訊息 |
| 404 | 資源不存在 | 顯示找不到資源 |
| 409 | 衝突 (如重複認領) | 提示使用者 |
| 422 | 驗證錯誤 | 顯示驗證錯誤訊息 |
| 500 | 伺服器錯誤 | 提示稍後再試 |

### 錯誤處理工具

```typescript
// src/lib/api/error-handler.ts
import { toast } from "sonner";

export const handleApiError = (error: unknown) => {
  if (error instanceof Response) {
    switch (error.status) {
      case 400:
        toast.error("請求參數錯誤");
        break;
      case 401:
        toast.error("請先登入");
        window.location.href = "/login";
        break;
      case 403:
        toast.error("您沒有權限執行此操作");
        break;
      case 404:
        toast.error("找不到資源");
        break;
      case 409:
        toast.error("操作衝突,請重新整理後再試");
        break;
      case 422:
        toast.error("輸入資料格式錯誤");
        break;
      case 500:
        toast.error("伺服器錯誤,請稍後再試");
        break;
      default:
        toast.error("發生未知錯誤");
    }
  } else {
    toast.error("網路錯誤,請檢查連線");
  }
};
```

### 在 React Query 中使用

```typescript
import { useMutation } from "@tanstack/react-query";
import { handleApiError } from "@/lib/api/error-handler";

export const useClaimTask = () => {
  return useMutation({
    mutationFn: claimTask,
    onSuccess: () => {
      toast.success("任務認領成功!");
    },
    onError: handleApiError,
  });
};
```

---

## 測試策略

### 1. API Client 測試

```typescript
// __tests__/api/client.test.ts
import { describe, it, expect } from "vitest";
import { createApiClient } from "@/lib/api/client";

describe("API Client", () => {
  it("應該正確設定 Authorization header", () => {
    const getToken = () => "test-token";
    const client = createApiClient(getToken);

    // 測試邏輯...
  });
});
```

### 2. Mock API 回應

```typescript
// src/lib/api/__mocks__/client.ts
import { rest } from "msw";

export const handlers = [
  rest.get("/api/v1/tasks/", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: "1",
          title: "測試任務",
          // ...
        },
      ])
    );
  }),

  rest.post("/api/v1/tasks/:taskId/claim", (req, res, ctx) => {
    return res(ctx.json({ message: "認領成功" }));
  }),
];
```

### 3. 整合測試

```typescript
// __tests__/features/claim-task.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskDetailPage } from "@/app/dashboard/[taskId]/page";

describe("認領任務流程", () => {
  it("志工應該能成功認領任務", async () => {
    render(<TaskDetailPage taskId="123" />);

    const claimButton = screen.getByRole("button", { name: "認領任務" });
    await userEvent.click(claimButton);

    await waitFor(() => {
      expect(screen.getByText("認領成功")).toBeInTheDocument();
    });
  });
});
```

---

## API Hooks 範例集

### 完整的 API Hooks 實作

```typescript
// src/lib/api/hooks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./client";
import { handleApiError } from "./error-handler";
import { toast } from "sonner";

// ==================== 任務相關 ====================

// 取得任務列表
export const useTaskList = (params?: {
  task_type?: TaskType;
  status?: TaskStatus;
}) => {
  return useQuery({
    queryKey: ["tasks", params],
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/api/v1/tasks/", {
        params: { query: params },
      });
      if (error) throw error;
      return data;
    },
  });
};

// 取得任務詳情
export const useTaskDetail = (taskId: string) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/api/v1/tasks/{task_id}", {
        params: { path: { task_id: taskId } },
      });
      if (error) throw error;
      return data;
    },
    enabled: !!taskId,
  });
};

// 建立任務
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskData: CreateTaskInput) => {
      const { data, error } = await apiClient.POST("/api/v1/tasks/", {
        body: taskData,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("任務建立成功!");
    },
    onError: handleApiError,
  });
};

// 認領任務
export const useClaimTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: string) => {
      const { data, error } = await apiClient.POST(
        "/api/v1/tasks/{task_id}/claim",
        {
          params: { path: { task_id: taskId } },
        }
      );
      if (error) throw error;
      return data;
    },
    onSuccess: (_, taskId) => {
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("任務認領成功!");
    },
    onError: handleApiError,
  });
};

// 更新任務狀態
export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      taskId,
      status,
      notes,
    }: {
      taskId: string;
      status: TaskStatus;
      notes?: string;
    }) => {
      const { data, error } = await apiClient.PUT(
        "/api/v1/tasks/{task_id}/status",
        {
          params: { path: { task_id: taskId } },
          body: { status, notes },
        }
      );
      if (error) throw error;
      return data;
    },
    onSuccess: (_, { taskId }) => {
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      toast.success("狀態更新成功!");
    },
    onError: handleApiError,
  });
};

// ==================== 使用者相關 ====================

// 取得當前使用者
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/api/v1/auth/me");
      if (error) throw error;
      return data;
    },
  });
};

// 更新個人資料
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData: { name?: string; phone?: string }) => {
      const { data, error } = await apiClient.PUT("/api/v1/auth/me", {
        body: profileData,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("個人資料更新成功!");
    },
    onError: handleApiError,
  });
};
```

---

**文件結束**
