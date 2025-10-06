# 需求分析 - 首頁公開化與志工登入入口

**分析日期**: 2025-10-03_18:18:34
**分析師**: August
**需求來源**: 產品需求變更
**優先級**: P0 (高優先級)

---

## 📋 需求概述

### 背景
目前首頁已改為卡片式任務列表展示,但存在以下問題:
1. 首頁需要登入才能查看,不利於一般民眾瀏覽求助資訊
2. 志工單位需要有便捷的登入入口來建立新任務
3. 主要使用者使用行動裝置,需避免使用 popup 彈窗

### 核心需求

| 需求項目 | 說明 | 優先級 |
|---------|------|--------|
| 首頁公開化 | 任何人不需登入即可查看任務列表 | P0 |
| 志工登入入口 | 提供明確的登入入口給志工單位 | P0 |
| 避免 Popup | 所有互動使用路由導航,不使用彈窗 | P0 |
| 行動裝置優先 | 針對手機版優化使用體驗 | P0 |

---

## 🔍 現況分析

### 目前架構

#### 路由結構
```
/ (首頁)
├── Header (全域)
│   ├── Logo + 標題
│   └── 登入/登出按鈕
└── TasksCards (任務卡片列表)

/login (登入頁)
└── LoginForm

/dashboard (儀表板) - 需要認證
├── Layout (檢查 session,未登入重導向)
└── Page (組織管理頁面)
    ├── 新增任務按鈕
    └── 任務詳細頁面按鈕

/tasks/[taskId] (任務詳情)
└── TaskDetail
```

#### 認證流程
```
使用者訪問 /dashboard
  ↓
檢查 session (Layout)
  ↓
[未登入] → redirect to /login
[已登入] → 顯示頁面
```

#### 首頁組件結構
```tsx
// src/app/page.tsx
export default async function HomePage() {
  return (
    <div className="container mx-auto space-y-5 px-4 py-4">
      <TasksCards />
    </div>
  );
}
```

#### Header 組件
```tsx
// src/components/common/header.tsx
export const Header = () => {
  const session = useSession();
  const isAuthenticated = session?.data?.user?.email;

  return (
    <header className="flex justify-between items-center p-2">
      <div>Logo + 標題</div>
      <Button onClick={...}>
        {isAuthenticated ? "登出" : "登入"}
      </Button>
    </header>
  );
};
```

### 現有問題分析

#### 1. 首頁訪問限制
❌ **問題**: 雖然首頁沒有 auth layout,但 Header 中的登入狀態檢查可能造成混淆
✅ **實際狀況**: 首頁目前是公開的,不需登入即可訪問

#### 2. 志工登入後的流程不清晰
❌ **問題**:
- 登入後重導向到 `/dashboard`
- Dashboard 頁面功能不明確 (組織頁面?)
- 沒有明確的「建立任務」入口

#### 3. 行動版體驗待優化
⚠️ **待改善**:
- Header 按鈕在小螢幕上可能不夠明顯
- 缺少行動版專用的導航設計
- 卡片佈局已優化,但缺少篩選/搜尋功能

---

## 💡 解決方案分析

### 方案 A: 最小改動方案 (推薦)

#### 架構調整

```
/ (首頁 - 公開)
├── Header
│   ├── Logo + 標題
│   ├── [未登入] 登入按鈕 → /login
│   └── [已登入] 使用者選單
│       ├── 我的任務
│       ├── 建立任務
│       └── 登出
└── TasksCards (公開任務列表)

/login (登入頁)
└── LoginForm
    └── 登入成功 → redirect to /

/dashboard (儀表板 - 需認證)
├── 我的任務列表
├── 建立任務按鈕 (浮動按鈕 FAB)
└── 任務管理功能

/dashboard/create (建立任務 - 需認證)
└── CreateTaskForm

/tasks/[taskId] (任務詳情 - 公開)
└── TaskDetail
```

#### 使用者流程

**一般民眾 (未登入)**
```
訪問首頁 (/)
  ↓
瀏覽任務卡片
  ↓
點擊「查看詳情」
  ↓
/tasks/[taskId] 查看任務詳情
```

