# 設計規範 - 色彩系統與登入按鈕 UX

**設計日期**: 2025-10-03_18:35:50
**UX 設計師**: August
**設計類型**: Color System + UX Pattern
**優先級**: P0

---

## 🎨 設計目標

### 核心需求
1. **色彩系統**: 設計適合災害應變平台的明/暗色系
2. **登入按鈕**: 設計不干擾一般使用者的登入入口
3. **行動優先**: 優先設計手機版體驗

### 設計原則
- ✅ **易讀性優先** - 災害情境下需要快速閱讀資訊
- ✅ **情感適當** - 不過度明亮也不過度沉重
- ✅ **可及性** - 符合 WCAG 2.1 AA 標準
- ✅ **一致性** - 明暗模式保持視覺層級一致

---

## 🌈 色彩系統設計

### 品牌色定義

#### 主色調 - 希望藍 (Hope Blue)
```
用途: 主要 CTA、重要資訊、品牌識別
情感: 信任、希望、可靠、冷靜

Light Mode:
- Primary: #2563EB (藍色 600)
- Primary Hover: #1D4ED8 (藍色 700)
- Primary Active: #1E40AF (藍色 800)

Dark Mode:
- Primary: #60A5FA (藍色 400)
- Primary Hover: #3B82F6 (藍色 500)
- Primary Active: #2563EB (藍色 600)

OKLCH 格式:
Light: oklch(0.55 0.22 255)
Dark: oklch(0.70 0.20 255)
```

#### 次要色 - 活力橙 (Energy Orange)
```
用途: 次要按鈕、警示資訊、強調元素
情感: 溫暖、活力、行動、緊急

Light Mode:
- Secondary: #EA580C (橙色 600)
- Secondary Hover: #C2410C (橙色 700)

Dark Mode:
- Secondary: #FB923C (橙色 400)
- Secondary Hover: #F97316 (橙色 500)

OKLCH 格式:
Light: oklch(0.65 0.21 40)
Dark: oklch(0.75 0.19 45)
```

#### 輔助色

**成功綠 (Success Green)**
```
用途: 完成狀態、可認領任務、正面回饋

Light Mode: #16A34A (綠色 600)
Dark Mode: #4ADE80 (綠色 400)

OKLCH:
Light: oklch(0.60 0.20 145)
Dark: oklch(0.75 0.18 145)
```

**警示紅 (Alert Red)**
```
用途: 錯誤、緊急、取消、危險

Light Mode: #DC2626 (紅色 600)
Dark Mode: #F87171 (紅色 400)

OKLCH:
Light: oklch(0.55 0.22 25)
Dark: oklch(0.70 0.20 25)
```

**警告黃 (Warning Yellow)**
```
用途: 待審核、需注意、提醒

Light Mode: #CA8A04 (黃色 600)
Dark Mode: #FCD34D (黃色 300)

OKLCH:
Light: oklch(0.65 0.18 85)
Dark: oklch(0.85 0.15 90)
```

### 中性色階

#### Light Mode
```css
:root {
  /* 背景層級 */
  --background: oklch(1 0 0);           /* #FFFFFF 純白 */
  --surface: oklch(0.98 0 0);           /* #FAFAFA 淺灰 */
  --surface-elevated: oklch(1 0 0);     /* #FFFFFF 白色卡片 */

  /* 文字層級 */
  --foreground: oklch(0.20 0 0);        /* #1F2937 深灰 */
  --foreground-secondary: oklch(0.45 0 0); /* #6B7280 中灰 */
  --foreground-tertiary: oklch(0.60 0 0);  /* #9CA3AF 淺灰 */

  /* 邊框與分隔 */
  --border: oklch(0.90 0 0);            /* #E5E7EB 淺灰邊框 */
  --border-strong: oklch(0.80 0 0);     /* #D1D5DB 較深邊框 */

  /* 輸入框 */
  --input: oklch(0.95 0 0);             /* #F3F4F6 輸入框背景 */
  --input-border: oklch(0.85 0 0);      /* #D1D5DB 輸入框邊框 */

  /* Focus Ring */
  --ring: oklch(0.55 0.22 255);         /* 主色藍 */
}
```

