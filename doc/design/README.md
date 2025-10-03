# Design - 設計規範文件

**最後更新**: 2025-10-03_18:35:50

---

## 📖 關於 Design

此目錄包含光復 e 互助平台的所有設計規範,包含色彩系統、字體排版、組件設計、互動模式等。確保整個平台的視覺與體驗一致性。

---

## 🎨 設計文件索引

### 2025-10-03

#### [色彩系統與登入按鈕 UX](./2025-10-03_18:35:50_color-system-and-login-ux.md)
**設計時間**: 18:35:50
**設計師**: August
**設計類型**: Color System + UX Pattern

**內容概要**:

**1. 色彩系統**
- 🎨 品牌色定義
  - 主色: 希望藍 (Hope Blue) - 信任、希望、可靠
  - 次色: 活力橙 (Energy Orange) - 溫暖、活力、行動
- 🌈 語意色系統
  - 成功綠、警示紅、警告黃
- 📊 狀態色 (6 種任務狀態)
  - Pending, Available, Claimed, In Progress, Completed, Cancelled
- 🎯 優先級色 (1-5 級)
- 🌓 Light/Dark Mode 完整定義
- ♿ 符合 WCAG 2.1 AA 標準

**2. 登入按鈕 UX**
- 設計策略: 「低干擾、高可及」
- 手機版: 精簡登入按鈕 + FAB (建立任務)
- 桌面版: Outline 按鈕 + 使用者 Dropdown
- 完整互動狀態設計
- 動畫與過渡效果

**3. 響應式設計**
- 手機版優先 (< 768px)
- 平板優化 (768-1023px)
- 桌面完整版 (≥ 1024px)
- 完整斷點定義

**4. 無障礙設計**
- 觸控目標 ≥ 44px
- 色彩對比度 > 4.5:1
- 鍵盤導航支援
- Screen Reader 友善

---

## 📐 設計原則

### 1. 行動優先 (Mobile First)
```
設計流程:
手機版設計 → 平板適配 → 桌面擴展
```

### 2. 可及性優先 (Accessibility First)
```
設計檢查清單:
✅ 色彩對比度
✅ 觸控目標大小
✅ 鍵盤導航
✅ Screen Reader 支援
```

### 3. 一致性 (Consistency)
```
保持一致:
- 顏色使用
- 間距系統
- 字體階層
- 互動模式
```

### 4. 漸進式揭露 (Progressive Disclosure)
```
資訊層級:
核心內容 → 次要資訊 → 進階功能
```

---

## 🎨 設計系統概覽

### 色彩系統

#### 品牌色
```
主色 (Primary):
Light: #2563EB (藍色 600)
Dark:  #60A5FA (藍色 400)

次色 (Secondary):
Light: #EA580C (橙色 600)
Dark:  #FB923C (橙色 400)
```

#### 中性色階
```
Light Mode:
Background: #FFFFFF
Surface: #FAFAFA
Foreground: #1F2937

Dark Mode:
Background: #111827
Surface: #1F2937
Foreground: #F9FAFB
```

### 字體系統
```
Font Family:
Primary: Inter / System UI
Monospace: JetBrains Mono

Font Sizes:
xs:   12px / 0.75rem
sm:   14px / 0.875rem
base: 16px / 1rem
lg:   18px / 1.125rem
xl:   20px / 1.25rem
2xl:  24px / 1.5rem
3xl:  30px / 1.875rem
```

### 間距系統
```
Spacing Scale (4px base):
1:  4px   (0.25rem)
2:  8px   (0.5rem)
3:  12px  (0.75rem)
4:  16px  (1rem)
6:  24px  (1.5rem)
8:  32px  (2rem)
12: 48px  (3rem)
16: 64px  (4rem)
```

### 圓角系統
```
Border Radius:
sm: 4px   (0.25rem)
md: 6px   (0.375rem)
lg: 8px   (0.5rem)
xl: 12px  (0.75rem)
2xl: 16px (1rem)
full: 9999px
```

---

## 🧩 組件設計規範

### 按鈕 (Button)

#### 變體 (Variants)
```tsx
// Default - 主要按鈕
<Button variant="default">
  主要操作
</Button>

// Outline - 次要按鈕
<Button variant="outline">
  次要操作
</Button>

// Ghost - 幽靈按鈕
<Button variant="ghost">
  輔助操作
</Button>

// Destructive - 危險操作
<Button variant="destructive">
  刪除
</Button>
```

#### 尺寸 (Sizes)
```tsx
<Button size="sm">   // h-8  px-3
<Button size="default"> // h-9  px-4
<Button size="lg">   // h-10 px-6
<Button size="icon"> // h-9  w-9 (正方形)
```

#### 狀態
```
Default → Hover → Active → Disabled
```

### 卡片 (Card)

#### 結構
```tsx
<Card>
  <CardHeader>
    <CardTitle>標題</CardTitle>
    <CardDescription>描述</CardDescription>
  </CardHeader>
  <CardContent>
    內容
  </CardContent>
  <CardFooter>
    操作按鈕
  </CardFooter>
</Card>
```