**志工單位 (需登入建立任務)**
```
訪問首頁 (/)
  ↓
點擊 Header「登入」按鈕
  ↓
/login 登入頁面
  ↓
登入成功 → 重導向回首頁 (/)
  ↓
Header 顯示使用者選單
  ↓
點擊「建立任務」
  ↓
/dashboard/create 建立任務頁面
```

#### 實作細節

##### 1. 修改 Header 組件

```tsx
// src/components/common/header.tsx
"use client";

export const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <header className="flex justify-between items-center p-4">
      <Link href="/" className="flex items-center gap-2">
        <Logo />
        <h1 className="text-xl font-bold">{COMPANY_NAME}</h1>
      </Link>

      {/* 未登入狀態 */}
      {!session ? (
        <Button onClick={() => router.push("/login")}>
          志工登入
        </Button>
      ) : (
        /* 已登入狀態 - 使用 Dropdown Menu */
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <User className="mr-2 h-4 w-4" />
              {session.user?.name || session.user?.email}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push("/dashboard")}>
              <ListTodo className="mr-2 h-4 w-4" />
              我的任務
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/dashboard/create")}>
              <Plus className="mr-2 h-4 w-4" />
              建立任務
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              登出
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
};
```

##### 2. 修改登入成功重導向

```tsx
// src/app/(auth)/api/auth/[...nextauth]/options.ts
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    signOut: "/", // 登出後回首頁
  },
  callbacks: {
    async signIn({ user }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      // 登入成功後回首頁
      if (url.startsWith("/login")) {
        return baseUrl + "/";
      }
      return url;
    },
  },
};
```

##### 3. Dashboard 頁面調整

```tsx
// src/app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">我的任務</h1>
        <Link href="/dashboard/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            建立新任務
          </Button>
        </Link>
      </div>

      {/* 顯示我建立的任務 + 我認領的任務 */}
      <MyTasksList />
    </div>
  );
}
```

##### 4. 建立任務頁面

```tsx
// src/app/dashboard/create/page.tsx
export default function CreateTaskPage() {
  return (
    <div className="container mx-auto max-w-2xl p-4">
      <h1 className="mb-6 text-2xl font-bold">建立新任務</h1>
      <CreateTaskForm />
    </div>
  );
}
```

##### 5. 行動版優化 - 浮動按鈕 (選用)

```tsx
// src/components/common/fab-create-task.tsx
"use client";

export const FabCreateTask = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) return null;

  return (
    <Button
      onClick={() => router.push("/dashboard/create")}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg md:hidden"
      size="icon"
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
};
```

---

### 方案 B: 進階優化方案

在方案 A 基礎上增加:

#### 1. 首頁加入 CTA (Call to Action)

```tsx
// src/app/page.tsx
export default async function HomePage() {
  return (
    <div className="container mx-auto space-y-6 px-4 py-4">
      {/* Hero Section */}
      <section className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
        <h2 className="mb-2 text-2xl font-bold">
          光復鄉災害應變互助平台
        </h2>
        <p className="mb-4 opacity-90">
          查看最新救援任務,或以志工身份協助受災民眾
        </p>
        <div className="flex gap-2">
          <Link href="/login">
            <Button variant="secondary">
              我是志工,我要協助
            </Button>
          </Link>
        </div>
      </section>

      {/* 任務列表 */}
      <TasksCards />
    </div>
  );
}
```

#### 2. 任務卡片加入快速登入提示

```tsx
// src/components/task/tasks-cards.tsx
<CardFooter className="justify-between">
  <div className="text-xs text-muted-foreground">...</div>

  {task.can_claim && !session ? (
    <Link href="/login">
      <Button size="sm" variant="outline">
        登入後認領
      </Button>
    </Link>
  ) : (
    <Link href={`/tasks/${task.id}`}>
      <Button size="sm">查看詳情</Button>
    </Link>
  )}
</CardFooter>
```

#### 3. 任務詳情頁加入認領功能

```tsx
// src/app/tasks/[taskId]/page.tsx
export default function TaskDetailPage({ params }: { params: { taskId: string } }) {
  return (
    <div>
      <TaskDetail taskId={params.taskId} />

      {/* 根據登入狀態顯示不同按鈕 */}
      <TaskActions taskId={params.taskId} />
    </div>
  );
}

// src/components/task/task-actions.tsx
"use client";

export const TaskActions = ({ taskId }: { taskId: string }) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return (
      <Button onClick={() => router.push("/login")}>
        登入後認領任務
      </Button>
    );
  }

  return (
    <Button onClick={() => handleClaimTask(taskId)}>
      認領任務
    </Button>
  );
};
```

