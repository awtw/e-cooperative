# Changelog - UI 重構與路由優化

**日期時間**: 2025-10-03_17:38:27
**版本**: v0.2.0
**類型**: Feature + Refactor

---

## 📋 變更概要

本次更新由新成員 **WeiLocus** 協同開發,主要進行了首頁 UI 重構,將原本的表格式任務列表改為卡片式呈現,並優化了路由結構。

---

## 👥 貢獻者

- **WeiLocus** - 前端 UI 重構與路由設計
- **August (awtwa)** - 專案文件建立

---

## 🚀 主要變更

### 1. UI 重構 - 任務列表卡片化

#### 新增檔案
- `src/components/task/tasks-cards.tsx` - 全新的卡片式任務列表組件

#### 變更檔案
- `src/app/page.tsx` - 首頁從 Table 改為 Cards 呈現
- `src/components/task/index.ts` - 新增 TasksCards 匯出

#### 功能特點
✨ **卡片式設計**
- 響應式網格佈局 (1-4 欄位依據螢幕大小)
- 更直覺的視覺呈現
- 更好的行動裝置體驗

✨ **資訊展示優化**
- 任務標題與描述
- 狀態標籤 (待審核/可認領/已認領/進行中/已完成/已取消)
- 任務類型標籤
- 地點、需要人數、優先級、建立者等資訊
- 建立時間顯示

✨ **互動優化**
- 查看詳情按鈕 (連結到任務詳情頁)
- 文字截斷與 hover 顯示完整內容
- 平滑過渡動畫

#### 程式碼片段
```tsx
// 卡片式任務列表 - 響應式網格
<div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {tasks.map((task) => (
    <Card key={task.id}>
      {/* 卡片內容 */}
    </Card>
  ))}
</div>
```

---

### 2. 路由結構優化

#### 新增路由
- `/tasks/[taskId]` - 新的任務詳情頁面路徑
- `/[taskId]` - 根層級任務詳情頁 (可能為臨時路徑)

#### 新增檔案
- `src/app/tasks/[taskId]/page.tsx` - 任務詳情頁組件
- `src/app/[taskId]/page.tsx` - 根層級任務詳情頁

#### 路由變更
**之前**: `/dashboard/[taskId]`
**之後**: `/tasks/[taskId]`

這個變更讓路由結構更加清晰,`/dashboard` 作為儀表板主頁,`/tasks` 作為任務相關頁面。

---

### 3. 組件整合

#### 使用 useGetTasks Hook
```tsx
const { data: tasks, isFetching } = useGetTasks();
```

- 整合 React Query 進行資料獲取
- 載入狀態處理
- 錯誤處理

---

## 📊 影響範圍

### 檔案變更統計
```
新增檔案: 3 個
- src/app/[taskId]/page.tsx
- src/app/tasks/[taskId]/page.tsx
- src/components/task/tasks-cards.tsx

修改檔案: 2 個
- src/app/page.tsx (首頁)
- src/components/task/index.ts (匯出)
```

### 程式碼變更量
```
新增: ~190 行
修改: ~20 行
刪除: ~10 行
```

---

## 🎨 UI/UX 改進

### 之前 (Table 版本)
- ❌ 表格式呈現,在行動裝置上體驗較差
- ❌ 資訊密集,視覺較擁擠
- ❌ 需要橫向滾動查看完整資訊

### 之後 (Cards 版本)
- ✅ 卡片式設計,視覺更清爽
- ✅ 響應式佈局,行動裝置友善
- ✅ 資訊分層展示,易於掃視
- ✅ 更好的互動體驗

---

## 🔄 相容性

### Breaking Changes
⚠️ **路由變更**
- 任務詳情頁路由從 `/dashboard/[taskId]` 變更為 `/tasks/[taskId]`
- 需要更新所有相關連結

### 向下相容
✅ 資料結構沒有變更
✅ API 呼叫方式維持不變
✅ 原有的 TasksTable 組件仍然保留

---

## 📝 技術細節

### 使用的技術
- **React Server Components** - 頁面層級
- **Client Components** - 互動組件 ("use client")
- **TailwindCSS** - 樣式設計
  - 響應式斷點: sm / lg / xl
  - 工具類: grid / flex / line-clamp
- **shadcn/ui Components**
  - Card, CardHeader, CardContent, CardFooter
  - Button
- **React Query** - 資料獲取與狀態管理

### 效能考量
- ✅ 使用 `line-clamp` 限制文字行數
- ✅ 響應式圖片載入
- ✅ React Query 快取機制
- ✅ 條件渲染 (loading / empty state)

---

## 🐛 已知問題

### 待處理
1. ⚠️ `/[taskId]` 與 `/tasks/[taskId]` 路由重複,需要統一
2. ⚠️ 卡片高度不一致 (因描述長度不同)
3. ⚠️ Loading 狀態過於簡單,可優化為 Skeleton

### 建議改進
- 🔸 新增篩選與排序功能
- 🔸 新增分頁或無限滾動
- 🔸 新增任務搜尋功能
- 🔸 優化 Loading 骨架屏
- 🔸 新增空狀態插圖

---

## 🧪 測試建議

### 需要測試的項目
- [ ] 各螢幕尺寸下的卡片佈局
- [ ] 載入狀態顯示是否正確
- [ ] 空資料狀態顯示
- [ ] 查看詳情按鈕導向正確
- [ ] 狀態標籤顏色與文字對應
- [ ] 文字截斷與 hover 效果

---

## 📦 部署注意事項

### 環境變數
無新增環境變數需求

### 資料庫遷移
無需資料庫變更

### 相依套件
無新增套件依賴

---

## 🔗 相關 PR / Issue

- **PR #1**: Merge pull request from WeiLocus/dev-weii
- **Commit**: `887b60f` - feat: 將首頁 table 轉換成 card 樣式

---

## 📸 視覺對比

### 卡片式任務列表特點

```
┌─────────────────────────────────────────────┐
│ 任務標題                    [待審核] [清理] │
├─────────────────────────────────────────────┤
│ 任務描述文字...                             │
│                                             │
│ 地點: 花蓮縣光復鄉...    需要人數: 3/5      │
│ 優先級: 5/5            建立者: 張三          │
│                                             │
│ 建立於 2025/10/03          [查看詳情] ──→  │
└─────────────────────────────────────────────┘
```

---

## 🎯 下一步計劃

### 短期 (P0)
1. 統一任務詳情頁路由
2. 優化 Loading 狀態
3. 新增錯誤處理

### 中期 (P1)
1. 新增篩選與排序
2. 實作搜尋功能
3. 新增分頁機制

### 長期 (P2)
1. 任務卡片動畫效果
2. 拖拽排序功能
3. 批量操作

---

## 📚 文件更新

### 需要更新的文件
- [ ] `doc/pm/02_user_flow.md` - 更新頁面流程圖
- [ ] `doc/dev/01_technical_architecture.md` - 更新組件架構
- [ ] `README.md` - 更新截圖 (如有)

---

## 💬 備註

此次更新展現了團隊協作的成果,WeiLocus 的 UI/UX 改進大幅提升了使用者體驗。建議後續統一路由結構並補充完整的測試。

---

**變更記錄結束**
