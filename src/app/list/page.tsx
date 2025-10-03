import { TasksCards } from "@/components/task";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Construction, Info } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "任務列表 - 光復 e 互助",
  description: "瀏覽所有災害應變任務,加入志工行列幫助受災戶。",
};

export default function TaskListPage() {
  return (
    <div className="relative">
      {/* 預覽版橫幅 - 固定在最上層 */}
      <div className="sticky top-14 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-3">
          <Alert className="border-warning bg-warning/10">
            <Construction className="h-4 w-4 text-warning" />
            <AlertTitle className="text-warning">預覽版 - 開發中</AlertTitle>
            <AlertDescription className="mt-2 text-sm text-foreground/80">
              此平台目前處於開發階段,部分功能尚未完成。
              <Link
                href="/about"
                className="ml-2 inline-flex items-center gap-1 font-medium text-primary hover:underline"
              >
                瞭解更多關於平台
                <Info className="h-3 w-3" />
              </Link>
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {/* 任務卡片列表 */}
      <div className="container mx-auto space-y-5 px-4 py-4">
        <TasksCards />
      </div>
    </div>
  );
}