---

## 📊 方案比較

| 項目 | 方案 A (最小改動) | 方案 B (進階優化) |
|-----|------------------|------------------|
| 開發工時 | 0.5 天 | 1.5 天 |
| 技術難度 | 低 | 中 |
| 使用者體驗 | 良好 | 優秀 |
| 維護成本 | 低 | 中 |
| 推薦度 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 🎯 推薦方案

### 階段性實施

**第一階段 (P0)**: 方案 A
- ✅ 滿足核心需求
- ✅ 開發成本低
- ✅ 快速上線

**第二階段 (P1)**: 方案 B 優化
- ✅ 提升使用者體驗
- ✅ 增加轉換率
- ✅ 完善互動流程

---

## 📝 實作檢查清單

### 方案 A 實作步驟

#### Phase 1: Header 改造
- [ ] 修改 Header 組件,加入 DropdownMenu
- [ ] 新增使用者選單項目 (我的任務、建立任務、登出)
- [ ] 測試登入/登出狀態切換

#### Phase 2: 路由調整
- [ ] 修改 NextAuth 重導向邏輯 (登入後回首頁)
- [ ] 確保首頁公開訪問
- [ ] 測試未登入訪問首頁

#### Phase 3: Dashboard 優化
- [ ] 調整 Dashboard 為「我的任務」頁面
- [ ] 新增「建立任務」按鈕
- [ ] 實作我的任務列表 (建立的 + 認領的)

#### Phase 4: 建立任務頁面
- [ ] 建立 `/dashboard/create` 路由
- [ ] 實作 CreateTaskForm 組件
- [ ] 整合 API 建立任務

#### Phase 5: 測試與優化
- [ ] 行動版測試
- [ ] 桌面版測試
- [ ] 登入流程測試
- [ ] 建立任務流程測試

---

## 🎨 UI/UX 設計建議

### 行動版 Header

```
┌─────────────────────────────────────────┐
│ [Logo] 光復e互助      [志工登入] 👤    │
└─────────────────────────────────────────┘

登入後:
┌─────────────────────────────────────────┐
│ [Logo] 光復e互助      [張三 ▼] 👤       │
│                       ┌───────────────┐ │
│                       │ 📋 我的任務    │ │
│                       │ ➕ 建立任務    │ │
│                       │ ──────────    │ │
│                       │ 🚪 登出       │ │
│                       └───────────────┘ │
└─────────────────────────────────────────┘
```

### 任務卡片 (未登入時)

```
┌─────────────────────────────────────────┐
│ 任務標題                 [待審核] [清理] │
├─────────────────────────────────────────┤
│ 任務描述...                             │
│ 地點 | 人數 | 優先級                    │
│                                         │
│ 建立於 2025/10/03    [登入後認領] ──→  │
└─────────────────────────────────────────┘
```

### 首頁 CTA Banner (方案 B)

```
┌─────────────────────────────────────────┐
│ 🌟 光復鄉災害應變互助平台               │
│                                         │
│ 查看最新救援任務,或以志工身份協助       │
│                                         │
│ [我是志工,我要協助] ──→                 │
└─────────────────────────────────────────┘
```

---

## 🔒 安全性考量

### 權限控制

| 頁面/功能 | 訪問權限 | 說明 |
|----------|---------|------|
| `/` 首頁 | 公開 | 任何人可查看任務列表 |
| `/tasks/[id]` 詳情 | 公開 | 任何人可查看任務詳情 |
| `/login` 登入 | 公開 | 已登入自動重導向首頁 |
| `/dashboard` 儀表板 | 需認證 | 顯示我的任務 |
| `/dashboard/create` 建立任務 | 需認證 | 志工/組織建立任務 |
| 認領任務 API | 需認證 | 需登入才能認領 |

### API 安全

```tsx
// API Route 範例
// src/app/api/tasks/route.ts
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 建立任務邏輯
}
```

---

## 📱 行動版優化重點

### 1. 響應式 Header

