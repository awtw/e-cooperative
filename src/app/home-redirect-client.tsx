"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomeRedirectClient() {
  const router = useRouter();

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisitedHomepage");

    if (!hasVisited) {
      sessionStorage.setItem("hasVisitedHomepage", "true");
      router.push("/about");
    } else {
      router.replace("/list");
    }
  }, [router]);

  return (
    <div className="container mx-auto flex min-h-[50vh] items-center justify-center">
      <p className="text-muted-foreground">載入中...</p>
    </div>
  );
}


