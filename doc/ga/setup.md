# GA4 安裝與載入說明

## 環境變數
- `NEXT_PUBLIC_GA_ID`：GA Measurement ID。若未設定，預設採用 `G-LX6EPYGE00`。

## 套件與載入
- 使用 Next 官方 `@next/third-parties/google` 的 `GoogleAnalytics` 元件。
- 於 `src/app/layout.tsx` 最底部（`</body>` 前）條件渲染：

```tsx
{GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
```

## SPA page_view 與自訂事件
- 於 `src/components/common/analytics-listener.tsx` 監聽路由變化：
  - 每次路由變動送出 `sendPageview(url)`。
  - 依路由對應表送出一個自訂事件（例如 `view_home`）。

## 驗證步驟
1. 開啟 DevTools → Network 篩選 `collect`，切換頁面應出現請求。
2. 進入 GA DebugView 確認即時事件。
3. 切換 SPA 路由（不重新整理），應持續出現 `page_view` 與對應自訂事件。

## 僅在正式環境送出（可選）
- 可在 `src/lib/ga.ts` 的 `sendPageview`/`sendEvent` 中檢查 `process.env.NODE_ENV`。
- 或只在 `production` 時渲染 `<GoogleAnalytics />`。
