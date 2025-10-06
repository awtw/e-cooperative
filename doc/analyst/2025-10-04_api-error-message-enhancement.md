# API 錯誤訊息增強分析

**分析時間**: 2025-10-04
**類型**: 🔍 Analysis + 💡 Enhancement
**優先級**: High

---

## 📋 需求分析

### 使用者需求
> 可以將 fetch api 失敗的時候 顯示別的訊息嗎 不是只是寫無法載入任務列表？

### 問題描述
目前的錯誤處理機制只顯示通用錯誤訊息，無法讓使用者了解具體的錯誤原因：
- ❌ 所有錯誤都顯示「無法載入任務列表」
- ❌ 無法區分網路錯誤、伺服器錯誤、逾時錯誤等不同情況
- ❌ 使用者無法根據錯誤訊息採取適當的行動

### 改進目標
- ✅ 根據錯誤類型顯示具體的錯誤訊息
- ✅ 提供使用者可採取的行動建議
- ✅ 保持友善和專業的語氣
- ✅ 符合災害應變平台的使用情境

---

## 🔍 當前錯誤處理機制分析

### 1. service/task.ts 錯誤處理

**getTasks() 函數**:
```typescript
export const getTasks: () => Promise<TaskInterface[]> = async () => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(`${API_BASE}/api/v1/task`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(
        `fetch tasks failed: ${res.status} ${res.statusText} ${txt}`,
      );
    }

    const resJson: ApiResponse = await res.json();
    // ... mapping logic
    return mappedData;
  } catch (err) {
    throw err;  // ❌ 直接拋出，沒有加工
  } finally {
    clearTimeout(timeout);
  }
};
```

**問題**:
- ❌ 只拋出原始錯誤，沒有分類
- ❌ 錯誤訊息包含技術細節（status code, statusText）
- ❌ 無法區分網路錯誤、逾時、4xx、5xx 等情況

### 2. ErrorState 元件錯誤訊息提取

**getErrorMessage() 函數**:
```typescript
const getErrorMessage = (err: unknown): string => {
  if (err instanceof Error) {
    return err.message;  // ❌ 直接顯示技術訊息
  }
  if (typeof err === "string") {
    return err;
  }
  return "伺服器暫時無法處理您的請求，請稍後再試";
};
```

**問題**:
- ❌ 直接顯示 Error.message（包含 status code 等技術細節）
- ❌ 無法根據錯誤類型提供不同的使用者友善訊息

### 3. tasks-cards.tsx 錯誤顯示

```typescript
if (isError) {
  return (
    <ErrorState
      error={error}
      onRetry={() => refetch()}
      title="無法載入任務列表"  // ❌ 固定標題
      showHomeButton={false}
    />
  );
}
```

**問題**:
- ❌ 只有固定的 title，無法根據錯誤類型調整

---

## 🎯 錯誤類型分析

### 可能的 API 錯誤場景

| 錯誤類型 | 觸發條件 | 當前訊息 | 建議訊息 |
|---------|---------|---------|---------|
| **網路錯誤** | 無網路連線、DNS 解析失敗 | "fetch tasks failed: ..." | "網路連線異常，請檢查您的網路設定" |
| **請求逾時** | 10秒內無回應 (AbortError) | "The operation was aborted" | "伺服器回應逾時，請稍後再試" |
| **400 錯誤** | 請求參數錯誤 | "fetch tasks failed: 400 Bad Request" | "請求格式錯誤，請重新整理頁面" |
| **401/403** | 未授權、無權限 | "fetch tasks failed: 401 Unauthorized" | "您沒有權限存取此資源，請重新登入" |
| **404 錯誤** | API 端點不存在 | "fetch tasks failed: 404 Not Found" | "無法找到資料來源，請聯絡系統管理員" |
| **500 錯誤** | 伺服器內部錯誤 | "fetch tasks failed: 500 Internal Server Error" | "伺服器暫時無法處理請求，請稍後再試" |
| **502/503** | 伺服器過載、維護中 | "fetch tasks failed: 503 Service Unavailable" | "伺服器維護中，請稍後再試" |
| **JSON 錯誤** | 回應格式錯誤 | "Unexpected token < in JSON" | "資料格式錯誤，請重新整理頁面" |

### 使用者行動建議

根據錯誤類型，提供不同的行動建議：

```typescript
{
  網路錯誤: ["檢查網路連線", "重新載入頁面"],
  逾時錯誤: ["稍後再試", "檢查網路速度"],
  401/403: ["重新登入", "聯絡管理員"],
  404錯誤: ["返回首頁", "聯絡管理員"],
  5xx錯誤: ["稍後再試", "重試"],
  其他錯誤: ["重新載入", "返回首頁"]
}
```

---

## 💡 改進方案設計

### 方案 1: 建立自定義 ApiError 類別（推薦）

**優點**:
- ✅ 類型安全
- ✅ 可攜帶更多錯誤資訊（錯誤碼、錯誤類型、原始錯誤）
- ✅ 便於擴展

