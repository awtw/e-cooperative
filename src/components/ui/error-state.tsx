import { AlertCircle, RefreshCw, WifiOff, Clock, Lock, ServerCrash, FileWarning, AlertTriangle, Info, List, LogIn } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { ApiErrorType, getErrorTitle, isApiError } from "@/lib/errors/api-error";

interface ActionButton {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "outline";
  icon?: React.ReactNode;
}

interface ErrorStateProps {
  error?: Error | unknown;
  onRetry?: () => void;
  title?: string;
  description?: string;
  showHomeButton?: boolean;
  customActions?: ActionButton[];
}

interface ErrorInfo {
  title: string;
  message: string;
  suggestion?: string;
  icon: React.ReactNode;
  actions?: ActionButton[];
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  onRetry,
  title,
  description,
  showHomeButton = true,
  customActions,
}) => {
  // 從錯誤物件中提取完整的錯誤資訊
  const getErrorInfo = (err: unknown): ErrorInfo => {
    // 優先處理 ApiError
    if (isApiError(err)) {
      return {
        title: getErrorTitle(err.type),
        message: err.userMessage,
        suggestion: err.suggestion,
        icon: getErrorIcon(err.type),
        actions: getErrorActions(err.type, err.statusCode),
      };
    }

    // 降級處理普通 Error - 嘗試從訊息推斷錯誤類型
    if (err instanceof Error) {
      const msg = err.message;

      // 網路錯誤
      if (msg.includes("Failed to fetch") || msg.includes("NetworkError") || msg.includes("網路")) {
        return {
          title: "網路連線異常",
          message: "無法連接到伺服器，請檢查您的網路設定",
          suggestion: "請確認網路連線後重試",
          icon: <WifiOff className="h-4 w-4" />,
          actions: getErrorActions(ApiErrorType.NETWORK_ERROR),
        };
      }

      // 逾時錯誤
      if (msg.includes("aborted") || msg.includes("timeout") || msg.includes("逾時")) {
        return {
          title: "請求逾時",
          message: "伺服器回應時間過長",
          suggestion: "網路速度可能較慢，請稍後再試",
          icon: <Clock className="h-4 w-4" />,
          actions: getErrorActions(ApiErrorType.TIMEOUT_ERROR),
        };
      }

      // HTTP 錯誤碼判斷
      const statusMatch = msg.match(/(\d{3})/);
      if (statusMatch) {
        const status = parseInt(statusMatch[1]);
        if (status >= 500) {
          return {
            title: "伺服器暫時無法使用",
            message: "伺服器暫時無法處理請求，請稍後再試",
            suggestion: "系統可能正在進行維護，請稍後再回來查看",
            icon: <ServerCrash className="h-4 w-4" />,
            actions: getErrorActions(ApiErrorType.SERVER_ERROR, status),
          };
        } else if (status === 404) {
          return {
            title: "找不到資源",
            message: "無法找到請求的資源",
            suggestion: "請確認網址是否正確或返回首頁",
            icon: <FileWarning className="h-4 w-4" />,
            actions: getErrorActions(ApiErrorType.CLIENT_ERROR, status),
          };
        } else if (status === 401 || status === 403) {
          return {
            title: "權限不足",
            message: "您沒有權限存取此資源",
            suggestion: "請重新登入或聯絡管理員",
            icon: <Lock className="h-4 w-4" />,
            actions: getErrorActions(ApiErrorType.CLIENT_ERROR, status),
          };
        }
      }

      return {
        title: "發生錯誤",
        message: msg,
        icon: <AlertTriangle className="h-4 w-4" />,
        actions: getErrorActions(ApiErrorType.UNKNOWN_ERROR),
      };
    }

    // 字串錯誤
    if (typeof err === "string") {
      return {
        title: "發生錯誤",
        message: err,
        icon: <AlertCircle className="h-4 w-4" />,
        actions: getErrorActions(ApiErrorType.UNKNOWN_ERROR),
      };
    }

    // 預設錯誤
    return {
      title: "發生錯誤",
      message: "伺服器暫時無法處理您的請求，請稍後再試",
      icon: <AlertCircle className="h-4 w-4" />,
      actions: getErrorActions(ApiErrorType.UNKNOWN_ERROR),
    };
  };

  const errorInfo = getErrorInfo(error);
  const displayTitle = title || errorInfo.title;
  const displayMessage = description || errorInfo.message;
  const actions = customActions || errorInfo.actions || [];

  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-6">
      <Alert variant="destructive" className="max-w-xl w-full">
        {errorInfo.icon}
        <AlertTitle className="text-xl font-bold">{displayTitle}</AlertTitle>
        <AlertDescription className="mt-3 space-y-5">
          <p className="text-base leading-relaxed">{displayMessage}</p>
          {errorInfo.suggestion && (
            <div className="rounded-lg bg-muted/50 p-4 border border-border">
              <p className="text-base text-muted-foreground leading-relaxed">
                <span className="font-semibold">💡 建議：</span>
                {errorInfo.suggestion}
              </p>
            </div>
          )}
          <div className="flex flex-col gap-2">
            {/* 主要行動按鈕 - 來自 errorInfo.actions */}
            {actions.length > 0 && (
              <div className="flex flex-col gap-2">
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || "default"}
                    size="sm"
                    className="w-full gap-2"
                    asChild={!!action.href}
                    onClick={action.onClick}
                  >
                    {action.href ? (
                      <Link href={action.href}>
                        {action.icon}
                        {action.label}
                      </Link>
                    ) : (
                      <>
                        {action.icon}
                        {action.label}
                      </>
                    )}
                  </Button>
                ))}
              </div>
            )}

            {/* 次要行動按鈕 - 重試和返回首頁 */}
            <div className="flex gap-2">
              {onRetry && (
                <Button
                  onClick={onRetry}
                  variant="outline"
                  size="sm"
                  className="gap-2 flex-1"
                >
                  <RefreshCw className="h-4 w-4" />
                  重試
                </Button>
              )}
              {showHomeButton && (
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link href="/">返回首頁</Link>
                </Button>
              )}
            </div>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};

