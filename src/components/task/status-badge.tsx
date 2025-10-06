"use client";
import React from "react";
import { TaskStatus } from "@/types/task";

const statusToClasses = (status: TaskStatus) => {
  switch (status) {
    case "pending":
      return "bg-[var(--color-status-pending)] text-[var(--color-card-foreground)]";
    case "available":
      return "bg-[var(--color-status-available)] text-[var(--color-card-foreground)]";
    case "claimed":
      return "bg-[var(--color-status-claimed)] text-[var(--color-card-foreground)]";
    case "in_progress":
      return "bg-[var(--color-status-in-progress)] text-[var(--color-card-foreground)]";
    case "completed":
      return "bg-[var(--color-status-completed)] text-[var(--color-card-foreground)]";
    case "cancelled":
      return "bg-[var(--color-status-cancelled)] text-[var(--color-card-foreground)]";
    default:
      return "bg-[var(--color-muted)] text-[var(--color-muted-foreground)]";
  }
};

const statusToLabel = (status: TaskStatus) => {
  switch (status) {
    case "pending":
      return "待審核";
    case "available":
      return "可認領";
    case "claimed":
      return "已認領";
    case "in_progress":
      return "進行中";
    case "completed":
      return "已完成";
    case "cancelled":
      return "已取消";
    default:
      return status;
  }
};

export default function StatusBadge({
  status,
  className = "",
  children,
}: {
  status: TaskStatus;
  className?: string;
  children?: React.ReactNode;
}) {
  const classes = `${statusToClasses(status)} ${className}`.trim();
  return <span className={classes}>{children ?? statusToLabel(status)}</span>;
}