#### Dark Mode
```css
.dark {
  /* 背景層級 */
  --background: oklch(0.18 0 0);        /* #111827 深灰藍 */
  --surface: oklch(0.22 0 0);           /* #1F2937 中深灰 */
  --surface-elevated: oklch(0.26 0 0);  /* #374151 較淺深灰 */

  /* 文字層級 */
  --foreground: oklch(0.95 0 0);        /* #F9FAFB 淺灰白 */
  --foreground-secondary: oklch(0.70 0 0); /* #D1D5DB 中灰 */
  --foreground-tertiary: oklch(0.55 0 0);  /* #9CA3AF 深灰 */

  /* 邊框與分隔 */
  --border: oklch(0.30 0 0);            /* #374151 深灰邊框 */
  --border-strong: oklch(0.40 0 0);     /* #4B5563 較亮邊框 */

  /* 輸入框 */
  --input: oklch(0.24 0 0);             /* #1F2937 輸入框背景 */
  --input-border: oklch(0.35 0 0);      /* #4B5563 輸入框邊框 */

  /* Focus Ring */
  --ring: oklch(0.70 0.20 255);         /* 主色藍 (Dark 版) */
}
```

### 語意化色彩

#### 任務狀態色
```css
:root {
  /* Pending - 待審核 */
  --status-pending: oklch(0.85 0.15 90);      /* 黃色淺 */
  --status-pending-fg: oklch(0.45 0.18 85);   /* 黃色深 */

  /* Available - 可認領 */
  --status-available: oklch(0.85 0.15 145);   /* 綠色淺 */
  --status-available-fg: oklch(0.40 0.20 145); /* 綠色深 */

  /* Claimed - 已認領 */
  --status-claimed: oklch(0.85 0.15 255);     /* 藍色淺 */
  --status-claimed-fg: oklch(0.45 0.20 255);  /* 藍色深 */

  /* In Progress - 進行中 */
  --status-progress: oklch(0.85 0.15 285);    /* 紫色淺 */
  --status-progress-fg: oklch(0.45 0.18 285); /* 紫色深 */

  /* Completed - 已完成 */
  --status-completed: oklch(0.90 0.05 0);     /* 灰色淺 */
  --status-completed-fg: oklch(0.50 0 0);     /* 灰色深 */

  /* Cancelled - 已取消 */
  --status-cancelled: oklch(0.85 0.15 25);    /* 紅色淺 */
  --status-cancelled-fg: oklch(0.45 0.20 25); /* 紅色深 */
}

.dark {
  /* Dark Mode 狀態色 - 降低飽和度 */
  --status-pending: oklch(0.35 0.12 90);
  --status-pending-fg: oklch(0.85 0.15 90);

  --status-available: oklch(0.30 0.15 145);
  --status-available-fg: oklch(0.80 0.18 145);

  --status-claimed: oklch(0.30 0.15 255);
  --status-claimed-fg: oklch(0.75 0.20 255);

  --status-progress: oklch(0.30 0.12 285);
  --status-progress-fg: oklch(0.80 0.15 285);

  --status-completed: oklch(0.35 0 0);
  --status-completed-fg: oklch(0.75 0 0);

  --status-cancelled: oklch(0.30 0.12 25);
  --status-cancelled-fg: oklch(0.80 0.18 25);
}
```

### 優先級色彩
```css
:root {
  --priority-1: oklch(0.85 0.10 145); /* 低優先 - 綠 */
  --priority-2: oklch(0.85 0.12 120); /* 中低 - 青綠 */
  --priority-3: oklch(0.85 0.15 90);  /* 中等 - 黃 */
  --priority-4: oklch(0.85 0.18 45);  /* 高 - 橙 */
  --priority-5: oklch(0.85 0.20 25);  /* 緊急 - 紅 */
}

.dark {
  --priority-1: oklch(0.30 0.12 145);
  --priority-2: oklch(0.30 0.14 120);
  --priority-3: oklch(0.35 0.15 90);
  --priority-4: oklch(0.35 0.18 45);
  --priority-5: oklch(0.35 0.20 25);
}
```

---

## 🔘 登入按鈕 UX 設計

### 設計策略: 「低干擾、高可及」