**實作**:
```typescript
// src/lib/errors/api-error.ts
export enum ApiErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  CLIENT_ERROR = 'CLIENT_ERROR',    // 4xx
  SERVER_ERROR = 'SERVER_ERROR',    // 5xx
  PARSE_ERROR = 'PARSE_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export class ApiError extends Error {
  type: ApiErrorType;
  statusCode?: number;
  originalError?: unknown;
  userMessage: string;

  constructor(
    type: ApiErrorType,
    userMessage: string,
    statusCode?: number,
    originalError?: unknown
  ) {
    super(userMessage);
    this.name = 'ApiError';
    this.type = type;
    this.statusCode = statusCode;
    this.originalError = originalError;
    this.userMessage = userMessage;
  }
}
```

### 方案 2: 增強 ErrorState 元件智能判斷（輔助）

**實作**:
```typescript
// src/components/ui/error-state.tsx
const getErrorInfo = (err: unknown): { title: string; message: string; suggestion?: string } => {
  // 優先處理 ApiError
  if (err instanceof ApiError) {
    return {
      title: getErrorTitle(err.type),
      message: err.userMessage,
      suggestion: getErrorSuggestion(err.type),
    };
  }

  // 降級處理普通 Error
  if (err instanceof Error) {
    const msg = err.message;

    // 網路錯誤
    if (msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
      return {
        title: '網路連線異常',
        message: '無法連接到伺服器，請檢查您的網路設定',
        suggestion: '請確認網路連線後重試',
      };
    }

    // 逾時錯誤
    if (msg.includes('aborted') || msg.includes('timeout')) {
      return {
        title: '請求逾時',
        message: '伺服器回應時間過長，請稍後再試',
        suggestion: '如果問題持續發生，請聯絡系統管理員',
      };
    }

    // HTTP 錯誤碼判斷
    const statusMatch = msg.match(/(\d{3})/);
    if (statusMatch) {
      const status = parseInt(statusMatch[1]);
      return getHttpErrorInfo(status);
    }

    return {
      title: '發生錯誤',
      message: msg,
    };
  }

  // 預設錯誤
  return {
    title: '發生錯誤',
    message: '伺服器暫時無法處理您的請求，請稍後再試',
  };
};
```

### 方案 3: service/task.ts 改進錯誤處理

**實作**:
```typescript
export const getTasks: () => Promise<TaskInterface[]> = async () => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(`${API_BASE}/api/v1/task`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
    });

    if (!res.ok) {
      // 根據 HTTP 狀態碼拋出不同的 ApiError
      if (res.status >= 500) {
        throw new ApiError(
          ApiErrorType.SERVER_ERROR,
          '伺服器暫時無法處理請求，請稍後再試',
          res.status
        );
      } else if (res.status === 404) {
        throw new ApiError(
          ApiErrorType.CLIENT_ERROR,
          '無法找到任務資料，請聯絡系統管理員',
          res.status
        );
      } else if (res.status === 401 || res.status === 403) {
        throw new ApiError(
          ApiErrorType.CLIENT_ERROR,
          '您沒有權限存取此資源，請重新登入',
          res.status
        );
      } else {
        throw new ApiError(
          ApiErrorType.CLIENT_ERROR,
          '請求發生錯誤，請重新整理頁面',
          res.status
        );
      }
    }

    const resJson: ApiResponse = await res.json();
    // ... mapping logic
    return mappedData;

  } catch (err) {
    // 處理網路錯誤
    if (err instanceof TypeError && err.message === 'Failed to fetch') {
      throw new ApiError(
        ApiErrorType.NETWORK_ERROR,
        '網路連線異常，請檢查您的網路設定',
        undefined,
        err
      );
    }

    // 處理逾時錯誤
    if (err instanceof Error && err.name === 'AbortError') {
      throw new ApiError(
        ApiErrorType.TIMEOUT_ERROR,
        '伺服器回應逾時，請稍後再試',
        undefined,
        err
      );
    }

    // 處理 JSON 解析錯誤
    if (err instanceof SyntaxError) {
      throw new ApiError(
        ApiErrorType.PARSE_ERROR,
        '資料格式錯誤，請重新整理頁面',
        undefined,
        err
      );
    }

    // 如果已經是 ApiError，直接拋出
    if (err instanceof ApiError) {
      throw err;
    }

    // 其他未知錯誤
    throw new ApiError(
      ApiErrorType.UNKNOWN_ERROR,
      '發生未預期的錯誤，請稍後再試',
      undefined,
      err
    );
  } finally {
    clearTimeout(timeout);
  }
};
```

---

## 📊 改進效果對比

### Before: 通用錯誤訊息

```
❌ 無法載入任務列表
   fetch tasks failed: 503 Service Unavailable

   [重試] [返回首頁]
```

**問題**:
- 使用者看到技術訊息 "fetch tasks failed: 503 Service Unavailable"
- 不清楚發生什麼事
- 不知道該如何處理

### After: 具體錯誤訊息

**場景 1: 伺服器維護**
```
✅ 伺服器暫時無法使用
   伺服器維護中，請稍後再試
   💡 建議：系統可能正在進行維護，請稍後再回來查看

   [重試] [返回首頁]
```

