/**
 * API 錯誤類型枚舉
 */
export enum ApiErrorType {
  /** 網路連線錯誤 */
  NETWORK_ERROR = "NETWORK_ERROR",
  /** 請求逾時 */
  TIMEOUT_ERROR = "TIMEOUT_ERROR",
  /** 客戶端錯誤 (4xx) */
  CLIENT_ERROR = "CLIENT_ERROR",
  /** 伺服器錯誤 (5xx) */
  SERVER_ERROR = "SERVER_ERROR",
  /** JSON 解析錯誤 */
  PARSE_ERROR = "PARSE_ERROR",
  /** 未知錯誤 */
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

/**
 * 自定義 API 錯誤類別
 *
 * 用於統一處理所有 API 相關錯誤，提供更好的錯誤分類和使用者友善訊息
 */
export class ApiError extends Error {
  /** 錯誤類型 */
  type: ApiErrorType;

  /** HTTP 狀態碼 (如果適用) */
  statusCode?: number;

  /** 原始錯誤物件 (用於除錯) */
  originalError?: unknown;

  /** 給使用者看的友善訊息 */
  userMessage: string;

  /** 建議的使用者行動 */
  suggestion?: string;

  constructor(
    type: ApiErrorType,
    userMessage: string,
    options?: {
      statusCode?: number;
      originalError?: unknown;
      suggestion?: string;
    },
  ) {
    super(userMessage);
    this.name = "ApiError";
    this.type = type;
    this.statusCode = options?.statusCode;
    this.originalError = options?.originalError;
    this.userMessage = userMessage;
    this.suggestion = options?.suggestion;

    // 確保 stack trace 正確
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

/**
 * 根據錯誤類型取得對應的建議
 */
export function getErrorSuggestion(type: ApiErrorType): string {
  switch (type) {
    case ApiErrorType.NETWORK_ERROR:
      return "請確認網路連線後重試";
    case ApiErrorType.TIMEOUT_ERROR:
      return "如果問題持續發生，請聯絡系統管理員";
    case ApiErrorType.CLIENT_ERROR:
      return "請重新整理頁面或返回首頁";
    case ApiErrorType.SERVER_ERROR:
      return "系統可能正在進行維護，請稍後再回來查看";
    case ApiErrorType.PARSE_ERROR:
      return "請重新整理頁面，如果問題持續請聯絡管理員";
    case ApiErrorType.UNKNOWN_ERROR:
      return "請重試或返回首頁";
    default:
      return "請稍後再試";
  }
}

/**
 * 根據錯誤類型取得對應的標題
 */
export function getErrorTitle(type: ApiErrorType): string {
  switch (type) {
    case ApiErrorType.NETWORK_ERROR:
      return "網路連線異常";
    case ApiErrorType.TIMEOUT_ERROR:
      return "請求逾時";
    case ApiErrorType.CLIENT_ERROR:
      return "請求錯誤";
    case ApiErrorType.SERVER_ERROR:
      return "伺服器暫時無法使用";
    case ApiErrorType.PARSE_ERROR:
      return "資料格式錯誤";
    case ApiErrorType.UNKNOWN_ERROR:
      return "發生錯誤";
    default:
      return "發生錯誤";
  }
}

/**
 * 檢查是否為 ApiError
 */
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}