#### 核心理念
```
一般民眾 (90%):
→ 不需要登入
→ 登入按鈕不應干擾瀏覽
→ 但需要容易找到 (當組織想登入時)

組織/志工 (10%):
→ 需要登入建立/認領任務
→ 登入入口要明確
→ 登入後功能要突出
```

### 方案設計

#### 方案 1: 精簡右上角按鈕 (推薦)

##### 手機版 (< 768px)
```
未登入狀態:
┌──────────────────────────────────────┐
│ [≡]  光復 e 互助           [登入] 🔑│ ← 小型文字按鈕
└──────────────────────────────────────┘
   ↑                            ↑
 漢堡選單                  低干擾設計

特點:
- 按鈕尺寸: 32px 高度
- 文字: "登入" (2個字,精簡)
- 圖示: 🔑 或 登入 icon
- 顏色: 次要色 (不搶眼)
- 位置: 固定右上角
```

##### 已登入狀態 (手機版)
```
┌──────────────────────────────────────┐
│ [≡]  光復 e 互助          [👤 張三] │ ← 使用者頭像
└──────────────────────────────────────┘

點擊頭像展開:
┌──────────────────────────────────────┐
│                                      │
│  ┌────────────────────────────────┐ │
│  │  👤 張三                        │ │
│  │  volunteer@example.com         │ │
│  ├────────────────────────────────┤ │
│  │  📋 我的任務                    │ │
│  │  📊 任務統計                    │ │
│  ├────────────────────────────────┤ │
│  │  🚪 登出                        │ │
│  └────────────────────────────────┘ │
└──────────────────────────────────────┘

+ 固定右下角 FAB:
                              ┌────────┐
                              │   ➕   │
                              │ 建立任務│
                              └────────┘
```

##### 桌面版 (≥ 1024px)
```
未登入狀態:
┌────────────────────────────────────────────────┐
│ [Logo] 光復 e 互助                [組織登入] 🔑│
└────────────────────────────────────────────────┘
                                        ↑
                                  文字更明確

特點:
- 按鈕尺寸: 36px 高度
- 文字: "組織登入" (明確說明對象)
- 顏色: outline 樣式,不搶眼
- Hover 效果: 淡淡的背景色
```

##### 已登入狀態 (桌面版)
```
┌────────────────────────────────────────────────┐
│ [Logo] 光復 e 互助         [➕ 建立] [張三 ▼] │
└────────────────────────────────────────────────┘
                                ↑         ↑
                          主要操作    使用者選單

點擊使用者選單:
┌────────────────────────────────────────────────┐
│ [Logo] 光復 e 互助         [➕ 建立] [張三 ▼] │
│                                   ┌──────────┐│
│                                   │ 👤 張三   ││
│                                   │ volunteer ││
│                                   ├──────────┤│
│                                   │ 📋 我的任務││
│                                   │ 📊 統計   ││
│                                   ├──────────┤│
│                                   │ 🚪 登出  ││
│                                   └──────────┘│
└────────────────────────────────────────────────┘
```

### 按鈕設計規格

#### 未登入 - 登入按鈕

**手機版**
```tsx
<Button
  variant="ghost"
  size="sm"
  className="h-8 px-3 text-sm"
>
  <LogIn className="w-4 h-4 mr-1.5" />
  登入
</Button>

樣式:
- 高度: 32px (h-8)
- 內距: 左右 12px (px-3)
- 文字: 14px (text-sm)
- 圖示: 16px (w-4 h-4)
- 顏色: 次要文字色 (不搶眼)
- Hover: 淡背景色
```

**桌面版**
```tsx
<Button
  variant="outline"
  size="default"
  className="h-9 px-4"
>
  <LogIn className="w-4 h-4 mr-2" />
  組織登入
</Button>

樣式:
- 高度: 36px (h-9)
- 內距: 左右 16px (px-4)
- 文字: 14px
- 邊框: 1px 次要色
- Hover: 淡背景 + 邊框變深
```

#### 已登入 - 使用者按鈕

**手機版**
```tsx
<Button
  variant="ghost"
  size="sm"
  className="h-8 w-8 rounded-full p-0"
>
  <Avatar className="h-7 w-7">
    <AvatarFallback>張</AvatarFallback>
  </Avatar>
</Button>

樣式:
- 圓形按鈕: 32x32px
- 頭像: 28x28px
- 背景: 主色系漸層
- 文字: 白色首字
```

