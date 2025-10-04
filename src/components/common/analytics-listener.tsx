"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { sendEvent, sendPageview } from "@/lib/ga";

export const AnalyticsListener = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    sendPageview(url);
    // Custom per-page event mapping
    const routeToEventName = (path: string): string => {
      if (path === "/" || path.startsWith("/list")) return "view_home";
      if (path.startsWith("/about")) return "view_about";
      if (path.startsWith("/dashboard/create")) return "view_dashboard_create";
      if (path.startsWith("/dashboard")) return "view_dashboard";
      if (path.startsWith("/tasks/")) return "view_task_detail";
      if (path.startsWith("/tasks")) return "view_tasks";
      return "view_page";
    };
    sendEvent(routeToEventName(pathname), {
      path: pathname,
      search: searchParams?.toString() || "",
    });
  }, [pathname, searchParams]);

  return null;
};


