import { Inbox } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "目前沒有任務",
  description = "目前還沒有任何任務資料",
  icon,
  actionLabel,
  actionHref,
  onAction,
}) => {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-4 p-8">
      <div className="rounded-full bg-muted p-6">
        {icon || <Inbox className="h-12 w-12 text-muted-foreground" />}
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          {description}
        </p>
      </div>
      {(actionLabel && (actionHref || onAction)) && (
        <div className="mt-4">
          {actionHref ? (
            <Button asChild>
              <Link href={actionHref}>{actionLabel}</Link>
            </Button>
          ) : (
            <Button onClick={onAction}>{actionLabel}</Button>
          )}
        </div>
      )}
    </div>
  );
};