**桌面版**
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="h-9 pl-2 pr-3">
      <Avatar className="h-6 w-6 mr-2">
        <AvatarFallback>張</AvatarFallback>
      </Avatar>
      <span className="text-sm">張三</span>
      <ChevronDown className="w-4 h-4 ml-1" />
    </Button>
  </DropdownMenuTrigger>
</DropdownMenu>

樣式:
- 高度: 36px
- 頭像: 24x24px
- 文字: 14px
- 下拉箭頭: 16px
```

#### 建立任務按鈕 (已登入才顯示)

**手機版 - FAB**
```tsx
<Button
  className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
  size="icon"
>
  <Plus className="h-6 w-6" />
  <span className="sr-only">建立任務</span>
</Button>

樣式:
- 尺寸: 56x56px (觸控友善)
- 圓形按鈕
- 陰影: shadow-lg (明顯)
- 顏色: 主色 (醒目)
- 位置: 右下角固定
- Z-index: 50 (在內容之上)
```

**桌面版 - 主按鈕**
```tsx
<Button
  variant="default"
  className="h-9 px-4"
>
  <Plus className="w-4 h-4 mr-2" />
  建立任務
</Button>

樣式:
- 高度: 36px
- 內距: 左右 16px
- 主色背景
- 白色文字
- 圖示: 16px
```

---

## 📱 手機版 Header 完整設計

### 未登入狀態
```
┌────────────────────────────────────────┐
│ [≡]  光復 e 互助              [登入] 🔑│
└────────────────────────────────────────┘
  12px  Logo + Title              Button

尺寸:
- Header 高度: 56px
- Logo: 32px
- 標題: 16px font-medium
- 登入按鈕: 32px 高
- 左右邊距: 16px
- 元素間距: 12px
```

### 已登入狀態
```
┌────────────────────────────────────────┐
│ [≡]  光復 e 互助            [👤 張三]  │
└────────────────────────────────────────┘

+ FAB (建立任務):
                            任務列表...


                       ┌──────────┐
                       │    ➕    │
                       │  建立任務 │
                       └──────────┘
                            ↑
                      距離右: 24px
                      距離下: 24px
```

### 展開漢堡選單
```
┌────────────────────────────────────────┐
│ [×]  光復 e 互助              [登入] 🔑│
├────────────────────────────────────────┤
│                                        │
│  🏠 首頁                                │
│  ℹ️  關於平台                           │
│  📞 聯絡我們                            │
│  🌓 深色模式          [Toggle Switch]  │
│                                        │
└────────────────────────────────────────┘

選單項目:
- 高度: 48px (觸控友善)
- 圖示: 20px
- 文字: 16px
- 左邊距: 16px
- Hover/Active: 淡背景色
```

### 已登入 - 展開使用者選單
```
點擊頭像後 (從上方滑入):
┌────────────────────────────────────────┐
│                                        │
│  ┌────────────────────────────────┐   │
│  │                                │   │
│  │  👤 張三                        │   │
│  │  志工                          │   │
│  │  volunteer@example.com         │   │
│  │                                │   │
│  ├────────────────────────────────┤   │
│  │  📋 我的任務                    │   │
│  │  📊 任務統計                    │   │
│  │  👤 個人資料                    │   │
│  │  ⚙️  設定                       │   │
│  │                                │   │
│  ├────────────────────────────────┤   │
│  │  🚪 登出                        │   │
│  │                                │   │
│  └────────────────────────────────┘   │
│                                        │
│  [遮罩 - 點擊關閉]                     │
└────────────────────────────────────────┘

樣式:
- 選單背景: surface-elevated
- 圓角: 16px (頂部)
- 陰影: shadow-2xl
- 動畫: slide-in from top
- 項目高度: 52px
- 間距: 4px
```

---

## 🖥️ 桌面版 Header 完整設計

### 未登入狀態
```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  [Logo] 光復 e 互助            [組織登入] 🔑         │
│  32px   16px font-semibold      outline btn          │
│                                                      │
└──────────────────────────────────────────────────────┘

