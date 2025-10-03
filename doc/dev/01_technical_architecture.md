# 光復 e 互助平台 - 技術架構文件

**文件版本**: v1.0
**建立日期**: 2025-10-03_00:36:04
**最後更新**: 2025-10-03_00:36:04

---

## 📋 目錄

1. [系統架構概覽](#系統架構概覽)
2. [技術棧](#技術棧)
3. [專案結構](#專案結構)
4. [前端架構](#前端架構)
5. [後端整合](#後端整合)
6. [狀態管理](#狀態管理)
7. [認證與授權](#認證與授權)
8. [API 設計](#api-設計)
9. [部署架構](#部署架構)

---

## 系統架構概覽

### 整體架構圖

```
┌─────────────────────────────────────────────────────┐
│                   使用者介面層                       │
│         (Browser - Desktop / Mobile)                │
└─────────────────────────────────────────────────────┘
                         ↓ HTTPS
┌─────────────────────────────────────────────────────┐
│                前端應用層 (Next.js)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │  App Router  │  │  React 19    │  │ TailwindCSS│ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │ NextAuth.js  │  │ React Query  │  │  Zustand  │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
└─────────────────────────────────────────────────────┘
                         ↓ REST API (JWT)
┌─────────────────────────────────────────────────────┐
│                後端 API 層 (FastAPI)                 │
│  ┌──────────────────────────────────────────────┐  │
│  │  API Endpoints (OpenAPI Specification)       │  │
│  └──────────────────────────────────────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │  JWT Auth    │  │  業務邏輯    │  │  資料層   │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│                 資料庫層 (PostgreSQL)                │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌────────┐ │
│  │  Users  │  │  Tasks  │  │  Orgs   │  │ Supplies│ │
│  └─────────┘  └─────────┘  └─────────┘  └────────┘ │
└─────────────────────────────────────────────────────┘
```

### 技術架構特點

- **前後端分離**: 前端 Next.js + 後端 FastAPI
- **RESTful API**: 標準 HTTP 方法與狀態碼
- **JWT 認證**: Stateless 身份驗證機制
- **型別安全**: TypeScript + OpenAPI Type Generation
- **響應式設計**: TailwindCSS + shadcn/ui 組件庫

---

## 技術棧

### 前端技術棧

| 技術 | 版本 | 用途 |
|------|------|------|
| **Next.js** | 15.5.4 | React 框架 (App Router) |
| **React** | 19.1.0 | UI 函式庫 |
| **TypeScript** | 5.x | 型別系統 |
| **TailwindCSS** | 4.x | CSS 框架 |
| **shadcn/ui** | latest | UI 組件庫 |
| **TanStack Query** | 5.90.2 | 資料同步與快取 |
| **Zustand** | 5.0.8 | 狀態管理 |
| **React Hook Form** | 7.63.0 | 表單處理 |
| **Zod** | 4.1.11 | Schema 驗證 |
| **NextAuth.js** | 4.24.11 | 身份驗證 |
| **Lucide React** | 0.544.0 | Icon 庫 |
| **openapi-fetch** | 0.14.1 | Type-safe API Client |

### 後端技術棧

| 技術 | 用途 |
|------|------|
| **FastAPI** | Python Web 框架 |
| **PostgreSQL** | 關聯式資料庫 |
| **SQLAlchemy** | ORM |
| **Pydantic** | 資料驗證 |
| **JWT** | Token 認證 |
| **OpenAPI** | API 文件自動生成 |

### 開發工具

- **Turbopack**: 快速開發建置工具
- **ESLint**: 程式碼檢查
- **Prettier**: 程式碼格式化
- **openapi-typescript**: API 型別生成

---

## 專案結構

### 目錄結構

```
e-cooperative/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # 認證相關路由群組
│   │   │   ├── api/
│   │   │   │   └── auth/
│   │   │   │       └── [...nextauth]/
│   │   │   │           ├── options.ts    # NextAuth 配置
│   │   │   │           └── route.ts      # API Route Handler
│   │   │   ├── layout.tsx       # 認證頁面佈局
│   │   │   └── login/
│   │   │       └── page.tsx     # 登入頁面
│   │   │
│   │   ├── dashboard/           # 儀表板路由群組
│   │   │   ├── [taskId]/
│   │   │   │   └── page.tsx     # 任務詳情頁
│   │   │   ├── layout.tsx       # 儀表板佈局
│   │   │   └── page.tsx         # 任務列表頁
│   │   │
│   │   ├── layout.tsx           # 根佈局
│   │   └── not-found.tsx        # 404 頁面
│   │
│   ├── components/              # React 組件
│   │   ├── common/             # 通用組件
│   │   │   ├── header.tsx
│   │   │   ├── providers.tsx
│   │   │   └── theme-provider.tsx
│   │   │
│   │   ├── task/               # 任務相關組件
│   │   │   ├── data.ts         # 模擬資料
│   │   │   ├── task-detail.tsx
│   │   │   ├── tasks-table.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── ui/                 # shadcn/ui 組件
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── table.tsx
│   │   │   └── ...
│   │   │
│   │   └── login-form.tsx      # 登入表單
│   │
│   ├── lib/                     # 工具函式庫
│   │   ├── api/                # API 相關
│   │   │   ├── client.ts       # API Client 設定
│   │   │   ├── hooks.ts        # API Hooks
│   │   │   ├── index.ts
│   │   │   └── types.ts        # 自動生成的 API 型別
│   │   │
│   │   ├── get-query-client.ts # React Query 配置
│   │   └── utils.ts            # 通用工具函式
│   │
│   ├── types/                   # TypeScript 型別定義
│   │   ├── next-auth.d.ts      # NextAuth 型別擴展
│   │   └── task.ts             # 任務相關型別
│   │
│   └── constant/               # 常數定義
│       ├── common.ts
│       └── index.ts
│
├── public/                      # 靜態資源
│
├── doc/                         # 文件目錄
│   ├── pm/                     # PM 文件
│   ├── dev/                    # 開發文件
│   └── design/                 # 設計文件
│
├── .env.local                   # 環境變數
├── next.config.ts              # Next.js 配置
├── tailwind.config.ts          # TailwindCSS 配置
├── tsconfig.json               # TypeScript 配置
└── package.json                # 專案依賴
```

### 資料夾組織原則

1. **按功能分組**: `app/` 目錄使用路由群組 `(auth)`, `dashboard` 等
2. **按類型分組**: `components/` 分為 `common/`, `task/`, `ui/`
3. **集中管理**: API、型別、常數統一放置
4. **可維護性**: 清晰的資料夾結構便於長期維護

---

## 前端架構

### App Router 架構

```
Next.js App Router (RSC)
├── Root Layout (app/layout.tsx)
│   ├── Providers
│   │   ├── QueryClientProvider (React Query)
│   │   ├── SessionProvider (NextAuth)
│   │   └── ThemeProvider (next-themes)
│   │
│   ├── (auth) Route Group
│   │   ├── Login Page (/login)
│   │   └── Auth API Routes
│   │
│   └── Dashboard Route Group (/dashboard)
│       ├── Task List (/)
│       ├── Task Detail (/[taskId])
│       └── Protected by Middleware
```

### 組件架構

#### 1. Server Components vs Client Components

**Server Components** (預設):
- 不需互動的靜態內容
- 資料獲取
- SEO 優化

**Client Components** (使用 "use client"):
- 需要 hooks (useState, useEffect)
- 需要瀏覽器 API
- 事件處理
- 互動式 UI

#### 2. 組件層級

```
頁面組件 (Page)
  ↓
佈局組件 (Layout)
  ↓
業務組件 (Feature)
  ↓
通用組件 (Common)
  ↓
UI 組件 (shadcn/ui)
```

### 樣式系統

#### TailwindCSS + CVA

```typescript
// 使用 class-variance-authority 建立變體
import { cva } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary text-white",
        outline: "border border-input",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
  }
)
```

---

## 後端整合

### API Client 設定

#### 1. OpenAPI Type Generation

```bash
# 從後端 OpenAPI spec 生成型別
npm run api:types
```

執行命令:
```bash
openapi-typescript http://hanservice.synology.me:8923/api/v1/openapi.json \
  -o src/lib/api/types.ts
```

#### 2. Type-safe API Client

```typescript
// src/lib/api/client.ts
import createClient, { type Client } from "openapi-fetch";
import type { paths } from "./types";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://hanservice.synology.me:8923/api/v1";

export type ApiClient = Client<paths>;

export const createApiClient = (
  getAccessToken?: () => string | undefined,
  baseUrl: string = API_BASE_URL,
): ApiClient => {
  const client = createClient<paths>({ baseUrl });

  // 認證中間件
  client.use({
    onRequest: ({ request }) => {
      const headers = new Headers(request.headers);
      headers.set("Content-Type", "application/json");
      const token = getAccessToken?.();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return new Request(request, { headers });
    },
  });

  return client;
};
```

#### 3. API Hooks

```typescript
// src/lib/api/hooks.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiClient } from "./client";

// 查詢 Hook 範例
export const useTaskList = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/api/v1/tasks/");
      if (error) throw error;
      return data;
    },
  });
};

// 變更 Hook 範例
export const useClaimTask = () => {
  return useMutation({
    mutationFn: async (taskId: string) => {
      const { data, error } = await apiClient.POST(
        "/api/v1/tasks/{task_id}/claim",
        { params: { path: { task_id: taskId } } }
      );
      if (error) throw error;
      return data;
    },
  });
};
```

### API 端點分類

#### 認證相關 (`/api/v1/auth/*`)

| 端點 | 方法 | 說明 |
|------|------|------|
| `/auth/register` | POST | 使用者註冊 |
| `/auth/login` | POST | 使用者登入 |
| `/auth/me` | GET | 取得當前使用者資訊 |
| `/auth/me` | PUT | 更新個人資料 |
| `/auth/change-password` | POST | 修改密碼 |

#### 任務相關 (`/api/v1/tasks/*`)

| 端點 | 方法 | 說明 |
|------|------|------|
| `/tasks/` | GET | 取得任務列表 |
| `/tasks/` | POST | 建立新任務 |
| `/tasks/{task_id}` | GET | 取得任務詳情 |
| `/tasks/{task_id}` | PUT | 更新任務 |
| `/tasks/{task_id}/claim` | POST | 認領任務 |
| `/tasks/{task_id}/approve` | POST | 審核任務 |
| `/tasks/{task_id}/status` | PUT | 更新任務狀態 |

#### 使用者管理 (`/api/v1/users/*`)

| 端點 | 方法 | 說明 | 權限 |
|------|------|------|------|
| `/users/` | GET | 取得使用者列表 | Admin |
| `/users/{user_id}/role` | PUT | 更新使用者角色 | Admin |
| `/users/{user_id}/approval` | PUT | 審核使用者 | Admin |

#### 組織管理 (`/api/v1/organization-approval/*`)

| 端點 | 方法 | 說明 |
|------|------|------|
| `/organization-approval/submit` | POST | 提交組織申請 |
| `/organization-approval/pending` | GET | 取得待審核組織 |
| `/organization-approval/{org_id}/approve` | POST | 審核組織 |

---

## 狀態管理

### React Query (TanStack Query)

用於**伺服器狀態管理**:

- ✅ 資料快取與同步
- ✅ 自動背景重新獲取
- ✅ 樂觀更新
- ✅ 請求去重

```typescript
// 設定 QueryClient
import { QueryClient } from "@tanstack/react-query";

export const getQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 分鐘
        gcTime: 5 * 60 * 1000, // 5 分鐘
      },
    },
  });
};
```

### Zustand

用於**客戶端狀態管理**:

- ✅ UI 狀態 (modal 開關、側邊欄狀態)
- ✅ 表單草稿
- ✅ 使用者偏好設定

```typescript
// 範例: 使用者設定 Store
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserPreferenceStore {
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
}

export const useUserPreference = create<UserPreferenceStore>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "user-preference",
    }
  )
);
```

---

## 認證與授權

### NextAuth.js 配置

```typescript
// src/app/(auth)/api/auth/[...nextauth]/options.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        // 呼叫後端 API 驗證
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        if (res.ok && user) {
          return user; // { id, email, token, role }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
```

### 受保護路由

```typescript
// middleware.ts (根目錄)
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

### 權限檢查

```typescript
// 前端權限檢查
import { useSession } from "next-auth/react";

export const ProtectedButton = () => {
  const { data: session } = useSession();

  const canApprove = ["admin", "official_org"].includes(
    session?.user?.role
  );

  if (!canApprove) return null;

  return <button>審核任務</button>;
};
```

---

## API 設計

### RESTful 設計原則

1. **使用正確的 HTTP 方法**
   - `GET`: 獲取資源
   - `POST`: 建立資源
   - `PUT`: 更新整個資源
   - `PATCH`: 部分更新資源
   - `DELETE`: 刪除資源

2. **使用正確的狀態碼**
   - `200`: 成功
   - `201`: 建立成功
   - `400`: 請求錯誤
   - `401`: 未認證
   - `403`: 無權限
   - `404`: 找不到資源
   - `500`: 伺服器錯誤

3. **資源命名**
   - 使用複數名詞: `/tasks`, `/users`
   - 階層式資源: `/tasks/{task_id}/volunteers`

### 錯誤處理

```typescript
// 統一錯誤處理
export const handleApiError = (error: unknown) => {
  if (error instanceof Response) {
    switch (error.status) {
      case 401:
        // 重新導向登入
        window.location.href = "/login";
        break;
      case 403:
        toast.error("您沒有權限執行此操作");
        break;
      case 404:
        toast.error("找不到資源");
        break;
      default:
        toast.error("發生錯誤,請稍後再試");
    }
  }
};
```

---

## 部署架構

### 環境變數

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://hanservice.synology.me:8923/api/v1
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### 建置流程

```bash
# 開發環境
npm run dev

# 生產建置
npm run build
npm start
```

### 部署建議

#### Vercel (推薦)
- ✅ 自動 CI/CD
- ✅ Edge Functions
- ✅ 全球 CDN
- ✅ 自動 HTTPS

#### 其他選項
- Docker + Nginx
- AWS / GCP / Azure
- Cloudflare Pages

---

## 開發最佳實踐

### 1. 型別安全

```typescript
// ✅ 使用自動生成的型別
import { components } from "@/lib/api/types";

type Task = components["schemas"]["Task"];

// ❌ 避免使用 any
const task: any = {...}; // 不好

// ✅ 使用明確型別
const task: Task = {...}; // 好
```

### 2. 程式碼組織

```typescript
// ✅ 單一職責原則
// 每個組件只做一件事

// ✅ DRY 原則
// 重複的邏輯抽取成 Hook 或工具函式

// ✅ 使用 barrel exports
// index.ts 統一匯出
```

### 3. 效能優化

```typescript
// ✅ 使用 React.memo 避免不必要的重渲染
export const TaskCard = React.memo(({ task }) => {
  // ...
});

// ✅ 使用 useMemo 快取計算結果
const sortedTasks = useMemo(() => {
  return tasks.sort((a, b) => b.priority - a.priority);
}, [tasks]);

// ✅ 使用 useCallback 快取函式
const handleClick = useCallback(() => {
  // ...
}, [deps]);
```

### 4. 錯誤邊界

```typescript
// 使用 Error Boundary 捕捉錯誤
export class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // 記錄錯誤到監控服務
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

---

**文件結束**
