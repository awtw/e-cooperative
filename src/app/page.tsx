"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  // 首次訪問時重導向到 about 頁面
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisitedHomepage");

    if (!hasVisited) {
      sessionStorage.setItem("hasVisitedHomepage", "true");
      router.push("/about");
    } else {
      // 如果已經訪問過,重導向到任務列表頁
      router.replace("/list");
    }
  }, [router]);

  return (
    <div className="container mx-auto flex min-h-[50vh] items-center justify-center">
      <p className="text-muted-foreground">載入中...</p>
    </div>
  );
}