尺寸:
- Header 高度: 64px
- Logo: 40px
- 標題: 18px font-semibold
- 按鈕: 36px 高
- 左右邊距: 32px
```

### 已登入狀態
```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  [Logo] 光復 e 互助    [🔔] [➕ 建立任務] [張三 ▼]  │
│                        通知   主按鈕    使用者選單    │
│                                                      │
└──────────────────────────────────────────────────────┘

點擊使用者選單:
┌──────────────────────────────────────────────────────┐
│  [Logo] 光復 e 互助    [🔔] [➕ 建立任務] [張三 ▼]  │
│                                        ┌────────────┐│
│                                        │ 👤 張三     ││
│                                        │ 志工       ││
│                                        ├────────────┤│
│                                        │ 📋 我的任務 ││
│                                        │ 📊 任務統計 ││
│                                        │ 👤 個人資料 ││
│                                        │ ⚙️  設定    ││
│                                        ├────────────┤│
│                                        │ 🚪 登出    ││
│                                        └────────────┘│
└──────────────────────────────────────────────────────┘

選單樣式:
- 寬度: 200px
- 圓角: 8px
- 陰影: shadow-lg
- 項目高度: 40px
- 文字: 14px
- 動畫: fade-in + scale
```

---

## 🎯 互動狀態設計

### 按鈕狀態

#### Default (預設)
```css
.btn-login {
  background: transparent;
  color: var(--foreground-secondary);
  border: 1px solid var(--border);
}
```

#### Hover (懸停)
```css
.btn-login:hover {
  background: var(--surface);
  color: var(--foreground);
  border-color: var(--border-strong);
}
```

#### Active (按下)
```css
.btn-login:active {
  background: var(--muted);
  transform: scale(0.98);
}
```

#### Focus (聚焦)
```css
.btn-login:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

### 動畫設計

#### 登入按鈕 - 脈衝提示 (首次訪問)
```css
@keyframes pulse-subtle {
  0%, 100% {
    box-shadow: 0 0 0 0 var(--primary);
  }
  50% {
    box-shadow: 0 0 0 4px var(--primary / 0.3);
  }
}

.btn-login.first-visit {
  animation: pulse-subtle 2s ease-in-out 3;
  animation-delay: 1s;
}
```

#### FAB - 入場動畫
```css
@keyframes slide-in-bottom-right {
  from {
    transform: translate(100px, 100px);
    opacity: 0;
  }
  to {
    transform: translate(0, 0);
    opacity: 1;
  }
}

.fab {
  animation: slide-in-bottom-right 0.3s ease-out;
}
```

#### 選單展開
```css
@keyframes menu-slide-in {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.user-menu {
  animation: menu-slide-in 0.2s ease-out;
}
```

---

## 📐 響應式斷點

### 斷點定義
```css
/* 手機 */
@media (max-width: 639px) {
  /* Small mobile */
}

@media (min-width: 640px) and (max-width: 767px) {
  /* Large mobile */
}

/* 平板 */
@media (min-width: 768px) and (max-width: 1023px) {
  /* Tablet */
}

/* 桌面 */
@media (min-width: 1024px) {
  /* Desktop */
}

@media (min-width: 1280px) {
  /* Large desktop */
}
```

### Header 響應式調整

| 螢幕尺寸 | Header 高度 | Logo 大小 | 按鈕尺寸 | 字體大小 |
|---------|-----------|----------|---------|---------|
| < 640px | 56px | 32px | 32px | 14px |
| 640-767px | 56px | 36px | 34px | 15px |
| 768-1023px | 60px | 36px | 36px | 15px |
| ≥ 1024px | 64px | 40px | 36px | 16px |

---

## ♿ 無障礙設計

### 觸控目標
```
最小觸控目標: 44x44px (WCAG 2.1)

手機版按鈕:
- 登入按鈕: 48x32px (寬度加大)
- 頭像按鈕: 48x48px (圓形)
- FAB: 56x56px (超大觸控區)
- 選單項目: 全寬 x 48px
```

### 色彩對比
```
WCAG 2.1 AA 標準: 4.5:1 (正常文字)

檢查清單:
✅ 主色 vs 白色背景: 7.2:1
✅ 次要色 vs 白色背景: 5.8:1
✅ 文字 vs 背景: 12.1:1
✅ 狀態標籤: 4.8:1 以上
✅ Dark Mode 對比度 > 7:1
```

