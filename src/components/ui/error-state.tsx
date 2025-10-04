import { AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";
import { Alert, AlertDescription, AlertTitle } from "./alert";

interface ErrorStateProps {
  error?: Error | unknown;
  onRetry?: () => void;
  title?: string;
  description?: string;
  showHomeButton?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  onRetry,
  title = "發生錯誤",
  description,
  showHomeButton = true,
}) => {
  // 從錯誤物件中提取訊息
  const getErrorMessage = (err: unknown): string => {
    if (err instanceof Error) {
      return err.message;
    }
    if (typeof err === "string") {
      return err;
    }
    return "伺服器暫時無法處理您的請求，請稍後再試";
  };

  const errorMessage = description || getErrorMessage(error);

  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-4">
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="text-base font-semibold">{title}</AlertTitle>
        <AlertDescription className="mt-2 space-y-4">
          <p className="text-sm">{errorMessage}</p>
          <div className="flex gap-2">
            {onRetry && (
              <Button
                onClick={onRetry}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                重試
              </Button>
            )}
            {showHomeButton && (
              <Button variant="outline" size="sm" asChild>
                <Link href="/">返回首頁</Link>
              </Button>
            )}
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};
