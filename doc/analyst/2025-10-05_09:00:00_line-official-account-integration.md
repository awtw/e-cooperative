# 分析 - 加入 LINE 官方帳號入口

**分析日期**: 2025-10-05_09:00:00
**分析師**: August
**需求來源**: 專案干係人請求
**優先級**: P0 (高)

---

## 📋 需求概述

- **目標**: 在站內提供加入 LINE 官方帳號的清楚入口,以便民眾透過 LINE 接收通知與聯繫。
- **來源連結**: `https://lin.ee/wzMaZ5l`

---

## 🔍 位置分析

### 候選位置
- Header 導覽列
- 行動版漢堡選單
- Contact 聯絡專線頁面

### 原則
- 低干擾、不搶主流程 (瀏覽任務)
- 顯示在「找聯絡資訊」的高關聯場景
- 一致於設計系統 (shadcn/ui + Tailwind)

### 決策
- Header: 新增「LINE 官方帳號」外部連結,桌面與行動版皆可觸達。
- Contact: 在頁面頂部加入醒目的 CTA 卡片,引導加入 LINE。

---

## 🧩 資訊架構與文案

- Header 文字: 「LINE 官方帳號」+ 圖示
- 行動版: 放置於導覽選單清單底部,與主要導覽分隔
- Contact CTA 文案:
  - 標題: 加入 LINE 官方帳號
  - 說明: 即時接收最新通知與聯繫方式,掃描或點擊連結加入。

---

## 🛠️ 實作重點

1) 常數
```startLine:endLine:src/constant/common.ts
export const LINE_OFFICIAL_URL = "https://lin.ee/wzMaZ5l";
```

2) Header 導覽
```startLine:endLine:src/components/common/header.tsx
import { COMPANY_NAME, LINE_OFFICIAL_URL } from "@/constant";
// ...
<a href={LINE_OFFICIAL_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" aria-label="加入 LINE 官方帳號 (另開新視窗)">
  <MessageCircle className="h-4 w-4" />
  LINE 官方帳號
</a>
```

3) 行動版選單
```startLine:endLine:src/components/common/header.tsx
<DropdownMenuItem asChild>
  <a href={LINE_OFFICIAL_URL} target="_blank" rel="noopener noreferrer" className="flex items-center">
    <MessageCircle className="mr-2 h-4 w-4" />
    <span>LINE 官方帳號</span>
  </a>
</DropdownMenuItem>
```

4) Contact CTA 卡片
```startLine:endLine:src/app/contact/contact-content.tsx
<Card className="mb-6">
  <CardContent className="flex flex-col items-start justify-between gap-3 p-5 md:flex-row md:items-center md:gap-4 md:p-6">
    {/* 左側說明 + 圖示 */}
    {/* 右側按鈕 → 另開新視窗 */}
  </CardContent>
</Card>
```

---

## ✅ 可用性與可維護性

- 使用常數 `LINE_OFFICIAL_URL` 統一管理連結
- 連結一律 `target=_blank` + `rel=noopener noreferrer`
- 使用既有 UI 元件 `Button`, `Card`

---

## 🧪 測試清單

- 桌面版: Header 連結可正常開啟
- 行動版: 漢堡選單內可見 LINE 項目
- Contact 頁: CTA 按鈕可正常開啟
- 無登入狀態限制; 不影響既有導覽

---

## 📚 參考

- LINE 官方帳號加入連結: [`https://lin.ee/wzMaZ5l`](https://lin.ee/wzMaZ5l)

---

**分析結束**