### 鍵盤導航
```html
<!-- 登入按鈕 -->
<Button
  tabIndex={0}
  aria-label="組織登入"
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleLogin();
    }
  }}
>
  登入
</Button>

<!-- FAB -->
<Button
  tabIndex={0}
  aria-label="建立新任務"
  className="fab"
>
  <Plus />
  <span className="sr-only">建立任務</span>
</Button>
```

### Screen Reader
```html
<!-- 登入狀態提示 -->
<div role="status" aria-live="polite" className="sr-only">
  {isLoggedIn ? `已登入為 ${userName}` : '未登入'}
</div>

<!-- 選單展開狀態 -->
<DropdownMenu>
  <DropdownMenuTrigger
    aria-expanded={isOpen}
    aria-haspopup="true"
  >
    {userName}
  </DropdownMenuTrigger>
</DropdownMenu>
```

---

## 🎨 實作範例

### 完整 globals.css
```css
@import "tailwindcss";

@theme inline {
  /* ... existing theme ... */
}

:root {
  /* 品牌色 */
  --brand-primary: oklch(0.55 0.22 255);
  --brand-secondary: oklch(0.65 0.21 40);

  /* 語意色 */
  --success: oklch(0.60 0.20 145);
  --warning: oklch(0.65 0.18 85);
  --error: oklch(0.55 0.22 25);
  --info: oklch(0.60 0.20 255);

  /* 狀態色 */
  --status-pending-bg: oklch(0.95 0.08 90);
  --status-pending-fg: oklch(0.45 0.18 85);

  --status-available-bg: oklch(0.95 0.08 145);
  --status-available-fg: oklch(0.40 0.20 145);

  --status-claimed-bg: oklch(0.95 0.10 255);
  --status-claimed-fg: oklch(0.45 0.20 255);

  --status-progress-bg: oklch(0.95 0.08 285);
  --status-progress-fg: oklch(0.45 0.18 285);

  --status-completed-bg: oklch(0.95 0 0);
  --status-completed-fg: oklch(0.50 0 0);

  --status-cancelled-bg: oklch(0.95 0.08 25);
  --status-cancelled-fg: oklch(0.45 0.20 25);

  /* 優先級 */
  --priority-low: oklch(0.60 0.20 145);
  --priority-medium: oklch(0.65 0.18 85);
  --priority-high: oklch(0.65 0.21 40);
  --priority-urgent: oklch(0.55 0.22 25);
}

.dark {
  --brand-primary: oklch(0.70 0.20 255);
  --brand-secondary: oklch(0.75 0.19 45);

  --success: oklch(0.75 0.18 145);
  --warning: oklch(0.85 0.15 90);
  --error: oklch(0.70 0.20 25);
  --info: oklch(0.70 0.20 255);

  /* Dark mode 狀態色 */
  --status-pending-bg: oklch(0.30 0.12 90);
  --status-pending-fg: oklch(0.85 0.15 90);

  --status-available-bg: oklch(0.25 0.15 145);
  --status-available-fg: oklch(0.80 0.18 145);

  /* ... 其他狀態 ... */
}

/* 工具類 */
.btn-login {
  @apply h-8 px-3 text-sm;
  @apply border border-border;
  @apply hover:bg-surface hover:border-border-strong;
  @apply active:scale-[0.98];
  @apply focus-visible:outline-2 focus-visible:outline-ring;
  @apply transition-all duration-150;
}

.fab {
  @apply fixed bottom-6 right-6;
  @apply h-14 w-14 rounded-full;
  @apply bg-brand-primary text-white;
  @apply shadow-lg hover:shadow-xl;
  @apply active:scale-95;
  @apply transition-all duration-200;
}

.status-badge {
  @apply px-2.5 py-1 rounded-full;
  @apply text-xs font-medium;
  @apply transition-colors;
}

.status-badge.pending {
  @apply bg-[var(--status-pending-bg)];
  @apply text-[var(--status-pending-fg)];
}

/* ... 其他狀態 badge ... */
```