**場景 2: 網路連線問題**
```
✅ 網路連線異常
   無法連接到伺服器，請檢查您的網路設定
   💡 建議：請確認網路連線後重試

   [重試] [返回首頁]
```

**場景 3: 請求逾時**
```
✅ 請求逾時
   伺服器回應時間過長，請稍後再試
   💡 建議：如果問題持續發生，請聯絡系統管理員

   [重試] [返回首頁]
```

---

## 🎨 UI/UX 改進建議

### 1. 錯誤訊息層級

```
[Icon] [Title]
       [Message]
       [💡 Suggestion] (optional)

       [Actions]
```

### 2. Icon 對應不同錯誤類型

- 🌐 網路錯誤: Wifi 斷線 icon
- ⏱️ 逾時錯誤: 時鐘 icon
- 🔒 權限錯誤: 鎖頭 icon
- 🛠️ 伺服器錯誤: 工具 icon
- ⚠️ 其他錯誤: 警告 icon

### 3. 動作按鈕優化

根據錯誤類型顯示不同的動作按鈕：

```typescript
{
  網路錯誤: [重試, 檢查網路設定說明],
  逾時錯誤: [重試, 返回首頁],
  401/403: [重新登入, 返回首頁],
  404錯誤: [返回首頁, 聯絡管理員],
  5xx錯誤: [重試, 返回首頁],
}
```

---

## 🔧 實作計劃

### Phase 1: 建立基礎設施 ⏰ 10分鐘
1. ✅ 建立 `src/lib/errors/api-error.ts`
2. ✅ 定義 ApiErrorType enum
3. ✅ 實作 ApiError class

### Phase 2: 改進 service/task.ts ⏰ 15分鐘
1. ✅ 引入 ApiError
2. ✅ 改寫 getTasks() 錯誤處理
3. ✅ 改寫 getTaskById() 錯誤處理

### Phase 3: 增強 ErrorState 元件 ⏰ 20分鐘
1. ✅ 實作 getErrorInfo() 函數
2. ✅ 實作 getErrorIcon() 函數
3. ✅ 實作 getErrorSuggestion() 函數
4. ✅ 更新 UI 顯示建議訊息

### Phase 4: 測試與驗證 ⏰ 15分鐘
1. ✅ 測試網路錯誤場景
2. ✅ 測試逾時場景（修改 timeout 為 100ms）
3. ✅ 測試 4xx 錯誤場景（模擬 404）
4. ✅ 測試 5xx 錯誤場景（模擬 500）
5. ✅ 測試 JSON 解析錯誤

### Phase 5: 文件記錄 ⏰ 10分鐘
1. ✅ 更新 changelog
2. ✅ 記錄測試結果
3. ✅ 建立錯誤訊息對照表

---

## 📚 技術決策

### 為什麼選擇自定義 ApiError 類別？

1. **類型安全**: TypeScript 可以正確識別錯誤類型
2. **可擴展性**: 未來可以加入更多欄位（如 errorCode, timestamp 等）
3. **一致性**: 所有 API 錯誤都使用相同的結構
4. **測試友善**: 容易 mock 和測試

### 為什麼在 service 層處理錯誤？

1. **關注點分離**: UI 不需要了解 HTTP 細節
2. **可重用性**: 多個元件可以使用相同的錯誤處理邏輯
3. **維護性**: 錯誤處理邏輯集中在一處

### 為什麼 ErrorState 也要有降級處理？

1. **向後相容**: 不是所有錯誤都是 ApiError
2. **防禦性編程**: 處理未預期的錯誤格式
3. **漸進式改進**: 可以逐步遷移到 ApiError

---

## 🎯 預期成果

### 使用者體驗改進
- ✅ 使用者能看懂錯誤訊息（非技術語言）
- ✅ 使用者知道發生什麼事
- ✅ 使用者知道可以採取什麼行動
- ✅ 減少使用者困惑和挫折感

### 開發者體驗改進
- ✅ 錯誤處理邏輯清晰
- ✅ 容易新增新的錯誤類型
- ✅ 容易測試
- ✅ 容易除錯（保留原始錯誤資訊）

### 系統穩定性改進
- ✅ 統一的錯誤處理機制
- ✅ 完整的錯誤覆蓋
- ✅ 防禦性編程
- ✅ 不會因未處理的錯誤而崩潰

---

## 📝 後續建議

### 短期（1週內）
1. ⏳ 實作錯誤追蹤（如 Sentry）
2. ⏳ 收集真實錯誤數據
3. ⏳ 根據數據優化錯誤訊息

### 中期（2-4週）
1. ⏳ 實作錯誤通知系統
2. ⏳ 實作離線錯誤佇列
3. ⏳ 實作錯誤分析儀表板

### 長期（1-3個月）
1. ⏳ A/B 測試不同錯誤訊息
2. ⏳ 實作智能錯誤恢復
3. ⏳ 實作預測性錯誤處理

---

**分析完成時間**: 2025-10-04
**狀態**: ✅ 分析完成，準備實作
**預計實作時間**: 60 分鐘
