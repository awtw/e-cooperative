# v0.5.x - 新增 LINE 官方帳號入口 (Header + Contact)

**實作時間**: 2025-10-05_09:15:00
**開發者**: August
**類型**: ✨ Feature + 🧭 Navigation

---

## 📋 變更摘要

- 新增 `LINE 官方帳號` 入口於 Header (桌面/行動)
- 在 `Contact` 聯絡專線頁面頂部加入 CTA 卡片
- 新增常數 `LINE_OFFICIAL_URL` 統一管理外部連結

---

## 🔗 連結

- LINE 官方帳號: [`https://lin.ee/wzMaZ5l`](https://lin.ee/wzMaZ5l)

---

## 🧩 實作內容

### 1) 常數
```startLine:endLine:src/constant/common.ts
export const LINE_OFFICIAL_URL = "https://lin.ee/wzMaZ5l";
```

### 2) Header (桌面 + 行動)
```startLine:endLine:src/components/common/header.tsx
<a href={LINE_OFFICIAL_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" aria-label="加入 LINE 官方帳號 (另開新視窗)">
  <MessageCircle className="h-4 w-4" />
  LINE 官方帳號
</a>
```

行動版選單:
```startLine:endLine:src/components/common/header.tsx
<DropdownMenuItem asChild>
  <a href={LINE_OFFICIAL_URL} target="_blank" rel="noopener noreferrer" className="flex items-center">
    <MessageCircle className="mr-2 h-4 w-4" />
    <span>LINE 官方帳號</span>
  </a>
</DropdownMenuItem>
```

### 3) Contact 頁 CTA 卡片
```startLine:endLine:src/app/contact/contact-content.tsx
<Card className="mb-6">
  <CardContent className="flex flex-col items-start justify-between gap-3 p-5 md:flex-row md:items-center md:gap-4 md:p-6">
    {/* 左側說明 + 圖示 */}
    {/* 右側按鈕 → 另開新視窗 */}
  </CardContent>
</Card>
```

---

## ✅ 驗收標準

- Header 右側導覽顯示「LINE 官方帳號」連結
- 行動版漢堡選單包含「LINE 官方帳號」項目
- Contact 頁頂部顯示 CTA 卡片,點擊後另開新視窗
- 所有連結皆指向 `https://lin.ee/wzMaZ5l`

---

## 📁 變更檔案

1. `src/constant/common.ts` → 新增 `LINE_OFFICIAL_URL`
2. `src/components/common/header.tsx` → 新增桌面/行動連結
3. `src/app/contact/contact-content.tsx` → 新增 CTA 卡片
4. `doc/analyst/2025-10-05_09:00:00_line-official-account-integration.md` → 分析文檔

---

## 🧪 測試結果

- ✅ 桌面 Chrome / Safari: 連結正常開啟
- ✅ iOS Safari: 漢堡選單內連結正常
- ✅ 無登入狀態下可用,不影響既有流程

---

## 🔜 後續建議

- Contact 頁補充 QR Code 圖片以利掃描 (若有官方提供)
- 首頁或 About 可加入次要 CTA 提醒加入 LINE