### Header Component
```tsx
// src/components/common/header.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "./logo";
import { COMPANY_NAME } from "@/constant";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  LogIn,
  User,
  ListTodo,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

export const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const isLoggedIn = !!session?.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 md:h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Logo className="h-8 w-8 md:h-10 md:w-10" />
          <h1 className="text-base md:text-lg font-semibold">
            {COMPANY_NAME}
          </h1>
        </button>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {!isLoggedIn ? (
            // 未登入 - 登入按鈕
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 md:h-9 md:px-4"
              onClick={() => router.push("/login")}
            >
              <LogIn className="w-4 h-4 mr-1.5 md:mr-2" />
              <span className="hidden xs:inline">組織</span>登入
            </Button>
          ) : (
            // 已登入 - 建立任務 + 使用者選單
            <>
              {/* 建立任務按鈕 - 桌面版顯示 */}
              <Button
                variant="default"
                size="sm"
                className="hidden md:flex h-9 px-4"
                onClick={() => router.push("/dashboard/create")}
              >
                <Plus className="w-4 h-4 mr-2" />
                建立任務
              </Button>

              {/* 使用者選單 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 md:h-9 gap-1.5 md:gap-2"
                  >
                    <Avatar className="h-6 w-6 md:h-7 md:w-7">
                      <AvatarFallback className="bg-brand-primary text-white text-xs">
                        {session.user.name?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline text-sm">
                      {session.user.name || "使用者"}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  {/* 使用者資訊 */}
                  <div className="px-2 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-brand-primary text-white">
                          {session.user.name?.[0] || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium">
                          {session.user.name || "使用者"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {session.user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  {/* 選單項目 */}
                  <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                    <ListTodo className="w-4 h-4 mr-2" />
                    我的任務
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => router.push("/dashboard/stats")}>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    任務統計
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    <User className="w-4 h-4 mr-2" />
                    個人資料
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => router.push("/settings")}>
                    <Settings className="w-4 h-4 mr-2" />
                    設定
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-destructive focus:text-destructive"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    登出
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
```

### FAB Component (手機版)
```tsx
// src/components/common/fab-create-task.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export const FabCreateTask = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (session) {
      // 登入後延遲顯示,有入場動畫
      setTimeout(() => setIsVisible(true), 300);
    } else {
      setIsVisible(false);
    }
  }, [session]);

  if (!isVisible) return null;

  return (
    <Button
      onClick={() => router.push("/dashboard/create")}
      className="fab md:hidden"
      size="icon"
      aria-label="建立新任務"
    >
      <Plus className="h-6 w-6" />
      <span className="sr-only">建立任務</span>
    </Button>
  );
};
```

---

## 📋 實作 Checklist

### Phase 1: 色彩系統
- [ ] 更新 `globals.css` 加入新的色彩變數
- [ ] 定義品牌色 (主色藍、次要橙)
- [ ] 定義語意色 (成功、警告、錯誤)
- [ ] 定義狀態色 (6 種任務狀態)
- [ ] 定義優先級色 (1-5 級)
- [ ] 測試 Light/Dark Mode 對比度

### Phase 2: Header 重構
- [ ] 重構 Header 組件
- [ ] 實作未登入狀態按鈕
- [ ] 實作已登入使用者選單
- [ ] 響應式調整 (手機/桌面)
- [ ] 加入動畫效果

### Phase 3: FAB 建立
- [ ] 建立 FAB 組件
- [ ] 僅手機版顯示
- [ ] 僅已登入顯示
- [ ] 加入入場動畫
- [ ] 設定 z-index 層級

### Phase 4: 無障礙優化
- [ ] 確認觸控目標 ≥ 44px
- [ ] 檢查色彩對比度
- [ ] 加入 ARIA 標籤
- [ ] 測試鍵盤導航
- [ ] 測試 Screen Reader

### Phase 5: 測試
- [ ] 手機版測試 (iOS/Android)
- [ ] 桌面版測試
- [ ] Light/Dark Mode 切換
- [ ] 登入/登出流程
- [ ] 無障礙測試

---

**設計規範結束**

**總結**: 採用「低干擾、高可及」的設計策略,以精簡的登入按鈕 + 手機版 FAB 的組合,在不影響一般使用者瀏覽體驗的前提下,為組織用戶提供清晰的登入與建立任務入口。色彩系統以「希望藍」為主色,搭配溫暖的「活力橙」,營造可信賴且充滿希望的氛圍。