```tsx
// 小螢幕: 收合為漢堡選單
// 大螢幕: 展開顯示完整選單

<header className="sticky top-0 z-50 bg-white shadow-sm">
  {/* Mobile */}
  <div className="md:hidden">
    <MobileHeader />
  </div>

  {/* Desktop */}
  <div className="hidden md:flex">
    <DesktopHeader />
  </div>
</header>
```

### 2. 觸控優化

```css
/* 按鈕最小觸控區域 44x44px */
.btn-touch {
  min-height: 44px;
  min-width: 44px;
}

/* 卡片間距適合滑動 */
.task-cards {
  gap: 16px;
  padding: 16px;
}
```

### 3. 載入優化

```tsx
// 使用 Suspense + Loading State
<Suspense fallback={<TaskCardsSkeleton />}>
  <TasksCards />
</Suspense>
```

---

## 🧪 測試計劃

### 功能測試

| 測試項目 | 測試步驟 | 預期結果 |
|---------|---------|---------|
| 首頁公開訪問 | 未登入訪問 `/` | 顯示任務列表 |
| 登入按鈕 | 點擊 Header「登入」 | 導向 `/login` |
| 登入成功 | 輸入帳密登入 | 重導向回首頁,Header 顯示使用者選單 |
| 建立任務入口 | 登入後點擊「建立任務」 | 導向 `/dashboard/create` |
| 我的任務 | 點擊「我的任務」 | 導向 `/dashboard` |
| 登出 | 點擊「登出」 | 登出並回到首頁 |

### 瀏覽器測試

- [ ] Chrome Mobile
- [ ] Safari iOS
- [ ] Chrome Android
- [ ] Desktop Chrome
- [ ] Desktop Safari

### 響應式測試

- [ ] 320px (小型手機)
- [ ] 375px (iPhone)
- [ ] 768px (Tablet)
- [ ] 1024px (Desktop)

---

## 📈 成效評估指標

### 使用者行為指標

| 指標 | 目標 | 說明 |
|-----|------|------|
| 首頁跳出率 | < 40% | 使用者訪問首頁後立即離開的比例 |
| 任務詳情點擊率 | > 60% | 點擊「查看詳情」的比例 |
| 登入轉換率 | > 15% | 訪客中實際登入的比例 |
| 建立任務完成率 | > 80% | 開始建立任務到提交成功的比例 |

### 技術指標

| 指標 | 目標 | 說明 |
|-----|------|------|
| 首頁載入時間 | < 2s | LCP (Largest Contentful Paint) |
| 互動時間 | < 100ms | FID (First Input Delay) |
| 布局穩定性 | < 0.1 | CLS (Cumulative Layout Shift) |

---

## 🚀 上線計劃

### Phase 1: 開發 (1-2 天)
- Day 1: Header 改造 + 路由調整
- Day 2: Dashboard 優化 + 建立任務頁面

### Phase 2: 測試 (0.5 天)
- 功能測試
- 多裝置測試
- 效能測試

### Phase 3: 部署 (0.5 天)
- Staging 環境部署
- 最終檢查
- Production 部署

### Phase 4: 監控 (持續)
- 使用者行為追蹤
- 錯誤監控
- 效能監控

---

## 💬 後續優化建議

### 短期 (1-2 週)
1. 加入任務篩選功能
2. 加入搜尋功能
3. 優化 Loading 狀態

### 中期 (1 個月)
1. 實作方案 B 的 CTA Banner
2. 加入任務認領流程
3. 新增我的任務管理

### 長期 (3 個月)
1. 推播通知功能
2. 任務進度追蹤
3. 數據統計儀表板

---

## 📚 相關文件

- [產品需求文件](../pm/01_product_requirements.md)
- [使用者流程](../pm/02_user_flow.md)
- [技術架構](../dev/01_technical_architecture.md)
- [開發指南](../dev/03_development_guide.md)

---

## ✅ 結論

### 推薦實施方案 A

**理由**:
1. ✅ 滿足所有核心需求
2. ✅ 開發成本低,快速上線
3. ✅ 技術風險低
4. ✅ 易於維護與擴展
5. ✅ 符合行動優先原則
6. ✅ 無 Popup,全採用路由導航

**下一步行動**:
1. 與團隊確認方案
2. 建立開發 task
3. 開始實作 Phase 1

---

**分析文件結束**