#### 樣式
```css
背景: surface
圓角: lg (8px)
邊框: 1px border
陰影: sm
Hover: shadow-md (可選)
```

### 輸入框 (Input)

#### 狀態
```
Default → Focus → Error → Disabled
```

#### 規格
```css
高度: 40px (h-10)
內距: 12px 16px
邊框: 1px input-border
圓角: md (6px)
字體: 14px

Focus:
outline: 2px ring
outline-offset: 2px
```

---

## 🎭 互動設計

### 動畫時長
```css
快速: 150ms (按鈕、連結)
標準: 200ms (卡片、選單)
緩慢: 300ms (頁面轉場、對話框)
```

### 緩動函數
```css
linear: linear
ease-in: cubic-bezier(0.4, 0, 1, 1)
ease-out: cubic-bezier(0, 0, 0.2, 1)
ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
```

### 常用動畫
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Scale */
@keyframes scale {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

---

## 📱 響應式設計

### 斷點系統
```css
sm:  640px  (大型手機)
md:  768px  (平板直向)
lg:  1024px (平板橫向/小筆電)
xl:  1280px (桌面)
2xl: 1536px (大螢幕)
```

### 容器寬度
```css
sm:  640px  max-w-screen-sm
md:  768px  max-w-screen-md
lg:  1024px max-w-screen-lg
xl:  1280px max-w-screen-xl
2xl: 1536px max-w-screen-2xl
```

### 響應式模式
```tsx
// 顯示/隱藏
<div className="hidden md:block">桌面版</div>
<div className="md:hidden">手機版</div>

// 響應式尺寸
<div className="text-sm md:text-base lg:text-lg">
  響應式文字
</div>

// 響應式佈局
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  響應式網格
</div>
```

---

## 🎯 設計流程

### 1. 需求分析
```
理解需求 → 定義問題 → 確認目標
```

### 2. 概念設計
```
草圖繪製 → 低保真原型 → 用戶測試
```

### 3. 視覺設計
```
高保真設計 → 互動原型 → 設計審查
```

### 4. 開發交付
```
設計規範 → 切圖/標註 → 開發協作
```

### 5. 測試優化
```
可用性測試 → 數據分析 → 迭代優化
```

---

## 🛠️ 設計工具

### 設計軟體
- **Figma** - UI/UX 設計與原型
- **Sketch** - macOS 設計工具
- **Adobe XD** - 跨平台設計

### 原型工具
- **Figma Prototype** - 互動原型
- **Framer** - 高保真動畫原型
- **ProtoPie** - 複雜互動原型

### 協作工具
- **Figma** - 設計協作
- **Miro** - 白板協作
- **Notion** - 文件協作

### 檢查工具
- **Stark** - 無障礙檢查
- **Color Oracle** - 色盲模擬
- **WAVE** - 網頁無障礙檢查

---

## 📋 設計檢查清單

### 視覺設計
- [ ] 使用設計系統的顏色
- [ ] 遵循字體階層
- [ ] 保持間距一致
- [ ] 使用正確的圓角
- [ ] 陰影使用適當

### 互動設計
- [ ] Hover 狀態明確
- [ ] Active 狀態回饋
- [ ] Focus 狀態可見
- [ ] Disabled 狀態清楚
- [ ] Loading 狀態友善

### 響應式設計
- [ ] 手機版 (< 640px)
- [ ] 平板版 (768px)
- [ ] 桌面版 (1024px+)
- [ ] 觸控目標 ≥ 44px
- [ ] 文字可讀性良好

### 無障礙設計
- [ ] 色彩對比度 ≥ 4.5:1
- [ ] 鍵盤可導航
- [ ] Screen Reader 支援
- [ ] ARIA 標籤完整
- [ ] 替代文字提供

---

## 📚 設計資源

### 內部資源
- [色彩系統](./2025-10-03_18:35:50_color-system-and-login-ux.md#色彩系統設計)
- [產品需求](../pm/01_product_requirements.md)
- [使用者流程](../pm/02_user_flow.md)

### 外部資源
- [Material Design](https://material.io/design)
- [Human Interface Guidelines](https://developer.apple.com/design/)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [Inclusive Design Principles](https://inclusivedesignprinciples.org/)

---

## 🎓 設計最佳實踐

### 1. 設計系統優先
```
使用設計系統中定義的:
- 顏色
- 字體
- 間距
- 組件
```

### 2. 用戶為中心
```
設計決策基於:
- 用戶研究
- 使用數據
- 反饋意見
```

### 3. 迭代優化
```
持續改進:
設計 → 測試 → 分析 → 優化 → 重複
```

### 4. 文檔化
```
記錄:
- 設計決策
- 變更原因
- 測試結果
```

---

## 🔄 版本管理

### 設計版本
```
v1.0.0 - 初始設計系統
v1.1.0 - 新增組件/變體
v2.0.0 - 重大設計改版
```

### 更新日誌
| 版本 | 日期 | 變更 |
|------|------|------|
| v1.0 | 2025-10-03 | 建立色彩系統與登入 UX 設計 |

---

**Design 文件中心結束**
