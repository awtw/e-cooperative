# v0.4.1 - 首頁暫時重導向與預覽版橫幅

**實作時間**: 2025-10-03_19:45:00
**開發者**: August
**類型**: 🔧 Configuration + 🎨 UI Enhancement
**狀態**: ⚠️ 暫時性功能 (待其他功能完成後移除)

---

## 📋 變更摘要

由於平台其他功能尚未完成,暫時將首頁重導向到 About 介紹頁面,並在任務卡片列表上方加入預覽版警示橫幅,告知使用者平台處於開發階段。

---

## ✨ 新增功能

### 1. 首頁自動重導向

**實作方式**: Client-side redirect
**目標路由**: `/` → `/about`

```tsx
"use client";

export default function HomePage() {
  const router = useRouter();

  // 暫時性重導向到 about 頁面
  useEffect(() => {
    router.push("/about");
  }, [router]);

  // ...
}
```

**特色**:
- ✅ 使用 `useEffect` 實現客戶端重導向
- ✅ 不影響原有頁面結構
- ✅ 易於移除 (僅需刪除 useEffect)

### 2. 預覽版警示橫幅

**位置**: 任務卡片列表最上方
**狀態**: Sticky (固定在 Header 下方)
**z-index**: 50 (最高層級)

```tsx
<div className="sticky top-14 z-50 border-b bg-background/95 backdrop-blur">
  <Alert className="border-warning bg-warning/10">
    <Construction className="h-4 w-4 text-warning" />
    <AlertTitle className="text-warning">預覽版 - 開發中</AlertTitle>
    <AlertDescription>
      此平台目前處於開發階段,部分功能尚未完成。
      <Link href="/about">瞭解更多關於平台</Link>
    </AlertDescription>
  </Alert>
</div>
```

**設計特色**:
- 🏗️ Construction icon 視覺標示
- ⚠️ Warning 色系 (橙色)
- 📌 Sticky 定位 (跟隨捲動)
- 🔗 連結到 About 頁面
- 💨 Backdrop blur 毛玻璃效果

---

## 🎨 視覺設計

### 橫幅樣式

```css
/* 容器 */
position: sticky
top: 56px (Header 高度 14 * 4px)
z-index: 50
backdrop-filter: blur()

/* Alert 組件 */
border-color: warning
background: warning/10 (淡橙色背景)

/* 文字 */
title: text-warning (橙色)
description: text-foreground/80 (灰色)
link: text-primary (藍色)
```

### 使用的組件

#### 新增組件:
- `Alert` - 警示框容器
- `AlertTitle` - 警示標題
- `AlertDescription` - 警示描述

#### 使用的 Icons:
- `Construction` - 施工/開發中圖示
- `Info` - 資訊圖示 (連結)

---

## 📱 響應式設計

### 手機版 (< 768px)
```tsx
className="container mx-auto px-4 py-3"
// 保持完整顯示,不折疊
```

### 桌面版 (≥ 768px)
```tsx
// 相同樣式,橫幅寬度自適應
```

**特色**:
- 橫幅在所有裝置上都完整顯示
- 文字自動換行
- 連結保持可點擊

---

## 🔧 技術實作

### 頁面類型變更

**變更前**:
```tsx
export default async function HomePage() {
  // Server Component
}
```

**變更後**:
```tsx
"use client";

export default function HomePage() {
  // Client Component (for router)
}
```

### z-index 層級規劃

```
z-50: 預覽版橫幅 (最高)
z-40: FAB 按鈕
z-10: Dropdown Menu
z-0:  一般內容
```

---

## 📁 檔案變更清單

### 新增檔案 (1)
1. `src/components/ui/alert.tsx` - Alert 組件 (shadcn)

### 修改檔案 (1)
1. `src/app/page.tsx` - 首頁重導向 + 預覽版橫幅

---

## 🧪 測試結果

### Build 測試
```bash
npm run build
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Generating static pages (9/9)
```

### 功能測試
- ✅ 訪問 `/` 自動重導向到 `/about`
- ✅ 橫幅顯示在最上層 (z-50)
- ✅ Sticky 定位正常運作
- ✅ 連結可正常點擊
- ✅ 響應式設計正常

### 效能影響
- **Alert 組件**: ~1 KB
- **首頁增加**: 12.2 kB (包含 redirect 邏輯)
- **總影響**: 微小

---

## ⚠️ 注意事項

### 這是暫時性功能!

**移除時機**: 其他功能完成後

**移除步驟**:
1. 刪除 `useEffect` 重導向邏輯
2. 移除預覽版橫幅 `<div>`
3. 將 `"use client"` 改回 Server Component (可選)

```tsx
// 移除後的 page.tsx
import { TasksCards } from "@/components/task";

export default async function HomePage() {
  return (
    <div className="container mx-auto space-y-5 px-4 py-4">
      <TasksCards />
    </div>
  );
}
```

### SEO 影響

⚠️ 由於使用客戶端重導向,搜尋引擎可能會索引到空白頁面

**建議**: 功能完成後盡快移除重導向

---

## 🔄 後續規劃

### 短期 (完成其他功能後)
1. 移除首頁重導向
2. 保留預覽版橫幅 (可選)
3. 或改為「Beta 版」橫幅

### 中期 (正式上線前)
1. 完全移除橫幅
2. 恢復 Server Component
3. 優化首頁 SEO

---

## 📊 使用者體驗

### 使用者流程

```
使用者訪問 /
    ↓
自動重導向到 /about
    ↓
瀏覽平台介紹
    ↓
點擊「開始使用」返回首頁
    ↓
看到預覽版橫幅提示
    ↓
瞭解平台開發狀態
```

### 橫幅文案

```
🏗️ 預覽版 - 開發中

此平台目前處於開發階段,部分功能尚未完成。
→ 瞭解更多關於平台
```

**設計理念**:
- 清楚告知開發狀態
- 提供更多資訊連結
- 不過度干擾使用者

---

## 📚 相關文件

- [About 頁面實作](./2025-10-03_19:30:00_about-page-implementation.md)
- [設計系統](../design/README.md)

---

## ✅ 完成檢查清單

- [x] 首頁重導向實作
- [x] Alert 組件安裝
- [x] 預覽版橫幅設計
- [x] Sticky 定位設定
- [x] z-index 層級設定
- [x] 響應式測試
- [x] Build 測試通過
- [x] 移除未使用的 import

---

## 🎯 移除指南

當其他功能完成,需要移除暫時性功能時:

### Step 1: 移除重導向
```tsx
// 刪除這段
useEffect(() => {
  router.push("/about");
}, [router]);
```

### Step 2: 移除橫幅 (可選)
```tsx
// 刪除整個 <div className="sticky...">...</div>
```

### Step 3: 移除相關 imports
```tsx
// 如果不再需要,移除:
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Construction, Info } from "lucide-react";
```

### Step 4: 恢復 Server Component (可選)
```tsx
// 移除 "use client"
// 改回 async function
export default async function HomePage() {
  // ...
}
```

---

**實作完成時間**: 2025-10-03_19:45:00
**Build 狀態**: ✅ 成功
**功能狀態**: ⚠️ 暫時性 (待移除)
**使用者影響**: 最小化