/**
 * 根據錯誤類型取得對應的圖示
 */
function getErrorIcon(type: ApiErrorType): React.ReactNode {
  switch (type) {
    case ApiErrorType.NETWORK_ERROR:
      return <WifiOff className="h-4 w-4" />;
    case ApiErrorType.TIMEOUT_ERROR:
      return <Clock className="h-4 w-4" />;
    case ApiErrorType.CLIENT_ERROR:
      return <AlertTriangle className="h-4 w-4" />;
    case ApiErrorType.SERVER_ERROR:
      return <ServerCrash className="h-4 w-4" />;
    case ApiErrorType.PARSE_ERROR:
      return <FileWarning className="h-4 w-4" />;
    case ApiErrorType.UNKNOWN_ERROR:
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
}

/**
 * 根據錯誤類型取得對應的行動按鈕
 */
function getErrorActions(type: ApiErrorType, statusCode?: number): ActionButton[] {
  // 伺服器錯誤 (5xx) - 引導去了解平台
  if (type === ApiErrorType.SERVER_ERROR) {
    return [
      {
        label: "了解平台",
        href: "/about",
        variant: "default",
        icon: <Info className="h-4 w-4" />,
      },
    ];
  }

  // 網路錯誤 - 引導去了解平台
  if (type === ApiErrorType.NETWORK_ERROR) {
    return [
      {
        label: "了解平台",
        href: "/about",
        variant: "default",
        icon: <Info className="h-4 w-4" />,
      },
    ];
  }

  // 逾時錯誤 - 引導去了解平台
  if (type === ApiErrorType.TIMEOUT_ERROR) {
    return [
      {
        label: "了解平台",
        href: "/about",
        variant: "default",
        icon: <Info className="h-4 w-4" />,
      },
    ];
  }

  // 客戶端錯誤
  if (type === ApiErrorType.CLIENT_ERROR) {
    // 404 - 引導去任務列表
    if (statusCode === 404) {
      return [
        {
          label: "查看任務列表",
          href: "/list",
          variant: "default",
          icon: <List className="h-4 w-4" />,
        },
      ];
    }

    // 401/403 - 引導去登入
    if (statusCode === 401 || statusCode === 403) {
      return [
        {
          label: "前往登入",
          href: "/login",
          variant: "default",
          icon: <LogIn className="h-4 w-4" />,
        },
        {
          label: "了解平台",
          href: "/about",
          variant: "outline",
          icon: <Info className="h-4 w-4" />,
        },
      ];
    }

    // 其他 4xx 錯誤
    return [
      {
        label: "了解平台",
        href: "/about",
        variant: "default",
        icon: <Info className="h-4 w-4" />,
      },
    ];
  }

  // 其他錯誤 - 提供了解平台選項
  return [
    {
      label: "了解平台",
      href: "/about",
      variant: "default",
      icon: <Info className="h-4 w-4" />,
    },
  ];
}
