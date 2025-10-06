# 事件對照與擴充

## 目前對照（路由 → 事件）
- `/`、`/list*` → `view_home`
- `/about*` → `view_about`
- `/dashboard/create*` → `view_dashboard_create`
- `/dashboard*` → `view_dashboard`
- `/tasks/*` → `view_task_detail`
- `/tasks` → `view_tasks`
- 其他 → `view_page`

定義位置：`src/components/common/analytics-listener.tsx` 的 `routeToEventName`。

## 送出內容
- page_view：`page_path = pathname + searchParams`
- 自訂事件：`eventName` + `{ path, search }`

## 擴充建議
- 針對關鍵 CTA（如按鈕、表單送出）新增事件，命名格式：`cta_{feature}_{action}`。
- 需要轉換漏斗分析時，補充 `session_id`、`role` 等參數（不含 PII）。
- 若頁面需更細粒度分流，可在 `routeToEventName` 增加規則。
