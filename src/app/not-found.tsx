import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">
          找不到頁面
        </h1>
        <p className="mb-6 text-muted-foreground">
          抱歉，您所請求的頁面不存在或已被移除。
        </p>
        <Link
          href="/list"
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          aria-label="返回任務列表"
        >
          返回任務列表
        </Link>
      </div>
    </main>
  );
}
