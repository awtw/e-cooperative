# Google Analytics 設定與事件紀錄

本資料夾紀錄本專案 GA4 的安裝方式、環境變數設定與事件規劃。

- 安裝與載入：請參考 `./setup.md`
- 事件對照與擴充：請參考 `./events.md`

## 相關實作檔案
- `src/app/layout.tsx`：載入 GA 與掛載前端監聽器
- `src/lib/ga.ts`：GA ID 來源與 `sendPageview`/`sendEvent` 方法
- `src/components/common/analytics-listener.tsx`：依路由送出 page_view 與自訂事件
